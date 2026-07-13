param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$screenRoot = Join-Path $Root 'screens'
$approvedRoot = Join-Path $Root 'approved-final\screens'
$flowPath = Join-Path $Root 'flows\approved-flows.json'
$economicsPath = Join-Path $Root 'shared\creator-economics-flow-contract.json'
$outputRoot = Join-Path $Root 'quality\generated'
New-Item -ItemType Directory -Path $outputRoot -Force | Out-Null

function Resolve-LocalTarget([string]$SourceFile, [string]$Target) {
  if (-not $Target) { return $null }
  $value = [Net.WebUtility]::HtmlDecode($Target.Trim())
  if ($value -match '^(?:https?:|mailto:|tel:|javascript:|data:|blob:|#)') { return $null }
  $clean = ($value -split '[?#]')[0]
  if (-not $clean) { return $null }
  return [IO.Path]::GetFullPath((Join-Path (Split-Path -Parent $SourceFile) $clean))
}

$screens = @(Get-ChildItem -LiteralPath $screenRoot -Filter '*.html' | Sort-Object Name)
$missingTargets = [System.Collections.Generic.List[object]]::new()
$missingAssets = [System.Collections.Generic.List[object]]::new()
$contractIssues = [System.Collections.Generic.List[object]]::new()
$buttonCandidates = [System.Collections.Generic.List[object]]::new()
$targetChecks = 0
$assetChecks = 0
$buttonCount = 0

foreach ($file in $screens) {
  $html = Get-Content -LiteralPath $file.FullName -Raw
  $screenMatch = [regex]::Match($file.Name, '^(\d+)-')
  $screen = if ($screenMatch.Success) { [int]$screenMatch.Groups[1].Value } else { -1 }

  foreach ($match in [regex]::Matches($html, '<a\b[^>]*\bhref=["'']([^"'']+)["'']', 'IgnoreCase')) {
    $target = $match.Groups[1].Value
    $resolved = Resolve-LocalTarget $file.FullName $target
    if ($null -eq $resolved) { continue }
    $targetChecks++
    if (-not (Test-Path -LiteralPath $resolved)) {
      $missingTargets.Add([pscustomobject]@{ screen = $screen; file = $file.Name; target = $target })
    }
  }

  foreach ($match in [regex]::Matches($html, '(?:window\.)?location\.href\s*=\s*["'']([^"'']+)["'']', 'IgnoreCase')) {
    $target = $match.Groups[1].Value
    $resolved = Resolve-LocalTarget $file.FullName $target
    if ($null -eq $resolved) { continue }
    $targetChecks++
    if (-not (Test-Path -LiteralPath $resolved)) {
      $missingTargets.Add([pscustomobject]@{ screen = $screen; file = $file.Name; target = $target })
    }
  }

  foreach ($match in [regex]::Matches($html, '<(?:script|img|source)\b[^>]*\bsrc=["'']([^"'']+)["'']|<link\b[^>]*\bhref=["'']([^"'']+)["'']', 'IgnoreCase')) {
    $target = if ($match.Groups[1].Success) { $match.Groups[1].Value } else { $match.Groups[2].Value }
    $resolved = Resolve-LocalTarget $file.FullName $target
    if ($null -eq $resolved) { continue }
    $assetChecks++
    if (-not (Test-Path -LiteralPath $resolved)) {
      $missingAssets.Add([pscustomobject]@{ screen = $screen; file = $file.Name; target = $target })
    }
  }

  foreach ($requiredId in @('productionRouteContract','prototypeApprovalContract')) {
    if ($html -notmatch "id=[`"']$requiredId[`"']") {
      $contractIssues.Add([pscustomobject]@{ screen = $screen; file = $file.Name; issue = "Missing $requiredId" })
    }
  }

  $globalButtonHandler = $html -match 'querySelectorAll\s*\(\s*["''][^"'']*button'
  foreach ($match in [regex]::Matches($html, '<button\b([^>]*)>([\s\S]*?)</button>', 'IgnoreCase')) {
    $buttonCount++
    $attrs = $match.Groups[1].Value
    $label = [regex]::Replace($match.Groups[2].Value, '<[^>]+>', ' ')
    $label = [regex]::Replace([Net.WebUtility]::HtmlDecode($label), '\s+', ' ').Trim()
    $id = [regex]::Match($attrs, '\bid=["'']([^"'']+)["'']', 'IgnoreCase').Groups[1].Value
    $classes = [regex]::Match($attrs, '\bclass=["'']([^"'']+)["'']', 'IgnoreCase').Groups[1].Value -split '\s+' | Where-Object { $_ }
    $hasInline = $attrs -match '\bonclick\s*='
    $hasData = $attrs -match '\bdata-[\w-]+\s*='
    $idBound = $id -and ($html -match "getElementById\s*\(\s*[`"']$([regex]::Escape($id))[`"']\s*\)" -or $html -match "#$([regex]::Escape($id))")
    $classBound = $false
    foreach ($class in $classes) {
      if ($html -match "[.]$([regex]::Escape($class))" -and $html -match 'addEventListener|onclick') { $classBound = $true; break }
    }
    if (-not ($globalButtonHandler -or $hasInline -or $hasData -or $idBound -or $classBound)) {
      $buttonCandidates.Add([pscustomobject]@{ screen = $screen; file = $file.Name; label = $label; id = $id; classes = ($classes -join ' ') })
    }
  }
}

$flowManifest = Get-Content -LiteralPath $flowPath -Raw | ConvertFrom-Json
$flowIssues = [System.Collections.Generic.List[object]]::new()
$flowNodeCount = 0
foreach ($flow in $flowManifest.flows) {
  foreach ($node in $flow.nodes) {
    $flowNodeCount++
    $clean = ($node.file -split '[?#]')[0]
    $resolved = Join-Path $Root $clean
    if (-not (Test-Path -LiteralPath $resolved)) {
      $flowIssues.Add([pscustomobject]@{ flow = $flow.id; screen = $node.screen; issue = 'Missing node file'; file = $node.file })
    }
    if ($node.approval -ne 'approved-and-frozen') {
      $flowIssues.Add([pscustomobject]@{ flow = $flow.id; screen = $node.screen; issue = 'Node not approved'; file = $node.file })
    }
  }
}

$economics = Get-Content -LiteralPath $economicsPath -Raw | ConvertFrom-Json
$economicsIssues = [System.Collections.Generic.List[object]]::new()
foreach ($engine in $economics.engines) {
  foreach ($property in @('creatorEntry','consumerEntry','adminEntry','ledgerEntry')) {
    $target = $engine.$property
    if (-not $target) { continue }
    $clean = ($target -split '[?#]')[0]
    if (-not (Test-Path -LiteralPath (Join-Path $Root $clean))) {
      $economicsIssues.Add([pscustomobject]@{ engine = $engine.id; surface = $property; target = $target })
    }
  }
  foreach ($target in @($engine.businessEntries)) {
    $clean = ($target -split '[?#]')[0]
    if (-not (Test-Path -LiteralPath (Join-Path $Root $clean))) {
      $economicsIssues.Add([pscustomobject]@{ engine = $engine.id; surface = 'businessEntry'; target = $target })
    }
  }
}

$result = [pscustomobject][ordered]@{
  generatedAt = (Get-Date).ToString('o')
  status = if ($missingTargets.Count + $missingAssets.Count + $contractIssues.Count + $flowIssues.Count + $economicsIssues.Count -eq 0) { 'passed' } else { 'failed' }
  screens = $screens.Count
  approvedScreens = @(Get-ChildItem -LiteralPath $approvedRoot -Filter '*.html').Count
  operationalFlows = $flowManifest.operationalFlowCount
  flowNodesChecked = $flowNodeCount
  localNavigationTargetsChecked = $targetChecks
  localAssetsChecked = $assetChecks
  buttonsIndexed = $buttonCount
  staticButtonCandidatesForBrowserTapTest = $buttonCandidates.Count
  missingTargets = @($missingTargets)
  missingAssets = @($missingAssets)
  contractIssues = @($contractIssues)
  flowIssues = @($flowIssues)
  creatorEconomicsIssues = @($economicsIssues)
  browserTapReport = 'quality/generated/flow-browser-tap-audit.json'
}

$jsonPath = Join-Path $outputRoot 'flow-static-audit.json'
$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $jsonPath -Encoding utf8

$markdown = @"
# Prototype Flow Static Audit

- Status: **$($result.status)**
- Screens: **$($result.screens)** source / **$($result.approvedScreens)** approved
- Operational flows: **$($result.operationalFlows)**
- Flow nodes checked: **$($result.flowNodesChecked)**
- Local navigation targets checked: **$($result.localNavigationTargetsChecked)**
- Local assets checked: **$($result.localAssetsChecked)**
- Buttons indexed for browser testing: **$($result.buttonsIndexed)**
- Static button candidates requiring tap confirmation: **$($result.staticButtonCandidatesForBrowserTapTest)**
- Missing navigation targets: **$($result.missingTargets.Count)**
- Missing assets: **$($result.missingAssets.Count)**
- Machine-contract issues: **$($result.contractIssues.Count)**
- Flow-manifest issues: **$($result.flowIssues.Count)**
- Creator-economics contract issues: **$($result.creatorEconomicsIssues.Count)**

The static audit proves local target existence, approved flow-node integrity, required embedded production contracts and all eight creator-economics surface targets. Browser tap behavior is recorded separately in `flow-browser-tap-audit.json`.
"@
$markdown | Set-Content -LiteralPath (Join-Path $outputRoot 'flow-static-audit.md') -Encoding utf8

$result
