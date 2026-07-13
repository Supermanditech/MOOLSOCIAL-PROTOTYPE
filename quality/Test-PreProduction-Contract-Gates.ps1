param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$blockers = [System.Collections.Generic.List[string]]::new()

function Read-RequiredJson([string]$RelativePath) {
  $path = Join-Path $Root $RelativePath
  if (-not (Test-Path -LiteralPath $path)) {
    $blockers.Add("Missing JSON contract: $RelativePath")
    return $null
  }
  try {
    return Get-Content -Raw -LiteralPath $path | ConvertFrom-Json
  } catch {
    $blockers.Add("Invalid JSON contract: $RelativePath")
    return $null
  }
}

function Require-File([string]$RelativePath, [string[]]$RequiredText = @()) {
  $path = Join-Path $Root $RelativePath
  if (-not (Test-Path -LiteralPath $path)) {
    $blockers.Add("Missing required artifact: $RelativePath")
    return
  }
  if ($RequiredText.Count -gt 0) {
    $content = Get-Content -Raw -LiteralPath $path
    foreach ($needle in $RequiredText) {
      if ($content -notmatch [regex]::Escape($needle)) {
        $blockers.Add("$RelativePath is missing required contract text: $needle")
      }
    }
  }
}

$ui = Read-RequiredJson 'shared\production-ui-state-contract.json'
$logic = Read-RequiredJson 'shared\mvp-business-logic-contract.json'
$economics = Read-RequiredJson 'shared\workspace-economics-contract.json'
$tokens = Read-RequiredJson 'shared\production-design-tokens.json'
$components = Read-RequiredJson 'shared\production-component-registry.json'
$webhooks = Read-RequiredJson 'contracts\webhooks\webhook-contract-v1.json'
$mocks = Read-RequiredJson 'contracts\mocks\mvp-integration-mocks.json'
$regression = Read-RequiredJson 'quality\regression-manifest.json'

if ($ui -and $ui.status -ne 'frozen-for-production-planning') { $blockers.Add('Production UI state contract is not frozen.') }
if ($ui -and ([int]$ui.appliesTo.approvedPrototypeScreens -ne 166 -or [int]$ui.appliesTo.operationalFlows -ne 47)) { $blockers.Add('Production UI contract coverage is not 166 screens and 47 flows.') }
if ($logic -and $logic.status -ne 'frozen-for-production-planning') { $blockers.Add('Business logic contract is not frozen.') }
if ($logic -and @($logic.globalInvariants).Count -lt 8) { $blockers.Add('Business logic invariants are incomplete.') }
if ($economics -and $economics.contractVersion -notlike 'workspace-economics-v2*') { $blockers.Add('Workspace economics v2 is required.') }
if ($economics -and @($economics.sourcePolicies.PSObject.Properties).Count -lt 13) { $blockers.Add('Workspace economics source policies are incomplete.') }
if ($tokens -and $tokens.status -ne 'frozen-for-production-planning') { $blockers.Add('Production design tokens are not frozen.') }
if ($components -and @($components.components.PSObject.Properties).Count -lt 20) { $blockers.Add('Production component registry is incomplete.') }
if ($webhooks -and $webhooks.delivery.maximumAttempts -lt 2) { $blockers.Add('Webhook retry behavior is incomplete.') }
if ($mocks -and @($mocks.scenarios.PSObject.Properties).Count -lt 8) { $blockers.Add('Integration failure mocks are incomplete.') }
if ($regression -and [int]$regression.prototypeBaseline.operationalFlows -ne 47) { $blockers.Add('Regression manifest does not cover all 47 flows.') }

Require-File 'contracts\openapi\moolsocial-mvp-v1.yaml' @('openapi: 3.1.0', 'Idempotency-Key', 'application/problem+json', '/v1/orders:', '/v1/rides:', '/v1/economics/ledger:')
Require-File 'contracts\events\moolsocial-events-v1.yaml' @('asyncapi: 3.0.0', 'order.status.changed', 'payment.status.changed', 'earning.ledger.posted', 'agent.approval.requested')

foreach ($doc in @(
  'architecture\PRODUCTION-UIUX-REVIEW-FREEZE.md',
  'architecture\MVP-BUSINESS-LOGIC-FREEZE.md',
  'architecture\MVP-WORKSPACE-ECONOMICS-FREEZE.md',
  'architecture\PRODUCTION-DESIGN-SYSTEM-FREEZE.md',
  'architecture\MVP-API-CONTRACT-FREEZE.md',
  'architecture\REGRESSION-QUALITY-AND-RELEASE-FREEZE.md'
)) {
  Require-File $doc
}

$releaseScript = Join-Path $Root 'quality\Test-Mobile-User-Flow-ReleaseGate.ps1'
if (-not (Test-Path -LiteralPath $releaseScript)) {
  $blockers.Add('Missing mobile user-flow release gate.')
  $mobileGate = $null
} else {
  try {
    $mobileGate = (& $releaseScript -Root $Root | Out-String) | ConvertFrom-Json
    if ($mobileGate.status -ne 'ready') { $blockers.Add('Mobile user-flow release gate is not ready.') }
  } catch {
    $blockers.Add('Mobile user-flow release gate failed to execute.')
    $mobileGate = $null
  }
}

$result = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  status = if ($blockers.Count -eq 0) { 'ready' } else { 'blocked' }
  completedRequestedSteps = @(1, 2, 3, 4, 5, 7, 9)
  excludedByUser = @(
    '6 - domain and database architecture',
    '8 - security and compliance',
    '10 - production tickets'
  )
  approvedScreens = if ($mobileGate) { [int]$mobileGate.approvedScreens } else { 0 }
  operationalFlows = if ($mobileGate) { [int]$mobileGate.operationalFlows } else { 0 }
  strictInteractions = 3190
  openInteractions = if ($mobileGate) { [int]$mobileGate.openInteractions } else { -1 }
  contractArtifacts = 8
  productionComponents = if ($components) { @($components.components.PSObject.Properties).Count } else { 0 }
  economicsPolicies = if ($economics) { @($economics.sourcePolicies.PSObject.Properties).Count } else { 0 }
  blockers = @($blockers)
  finalMobileTestingLinkMayBeShared = ($blockers.Count -eq 0 -and $mobileGate -and $mobileGate.finalMobileTestingLinkMayBeShared)
}

$generatedDir = Join-Path $Root 'quality\generated'
if (-not (Test-Path -LiteralPath $generatedDir)) { New-Item -ItemType Directory -Path $generatedDir | Out-Null }
$outputPath = Join-Path $generatedDir 'pre-production-contract-gate.json'
$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $outputPath -Encoding utf8
$result | ConvertTo-Json -Depth 8

if ($blockers.Count -gt 0) { exit 1 }
