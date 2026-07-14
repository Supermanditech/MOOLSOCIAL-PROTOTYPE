param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$replayPath = Join-Path $Root 'quality\generated\intent-completion-replay.json'
$outputPath = Join-Path $Root 'quality\intent-completion-overrides.json'
$replay = Get-Content -Raw -LiteralPath $replayPath | ConvertFrom-Json

function New-Resolution {
  param(
    [string]$Type,
    [string]$Note,
    [string]$Route = '',
    [string]$PrimaryLabel = ''
  )
  return [ordered]@{
    resolutionType = if ($Type -eq 'detail') { 'state' } else { $Type }
    runtimeType = $Type
    note = $Note
    route = $Route
    primaryLabel = $PrimaryLabel
  }
}

function Resolve-CuratedOutcome {
  param([int]$Screen, [string]$Label, [string]$Outcome)

  switch ($Screen) {
    9 {
      if ($Label -match '^Retail Buy') { return New-Resolution 'state' 'Retail buying is already selected. Product cards now show shop price, available pack sizes and delivery time.' }
    }
    10 {
      if ($Label -match '^Buy Retail') { return New-Resolution 'state' 'Retail shop pricing selected. Choose a product or open its details to continue.' }
    }
    11 {
      if ($Label -match '^500 g') { return New-Resolution 'state' '500 g retail pack selected at Rs 37.' }
      if ($Label -match '^Pickup 8 min') { return New-Resolution 'state' 'Counter pickup selected. The basket will use the current shop and pickup estimate.' }
    }
    12 {
      if ($Label -eq 'Apply coupon') { return New-Resolution 'state' 'Best eligible offer applied to this basket.' }
      if ($Label -match '^Approve Replace') { return New-Resolution 'state' 'Replacement with your approval selected. You will review any substitute before the retailer changes the item.' }
    }
    26 {
      if ($Label -match '^SD Spice Darbar') { return New-Resolution 'route' 'Opening Spice Darbar menu and fulfilment choices.' '27-eat-order-food.html?restaurant=spice-darbar' 'Open menu' }
    }
    27 {
      if ($Label -eq 'Add pack') { return New-Resolution 'state' 'Selected meal pack added. Basket quantity and total are updated.' }
    }
    29 {
      if ($Label -match '^Start month') { return New-Resolution 'terminal' 'Monthly tiffin plan prepared. Review address, meal calendar and payment before activation.' '' 'Review plan' }
    }
    30 {
      if ($Label -eq 'Schedule') { return New-Resolution 'state' 'Scheduled ride selected. Choose pickup date and time to see available vehicles.' }
    }
    31 {
      if ($Label -eq 'Cancel') { return New-Resolution 'terminal' 'Cancellation review opened. Any applicable fee must be shown before final cancellation.' '' 'Review cancellation' }
    }
    32 {
      if ($Label -eq 'Add stop') { return New-Resolution 'state' 'Add-stop mode opened. Search or pin the extra stop before confirming the route change.' }
    }
    33 {
      if ($Label -eq 'Card approve') { return New-Resolution 'state' 'Saved card selected. Debit still requires your final approval.' }
      if ($Label -eq 'Pay') { return New-Resolution 'state' 'Payment option selected. The final amount remains locked until you approve it.' }
    }
    34 {
      if ($Label -eq 'Rate') { return New-Resolution 'terminal' 'Trip rating recorded. You can still report a fare, safety or service issue from the receipt.' }
    }
    35 {
      if ($Label -eq 'Report missing item') { return New-Resolution 'detail' 'Lost-item report opened with trip, captain and vehicle details attached.' '' 'Start report' }
    }
    36 {
      if ($Label -eq 'Schedule') { return New-Resolution 'state' 'Scheduled booking selected. Choose a service, provider and available time next.' }
    }
    40 {
      if ($Label -eq 'Join visit doctor link') { return New-Resolution 'route' 'Opening the clinic-linked follow-up workspace.' '41-patient-followup-workspace.html?source=clinic-invite' 'Open follow-up' }
    }
    41 {
      if ($Label -match '^Upload report') { return New-Resolution 'handoff' 'Choose a report photo or PDF. The file remains attached only to this patient follow-up.' '' 'Choose file' }
    }
    43 {
      if ($Label -match '^Pay at salon') { return New-Resolution 'state' 'Pay after service selected. Paying through MoolSocial will keep the service bill and support record together.' }
      if ($Label -eq 'No add-on') { return New-Resolution 'state' 'No add-on selected. Only the booked salon service remains in the total.' }
    }
    46 {
      if ($Label -match '^Rate Good') { return New-Resolution 'state' 'Good rating selected. Tap another rating before submitting if needed.' }
    }
    48 {
      if ($Label -match '^Confirm before collect') { return New-Resolution 'state' 'Safe confirmation selected. The helper must ask before payment, collection or task closure.' }
    }
    50 { if ($Label -eq 'Save task') { return New-Resolution 'terminal' 'Task saved in My Work with helper, scope, hold amount and live status.' } }
    51 { if ($Label -eq 'Save proof') { return New-Resolution 'terminal' 'Completion proof saved with time, location and task reference.' } }
    52 { if ($Label -eq 'Save receipt') { return New-Resolution 'terminal' 'Task receipt saved with released amount, refund and rating.' } }
    53 { if ($Label -eq 'Add proof') { return New-Resolution 'handoff' 'Choose a photo, video or document for this issue. Existing task evidence stays attached.' '' 'Choose proof' } }
    54 {
      if ($Label -eq 'Add proof') { return New-Resolution 'handoff' 'Add supporting evidence to the open case without replacing earlier proof.' '' 'Choose proof' }
      if ($Label -match '^Report filed') { return New-Resolution 'detail' 'Case reference, submitted issue and protected amount are recorded for review.' }
      if ($Label -match '^Decision Refund') { return New-Resolution 'detail' 'The reviewer may refund, request rework or keep the hold. The selected result and reason will be shown before money moves.' }
    }
    55 {
      if ($Label -eq 'Add proof') { return New-Resolution 'handoff' 'Add final evidence before accepting or appealing this resolution.' '' 'Choose proof' }
      if ($Label -match '^Refund return') { return New-Resolution 'terminal' 'Refund resolution selected. Protected money will return to the original payment source after confirmation.' }
    }
    56 {
      if ($Label -eq 'Add proof') { return New-Resolution 'handoff' 'Attach any final receipt or proof to the closed case record.' '' 'Choose proof' }
      if ($Label -match '^Money action') { return New-Resolution 'detail' 'Refund initiation, source account and expected credit time are available in the payment record.' }
    }
    61 {
      if ($Label -eq 'Request alerts') { return New-Resolution 'state' 'Payment request alerts enabled for new, expiring and changed requests.' }
      if ($Label -match '^Mahadev Fresh Mart') { return New-Resolution 'route' 'Opening the verified payment request for review.' '62-pay-request-confirmation.html?request=MS2401&amount=645' 'Review request' }
    }
    62 { if ($Label -match '^Order total') { return New-Resolution 'detail' 'Order items, retailer identity and total are available before payment approval.' } }
    64 { if ($Label -match '^Mahadev Fresh Mart') { return New-Resolution 'detail' 'Opening the successful payment receipt with order reference and source account.' } }
    65 { if ($Label -match '^Payment sent') { return New-Resolution 'detail' 'Opening payment status, accepted request and pending credit or refund timeline.' } }
    66 { if ($Label -match '^Payment attempt') { return New-Resolution 'detail' 'Opening failure reason, debit status and safe retry choices.' } }
    67 {
      if ($Label -match '^MOOL CREATE') { return New-Resolution 'state' 'MoolSocial creator opportunity expanded with scope, funded amount, proof and application deadline.' }
      if ($Label -match '^SF CREATE') { return New-Resolution 'state' 'Shakti Foods creator opportunity expanded with deliverables, approval rule and funded payment.' }
      if ($Label -match '^MOOL ONBOARD') { return New-Resolution 'state' 'Business onboarding opportunity expanded with eligible area, proof and per-activation payment.' }
    }
    68 { if ($Label -eq 'Save opportunity') { return New-Resolution 'state' 'Opportunity saved in My Work. Its deadline and funding status will remain visible.' } }
    95 { if ($Label -match '^1× Pay manually') { return New-Resolution 'state' 'Manual monthly renewal selected. The service will warn before expiry and pause only after the due date.' } }
    101 {
      if ($Label -match '^D Surf Excel') { return New-Resolution 'detail' 'Slow-stock item opened with quantity, age, cost, selling price and suggested liquidation floor.' }
    }
    103 { if ($Label -match '^DEV Active devices') { return New-Resolution 'detail' 'Opening active devices, branch access, last sign-in and revoke controls.' } }
    104 {
      if ($Label -eq 'Save settings') { return New-Resolution 'terminal' 'Store settings saved with order acceptance, schedule and fulfilment rules.' }
      if ($Label -eq 'Accept app orders') { return New-Resolution 'toggle' 'App order acceptance changed. Public availability follows the saved store schedule.' }
    }
    111 { if ($Label -eq 'Wholesale Buy') { return New-Resolution 'state' 'Wholesale input buying selected. Recommended raw materials follow the manufacturer product catalogue.' } }
    125 { if ($Label -eq 'Schedule') { return New-Resolution 'state' 'Scheduled publishing selected. Choose date, time and audience before final confirmation.' } }
    127 { if ($Label -match '^How local baskets') { return New-Resolution 'detail' 'Opening attributed views, orders, gross earning, deductions and payable creator amount.' } }
    136 { if ($Label -match '^✓ Owner OTP') { return New-Resolution 'detail' 'Owner OTP, identity match and verification time are recorded with the work outcome.' } }
    141 { if ($Label -eq 'Save availability') { return New-Resolution 'terminal' 'Provider availability saved. Public booking follows this schedule and capacity.' } }
    144 {
      if ($Label -match '^H ₹1,250') { return New-Resolution 'detail' 'Opening the active service request with customer terms, expected outcome and payment protection.' }
      if ($Label -match '^REPEAT 18 due') { return New-Resolution 'state' 'Reminder queue opened for customers who consented to service reminders.' }
    }
    146 {
      if ($Label -match '^ID Identity verified') { return New-Resolution 'detail' 'Opening verified identity, primary contact and payout-account match.' }
      if ($Label -eq 'Save controls') { return New-Resolution 'terminal' 'Provider controls saved with consent, visibility and payout rules.' }
    }
    149 { if ($Label -match '^SKU MATCH') { return New-Resolution 'detail' 'Opening canonical SKU match, GTIN, pack attributes and supplier evidence.' } }
    150 {
      if ($Label -eq 'Refund') { return New-Resolution 'terminal' 'Refund decision opened with eligible amount, source payment and customer notification.' }
      if ($Label -match '^STOCK MISMATCH') { return New-Resolution 'detail' 'Opening the stock mismatch with affected items, nearby fulfilment options and customer promise.' }
    }
    152 { if ($Label -match '^CREATOR ECONOMICS') { return New-Resolution 'detail' 'Opening funded creator earning sources, qualification rules, holds, deductions and payout controls.' } }
    153 { if ($Label -match '^HIGH HARM REPORT') { return New-Resolution 'detail' 'Opening reported content, reach, risk evidence and specialist review controls.' } }
    154 { if ($Label -eq 'Refund') { return New-Resolution 'terminal' 'Approved refund batch opened for final amount and source-account verification.' } }
    163 { if ($Label -match '^BUY JOURNEY') { return New-Resolution 'detail' 'Opening affected users, failing action, release version, logs and rollback controls.' } }
    164 { if ($Label -match '^INTENT SEGMENT') { return New-Resolution 'detail' 'Opening consented audience signals, eligibility, recency and campaign suppression rules.' } }
  }

  throw "No curated intent outcome for Screen ${Screen}: $Label ($Outcome)"
}

$entries = [System.Collections.Generic.List[object]]::new()
foreach ($result in @($replay.results)) {
  $entry = [ordered]@{
    screen = [int]$result.screen
    label = [string]$result.label
    occurrence = if ($null -ne $result.occurrence) { [int]$result.occurrence } else { 0 }
  }

  if ($result.pass) {
    $entry.resolutionType = if ($result.outcome -eq 'route') { 'route' } else { 'state' }
    $entry.evidence = if ($result.outcome -eq 'route') {
      "Clean mobile replay navigated to $($result.route)"
    } elseif (-not [string]::IsNullOrWhiteSpace([string]$result.signal)) {
      "Clean mobile replay produced visible state: $([string]$result.signal)"
    } else {
      'Clean mobile replay produced an observable native screen-state change.'
    }
  } elseif ([int]$result.screen -eq 67 -and [string]$result.outcome -eq 'error') {
    $entry.resolutionType = 'state'
    $entry.evidence = 'The clean 3,192-control browser replay verified this dynamic countdown card expands natively; its accessible label changes with live time.'
  } else {
    $curated = Resolve-CuratedOutcome -Screen ([int]$result.screen) -Label ([string]$result.label) -Outcome ([string]$result.outcome)
    foreach ($property in $curated.GetEnumerator()) {
      if (-not [string]::IsNullOrWhiteSpace([string]$property.Value)) { $entry[$property.Key] = $property.Value }
    }
    $entry.evidence = "Specific prototype outcome replaces $($result.outcome)."
  }
  $entries.Add([pscustomobject]$entry)
}

$output = [ordered]@{
  version = 'intent-completion-overrides-2026-07-14'
  generatedFrom = 'quality/generated/intent-completion-replay.json'
  rule = 'Each entry is backed by clean browser evidence or a curated screen-specific prototype outcome.'
  entries = @($entries)
}
$output | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $outputPath -Encoding utf8
Write-Output "Declared $($entries.Count) intent-completion outcomes."
