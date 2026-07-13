# Screen 74: Retailer Operating Home Plan

Status: SUPERSEDED BY DEMAND-AGGREGATION UI/UX RESET

Superseded by: `DEMAND-AGGREGATION-WORKSPACE-UIUX-RESET.md` and `RETAILER-HYBRID-B2B-B2C-OPERATING-APP-LOCK.md`

Do not implement or approve this feature-first plan. It is retained only as historical design reasoning.

Last updated: 11 July 2026 IST

Entry route: Screen 73 Workspace Ready -> Screen 74 Retailer Operating Home

Applies first to: Grocery / Kirana retailer in Rajasthan MVP

Expansion rule: The operating kernel must later support other retailer categories without changing the approved Screen 74 interaction contract.

## 1. Locked Screen Decision

Screen 74 is the retailer workspace home. It is not a catalog uploader, setup wizard, feature directory, marketplace, supplier directory or static dashboard.

It is the first operating surface for the complete retailer value chain:

```text
FMCG manufacturer / brand / distributor / wholesaler
-> retailer procurement
-> goods receipt and inventory
-> retailer pricing and fulfilment
-> consumer order or counter sale
-> invoice, payment, settlement, return and refund
```

The retailer must understand two connected outcomes immediately:

```text
Sell to customers
Wholesale Buy
```

Stock and money ledgers connect both sides.

## 2. User Outcome

Within five seconds, a retailer should know:

```text
What needs action now?
Can customers order from my shop?
Which orders are waiting?
Which stock is low or unavailable?
What should I buy now and on what terms?
What money is received, due or blocked?
```

Within one tap, the retailer must reach the exact order, stock item, procurement decision, inbound delivery, payment problem or customer/supplier chat.

## 3. Product Boundary

### Screen 74 owns

```text
workspace identity and live/paused state
urgent operating actions
first-run readiness
sell-side status
buy-side status
stock health
inbound delivery status
money and settlement exceptions
one-tap routes into exact operating flows
```

### Screen 74 does not own

```text
full product editing
full wholesale catalog browsing
purchase-order checkout
goods-receipt line reconciliation
full order fulfilment
full ledgers or reports
campaign creation
staff and permission administration
```

Those are focused subflows opened from Screen 74.

## 4. Non-Negotiable UX Principles

```text
One focused action at a time.
No permanent role-switch strip.
No feature grid.
No endless supplier or product listing on Home.
No duplicate main and sub actions.
No dead button.
No stock promise without inventory truth.
No automatic screen switch when a new event arrives.
No consumer publication before sell-side readiness.
No forced sell-side setup before the retailer can procure stock.
```

## 5. Primary User States

Screen 74 renders from server state. It is not one fixed dashboard.

### State A: First Entry

The workspace is verified but not ready to sell.

Show:

```text
Prepare your shop
Add products and stock
Set prices and packs
Choose pickup/delivery and payments
```

Primary action: `Start shop setup`

Secondary action: `Wholesale Buy`

The retailer may procure immediately. Consumer publication stays locked until readiness is complete.

### State B: Setup In Progress

Show one current setup step, progress and one next action. Do not show all forms on Home.

Example:

```text
Shop setup 2 of 4
Prices needed for 18 products
Continue pricing
```

### State C: Live Shop, No Urgent Exception

Show a calm operating summary, recent sales, stock health, next inbound order and recommended replenishment.

### State D: Live Shop With Urgent Action

One highest-priority action expands at the top. Other actions remain compact below it.

Examples:

```text
Accept customer order
Confirm unavailable stock
Receive wholesale delivery
Resolve payment failure
Reply to customer or supplier
```

### State E: Paused / Not Accepting Orders

Show the exact reason and one safe resume action. Procurement, stock and ledgers remain available.

### State F: Connectivity Or Sync Problem

Show last successful sync time, restrict stock-changing actions when necessary and preserve drafts locally. Never show stale stock as live without a visible warning.

## 6. Mobile Information Architecture

### A. Workspace Header

Contains:

```text
shop name
area or branch
accepting-orders state
notification indicator
```

The status control changes order acceptance only. It does not log the user out or disable procurement.

### B. Unified Work Search

Placeholder:

```text
Search products, orders or wholesale
```

Adjacent icon actions:

```text
scan barcode
voice
```

Search resolves intent before results:

```text
product/SKU -> stock and wholesale options
order number/customer -> exact order
supplier/invoice -> procurement or inbound record
plain request -> workspace assistant action
```

### C. Attention Strip

A compact horizontal status strip shows only live counts:

```text
New orders
Running low
Inbound
Money due
```

Each count opens the filtered exact queue. Zero-value items collapse.

### D. Act Now

One expanded action at a time.

Every action includes:

```text
what happened
amount or quantity
deadline or SLA
risk if ignored
one primary action
one safe secondary action where required
```

Examples:

```text
New order | Rs 645 | accept in 02:14 | Review order
Delivery arrived | 12 cases | 2 items need count | Receive stock
Payment failed | Rs 2,400 supplier payment | Retry safely
```

### E. Sell To Customers Band

This is operating status, not repeated navigation.

Show a compact combination of:

```text
shop live/paused
orders waiting
today sales
items unavailable
next sell-side action
```

Primary action changes by state:

```text
Start shop setup
Continue setup
Review orders
Update unavailable item
Create offer
```

### F. Wholesale Buy Band

Show the most relevant procurement action, not a supplier list.

Possible states:

```text
reorder products running low
buy again from a completed purchase
review a source offer
join an aggregated price
track inbound order
receive delivered goods
resolve shortage or damage
```

Every visible procurement recommendation answers:

```text
product and pack/case
quantity or MOQ
unit and landed cost
retailer margin opportunity
delivery time
payment or credit term
GST invoice status
source trust
return/short-supply rule
next action
```

### G. Business Today

Use one compact line or expandable summary:

```text
Sales
Purchases
Estimated margin
Receivable / payable exception
```

Do not place a large analytics dashboard on the first mobile viewport.

### H. Persistent Workspace Dock

Fixed order:

```text
Mool | Orders | Stock | Wholesale Buy | Chat
```

Rules:

```text
Mool tap toggles to last personal/social focus.
Mool long-press or swipe-up opens the full launcher/workspace selector.
The shop identity in the workspace header returns to Screen 74 from every retailer subflow.
Orders opens the customer-order queue.
Stock opens the shop catalog, quantities, availability, pricing and inventory ledger.
Wholesale Buy opens B2B procurement from verified manufacturers, brands, distributors and wholesalers.
Chat opens people/business/order/workspace/support inboxes with context preserved.
```

Labels and icons must fit at 320, 360, 390 and 430 px widths. `Wholesale Buy` may use two lines but must never truncate.

## 7. Progressive First-Run Setup

Setup is entered from Screen 74 and returns to Screen 74 after every completed step.

```text
Step 1: Products and opening stock
Step 2: Retail packs, loose units, prices and tax attributes
Step 3: Counter pickup, home delivery, service area and order capacity
Step 4: Payment, invoice, refund, substitution and customer communication
Step 5: Readiness review and go live
```

Rules:

```text
Save after every step.
Resume at the last incomplete field.
Allow purchase/procurement before sell-side go-live.
Never publish incomplete products.
Never infer stock from selected catalog alone.
```

The existing master-SKU, CSV import, barcode and unmatched-product review concepts remain inputs to Step 1, not the definition of Screen 74.

## 8. Sell-Side End-To-End Flow

```text
Select or import governed SKU
-> confirm shop pack/loose mode
-> enter accepted opening stock
-> set consumer price and offer guard
-> choose counter pickup/home delivery
-> configure payment, invoice and return rules
-> readiness gate
-> product eligible for consumer decision cards
-> consumer order reserves available stock
-> retailer accepts and fulfils
-> completed sale debits stock
-> payment and invoice update money/sales ledger
-> return/refund creates reverse ledger events
```

Counter sales affect stock only when captured through MoolSocial POS/billing/scan or an approved integration.

## 9. Buy-Side End-To-End Flow

```text
Running-low inventory, forecast, search, scan or buy-again intent
-> product-first procurement result
-> backend ranks verified source outcomes
-> retailer compares landed cost, MOQ, margin, credit and delivery
-> add cases/units to purchase basket
-> review GST, terms, payment and return rules
-> place purchase order
-> payment/credit obligation created
-> source confirms and dispatches
-> retailer tracks inbound delivery
-> goods receipt counts accepted, short and damaged quantity
-> accepted quantity credits inventory
-> discrepancy creates claim/credit-note flow
-> purchase ledger and payable update
```

The retailer browses products and outcomes, not thousands of supplier profiles. Source identity and proof remain available inside each decision card.

## 10. Stock As Shared Operating Truth

Required stock quantities:

```text
physical_on_hand
reserved_for_customer_orders
available_to_promise
inbound_confirmed
damaged_or_quarantined
liquidation_reserved
```

Required event types:

```text
OPENING_STOCK_ACCEPTED
PURCHASE_ORDER_PLACED
PURCHASE_RECEIVED
PURCHASE_SHORT_OR_DAMAGED
CUSTOMER_ORDER_RESERVED
CUSTOMER_ORDER_CANCELLED
CUSTOMER_SALE_COMPLETED
COUNTER_SALE_CAPTURED
CUSTOMER_RETURN_ACCEPTED
SUPPLIER_RETURNED
STOCK_ADJUSTED
DAMAGE_OR_EXPIRY_RECORDED
LIQUIDATION_RESERVED
LIQUIDATION_COMPLETED
```

Home reads stock projections. It never writes stock directly.

## 11. Wholesale Decision Contract

Every B2B outcome card must include:

```text
master SKU and barcode where available
brand, variant, pack and case configuration
MOQ and price slabs
price before/after tax
landed cost to retailer location
estimated gross margin at current retail price
available quantity
delivery date/window
payment mode and authorized credit terms
GST invoice availability
batch/expiry where relevant
source verification
shortage, damage and return rule
offer expiry or remaining funded quantity
one next action
```

Never show a wholesale price without MOQ, tax and delivery responsibility.

## 12. Priority And Ranking Logic

Home priority is server driven.

Suggested priority order:

```text
P0 safety, fraud or payment risk
P1 expiring customer-order acceptance or fulfilment SLA
P2 inbound delivery and goods-receipt action
P3 stockout affecting live consumer products
P4 settlement, refund or supplier discrepancy
P5 replenishment and margin opportunity
P6 offer, campaign or analytics suggestion
```

Only one item expands. The next items show compact count and title.

## 13. Work Pulse And Personal Switching

While the retailer is on Social or another personal screen:

```text
new order
inbound arrival
urgent stock exception
payment failure
customer/supplier message
```

may create a silent Work Pulse. Tapping opens the exact action. The app never forces an automatic switch.

Returning through Mool restores Screen 74 or the last workspace position. Personal feed/video position is also preserved.

## 14. Empty, Loading And Failure States

Required prototype states:

```text
first entry
setup in progress
live with no urgent work
live with new customer order
products running low with a wholesale recommendation
inbound delivery awaiting receipt
paused shop
offline with cached data
stock-sync conflict
payment or settlement failure
no serviceable wholesale source
```

Failure wording must explain what is safe, what is blocked and the next action. It must never imply that stock or payment succeeded when confirmation is missing.

## 15. Visual And Interaction Direction

```text
Quiet operational interface
Strong information hierarchy
White or light operational surface with approved navy brand anchors
Saffron and green reserved for state and brand accents
No decorative gradients or floating illustration cards
8 px maximum card radius unless the locked dock requires its existing shape
Stable dimensions for dock, counters and action controls
Real product imagery only where product inspection is useful
Icons plus short labels for navigation
No internal architecture terminology in production UI
```

The first viewport should show workspace identity, search, live attention and the beginning of both sell and buy operating status without appearing crowded.

## 16. Responsive Contract

### Mobile app

Primary design target. One-column progressive operation with persistent dock and no horizontal page overflow.

### Mobile web

Same actions and contracts. CSV uses Files/cloud picker and share handoff. Camera/barcode actions appear only when supported and permitted.

### Desktop web

Use a wider operating layout with a persistent left or top workspace navigation, but keep the same action names, priority order, state model and event contracts. Desktop may expose more rows, never different business truth.

## 17. Accessibility And Indian Mass-Market Usability

```text
44 px minimum touch target
readable at 320 px width
no color-only status meaning
icons always accompanied by accessible names
Hindi/regional text expansion allowed without clipping
currency uses Rs or the rupee symbol consistently
numbers use Indian grouping where useful
voice and scan are alternatives, not mandatory paths
offline/retry states use plain language
```

## 18. Backend Read Models And Commands

Screen 74 read model:

```text
RetailWorkspaceHome
WorkspaceIdentity
WorkspaceAvailability
SellReadiness
OrderAttentionSummary
StockHealthSummary
ProcurementAttentionSummary
InboundSummary
MoneyExceptionSummary
PriorityActionQueue
UnreadAggregation
LastSyncState
```

Commands routed from Screen 74:

```text
SetOrderAcceptance
OpenExactAction
ResumeSellSetup
StartProcurement
SearchWorkspace
ScanWorkspaceItem
OpenCustomerOrders
OpenStock
OpenChatContext
```

Screen 74 must not directly mutate inventory, money or order state without the owning domain command and idempotency key.

## 19. Domain Ownership Boundaries

```text
Catalog owns master SKU identity.
Retail Catalog owns shop product configuration.
Inventory owns stock events and availability.
Procurement owns source outcomes, purchase baskets and purchase orders.
Inbound owns dispatch, receipt and discrepancy.
Orders owns consumer reservations and fulfilment.
Payments owns collections, supplier payments, settlements and reversals.
Ledger owns append-only economic records.
Offers owns retailer and funded campaign rules.
Chat owns contextual customer/supplier/support threads.
Workspace Home owns only the composed attention read model and navigation.
```

These boundaries are required to prevent later screen changes from regressing stock, orders or payments.

## 20. Compliance And Trust Gates

```text
verified workspace before procurement or selling
GST status visible where relevant, with approved pending treatment
FSSAI and other category proof when the product or retailer category requires it
licensed pharmacy workflow kept separate from normal grocery
GST invoice and HSN/tax data from the authorized source
batch and expiry for applicable FMCG/health products
clear short-supply, damage, return and refund terms
role-based staff permissions
audit trail for price, stock and payment changes
customer communication only with purpose and consent
```

## 21. Analytics Events

```text
retail_home_viewed
priority_action_opened
sell_setup_started
sell_setup_resumed
buy_stock_opened
wholesale_recommendation_opened
order_queue_opened
stock_opened
workspace_search_submitted
barcode_scan_started
order_acceptance_changed
mool_personal_toggle_used
work_pulse_opened
```

Analytics must not replace business events or ledger proof.

## 22. Screen 74 Approval Gates

Screen 74 HTML cannot be approved until all checks pass:

```text
Retailer can identify Sell and Wholesale Buy without explanation.
First-time retailer sees one progressive setup action.
Procurement remains accessible before consumer go-live.
One urgent action is prioritized without hiding other counts.
Orders, Stock, Wholesale Buy and Chat are one tap away.
Mool returns to personal/social focus in one tap.
No endless supplier/product directory appears on Home.
No duplicated main and sub navigation words.
All labels fit at 320, 360, 390 and 430 px.
No important content is covered by the dock.
Loading, empty, offline and failure states are demonstrated.
Stock, order and money changes use owned domain commands.
No console error or horizontal overflow occurs.
Approved Screens 00-73 remain unchanged.
```

## 23. HTML Prototype Plan After Approval

The Screen 74 HTML prototype should implement these interactive review states:

```text
1. First entry with incomplete selling setup and active Wholesale Buy
2. Live retailer home with no urgent event
3. New customer order as highest-priority action
4. Low-stock recommendation with wholesale decision preview
5. Inbound delivery ready for goods receipt
6. Shop paused and safe resume
7. Offline/sync warning
8. Mool personal/work toggle demonstration
```

The prototype should use state controls outside the production phone frame for review. No planning text or state-switch controls may appear inside the production-facing app UI.

## 24. Decision Required Before HTML

Approve or revise these four structural choices:

```text
1. Screen 74 is Retailer Operating Home, not setup.
2. Persistent dock is Mool | Orders | Stock | Wholesale Buy | Chat; tapping the shop identity returns Home.
3. First-run sell setup is progressive, while Wholesale Buy is immediately accessible.
4. Home shows one expanded urgent action plus compact Sell, Wholesale Buy and Business Today status.
```

These choices were locked before the Screen 74 draft was implemented. The screen remains unapproved until production-facing UI and interaction review is complete.
