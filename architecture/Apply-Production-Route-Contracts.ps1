param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

$rows = @'
screen|module|routeId|routePath|routeState|implementation|launchScope
0|distribution|distribution.store-listing|external:play-store|store-listing|external-surface|mvp-core
1|launch|app.launch|/launch|splash|route-state|mvp-core
2|onboarding|onboarding.setup|/onboarding/setup|language-location|route-shell|mvp-core
3|identity|identity.auth|/auth|method-otp-handoff|route-shell|mvp-core
4|universal|universal.app|/app|social-default-focus-shell|route-shell|mvp-core
5|social|social.shorts|/social/shorts|viewer|route-shell|mvp-core
6|social|social.videos|/social/videos|catalog-player|route-shell|mvp-core
7|social|social.feed|/social/feed|timeline-post-replies|route-shell|mvp-core
8|social|social.create|/social/create|composer|route-shell|mvp-core
9|commerce|commerce.buy|/buy|discovery|route-shell|mvp-core
10|commerce|commerce.grocery|/buy/grocery|store-catalog|route-shell|mvp-core
11|commerce|commerce.product|/buy/products/:productId|product-detail|route-shell|mvp-core
12|commerce|commerce.cart|/buy/cart|basket-checkout|route-shell|mvp-core
13|retailer|retailer.order|/retailer/orders/:orderId|stock-confirmation|route-state|mvp-core
14|orders|orders.payment|/orders/:orderId/payment|review-confirmation|route-shell|mvp-core
15|orders|orders.lifecycle|/orders/:orderId|counter-ready|route-state|mvp-core
16|orders|orders.lifecycle|/orders/:orderId|counter-completed-rating|route-state|mvp-core
17|orders|orders.lifecycle|/orders/:orderId|home-delivery-tracking|route-state|mvp-core
18|orders|orders.lifecycle|/orders/:orderId|home-delivery-completed-rating|route-state|mvp-core
19|orders|orders.issue|/orders/:orderId/issues|evidence-submit|route-shell|mvp-core
20|orders|orders.issue|/orders/:orderId/issues|review-retailer-response|route-state|mvp-core
21|orders|orders.issue|/orders/:orderId/issues|resolution-result|route-state|mvp-core
22|chat|chat.order-support|/chat/orders/:orderId|support-thread|route-shell|mvp-core
23|chat|chat.inbox|/chat|inbox|route-shell|mvp-core
24|chat|chat.business|/chat/business/:threadId|business-thread|route-shell|mvp-core
25|chat|chat.people|/chat/people/:threadId|people-thread|route-shell|mvp-core
26|eat|eat.home|/eat|discovery|route-shell|post-mvp
27|eat|eat.restaurant-order|/eat/restaurants/:restaurantId/order|menu-cart|route-shell|post-mvp
28|eat|eat.table-booking|/eat/restaurants/:restaurantId/tables|table-booking|route-shell|post-mvp
29|eat|eat.tiffin|/eat/tiffin|provider-menu-plan|route-shell|post-mvp
30|ride|ride.booking|/ride|quote-and-book|route-shell|mvp-core
31|ride|ride.trip|/ride/trips/:tripId|captain-arriving|route-state|mvp-core
32|ride|ride.trip|/ride/trips/:tripId|live-trip|route-state|mvp-core
33|ride|ride.trip|/ride/trips/:tripId|payment-approval|route-state|mvp-core
34|ride|ride.trip|/ride/trips/:tripId|receipt-rating|route-state|mvp-core
35|ride|ride.support|/ride/trips/:tripId/support|post-trip-support|route-shell|mvp-core
36|booking|booking.home|/book|discovery|route-shell|post-mvp
37|health|health.doctor-booking|/book/doctors/:doctorId|slot-selection|route-shell|post-mvp
38|health|health.appointment|/health/appointments/:appointmentId|patient-details-reports|route-state|post-mvp
39|health|doctor.patient-invite|/doctor/patients/invites/new|invite-followup|route-shell|post-mvp
40|health|health.invite|/health/invites/:token|patient-join|route-shell|post-mvp
41|health|health.followup|/health/followups/:followupId|patient-workspace|route-shell|post-mvp
42|salon|salon.booking|/book/salons/:salonId|service-slot|route-shell|post-mvp
43|salon|salon.booking-lifecycle|/bookings/:bookingId|review-confirm|route-state|post-mvp
44|salon|salon.booking-lifecycle|/bookings/:bookingId|confirmed|route-state|post-mvp
45|salon|salon.booking-lifecycle|/bookings/:bookingId|visit-check-in|route-state|post-mvp
46|salon|salon.booking-lifecycle|/bookings/:bookingId|payment-rating|route-state|post-mvp
47|salon|salon.booking-lifecycle|/bookings/:bookingId|post-visit-support|route-state|post-mvp
48|tasks|tasks.create|/tasks/new|task-details|route-shell|post-mvp
49|tasks|tasks.payment|/tasks/:taskId/payment|review-payment|route-shell|post-mvp
50|tasks|tasks.lifecycle|/tasks/:taskId|helper-accepted|route-state|post-mvp
51|tasks|tasks.lifecycle|/tasks/:taskId|proof-release|route-state|post-mvp
52|tasks|tasks.lifecycle|/tasks/:taskId|completed-rating|route-state|post-mvp
53|tasks|tasks.issue|/tasks/:taskId/issues|issue-submit|route-shell|post-mvp
54|tasks|tasks.issue|/tasks/:taskId/issues|case-status|route-state|post-mvp
55|tasks|tasks.issue|/tasks/:taskId/issues|resolution|route-state|post-mvp
56|tasks|tasks.issue|/tasks/:taskId/issues|resolution-complete|route-state|post-mvp
57|pay|pay.home|/pay|action-home|route-shell|mvp-core
58|pay|pay.recharge|/pay/recharge|recharge|route-shell|mvp-core
59|pay|pay.bills|/pay/bills|bill-payment|route-shell|mvp-core
60|pay|pay.scan|/pay/scan|scan-confirm|route-shell|mvp-core
61|pay|pay.requests|/pay/requests|request-inbox|route-shell|mvp-core
62|pay|pay.request-detail|/pay/requests/:requestId|review-confirmation|route-shell|mvp-core
63|pay|payment.lifecycle|/payments/:paymentId|processing-receipt|route-state|mvp-core
64|pay|payment.history|/payments|receipt-history|route-shell|mvp-core
65|pay|payment.lifecycle|/payments/:paymentId|pending-refund|route-state|mvp-core
66|pay|payment.lifecycle|/payments/:paymentId|failed-reversal-retry|route-state|mvp-core
67|work|earn.home|/earn|opportunity-feed|route-shell|mvp-core
68|work|earn.opportunity|/earn/opportunities/:opportunityId|terms-apply|route-shell|mvp-core
69|work|workspace.create|/workspaces/new|obsolete-freeform-setup|reference-only|superseded-do-not-implement
70|work|workspace.create|/workspaces/new|choose-activity|route-shell|mvp-core
71|work|workspace.create|/workspaces/new|profile-proof|route-state|mvp-core
72|work|workspace.application|/workspaces/applications/:applicationId|verification-status|route-shell|mvp-core
73|work|workspace.home|/workspaces/:workspaceId|ready-handoff|route-shell|mvp-core
74|retailer|retailer.home|/retailer|operating-home|route-shell|mvp-core
75|retailer|retailer.order|/retailer/orders/:orderId|review-fulfilment|route-shell|mvp-core
76|retailer|retailer.order|/retailer/orders/:orderId|delivery-assignment-handover|route-state|mvp-core
77|retailer|retailer.order|/retailer/orders/:orderId|delivery-tracking-completion|route-state|mvp-core
78|retailer|retailer.order-create|/retailer/orders/new|assisted-order|route-shell|mvp-core
79|retailer|retailer.pos-counters|/retailer/pos/counters|counter-management|route-shell|mvp-core
80|retailer|retailer.pos-sale|/retailer/pos/sales/new|counter-sale-invoice|route-shell|mvp-core
81|retailer|retailer.wholesale-catalog|/retailer/wholesale|catalog|route-shell|mvp-core
82|retailer|retailer.wholesale-cart|/retailer/wholesale/cart|purchase-order-review|route-shell|mvp-core
83|retailer|retailer.wholesale-order|/retailer/wholesale/orders/:orderId|confirmed|route-shell|mvp-core
84|retailer|retailer.wholesale-order|/retailer/wholesale/orders/:orderId|delivery-tracking|route-state|mvp-core
85|retailer|retailer.wholesale-order|/retailer/wholesale/orders/:orderId|goods-receipt|route-state|mvp-core
86|retailer|retailer.wholesale-order|/retailer/wholesale/orders/:orderId|receipt-result|route-state|mvp-core
87|retailer|retailer.purchase-book|/retailer/books/purchases|purchase-book|route-shell|mvp-core
88|retailer|retailer.purchase-detail|/retailer/books/purchases/:purchaseId|supplier-payment-review|route-shell|mvp-core
89|retailer|retailer.purchase-detail|/retailer/books/purchases/:purchaseId|supplier-payment-status|route-state|mvp-core
90|retailer|retailer.sales-book|/retailer/books/sales|sales-book|route-shell|mvp-core
91|retailer|retailer.stock|/retailer/stock|stock-statement|route-shell|mvp-core
92|retailer|retailer.business-book|/retailer/books|business-position|route-shell|mvp-core
93|retailer|retailer.services|/retailer/services|service-catalog|route-shell|mvp-conditional
94|retailer|retailer.service-detail|/retailer/services/:serviceId|plan-selection|route-shell|mvp-conditional
95|retailer|retailer.service-detail|/retailer/services/:serviceId|activation-review|route-state|mvp-conditional
96|retailer|retailer.service-detail|/retailer/services/:serviceId|active-service|route-state|mvp-conditional
97|retailer|retailer.customers|/retailer/customers|customers-loyalty|route-shell|mvp-conditional
98|retailer|retailer.customer-detail|/retailer/customers/:customerId|customer-retention|route-shell|mvp-conditional
99|retailer|retailer.campaigns|/retailer/campaigns|campaign-list-control|route-shell|mvp-conditional
100|retailer|retailer.campaign-create|/retailer/campaigns/new|progressive-builder|route-shell|mvp-conditional
101|retailer|retailer.stock|/retailer/stock|slow-stock-liquidation|route-state|mvp-conditional
102|retailer|retailer.home|/retailer|ai-operating-assistant|embedded-panel|mvp-conditional
103|retailer|retailer.settings-team|/retailer/settings/team|staff-permissions|route-shell|mvp-conditional
104|retailer|retailer.settings|/retailer/settings|store-readiness|route-shell|mvp-core
105|retailer|retailer.order-issues|/retailer/orders/issues|returns-customer-issues|route-shell|mvp-core
106|retailer|retailer.business-book|/retailer/books|cash-bank-reconciliation|route-state|mvp-core
'@ | ConvertFrom-Csv -Delimiter '|'

if ($rows.Count -ne 107) {
  throw "Expected 107 production mappings; found $($rows.Count)."
}

$screenNumbers = $rows | ForEach-Object { [int]$_.screen }
if (($screenNumbers | Sort-Object -Unique).Count -ne 107 -or ($screenNumbers | Measure-Object -Minimum).Minimum -ne 0 -or ($screenNumbers | Measure-Object -Maximum).Maximum -ne 106) {
  throw 'Production mappings must cover every prototype screen from 0 through 106 exactly once.'
}

function Get-ProductionNote([string]$implementation, [string]$routePath, [string]$routeState, [string]$launchScope) {
  switch ($implementation) {
    'route-shell' { return "Own production route $routePath. Implement $routeState as its initial or named state and include loading, empty, offline, unauthorized, error and retry behavior inside this route." }
    'route-state' { return "Do not create a separate production route. Implement $routeState inside $routePath and reuse the owning route API, authorization, analytics and regression suite." }
    'embedded-panel' { return "Do not create a separate production route. Render $routeState as an on-demand panel inside $routePath and require explicit user approval before any business mutation." }
    'external-surface' { return "This prototype belongs to $routePath outside the authenticated application router. Keep its handoff contract with the app launch route." }
    'reference-only' { return 'Do not implement this prototype. It is superseded decision evidence only; follow the replacement route contract in the canonical map.' }
    default { throw "Unknown implementation type: $implementation" }
  }
}

$contracts = foreach ($row in $rows) {
  [pscustomobject][ordered]@{
    contractVersion = 'mvp-route-lock-2026-07-12'
    prototypeScreen = [int]$row.screen
    productionModule = $row.module
    routeId = $row.routeId
    routePath = $row.routePath
    routeState = $row.routeState
    implementation = $row.implementation
    launchScope = $row.launchScope
    separateProductionRoute = ($row.implementation -eq 'route-shell')
    productionNote = Get-ProductionNote $row.implementation $row.routePath $row.routeState $row.launchScope
    canonicalMap = 'architecture/MVP-PRODUCTION-ROUTE-CONSOLIDATION.md'
  }
}

$routeGroups = $contracts | Group-Object -Property routeId | ForEach-Object {
  $first = $_.Group[0]
  [ordered]@{
    routeId = $_.Name
    routePath = $first.routePath
    productionModule = $first.productionModule
    prototypeScreens = @($_.Group | ForEach-Object { $_.prototypeScreen } | Sort-Object)
    routeStates = @($_.Group | ForEach-Object { $_.routeState })
    launchScopes = @($_.Group | ForEach-Object { $_.launchScope } | Sort-Object -Unique)
  }
}

$registry = [ordered]@{
  contractVersion = 'mvp-route-lock-2026-07-12'
  generatedAt = '2026-07-12'
  prototypeScreenCount = $contracts.Count
  productionRouteGroupCount = @($routeGroups).Count
  canonicalMap = 'architecture/MVP-PRODUCTION-ROUTE-CONSOLIDATION.md'
  routes = @($routeGroups)
  screenContracts = @($contracts)
}

$registryJson = $registry | ConvertTo-Json -Depth 8
Set-Content -LiteralPath (Join-Path $Root 'shared\production-route-map.json') -Value $registryJson -Encoding utf8
Set-Content -LiteralPath (Join-Path $Root 'approved-final\shared\production-route-map.json') -Value $registryJson -Encoding utf8

foreach ($contract in $contracts) {
  $screen = $contract.prototypeScreen
  $prefix = '{0:D2}' -f $screen
  $contractJson = $contract | ConvertTo-Json -Compress
  $contractTag = "<script type=`"application/json`" id=`"productionRouteContract`">$contractJson</script>"
  $approval = [pscustomobject][ordered]@{
    prototypeScreen = $screen
    status = 'approved-and-frozen'
    authoritative = $true
    approvedAt = '2026-07-12'
    approvalScope = 'prototype-ui-ux-and-production-contract'
  }
  $approvalJson = $approval | ConvertTo-Json -Compress
  $approvalTag = "<script type=`"application/json`" id=`"prototypeApprovalContract`">$approvalJson</script>"

  foreach ($screenRoot in @((Join-Path $Root 'screens'), (Join-Path $Root 'approved-final\screens'))) {
    $file = Get-ChildItem -LiteralPath $screenRoot -Filter "$prefix-*.html" | Select-Object -First 1
    if (-not $file) { continue }

    $html = Get-Content -LiteralPath $file.FullName -Raw
    $html = $html.Replace('draft-until-consolidated-review', 'approved-and-frozen')
    if ($html -match 'id=["'']productionRouteContract["'']') {
      $html = [regex]::Replace($html, '<script type=["'']application/json["''] id=["'']productionRouteContract["'']>.*?</script>', $contractTag, 'Singleline')
    } elseif ($html -match '</body>') {
      $html = $html -replace '</body>', "$contractTag</body>"
    } else {
      throw "No closing body tag in $($file.FullName)."
    }
    if ($html -match 'id=["'']prototypeApprovalContract["'']') {
      $html = [regex]::Replace($html, '<script type=["'']application/json["''] id=["'']prototypeApprovalContract["'']>.*?</script>', $approvalTag, 'Singleline')
    } elseif ($html -match '</body>') {
      $html = $html -replace '</body>', "$approvalTag</body>"
    }
    Set-Content -LiteralPath $file.FullName -Value $html -Encoding utf8 -NoNewline
  }
}

$approvalRegistry = [ordered]@{
  version = 'prototype-approval-lock-2026-07-12'
  authoritative = $true
  approvedThroughScreen = 106
  approvedPrototypeCount = 107
  note = 'Screens 00 through 106 are approved and frozen. Production route implementation remains controlled by productionRouteContract.'
  approvals = @($contracts | ForEach-Object {
    [ordered]@{ prototypeScreen = $_.prototypeScreen; status = 'approved-and-frozen'; approvedAt = '2026-07-12' }
  })
}
$approvalRegistryJson = $approvalRegistry | ConvertTo-Json -Depth 5
Set-Content -LiteralPath (Join-Path $Root 'shared\prototype-approval-registry.json') -Value $approvalRegistryJson -Encoding utf8
Set-Content -LiteralPath (Join-Path $Root 'approved-final\shared\prototype-approval-registry.json') -Value $approvalRegistryJson -Encoding utf8

Write-Output "Embedded $($contracts.Count) source contracts across $(@($routeGroups).Count) production route groups."
