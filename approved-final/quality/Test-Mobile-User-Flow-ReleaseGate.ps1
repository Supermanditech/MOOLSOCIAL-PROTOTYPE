param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

$paths = [ordered]@{
  staticAudit = Join-Path $Root 'quality\generated\flow-static-audit.json'
  flowValidation = Join-Path $Root 'flows\flow-validation.json'
  interactionBacklog = Join-Path $Root 'quality\generated\flow-interaction-backlog.json'
  finalTapAudit = Join-Path $Root 'quality\generated\flow-browser-tap-final.json'
  finalMobileAudit = Join-Path $Root 'quality\generated\mobile-user-flow-final.json'
  semanticMobileAudit = Join-Path $Root 'quality\generated\semantic-mobile-user-flow-final.json'
  intentCompletionAudit = Join-Path $Root 'quality\generated\intent-completion-audit.json'
  intentCompletionReplay = Join-Path $Root 'quality\generated\intent-completion-resolved-replay.json'
}

$blockers = [System.Collections.Generic.List[string]]::new()

function Read-RequiredJson([string]$Name, [string]$Path) {
  if (-not (Test-Path -LiteralPath $Path)) {
    $blockers.Add("Missing ${Name}: $Path")
    return $null
  }
  try {
    return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json
  } catch {
    $blockers.Add("Invalid $Name JSON: $Path")
    return $null
  }
}

$static = Read-RequiredJson 'static flow audit' $paths.staticAudit
$flows = Read-RequiredJson 'flow validation' $paths.flowValidation
$backlog = Read-RequiredJson 'interaction backlog' $paths.interactionBacklog
$tap = Read-RequiredJson 'final strict tap audit' $paths.finalTapAudit
$mobile = Read-RequiredJson 'final mobile user-flow audit' $paths.finalMobileAudit
$semantic = Read-RequiredJson 'semantic mobile user-flow audit' $paths.semanticMobileAudit
$intent = Read-RequiredJson 'intent completion audit' $paths.intentCompletionAudit
$intentReplay = Read-RequiredJson 'intent completion resolved replay' $paths.intentCompletionReplay

if ($static -and $static.status -ne 'passed') {
  $blockers.Add('Static route, asset or contract audit has not passed.')
}
if ($static) {
  foreach ($field in @('missingTargets','missingAssets','contractIssues','flowIssues','creatorEconomicsIssues')) {
    if (@($static.$field).Count -gt 0) {
      $blockers.Add("Static audit contains $field.")
    }
  }
}

if ($flows -and $flows.status -ne 'passed') {
  $blockers.Add('Operational flow validation has not passed.')
}
if ($flows -and ([int]$flows.coveredScreenCount -ne [int]$flows.approvedScreenCount -or @($flows.missingScreens).Count -gt 0)) {
  $blockers.Add('Operational flow coverage is incomplete.')
}

if ($backlog -and [int]$backlog.summary.total -ne 0) {
  $blockers.Add("Interaction backlog still has $($backlog.summary.total) open controls.")
}

if ($tap) {
  if ([int]$tap.summary.failed -ne 0) {
    $blockers.Add("Final strict tap audit has $($tap.summary.failed) failed controls.")
  }
  if ([int]$tap.summary.skipped -ne 0) {
    $blockers.Add("Final strict tap audit has $($tap.summary.skipped) skipped controls.")
  }
  if ([int]$tap.summary.screens -ne [int]$flows.approvedScreenCount) {
    $blockers.Add('Final strict tap audit does not cover every approved screen.')
  }
}

if ($mobile) {
  if ($mobile.status -ne 'passed') {
    $blockers.Add('Final mobile user-flow audit has not passed.')
  }
  foreach ($field in @('loadErrors','consoleErrors','horizontalOverflows','deadEnds','wrongParameters','brokenBackPaths','brokenCrossWorkspaceTransitions')) {
    if ([int]$mobile.summary.$field -ne 0) {
      $blockers.Add("Final mobile user-flow audit contains $field.")
    }
  }
  if ([int]$mobile.summary.operationalFlowsTested -ne [int]$flows.operationalFlowCount) {
    $blockers.Add('Final mobile audit does not cover every operational flow.')
  }
}

if ($semantic) {
  if ($semantic.status -ne 'passed') {
    $blockers.Add('Semantic mobile user-flow audit has not passed.')
  }
  if ([int]$semantic.summary.operationalFlowsTested -ne [int]$flows.operationalFlowCount) {
    $blockers.Add('Semantic mobile audit does not cover every operational flow.')
  }
  if ([int]$semantic.summary.passed -ne [int]$flows.operationalFlowCount -or [int]$semantic.summary.failed -ne 0) {
    $blockers.Add('Semantic mobile audit contains failed or incomplete flows.')
  }
  if ([int]$semantic.summary.consoleErrors -ne 0) {
    $blockers.Add('Semantic mobile audit contains browser console errors.')
  }
}

if ($intent) {
  if ($intent.summary.status -ne 'passed' -or [int]$intent.summary.unresolved -ne 0) {
    $blockers.Add("Intent completion audit has $($intent.summary.unresolved) unresolved high-intent controls.")
  }
  if ([int]$intent.summary.explicitlyResolved -ne [int]$intent.summary.highIntentControlsChecked) {
    $blockers.Add('Intent completion declarations do not cover every high-intent control.')
  }
}

if ($intentReplay) {
  if (-not $intentReplay.complete -or [int]$intentReplay.summary.failed -ne 0 -or [int]$intentReplay.summary.genericFallbacks -ne 0 -or [int]$intentReplay.summary.dead -ne 0 -or [int]$intentReplay.summary.errors -ne 0) {
    $blockers.Add('Curated intent outcomes have failed, generic, dead or untested controls.')
  }
}

$result = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  status = if ($blockers.Count -eq 0) { 'ready' } else { 'blocked' }
  finalMobileTestingLinkMayBeShared = ($blockers.Count -eq 0)
  approvedScreens = if ($flows) { [int]$flows.approvedScreenCount } else { 0 }
  operationalFlows = if ($flows) { [int]$flows.operationalFlowCount } else { 0 }
  semanticFlows = if ($semantic) { [int]$semantic.summary.passed } else { 0 }
  strictInteractions = if ($tap) { [int]$tap.summary.tested } else { 0 }
  highIntentControls = if ($intent) { [int]$intent.summary.highIntentControlsChecked } else { 0 }
  curatedIntentOutcomes = if ($intentReplay) { [int]$intentReplay.summary.passed } else { 0 }
  openInteractions = if ($backlog) { [int]$backlog.summary.total } else { -1 }
  blockers = @($blockers)
  rule = 'Do not give the user a final mobile app testing link until this gate returns ready.'
}

$result | ConvertTo-Json -Depth 6
if ($blockers.Count -gt 0) {
  exit 1
}
