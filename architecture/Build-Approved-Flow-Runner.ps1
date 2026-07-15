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
social|Social Consumer and Creator Entry|Open a full-screen Short from the universal social surface, then move between Videos, Feed and Create.|4,5,6,7,8
buy-counter|Buy and Counter Pickup|Discover a shop, choose products, review the available basket, pay, collect and rate.|4,9,10,11,12,14,15,16
buy-delivery|Buy and Home Delivery|Discover, choose, review the available basket, pay, track home delivery and rate.|4,9,10,11,12,14,17,18
buy-issue|Order Issue and Resolution|Submit evidence, follow review, receive refund or replacement and use order support chat.|18,19,20,21,22
chat|Chat Inbox and Threads|Open global Chat from the universal surface, enter a business conversation, return to the inbox and open a people conversation.|4,23,24,23,25
eat-order|Eat - Order Food|Open Eat from the universal surface, choose restaurant food and place an order.|4,26,27
eat-table|Eat - Book Table|Open Eat from the universal surface and reserve a restaurant table.|4,26,28
eat-tiffin|Eat - Tiffin|Open Eat from the universal surface and choose a menu-led tiffin plan.|4,26,29
ride|Ride Consumer Journey|Quote a ride, meet the captain, complete the trip, approve payment, rate and get support.|4,30,31,32,33,34,35
doctor-booking|Doctor Appointment|Open Book from the universal surface, discover care, select a doctor and provide appointment details or reports.|4,36,37,38
doctor-invite|Doctor Invite and Follow-up|Invite a walk-in patient, sign in without losing the clinic context and continue follow-up.|39,40,3,41
salon|Salon Booking and Visit|Open Book from the universal surface, choose a salon, confirm the booking, check in, pay, rate and get support.|4,36,42,43,44,45,46,47
get-it-done|Get It Done|Open Book from the universal surface, describe a task, protect payment, match a helper, verify proof, complete or resolve an issue.|4,36,48,49,50,51,52,53,54,55,56
pay-recharge|Pay - Recharge|Open Pay from the universal surface, choose Recharge, pay and retain the receipt.|4,57,58,63,64
pay-bills|Pay - Bills|Open Pay from the universal surface, choose Bills, pay and retain the receipt.|4,57,59,63,64
pay-scan|Pay - Scan|Open Pay from the universal surface, scan, confirm payment and retain the receipt.|4,57,60,63,64
pay-request|Pay Request - Success|Open Pay from the universal surface, review a request, confirm payment, process it and see the receipt history.|4,57,61,62,63,64
pay-refund|Pay Request - Pending Refund|Open Pay from the universal surface, review and pay a request, then follow a protected pending refund.|4,57,61,62,63,65
pay-failure|Pay Request - Failure and Reversal|Open Pay from the universal surface, review a request, pass through payment processing and safely handle failure, reversal or retry.|4,57,61,62,63,66
earn-workspace|Earn and Create Work Profile|Discover work, review terms, enter My Work, choose activity, submit proof and activate a workspace.|4,67,68,69,70,71,72,73
retailer-onboarding|Retailer Workspace Entry|Choose retailer activity, verify it, activate the workspace and enter retailer operations.|70,71,72,73,74
retailer-orders|Retailer Customer Order|Open a paid preparation alert, start packing, return to the order queue, fulfil the order, assign delivery and complete the handoff.|13,74,75,76,77
retailer-pos|Retailer Counter and POS|Create an assisted order, manage counters, return to the order builder, complete a POS sale and see the Sales Book.|74,78,79,78,80,90
retailer-wholesale|Retailer Wholesale Procurement|Browse wholesale supply, place a purchase order, track and receive goods, post the bill, pay the supplier and return to the Business Book.|74,81,82,83,84,85,86,87,88,89,92
retailer-books|Retailer Books and Reconciliation|Use the Business Book as the hub for sales, purchases, stock position and cash or bank reconciliation.|92,90,92,87,92,91,92,106
retailer-services|Retailer Business Services|Choose a professional service, review its plan, activate it and operate the active entitlement.|74,93,94,95,96
retailer-growth|Retailer Customers and Campaigns|Review a customer, return to the retailer home, then manage campaigns and build a measurable offer.|74,97,98,97,74,99,100
retailer-controls|Retailer Stock and Controls|Use the retailer workspace as the hub for slow stock, approval-gated AI, staff, settings, issues and money.|74,101,74,102,74,103,74,104,74,105,74,106
manufacturer-sales|Manufacturer Sales and Fulfilment|Operate the manufacturer workspace, publish finished products, return to live sales orders, accept wholesale demand and dispatch goods.|107,109,107,110,112
manufacturer-procurement|Manufacturer Input Procurement|Use the manufacturer workspace to buy eligible raw material and review the business book.|107,111,108
manufacturer-growth|Manufacturer Demand and Services|Use the manufacturer workspace as the hub for buyer demand, campaigns and manufacturer-specific paid business services.|107,113,107,115
manufacturer-control|Manufacturer Claims and Team Control|Use the manufacturer workspace as the hub for claims, staff control and the manufacturer business position.|107,114,107,108
captain-workspace|Captain Ride and Earnings|Go online, accept a ride, navigate, complete it and receive payout, then use captain home for compliance and support.|116,117,118,119,120,121,116,122,116,123
creator-workspace|Creator Studio and Earnings|Use Creator Studio as the hub for create, content, performance, audience, campaigns, earnings, rights and memberships.|124,125,124,126,127,124,128,124,129,124,130,124,131,124,132
creator-funded-campaign|Creator Earning - Funded Campaign|A retailer reserves campaign money, admin governs it, a creator accepts and delivers, consumers act, attribution closes and the ledger releases payment.|100,152,129,125,5,127,154,130
creator-commerce-share|Creator Earning - Commerce Share|A business declares an eligible share, the creator publishes linked content, the consumer completes basket review, payment and delivery, and the verified share reaches the creator ledger.|99,129,125,5,9,12,14,17,18,127,154,130
creator-membership|Creator Earning - Membership|A creator publishes monthly or annual membership, a consumer joins and pays, and the protected recurring amount reaches the creator ledger.|132,7,62,63,130
creator-content-pool|Creator Earning - Content Pool|Eligible original content receives a versioned performance allocation from a reserved MoolSocial pool and reaches the creator ledger after monthly close.|6,127,154,130
creator-local-production|Creator Earning - Local Content Work|A local business funds a bounded content brief, the creator delivers it, governance closes approval and the fee reaches the creator ledger.|100,129,125,152,154,130
creator-onboarding|Creator Earning - Verified Onboarding|MoolSocial reserves verified activation work, the worker accepts, completes proof and receives the qualified payout in the creator ledger.|152,133,134,135,136,137,130
creator-live-event|Creator Earning - Live Event|A manufacturer funds a live launch, admin approves the audience, a creator hosts it, consumers join and qualified outcomes reach the creator ledger.|113,156,129,125,7,62,63,127,130
creator-licence|Creator Earning - Licensed Reuse|A business funds a reuse request, the creator approves bounded rights, admin reconciles the licence receipt and the fee reaches the creator ledger.|99,131,154,130
earn-operations|Freelancer Earn Operations|Discover funded opportunities, prove eligibility, perform work, submit outcome, receive payout and resolve issues.|133,134,135,136,137,138
provider-workspace|Service Provider Operations|Use provider home as the hub for catalogue, availability, requests, fulfilment, business, growth and controls.|139,140,139,141,139,142,143,144,139,145,139,146
admin-operations|MoolSocial Admin Operations|Govern verification, catalogue, commerce, rides, work, content, finance, support, audience and product health.|147,148,149,150,151,152,153,154,155,156,163,164
shared-controls|Shared Account and Workspace Controls|Use Workspaces as the hub for priority activity, identity, universal input, evidence, security, settings, analytics and Mool Agent controls.|162,157,162,158,162,159,162,160,162,161,162,165
'@ | ConvertFrom-Csv -Delimiter '|'

$flowQueryOverrides = @{
  'creator-funded-campaign:100' = '?mode=creator&engine=funded_campaign'
  'creator-funded-campaign:152' = '?engine=funded_campaign'
  'creator-funded-campaign:129' = '?engine=funded_campaign'
  'creator-funded-campaign:125' = '?earning=funded_campaign&campaign=CAM-2401'
  'creator-funded-campaign:5' = '?earning=funded_campaign&campaign=CAM-2401'
  'creator-funded-campaign:127' = '?engine=funded_campaign&campaign=CAM-2401'
  'creator-funded-campaign:154' = '?engine=funded_campaign'
  'creator-funded-campaign:130' = '?source=funded_campaign'
  'creator-commerce-share:99' = '?mode=creator&engine=attributed_commerce'
  'creator-commerce-share:129' = '?engine=attributed_commerce'
  'creator-commerce-share:125' = '?earning=attributed_commerce&sku=BASKET-399'
  'creator-commerce-share:5' = '?earning=attributed_commerce&content=CT-884&sku=BASKET-399'
  'creator-commerce-share:9' = '?content=CT-884&sku=BASKET-399'
  'creator-commerce-share:14' = '?content=CT-884&sku=BASKET-399&attribution=ATTR-884'
  'creator-commerce-share:17' = '?content=CT-884&sku=BASKET-399&attribution=ATTR-884'
  'creator-commerce-share:18' = '?content=CT-884&sku=BASKET-399&attribution=ATTR-884'
  'creator-commerce-share:127' = '?engine=attributed_commerce'
  'creator-commerce-share:154' = '?engine=attributed_commerce'
  'creator-commerce-share:130' = '?source=attributed_commerce'
  'creator-membership:132' = '?engine=membership'
  'creator-membership:7' = '?earning=membership&creator=JodhpurDaily'
  'creator-membership:62' = '?purpose=membership&amount=99&creator=JodhpurDaily'
  'creator-membership:63' = '?purpose=membership&amount=99'
  'creator-membership:130' = '?source=membership'
  'creator-content-pool:6' = '?earning=content_pool&content=CT-991'
  'creator-content-pool:127' = '?engine=content_pool'
  'creator-content-pool:154' = '?engine=content_pool'
  'creator-content-pool:130' = '?source=content_pool'
  'creator-local-production:100' = '?mode=creator&engine=local_production'
  'creator-local-production:129' = '?engine=local_production'
  'creator-local-production:125' = '?earning=local_production&brief=BR-771'
  'creator-local-production:152' = '?engine=local_production'
  'creator-local-production:154' = '?engine=local_production'
  'creator-local-production:130' = '?source=local_production'
  'creator-onboarding:152' = '?engine=verified_onboarding'
  'creator-onboarding:133' = '?engine=verified_onboarding'
  'creator-onboarding:134' = '?engine=verified_onboarding&opportunity=ONB-118'
  'creator-onboarding:135' = '?engine=verified_onboarding&work=ONB-118'
  'creator-onboarding:136' = '?engine=verified_onboarding&work=ONB-118'
  'creator-onboarding:137' = '?engine=verified_onboarding&work=ONB-118'
  'creator-onboarding:130' = '?source=verified_onboarding'
  'creator-live-event:113' = '?mode=creator&engine=live_event'
  'creator-live-event:156' = '?engine=live_event'
  'creator-live-event:129' = '?engine=live_event'
  'creator-live-event:125' = '?earning=live_event&event=LIVE-72'
  'creator-live-event:7' = '?earning=live_event&event=LIVE-72'
  'creator-live-event:62' = '?purpose=live_event&event=LIVE-72&amount=0'
  'creator-live-event:63' = '?purpose=live_event&event=LIVE-72&amount=0'
  'creator-live-event:127' = '?engine=live_event&event=LIVE-72'
  'creator-live-event:130' = '?source=live_event'
  'creator-licence:99' = '?mode=creator&engine=licensed_reuse'
  'creator-licence:131' = '?engine=licensed_reuse&state=review'
  'creator-licence:154' = '?engine=licensed_reuse'
  'creator-licence:130' = '?source=licensed_reuse'
}

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
      file = $base.file + $(if ($flowQueryOverrides.ContainsKey("$($flow.id):$screen")) { $flowQueryOverrides["$($flow.id):$screen"] } else { '' })
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
