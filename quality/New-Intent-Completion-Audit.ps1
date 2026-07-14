param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

$rulesPath = Join-Path $Root 'quality\intent-completion-rules.json'
$overridesPath = Join-Path $Root 'quality\intent-completion-overrides.json'
$inventoryPath = Join-Path $Root 'quality\generated\rendered-control-inventory.json'
$contractsPath = Join-Path $Root 'shared\prototype-interaction-contracts.js'
$jsonOutput = Join-Path $Root 'quality\generated\intent-completion-audit.json'
$markdownOutput = Join-Path $Root 'quality\generated\intent-completion-audit.md'

$rules = Get-Content -Raw -LiteralPath $rulesPath | ConvertFrom-Json
$overrides = Get-Content -Raw -LiteralPath $overridesPath | ConvertFrom-Json
$inventory = Get-Content -Raw -LiteralPath $inventoryPath | ConvertFrom-Json

$contractSource = Get-Content -Raw -LiteralPath $contractsPath
$contractJson = $contractSource -replace '^window\.MoolPrototypeInteractionContracts\s*=\s*', '' -replace ';\s*$', ''
$contracts = $contractJson | ConvertFrom-Json -AsHashtable

$overrideMap = @{}
foreach ($entry in @($overrides.entries)) {
  $overrideMap["$([int]$entry.screen)|$([string]$entry.label)"] = $entry
}

function Test-Match {
  param([string]$Value, [string]$Pattern)
  if ([string]::IsNullOrWhiteSpace($Value)) { return $false }
  return $Value -match "(?i)\b($Pattern)\b"
}

function Get-Contract {
  param([int]$Screen, [string]$Label)
  $screenKey = [string]$Screen
  if (-not $contracts.screens.Contains($screenKey)) { return $null }
  $screenContracts = $contracts.screens[$screenKey]
  if (-not $screenContracts.Contains($Label)) { return $null }
  return $screenContracts[$Label]
}

$findings = [System.Collections.Generic.List[object]]::new()
$controlsChecked = 0
$highIntentChecked = 0
$explicitlyResolved = 0
$genericFallbackCount = 0
$uncontractedButtons = 0
$ticketNumber = 0

foreach ($screenResult in @($inventory.screens)) {
  $screen = [int]$screenResult.screen
  foreach ($control in @($screenResult.controls)) {
    $controlsChecked++
    $label = ([string]$control.label).Trim()
    $tag = ([string]$control.tag).ToUpperInvariant()
    $href = [string]$control.href
    if ([string]::IsNullOrWhiteSpace($label)) { continue }
    if ($tag -in @('INPUT','TEXTAREA','SELECT')) { continue }
    if (Test-Match $label $rules.nonJourneyPattern) { continue }

    $isHighIntent = Test-Match $label $rules.highIntentPattern
    if (-not $isHighIntent) { continue }
    $highIntentChecked++

    $key = "$screen|$label"
    $override = if ($overrideMap.ContainsKey($key)) { $overrideMap[$key] } else { $null }
    $contract = Get-Contract -Screen $screen -Label $label
    $contractType = if ($contract) { [string]$contract.type } else { '' }
    $hasRoute = -not [string]::IsNullOrWhiteSpace($href) -and $href -notmatch '(?:#|javascript:)\s*$'
    if (-not $hasRoute -and $contractType -eq 'route' -and -not [string]::IsNullOrWhiteSpace([string]$contract.route)) {
      $hasRoute = $true
    }

    if ($override -and ([string]$override.resolutionType -in @($rules.allowedResolutionTypes))) {
      $explicitlyResolved++
      continue
    }
    if ($hasRoute) {
      $explicitlyResolved++
      continue
    }
    if ($contractType -eq 'handoff' -and (Test-Match $label $rules.utilityHandoffPattern)) {
      $explicitlyResolved++
      continue
    }

    $reason = 'High-intent control has no declared completion outcome.'
    $resolutionNeeded = 'Declare a progressive route, observable state, governed handoff or terminal result.'
    if ($contractType -in @('progress','select','detail')) {
      $genericFallbackCount++
      $reason = "High-intent control is satisfied only by generic '$contractType' fallback feedback."
    } elseif ([string]::IsNullOrWhiteSpace($contractType) -and $tag -eq 'BUTTON') {
      $uncontractedButtons++
      $reason = 'High-intent button has no explicit intention-completion contract.'
    } elseif ($contractType -eq 'native') {
      $reason = 'Native interaction changes something, but its intended completion state is not declared.'
    }

    $ticketNumber++
    $findings.Add([pscustomobject][ordered]@{
      ticket = ('IC-{0:D4}' -f $ticketNumber)
      screen = $screen
      file = [string]$screenResult.file
      label = $label
      tag = $tag
      occurrence = if ($null -ne $control.occurrence) { [int]$control.occurrence } else { 0 }
      visibleIndex = if ($null -ne $control.visibleIndex) { [int]$control.visibleIndex } elseif ($null -ne $control.i) { [int]$control.i } else { -1 }
      currentContractType = $contractType
      reason = $reason
      requiredResolution = $resolutionNeeded
      priority = if ($label -match '(?i)pay|checkout|place order|confirm|publish|post|apply|accept|refund|release|complete|book|buy|create') { 'P0' } else { 'P1' }
    })
  }
}

$pseudoActions = [System.Collections.Generic.List[object]]::new()
Get-ChildItem -LiteralPath (Join-Path $Root 'screens') -Filter '*.html' | ForEach-Object {
  if ($_.Name -notmatch '^(\d{2,3})-') { return }
  $screen = [int]$Matches[1]
  $html = Get-Content -Raw -LiteralPath $_.FullName
  $rows = [regex]::Matches($html, '<span\s+class="[^"]*proof-row[^"]*proof-actions[^"]*"[^>]*>(.*?)</span>', [Text.RegularExpressions.RegexOptions]::Singleline)
  foreach ($row in $rows) {
    foreach ($item in [regex]::Matches($row.Groups[1].Value, '<i[^>]*>(.*?)</i>', [Text.RegularExpressions.RegexOptions]::Singleline)) {
      $label = ([regex]::Replace($item.Groups[1].Value, '<[^>]+>', '')).Trim()
      if (-not (Test-Match $label $rules.highIntentPattern)) { continue }
      if (Test-Match $label $rules.nonJourneyPattern) { continue }
      $ticketNumber++
      $finding = [pscustomobject][ordered]@{
        ticket = ('IC-{0:D4}' -f $ticketNumber)
        screen = $screen
        file = $_.Name
        label = $label
        tag = 'VISUAL-PSEUDO-ACTION'
        currentContractType = ''
        reason = 'Styled action word is not an interactive semantic control.'
        requiredResolution = 'Make it a real progressive control or restyle it as non-interactive information.'
        priority = 'P0'
      }
      $pseudoActions.Add($finding)
      $findings.Add($finding)
    }
  }
}

$orderedFindings = @($findings | Sort-Object screen, ticket)
$screensImpacted = @($orderedFindings.screen | Sort-Object -Unique)
$summary = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  status = if ($orderedFindings.Count -eq 0) { 'passed' } else { 'blocked' }
  controlsChecked = $controlsChecked
  highIntentControlsChecked = $highIntentChecked
  explicitlyResolved = $explicitlyResolved
  unresolved = $orderedFindings.Count
  p0 = @($orderedFindings | Where-Object priority -eq 'P0').Count
  p1 = @($orderedFindings | Where-Object priority -eq 'P1').Count
  genericFallbackControls = $genericFallbackCount
  uncontractedHighIntentButtons = $uncontractedButtons
  visualPseudoActions = $pseudoActions.Count
  screensImpacted = $screensImpacted.Count
}

$result = [ordered]@{
  version = 'intent-completion-audit-2026-07-14'
  rule = [string]$rules.rule
  summary = $summary
  findings = $orderedFindings
}

$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $jsonOutput -Encoding utf8

$md = [System.Collections.Generic.List[string]]::new()
$md.Add('# Intention Completion Audit')
$md.Add('')
$md.Add("Status: **$($summary.status)**")
$md.Add('')
$md.Add("- Controls checked: $($summary.controlsChecked)")
$md.Add("- High-intent controls: $($summary.highIntentControlsChecked)")
$md.Add("- Explicitly resolved: $($summary.explicitlyResolved)")
$md.Add("- Unresolved: $($summary.unresolved) ($($summary.p0) P0, $($summary.p1) P1)")
$md.Add("- Generic fallback controls: $($summary.genericFallbackControls)")
$md.Add("- Styled pseudo-actions: $($summary.visualPseudoActions)")
$md.Add("- Screens impacted: $($summary.screensImpacted)")
$md.Add('')
$md.Add('A route existing is not enough. Every high-intent control must reach a declared route, observable local state, governed handoff or terminal outcome.')
$md.Add('')
$md.Add('| Ticket | Screen | Priority | Action | Problem |')
$md.Add('|---|---:|---|---|---|')
foreach ($finding in $orderedFindings) {
  $safeLabel = ([string]$finding.label).Replace('|','/').Replace("`r",' ').Replace("`n",' ')
  $safeReason = ([string]$finding.reason).Replace('|','/').Replace("`r",' ').Replace("`n",' ')
  $md.Add("| $($finding.ticket) | $($finding.screen) | $($finding.priority) | $safeLabel | $safeReason |")
}
$md -join "`n" | Set-Content -LiteralPath $markdownOutput -Encoding utf8

$result.summary | ConvertTo-Json -Depth 4
