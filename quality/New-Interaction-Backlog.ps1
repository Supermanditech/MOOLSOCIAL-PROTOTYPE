param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

$auditPath = Join-Path $Root 'quality\generated\flow-browser-tap-audit.json'
$verifiedPath = Join-Path $Root 'quality\verified-interactions.json'
$outputJson = Join-Path $Root 'quality\generated\flow-interaction-backlog.json'
$outputMd = Join-Path $Root 'quality\generated\flow-interaction-backlog.md'

if (-not (Test-Path -LiteralPath $auditPath)) {
  throw "Browser tap audit not found: $auditPath"
}

$audit = Get-Content -Raw -LiteralPath $auditPath | ConvertFrom-Json
$tickets = [System.Collections.Generic.List[object]]::new()
$verified = @()
$verifiedKeys = @{}
if (Test-Path -LiteralPath $verifiedPath) {
  $verified = @((Get-Content -Raw -LiteralPath $verifiedPath | ConvertFrom-Json).interactions)
  foreach ($item in $verified) {
    if ($item.status -eq 'verified') {
      $verifiedKeys["$($item.screen)|$($item.label)"] = $true
    }
  }
}

function Get-ResolutionClass {
  param([string]$Label)

  $value = ($Label ?? '').Trim().ToLowerInvariant()
  if ($value -match 'install|continue|sign.?in|login|otp|location|pay|confirm|place order|checkout|apply|accept|submit|publish|release|refund|complete|buy|book|start trip|end trip|add to|save changes|create workspace') {
    return @{ priority = 'P0'; class = 'journey_or_money_action'; requirement = 'Must navigate or show the next progressive state with preserved context and an explicit failure/retry path.' }
  }
  if ($value -match 'search|scan|voice|chat|call|share|like|remix|follow|message|open|upload|camera|proof|download|receipt|support') {
    return @{ priority = 'P1'; class = 'user_tool_or_handoff'; requirement = 'Must open its tool, sheet, route or governed device/integration handoff and define the return state.' }
  }
  return @{ priority = 'P2'; class = 'selection_or_secondary_action'; requirement = 'Must visibly select, filter, expand, toggle or explain that the current state is already selected.' }
}

foreach ($screen in $audit.screens) {
  $ordinal = 0
  foreach ($issue in @($screen.issues)) {
    $ordinal += 1
    if ($verifiedKeys.ContainsKey("$($screen.screen)|$($issue.label)")) {
      continue
    }
    $rule = Get-ResolutionClass -Label $issue.label
    $tickets.Add([pscustomobject]@{
      id = ('INT-{0:D3}-{1:D2}' -f [int]$screen.screen, $ordinal)
      screen = [int]$screen.screen
      file = [string]$screen.file
      label = [string]$issue.label
      tag = [string]$issue.tag
      detectedError = [string]$issue.error
      priority = $rule.priority
      resolutionClass = $rule.class
      acceptance = $rule.requirement
      status = 'open'
      owner = 'flow_review'
    })
  }
}

$summary = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  sourceAudit = 'quality/generated/flow-browser-tap-audit.json'
  verifiedEvidence = 'quality/verified-interactions.json'
  baselineFailed = [int]$audit.summary.failed
  verifiedClosed = $verifiedKeys.Count
  total = $tickets.Count
  p0 = @($tickets | Where-Object priority -eq 'P0').Count
  p1 = @($tickets | Where-Object priority -eq 'P1').Count
  p2 = @($tickets | Where-Object priority -eq 'P2').Count
  screens = @($tickets | Select-Object -ExpandProperty screen -Unique).Count
  rule = 'A ticket closes only after a clean browser tap proves navigation, observable state, or an explicit governed external handoff.'
}

[ordered]@{
  summary = $summary
  verified = $verified
  tickets = $tickets
} | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $outputJson -Encoding utf8

$lines = [System.Collections.Generic.List[string]]::new()
$lines.Add('# Prototype Interaction Backlog')
$lines.Add('')
$lines.Add("Generated: $($summary.generatedAt)")
$lines.Add('')
$lines.Add("Open controls: **$($summary.total)** across **$($summary.screens)** screens. P0: **$($summary.p0)**, P1: **$($summary.p1)**, P2: **$($summary.p2)**.")
$lines.Add('')
$lines.Add('A control closes only after a clean browser tap proves navigation, observable state, or an explicit governed external/device handoff. Generic fallback clicks are prohibited.')
$lines.Add('')

foreach ($group in ($tickets | Group-Object screen | Sort-Object { [int]$_.Name })) {
  $first = $group.Group[0]
  $lines.Add("## Screen $($first.screen): $($first.file)")
  $lines.Add('')
  foreach ($ticket in $group.Group) {
    $label = if ([string]::IsNullOrWhiteSpace($ticket.label)) { '[unlabelled control]' } else { $ticket.label.Replace("`r", ' ').Replace("`n", ' ') }
    $lines.Add("- **$($ticket.id) · $($ticket.priority)** `$label` - $($ticket.acceptance)")
  }
  $lines.Add('')
}

$lines | Set-Content -LiteralPath $outputMd -Encoding utf8

Write-Output ($summary | ConvertTo-Json -Compress)
