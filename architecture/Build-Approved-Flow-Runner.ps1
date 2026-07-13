param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$approvedScreens = Join-Path $Root 'approved-final\screens'
$sourceFlowDir = Join-Path $Root 'flows'
$approvedFlowDir = Join-Path $Root 'approved-final\flows'
$maxScreen = 165
New-Item -ItemType Directory -Path $sourceFlowDir,$approvedFlowDir -Force | Out-Null

$flowRows = @'
id|title|description|screens
onboarding|Install to Universal App|Install, first open, automated setup, sign-in and universal handoff.|0,1,2,3,4
social|Social Consumer and Creator Entry|Move between Shorts, Videos, Feed and Create without leaving the universal app.|4,5,6,7,8
buy-counter|Buy and Counter Pickup|Discover a shop, choose products, checkout, confirm stock, pay, collect and rate.|4,9,10,11,12,13,14,15,16
buy-delivery|Buy and Home Delivery|Discover, choose, checkout, confirm, pay, track home delivery and rate.|4,9,10,11,12,13,14,17,18
buy-issue|Order Issue and Resolution|Submit evidence, follow review, receive refund or replacement and use order support chat.|18,19,20,21,22
chat|Chat Inbox and Threads|Move from the inbox into business and people conversations.|23,24,25
eat-order|Eat - Order Food|Open Eat, choose restaurant food and place an order.|26,27
eat-table|Eat - Book Table|Open Eat and reserve a restaurant table.|26,28
eat-tiffin|Eat - Tiffin|Open Eat and choose a menu-led tiffin plan.|26,29
ride|Ride Consumer Journey|Quote a ride, meet the captain, complete the trip, approve payment, rate and get support.|4,30,31,32,33,34,35
doctor-booking|Doctor Appointment|Discover care, select a doctor and provide appointment details or reports.|36,37,38
doctor-invite|Doctor Invite and Follow-up|Invite a walk-in patient, let the patient join and manage the follow-up workspace.|39,40,41
salon|Salon Booking and Visit|Choose a salon, confirm the booking, check in, pay, rate and get support.|36,42,43,44,45,46,47
get-it-done|Get It Done|Describe a task, protect payment, match a helper, verify proof, complete or resolve an issue.|36,48,49,50,51,52,53,54,55,56
pay-recharge|Pay - Recharge|Choose Recharge, pay and retain the receipt.|57,58,63,64
pay-bills|Pay - Bills|Choose Bills, pay and retain the receipt.|57,59,63,64
pay-scan|Pay - Scan|Scan, confirm payment and retain the receipt.|57,60,63,64
pay-request|Pay Request - Success|Review a request, confirm payment, process it and see the receipt history.|57,61,62,63,64
pay-refund|Pay Request - Pending Refund|Review and pay a request, then follow a protected pending refund.|57,61,62,63,65
pay-failure|Pay Request - Failure and Reversal|Review a request and safely handle failure, reversal or retry.|57,61,62,66
earn-workspace|Earn and Create Work Profile|Discover work, review terms, enter My Work, choose activity, submit proof and activate a workspace.|4,67,68,69,70,71,72,73
retailer-onboarding|Retailer Workspace Entry|Choose retailer activity, verify it, activate the workspace and enter retailer operations.|70,71,72,73,74
retailer-orders|Retailer Customer Order|Review an order, fulfil it, assign delivery and complete the handoff.|74,75,76,77
retailer-pos|Retailer Counter and POS|Create an assisted order, manage counters, complete a POS sale and see the Sales Book.|74,78,79,80,90
retailer-wholesale|Retailer Wholesale Procurement|Browse wholesale supply, place a purchase order, track and receive goods, post the bill and pay the supplier.|74,81,82,83,84,85,86,87,88,89,91,92
retailer-books|Retailer Books and Reconciliation|Review sales, stock, business position and cash or bank reconciliation.|74,90,91,92,106
retailer-services|Retailer Business Services|Choose a professional service, review its plan, activate it and operate the active entitlement.|74,93,94,95,96
retailer-growth|Retailer Customers and Campaigns|Review customers, inspect a customer, manage campaigns and build an offer.|74,97,98,99,100
retailer-controls|Retailer Stock and Controls|Review stock, liquidate slow stock, use approval-gated AI, manage staff, settings, issues and money.|74,91,101,102,103,104,105,106
manufacturer-sales|Manufacturer Sales and Fulfilment|Operate the manufacturer workspace, publish finished products, accept wholesale demand and dispatch goods.|107,109,110,112
manufacturer-procurement|Manufacturer Input Procurement|Use the manufacturer workspace to buy eligible raw material and review the business book.|107,111,108
manufacturer-growth|Manufacturer Demand and Services|Build buyer demand, run campaigns and activate manufacturer-specific paid business services.|107,113,115
manufacturer-control|Manufacturer Claims and Team Control|Resolve claims, control staff and review the manufacturer business position.|107,114,108
captain-workspace|Captain Ride and Earnings|Go online, accept a ride, navigate, complete it, receive payout, maintain compliance and access support or paid work.|116,117,118,119,120,121,122,123
creator-workspace|Creator Studio and Earnings|Create, publish, manage content, understand performance, grow community, run campaigns, earn and manage memberships.|124,125,126,127,128,129,130,131,132
earn-operations|Freelancer Earn Operations|Discover funded opportunities, prove eligibility, perform work, submit outcome, receive payout and resolve issues.|133,134,135,136,137,138
provider-workspace|Service Provider Operations|Manage readiness, catalogue, availability, requests, fulfilment, books, growth and control.|139,140,141,142,143,144,145,146
admin-operations|MoolSocial Admin Operations|Govern verification, catalogue, commerce, rides, work, content, finance, support, audience and product health.|147,148,149,150,151,152,153,154,155,156,163,164
shared-controls|Shared Account and Workspace Controls|Use the priority inbox, identity, universal input, evidence, security, workspaces, settings, analytics and Mool Agent controls.|157,158,159,160,161,162,165
'@ | ConvertFrom-Csv -Delimiter '|'

$screenFiles = @{}
$screenContracts = @{}
foreach ($screen in 0..$maxScreen) {
  $prefix = '{0:D2}' -f $screen
  $file = Get-ChildItem -LiteralPath $approvedScreens -Filter "$prefix-*.html" | Select-Object -First 1
  if (-not $file) { throw "Approved Screen $screen is missing." }
  $html = Get-Content -LiteralPath $file.FullName -Raw
  $titleMatch = [regex]::Match($html, '<title>(.*?)</title>', 'Singleline')
  $productionMatch = [regex]::Match($html, 'id="productionRouteContract">(.*?)</script>', 'Singleline')
  $approvalMatch = [regex]::Match($html, 'id="prototypeApprovalContract">(.*?)</script>', 'Singleline')
  if (-not $productionMatch.Success -or -not $approvalMatch.Success) { throw "Screen $screen is missing machine contracts." }
  $production = $productionMatch.Groups[1].Value | ConvertFrom-Json
  $approval = $approvalMatch.Groups[1].Value | ConvertFrom-Json
  if ($approval.status -ne 'approved-and-frozen') { throw "Screen $screen is not approved and frozen." }
  $screenFiles[$screen] = $file.Name
  $screenContracts[$screen] = [pscustomobject][ordered]@{
    screen = $screen
    file = "screens/$($file.Name)"
    title = [Net.WebUtility]::HtmlDecode($titleMatch.Groups[1].Value)
    approval = $approval.status
    productionModule = $production.productionModule
    routeId = $production.routeId
    routePath = $production.routePath
    routeState = $production.routeState
    implementation = $production.implementation
    launchScope = $production.launchScope
  }
}

$flows = foreach ($flow in $flowRows) {
  $screenNumbers = @($flow.screens.Split(',') | ForEach-Object { [int]$_.Trim() })
  $nodes = for ($index = 0; $index -lt $screenNumbers.Count; $index++) {
    $screen = $screenNumbers[$index]
    $base = $screenContracts[$screen]
    [pscustomobject][ordered]@{
      index = $index
      screen = $screen
      file = $base.file
      title = $base.title
      approval = $base.approval
      previousScreen = if ($index -gt 0) { $screenNumbers[$index - 1] } else { $null }
      nextScreen = if ($index -lt $screenNumbers.Count - 1) { $screenNumbers[$index + 1] } else { $null }
      productionModule = $base.productionModule
      routeId = $base.routeId
      routePath = $base.routePath
      routeState = $base.routeState
      implementation = $base.implementation
      launchScope = $base.launchScope
    }
  }
  [pscustomobject][ordered]@{
    id = $flow.id
    title = $flow.title
    description = $flow.description
    nodeCount = $nodes.Count
    nodes = @($nodes)
  }
}

$allNodes = foreach ($screen in 0..$maxScreen) {
  $base = $screenContracts[$screen]
  [pscustomobject][ordered]@{
    index = $screen
    screen = $screen
    file = $base.file
    title = $base.title
    approval = $base.approval
    previousScreen = if ($screen -gt 0) { $screen - 1 } else { $null }
    nextScreen = if ($screen -lt $maxScreen) { $screen + 1 } else { $null }
    productionModule = $base.productionModule
    routeId = $base.routeId
    routePath = $base.routePath
    routeState = $base.routeState
    implementation = $base.implementation
    launchScope = $base.launchScope
  }
}

$allFlow = [pscustomobject][ordered]@{
  id = 'all-approved'
  title = "All Approved Screens 00-$maxScreen"
  description = 'Sequential inspection of every approved prototype. Use operational flows for realistic user journeys.'
  nodeCount = $maxScreen + 1
  nodes = @($allNodes)
}

$covered = @($flows.nodes.screen | Sort-Object -Unique)
$missingCoverage = @(0..$maxScreen | Where-Object { $_ -notin $covered })
if ($missingCoverage.Count) { throw "Operational flow coverage is missing Screens: $($missingCoverage -join ', ')" }

$manifest = [pscustomobject][ordered]@{
  version = 'approved-flow-runner-2026-07-13'
  approvedThroughScreen = $maxScreen
  approvedScreenCount = $maxScreen + 1
  operationalFlowCount = @($flows).Count
  generatedAt = '2026-07-13'
  defaultFlow = 'onboarding'
  flows = @($allFlow) + @($flows)
}

$validation = [pscustomobject][ordered]@{
  approvedScreenCount = $maxScreen + 1
  operationalFlowCount = @($flows).Count
  coveredScreenCount = $covered.Count
  missingScreens = $missingCoverage
  status = 'passed'
}

foreach ($directory in @($sourceFlowDir,$approvedFlowDir)) {
  $manifest | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $directory 'approved-flows.json') -Encoding utf8
  $validation | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $directory 'flow-validation.json') -Encoding utf8
}

Write-Output "Built $(@($flows).Count) operational flows plus all-approved coverage for $($maxScreen + 1) screens."
