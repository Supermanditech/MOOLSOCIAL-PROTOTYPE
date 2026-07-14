param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

function Read-Audit([string]$RelativePath) {
  $path = Join-Path $Root $RelativePath
  if (-not (Test-Path -LiteralPath $path)) { throw "Missing audit: $RelativePath" }
  return Get-Content -Raw -LiteralPath $path | ConvertFrom-Json
}

$semantic = Read-Audit 'quality\generated\semantic-mobile-user-flow-final.json'
$strict = Read-Audit 'quality\generated\flow-browser-tap-final.json'
$static = Read-Audit 'quality\generated\flow-static-audit.json'
$validation = Read-Audit 'flows\flow-validation.json'

$semanticFailed = [int]$semantic.summary.failed
$tapFailed = [int]$strict.summary.failed + [int]$strict.summary.skipped
$loadErrors = if ([int]$strict.summary.screens -eq [int]$validation.approvedScreenCount) { 0 } else { [math]::Abs([int]$validation.approvedScreenCount - [int]$strict.summary.screens) }
$staticIssues = @($static.missingTargets).Count + @($static.missingAssets).Count + @($static.contractIssues).Count + @($static.flowIssues).Count
$horizontalOverflows = [int]$semantic.summary.horizontalOverflows
$consoleErrors = [int]$semantic.summary.consoleErrors
$passed = $semantic.status -eq 'passed' -and $semanticFailed -eq 0 -and $tapFailed -eq 0 -and $loadErrors -eq 0 -and $static.status -eq 'passed' -and $staticIssues -eq 0 -and $horizontalOverflows -eq 0 -and $consoleErrors -eq 0

$flowRows = foreach ($flow in @($semantic.flows)) {
  [ordered]@{
    flow = $flow.flow
    status = $flow.status
    steps = [int]$flow.interactionTurns
    expectedNodes = [int]$flow.expectedNodes
    screensSeen = @($flow.screensSeen)
    horizontalOverflows = @($flow.horizontalOverflows).Count
    error = $flow.error
  }
}

$smokeIds = @('onboarding','ride','creator-commerce-share','shared-controls')
$bundleSmoke = foreach ($id in $smokeIds) {
  $flow = @($semantic.flows | Where-Object flow -eq $id)[0]
  [ordered]@{ flow = $id; pass = ($flow -and $flow.status -eq 'passed') }
}

$report = [ordered]@{
  version = 'mobile-user-flow-audit-2026-07-14-v2'
  generatedAt = (Get-Date).ToString('o')
  status = if ($passed) { 'passed' } else { 'failed' }
  viewport = $semantic.viewport
  runner = 'Semantic highlighted-control replay plus strict per-control replay and static route/asset audit'
  evidence = [ordered]@{
    semantic = 'quality/generated/semantic-mobile-user-flow-final.json'
    strictControls = 'quality/generated/flow-browser-tap-final.json'
    staticRoutes = 'quality/generated/flow-static-audit.json'
  }
  summary = [ordered]@{
    operationalFlowsTested = [int]$semantic.summary.operationalFlowsTested
    approvedScreensRendered = [int]$strict.summary.screens
    strictControlsTested = [int]$strict.summary.tested
    loadErrors = $loadErrors
    consoleErrors = $consoleErrors
    horizontalOverflows = $horizontalOverflows
    deadEnds = $semanticFailed + $tapFailed
    wrongParameters = @($static.flowIssues).Count
    brokenBackPaths = @($static.flowIssues | Where-Object { $_ -match 'back|previous' }).Count
    brokenCrossWorkspaceTransitions = @($static.missingTargets).Count
  }
  bundleSmoke = @($bundleSmoke)
  flows = @($flowRows)
  failures = @($flowRows | Where-Object status -ne 'passed')
}

$path = Join-Path $Root 'quality\generated\mobile-user-flow-final.json'
$report | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $path -Encoding utf8
$report | ConvertTo-Json -Depth 6

if (-not $passed) { exit 1 }
