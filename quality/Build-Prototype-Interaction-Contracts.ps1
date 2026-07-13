param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$backlogPath = Join-Path $Root 'quality\generated\flow-interaction-backlog.json'
$auditPath = Join-Path $Root 'quality\generated\flow-browser-tap-audit.json'
$overridePath = Join-Path $Root 'quality\interaction-route-overrides.json'
$supplementalPath = Join-Path $Root 'quality\interaction-supplemental-contracts.json'
$flowPath = Join-Path $Root 'flows\approved-flows.json'
$sourceOutput = Join-Path $Root 'shared\prototype-interaction-contracts.js'
$approvedOutput = Join-Path $Root 'approved-final\shared\prototype-interaction-contracts.js'
$screenMapOutput = Join-Path $Root 'shared\prototype-screen-files.js'
$approvedScreenMapOutput = Join-Path $Root 'approved-final\shared\prototype-screen-files.js'

$backlog = Get-Content -Raw -LiteralPath $backlogPath | ConvertFrom-Json
$audit = Get-Content -Raw -LiteralPath $auditPath | ConvertFrom-Json
$overrides = Get-Content -Raw -LiteralPath $overridePath | ConvertFrom-Json
$overrideMap = @{}
foreach ($entry in @($overrides.entries)) {
  $overrideMap["$($entry.screen)|$($entry.label)"] = $entry
}

$fileByScreen = @{}
Get-ChildItem -LiteralPath (Join-Path $Root 'screens') -Filter '*.html' | ForEach-Object {
  if ($_.Name -match '^(\d{2,3})-') { $fileByScreen[[int]$Matches[1]] = $_.Name }
}
$previousByScreen = @{}
$flows = Get-Content -Raw -LiteralPath $flowPath | ConvertFrom-Json
foreach ($flow in @($flows.flows)) {
  foreach ($node in @($flow.nodes)) {
    if ($null -eq $node.previousScreen -or [string]::IsNullOrWhiteSpace([string]$node.previousScreen)) { continue }
    $screenNumber = [int]$node.screen
    $previousNumber = [int]$node.previousScreen
    if (-not $previousByScreen.ContainsKey($screenNumber) -and $fileByScreen.ContainsKey($previousNumber)) {
      $previousByScreen[$screenNumber] = $fileByScreen[$previousNumber]
    }
  }
}

function Resolve-ContractType {
  param([object]$Ticket)

  $label = ([string]$Ticket.label).Trim()
  $lower = $label.ToLowerInvariant()

  if ($lower -match '^(back|go back|return|close and return|back to)\b') { return 'back' }
  if ($lower -eq 'mool' -or $lower -eq 'open mool') { return 'route-mool' }
  if ($lower -eq 'chat' -or $lower -match '^open chat') { return 'route-chat' }
  if ($lower -match 'search|scan|voice|camera|call|upload|download|zoom|location|map|share|qr') { return 'handoff' }
  if ($Ticket.resolutionClass -eq 'journey_or_money_action') { return 'progress' }
  if ($Ticket.resolutionClass -eq 'user_tool_or_handoff') { return 'detail' }
  return 'select'
}

function Get-Note {
  param([object]$Ticket, [string]$Type)

  switch ($Type) {
    'handoff' { return "$($Ticket.label) opened. Close this panel to return without losing your place." }
    'progress' { return "$($Ticket.label) is selected. Review the shown state before continuing." }
    'detail' { return "$($Ticket.label) details are open. Your current screen state is preserved." }
    default { return "$($Ticket.label) selected." }
  }
}

$ticketMap = [ordered]@{}
foreach ($ticket in @($backlog.tickets)) {
  $ticketMap["$($ticket.screen)|$($ticket.label)"] = $ticket
}
foreach ($screenResult in @($audit.screens)) {
  $ordinal = 0
  foreach ($issue in @($screenResult.issues)) {
    $ordinal++
    $key = "$($screenResult.screen)|$($issue.label)"
    if ($ticketMap.Contains($key)) { continue }
    $label = ([string]$issue.label).Trim().ToLowerInvariant()
    if ($label -match 'install|continue|sign.?in|login|otp|location|pay|confirm|place order|checkout|apply|accept|submit|publish|release|refund|complete|buy|book|start trip|end trip|add to|save changes|create workspace') {
      $priority = 'P0'; $resolutionClass = 'journey_or_money_action'
    } elseif ($label -match 'search|scan|voice|chat|call|share|like|remix|follow|message|open|upload|camera|proof|download|receipt|support') {
      $priority = 'P1'; $resolutionClass = 'user_tool_or_handoff'
    } else {
      $priority = 'P2'; $resolutionClass = 'selection_or_secondary_action'
    }
    $ticketMap[$key] = [pscustomobject]@{
      id = ('INT-{0:D3}-{1:D2}' -f [int]$screenResult.screen, $ordinal)
      screen = [int]$screenResult.screen
      file = [string]$screenResult.file
      label = [string]$issue.label
      tag = [string]$issue.tag
      priority = $priority
      resolutionClass = $resolutionClass
    }
  }
}

$contracts = [ordered]@{}
foreach ($ticket in @($ticketMap.Values)) {
  $screenKey = [string][int]$ticket.screen
  if (-not $contracts.Contains($screenKey)) { $contracts[$screenKey] = [ordered]@{} }
  $label = [string]$ticket.label
  if ($contracts[$screenKey].Contains($label)) { continue }

  $type = Resolve-ContractType -Ticket $ticket
  $contract = [ordered]@{
    type = $type
    priority = [string]$ticket.priority
    ticket = [string]$ticket.id
    note = Get-Note -Ticket $ticket -Type $type
  }

  if ($type -eq 'back' -and $previousByScreen.ContainsKey([int]$ticket.screen)) {
    $contract.fallback = $previousByScreen[[int]$ticket.screen]
  }

  if ($type -eq 'route-mool') {
    $contract.type = 'route'
    $contract.route = '04-universal-focus-shell.html'
  } elseif ($type -eq 'route-chat') {
    $contract.type = 'route'
    $contract.route = '23-chat-inbox-home.html'
  }

  $overrideKey = "$screenKey|$label"
  if ($overrideMap.ContainsKey($overrideKey)) {
    $override = $overrideMap[$overrideKey]
    foreach ($property in $override.PSObject.Properties) {
      if ($property.Name -in @('screen', 'label')) { continue }
      $contract[$property.Name] = $property.Value
    }
  }

  $contracts[$screenKey][$label] = $contract
}

$supplemental = Get-Content -Raw -LiteralPath $supplementalPath | ConvertFrom-Json
foreach ($entry in @($supplemental.entries)) {
  $screenKey = [string][int]$entry.screen
  if (-not $contracts.Contains($screenKey)) { $contracts[$screenKey] = [ordered]@{} }
  $contract = [ordered]@{}
  foreach ($property in $entry.PSObject.Properties) {
    if ($property.Name -in @('screen', 'label')) { continue }
    $contract[$property.Name] = $property.Value
  }
  $contract.ticket = "SUP-$screenKey-$($contracts[$screenKey].Count + 1)"
  $contracts[$screenKey][[string]$entry.label] = $contract
}

$payload = [ordered]@{
  version = 'prototype-interaction-contracts-2026-07-13'
  source = 'quality/generated/flow-interaction-backlog.json'
  rule = 'Only exact screen and normalized accessible-label matches may be handled.'
  screens = $contracts
}
$json = $payload | ConvertTo-Json -Depth 12 -Compress
$javascript = "window.MoolPrototypeInteractionContracts = $json;`n"
[IO.File]::WriteAllText($sourceOutput, $javascript, [Text.UTF8Encoding]::new($false))
[IO.File]::WriteAllText($approvedOutput, $javascript, [Text.UTF8Encoding]::new($false))

$orderedScreenFiles = [ordered]@{}
foreach ($key in ($fileByScreen.Keys | Sort-Object)) { $orderedScreenFiles[[string]$key] = $fileByScreen[$key] }
$screenMapJson = $orderedScreenFiles | ConvertTo-Json -Compress
$screenMapJavascript = "window.__MOOL_SCREEN_FILES__ = $screenMapJson;`n"
[IO.File]::WriteAllText($screenMapOutput, $screenMapJavascript, [Text.UTF8Encoding]::new($false))
[IO.File]::WriteAllText($approvedScreenMapOutput, $screenMapJavascript, [Text.UTF8Encoding]::new($false))

$uniqueCount = 0
foreach ($screen in $contracts.Values) { $uniqueCount += $screen.Count }
Write-Output "Generated $uniqueCount explicit contracts across $($contracts.Count) screens."
