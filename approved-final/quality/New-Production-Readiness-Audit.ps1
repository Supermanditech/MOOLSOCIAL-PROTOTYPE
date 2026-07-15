param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

$inventoryPath = Join-Path $Root 'quality\generated\rendered-control-inventory.json'
$contractsPath = Join-Path $Root 'shared\prototype-interaction-contracts.js'
$screensPath = Join-Path $Root 'screens'
$generatedPath = Join-Path $Root 'quality\generated'

foreach ($required in @($inventoryPath, $contractsPath, $screensPath)) {
  if (-not (Test-Path -LiteralPath $required)) {
    throw "Missing production-readiness input: $required"
  }
}

$inventory = Get-Content -Raw -LiteralPath $inventoryPath | ConvertFrom-Json
$contractSource = Get-Content -Raw -LiteralPath $contractsPath
$jsonStart = $contractSource.IndexOf('{')
$jsonEnd = $contractSource.LastIndexOf('}')
if ($jsonStart -lt 0 -or $jsonEnd -le $jsonStart) {
  throw 'Prototype interaction contract registry is not valid JSON-wrapped JavaScript.'
}
$contracts = $contractSource.Substring($jsonStart, $jsonEnd - $jsonStart + 1) | ConvertFrom-Json -AsHashtable

$highIntentPattern = '(?i)\b(install|continue|sign[ -]?in|login|otp|record|caption|post|publish|create|upload|pay|confirm|place order|checkout|apply|accept|submit|release|refund|complete|buy|book|start|end trip|add|save|send|join|activate|verify|schedule|cancel|report|resolve|rate|collect|deliver|approve|reject|withdraw|assign|go online|subscribe|renew|claim|order|request)\b'
$genericNotePattern = '(?i)(is selected\.\s*review the shown state|opened\.\s*close this panel|details are open\.\s*your current screen state is preserved|^.+ selected\.$)'
$genericEvidencePattern = '(?i)^clean mobile replay produced (an observable native screen-state change|visible state:\s*(showing|selected|open(ed)?|ready)\b)'

$copyRules = @(
  [pscustomobject]@{ code = 'internal-screen-number'; pattern = '(?i)\bscreen\s+\d{1,3}\b'; message = 'Internal screen numbering is visible to the user.' },
  [pscustomobject]@{ code = 'internal-prototype'; pattern = '(?i)\b(prototype|screenbook|review draft)\b'; message = 'Prototype or review terminology is visible to the user.' },
  [pscustomobject]@{ code = 'internal-delivery-language'; pattern = '(?i)\b(backend|route state|production route|handoff contract)\b'; message = 'Implementation terminology is visible to the user.' },
  [pscustomobject]@{ code = 'customer-stock-confirmation'; pattern = '(?i)(confirm stock first|customer is waiting to pay|payment blocked|retailer stock lock|unlock customer payment|no confirm, no pay|waiting for .{0,40}retailer|after retailer stock|retailer confirmed stock|stock confirmation requested)'; message = 'Customer checkout exposes a retailer stock-confirmation dependency.' },
  [pscustomobject]@{ code = 'generic-action-result'; pattern = '(?i)\b(review the shown state|details are open|is selected\.?)\b'; message = 'Generic fallback wording is visible instead of a user outcome.' }
)

function Get-PhoneFacingText([string]$Html) {
  $withoutStyle = [regex]::Replace($Html, '(?is)<style\b.*?</style>', ' ')
  $withoutScript = [regex]::Replace($withoutStyle, '(?is)<script\b.*?</script>', ' ')
  $tags = [regex]::Matches($withoutScript, '(?is)</?(?:section|div)\b[^>]*>')
  $regions = [System.Collections.Generic.List[string]]::new()
  for ($startIndex = 0; $startIndex -lt $tags.Count; $startIndex++) {
    $opening = $tags[$startIndex]
    if ($opening.Value -match '^</' -or $opening.Value -notmatch '(?is)class="[^"]*(?<![\w-])(?:production-phone|phone-frame|device|phone)(?![\w-])[^"]*"') { continue }
    $depth = 0
    for ($tagIndex = $startIndex; $tagIndex -lt $tags.Count; $tagIndex++) {
      $tag = $tags[$tagIndex]
      if ($tag.Value -match '^</') { $depth-- } else { $depth++ }
      if ($depth -eq 0) {
        $end = $tag.Index + $tag.Length
        $regions.Add($withoutScript.Substring($opening.Index, $end - $opening.Index))
        $startIndex = $tagIndex
        break
      }
    }
  }
  if ($regions.Count -eq 0) { return '' }
  $text = [regex]::Replace(($regions -join ' '), '(?is)<[^>]+>', ' ')
  $text = [Net.WebUtility]::HtmlDecode($text)
  return [regex]::Replace($text, '\s+', ' ').Trim()
}

function Get-ScreenModule([string]$Html) {
  $match = [regex]::Match($Html, '(?is)id="productionRouteContract">(.*?)</script>')
  if (-not $match.Success) { return 'unknown' }
  try { return (($match.Groups[1].Value | ConvertFrom-Json).productionModule) } catch { return 'unknown' }
}

$findings = [System.Collections.Generic.List[object]]::new()
$screenResults = [System.Collections.Generic.List[object]]::new()

foreach ($screenRecord in @($inventory.screens | Sort-Object screen)) {
  $screen = [int]$screenRecord.screen
  $file = Join-Path $screensPath $screenRecord.file
  if (-not (Test-Path -LiteralPath $file)) {
    $findings.Add([pscustomobject]@{ screen = $screen; file = $screenRecord.file; severity = 'P0'; category = 'missing-screen'; control = ''; message = 'Source screen is missing.' })
    continue
  }

  $html = Get-Content -Raw -LiteralPath $file
  $phoneText = Get-PhoneFacingText $html
  $module = Get-ScreenModule $html
  $screenContracts = if ($contracts.screens.ContainsKey([string]$screen)) { $contracts.screens[[string]$screen] } else { @{} }
  $screenFindings = [System.Collections.Generic.List[object]]::new()
  $highIntentCount = 0

  foreach ($control in @($screenRecord.controls)) {
    $label = [regex]::Replace([string]$control.label, '\s+', ' ').Trim()
    if (-not $label -or $label -notmatch $highIntentPattern) { continue }
    $highIntentCount += 1
    if (-not $screenContracts.ContainsKey($label)) { continue }
    $contract = $screenContracts[$label]
    $type = [string]$contract.type
    $note = [string]$contract.note
    $hasConcreteRoute = $type -eq 'route' -and -not [string]::IsNullOrWhiteSpace([string]$contract.route)
    $native = $type -eq 'native'
    $terminal = $type -eq 'terminal' -and [bool]$contract.intentOutcome
    $selectionOnly = $type -eq 'select'
    if (-not $hasConcreteRoute -and -not $native -and -not $terminal -and -not $selectionOnly -and $note -match $genericNotePattern) {
      $finding = [pscustomobject]@{
        screen = $screen
        file = $screenRecord.file
        severity = 'P0'
        category = 'generic-high-intent-outcome'
        control = $label
        message = "High-intent control resolves only to generic '$type' feedback."
      }
      $findings.Add($finding)
      $screenFindings.Add($finding)
    }
  }

  foreach ($rule in $copyRules) {
    $matches = [regex]::Matches($phoneText, $rule.pattern)
    foreach ($match in @($matches | Select-Object -First 4)) {
      $start = [Math]::Max(0, $match.Index - 55)
      $length = [Math]::Min($phoneText.Length - $start, $match.Length + 110)
      $context = $phoneText.Substring($start, $length).Trim()
      $finding = [pscustomobject]@{
        screen = $screen
        file = $screenRecord.file
        severity = if ($rule.code -eq 'customer-stock-confirmation') { 'P0' } else { 'P1' }
        category = $rule.code
        control = ''
        message = "$($rule.message) Context: $context"
      }
      $findings.Add($finding)
      $screenFindings.Add($finding)
    }
  }

  $screenResults.Add([pscustomobject][ordered]@{
    screen = $screen
    file = $screenRecord.file
    module = $module
    controls = @($screenRecord.controls).Count
    highIntentControls = $highIntentCount
    p0 = @($screenFindings | Where-Object severity -eq 'P0').Count
    p1 = @($screenFindings | Where-Object severity -eq 'P1').Count
    status = if ($screenFindings.Count -eq 0) { 'passed' } else { 'needs-correction' }
  })
}

$summary = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  status = if ($findings.Count -eq 0) { 'passed' } else { 'blocked' }
  screensChecked = $screenResults.Count
  screensPassed = @($screenResults | Where-Object status -eq 'passed').Count
  screensNeedingCorrection = @($screenResults | Where-Object status -eq 'needs-correction').Count
  controlsChecked = @($inventory.screens.controls).Count
  highIntentControls = ($screenResults | Measure-Object highIntentControls -Sum).Sum
  p0 = @($findings | Where-Object severity -eq 'P0').Count
  p1 = @($findings | Where-Object severity -eq 'P1').Count
  genericHighIntentOutcomes = @($findings | Where-Object category -eq 'generic-high-intent-outcome').Count
  customerStockConfirmationLanguage = @($findings | Where-Object category -eq 'customer-stock-confirmation').Count
  internalUserFacingLanguage = @($findings | Where-Object category -in @('internal-screen-number','internal-prototype','internal-delivery-language')).Count
}

$result = [ordered]@{
  version = 'production-readiness-audit-2026-07-15'
  rule = 'Every user-facing tap must reach a concrete route, meaningful native state, governed handoff or terminal outcome, and phone-facing copy must not expose implementation or retailer-internal uncertainty.'
  summary = $summary
  screens = @($screenResults)
  findings = @($findings)
}

if (-not (Test-Path -LiteralPath $generatedPath)) { New-Item -ItemType Directory -Path $generatedPath | Out-Null }
$jsonPath = Join-Path $generatedPath 'production-readiness-audit.json'
$mdPath = Join-Path $generatedPath 'production-readiness-audit.md'
$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $jsonPath -Encoding utf8

$markdown = [System.Collections.Generic.List[string]]::new()
$markdown.Add('# Production Readiness Screenwise Audit')
$markdown.Add('')
$markdown.Add("Status: **$($summary.status)**")
$markdown.Add('')
$markdown.Add("- Screens checked: $($summary.screensChecked)")
$markdown.Add("- Screens passed: $($summary.screensPassed)")
$markdown.Add("- Screens needing correction: $($summary.screensNeedingCorrection)")
$markdown.Add("- High-intent controls: $($summary.highIntentControls)")
$markdown.Add("- P0 findings: $($summary.p0)")
$markdown.Add("- P1 findings: $($summary.p1)")
$markdown.Add('')
$markdown.Add('| Screen | Module | Controls | High intent | P0 | P1 | Status |')
$markdown.Add('| ---: | --- | ---: | ---: | ---: | ---: | --- |')
foreach ($screen in $screenResults) {
  $markdown.Add("| $($screen.screen) | $($screen.module) | $($screen.controls) | $($screen.highIntentControls) | $($screen.p0) | $($screen.p1) | $($screen.status) |")
}
$markdown.Add('')
$markdown.Add('## Findings')
$markdown.Add('')
foreach ($finding in $findings) {
  $control = if ($finding.control) { " — **$($finding.control)**" } else { '' }
  $markdown.Add("- [$($finding.severity)] Screen $($finding.screen), `$($finding.file)` — $($finding.category)${control}: $($finding.message)")
}
$markdown -join "`n" | Set-Content -LiteralPath $mdPath -Encoding utf8

$result | ConvertTo-Json -Depth 8

if ($summary.status -ne 'passed') { exit 1 }
