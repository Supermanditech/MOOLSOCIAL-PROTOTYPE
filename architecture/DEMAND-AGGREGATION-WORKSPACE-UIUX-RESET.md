# MoolSocial Demand-Aggregation Workspace UI/UX Reset

Status: INTELLIGENCE LAYER; REFINED BY RETAILER-HYBRID-B2B-B2C-OPERATING-APP-LOCK.md

For practical retailer module architecture, read `RETAILER-HYBRID-B2B-B2C-OPERATING-APP-LOCK.md` after this document.

Last updated: 11 July 2026 IST

Supersedes: Feature-first retailer workspace and the current Screen 74 operating-dashboard draft

## 1. Why The Previous Direction Is Wrong

The previous Screen 74 organized retailer tools:

```text
Orders
Stock
Wholesale Buy
```

That is a useful ERP or shop-management structure, but it is not MoolSocial's differentiating business model.

MoolSocial is a Demand Operating System. The primary UI must organize outcomes created from aggregated demand:

```text
sell more because customer demand is known
buy better because business procurement demand is aggregated
complete the actions required to lock and fulfil those outcomes
```

Orders, products, inventory, purchase orders, delivery and ledgers remain essential, but they are execution tools inside those outcomes. They are not the top-level product story.

## 2. Correct Economic Architecture

```text
Consumer and household needs
-> aggregated local demand
-> retailer offer and fulfilment capacity
-> retailer procurement need
-> aggregated B2B demand
-> manufacturer / brand / distributor / wholesaler source offer
-> payment and supply lock
-> inbound fulfilment
-> local consumer fulfilment
-> proof, settlement, attribution and repeat demand
```

Social content, creators, business pages and chats strengthen every stage:

```text
explain the need
educate the buyer
confirm interest
form the pool
unlock price
complete fulfilment
show proof
create repeat demand
```

This is socio-commerce. Social is not a separate entertainment layer pasted beside commerce. It helps convert economic intent into trusted, measurable action.

## 3. Shared Workspace Outcome Model

Every business workspace has three user-facing operating worlds.

### A. Grow The Sell Side

Show what verified customers, buyers, patients, diners or audiences need and what the workspace can do to capture that demand.

### B. Improve The Buy Side

Show what the workspace needs to procure and how aggregation, source matching, price slabs, terms and timing can improve the purchase outcome.

### C. Complete The Outcome

Show only the urgent work required to convert matched demand and supply into fulfilment, proof, payment and settlement.

Backend names remain:

```text
Demand Vault
Matching Engine
Campaign Engine
Fulfilment
Ledger
```

Those names must not appear in normal user UI.

## 4. Role-Specific Language

The economic model is shared, but action words must fit the user's work.

| Workspace | Sell-side outcome | Buy-side outcome | Completion world |
|---|---|---|---|
| Retailer / Shop | Sell More | Buy Better | Run Shop |
| Manufacturer / Factory | Find Buyers | Buy Materials | Run Factory |
| Supplier / Distributor | Buyer Demand | Source Goods | Run Trade |
| Restaurant / Tiffin | Get Orders | Buy Supplies | Run Kitchen |
| Salon / Service Provider | Get Bookings | Buy Supplies | Run Service |
| Doctor / Clinic | Appointments | Clinic Needs | Run Clinic |
| Captain / Delivery | Get Trips | Vehicle Needs | Run Trips |
| Creator | Grow Audience | Find Campaigns | Run Studio |
| Freelancer | Find Work | Work Needs | Complete Work |

The exact words may be refined, but a generic fixed `Orders | Stock | Wholesale Buy` architecture must not be reused for every role.

## 5. Locked Retailer Navigation

Retailer workspace dock:

```text
Mool | Orders | Stock | Wholesale Buy | Chat
```

Meaning:

```text
Mool = one-tap return to personal/social/consumer focus
Orders = confirmed customer demand, active customer orders, fulfilment and order exceptions
Stock = products, current quantities, availability, pricing and sell-side capacity
Wholesale Buy = procurement needs, aggregated retailer quantity, source prices, terms and wholesale commitments
Chat = customers, suppliers, orders, workspace and support
```

The shop identity in the header returns to the Retailer Outcome Home. The Home content remains demand-led through `Sell More`, `Buy Better` and `Complete Now`, but those are outcome sections and states rather than permanent dock labels.

## 6. Correct Screen 74 Purpose

Screen 74 becomes the **Retailer Outcome Home**.

It must answer:

```text
What customer demand can I capture now?
What should I procure better now?
What action must I complete now?
What value can be created if I act?
```

It must not open with:

```text
static sales figures
inventory counts
feature navigation
generic setup checklist
supplier catalog
ERP dashboard tiles
```

Those may appear only when they support a current outcome.

## 7. Screen 74 Information Hierarchy

### A. Identity And Availability

```text
shop name
area / service zone
accepting-customer-orders state
urgent event count
```

### B. Ask / Search / Scan

One workspace action assistant accepts:

```text
I want more customers for atta
I need 20 cases of oil next week
show today's orders
which product will run out
find a better price for detergent
```

The response is a direct action or a few decision-ready outcomes, not a directory.

### C. Best Next Outcome

One expanded action selected by outcome probability, value, urgency and readiness.

Examples:

```text
86 nearby households need a monthly staples basket
Join with price and capacity

31 shops need 740 cases of cooking oil
Add your required quantity to unlock the next slab

Customer pool reached its threshold
Confirm stock and fulfilment by 5 PM
```

### D. Sell More

Show a maximum of two compact demand outcomes:

```text
nearby customer need
repeat basket opportunity
price request
group-price pool
funded manufacturer offer suitable for the retailer's customers
creator-supported local campaign
```

Each outcome answers:

```text
what customers need
area and timing
confirmed or forming quantity
price/benefit expected
retailer capacity required
estimated sales or margin
fulfilment responsibility
next action
```

### E. Buy Better

Show a maximum of two procurement outcomes:

```text
replenishment demand aggregated with other retailers
source offer matching the retailer's recurring need
price slab close to unlocking
repeat wholesale basket
credit/payment term opportunity
local pickup versus delivered landed cost
```

Each outcome answers:

```text
product, pack and case
retailer's needed quantity
total pool quantity
current and next price slab
landed cost
payment/credit terms
delivery time
GST invoice
shortage/damage/return rule
next action
```

### F. Complete Now

Show only live dependencies that can block an outcome:

```text
confirm customer order
lock customer-pool quantity
pay token or balance
confirm source offer
receive inbound goods
resolve shortage/damage
dispatch consumer order
upload fulfilment proof
reply to customer/supplier
resolve payment/refund
```

## 8. Natural Actions That Capture Demand

Users should not fill a form called Demand Vault.

Retailer sell-side actions:

```text
I can supply
Confirm price
Confirm quantity
Serve this area
Make an offer
Invite customers
Run again next month
```

Retailer buy-side actions:

```text
I need this
Add quantity
Set target price
Join price
Lock order
Buy again
Need next month
```

Every natural action silently records structured demand:

```text
who
what
where
when
quantity
target price
intent strength
payment readiness
fulfilment readiness
expiry / repeat rule
```

## 9. Demand Lifecycle In User Language

Backend state and user-facing state must be separated.

| Backend state | Retail sell-side wording | Retail buy-side wording |
|---|---|---|
| SOFT / PLANNED | Customer interest | Planned need |
| FORMING | Customers joining | Shops joining |
| PRICE_AVAILABLE | Price ready | Wholesale price ready |
| THRESHOLD_REACHED | Orders ready | Better price unlocked |
| TOKEN_CONFIRMED | Customers confirmed | Quantity confirmed |
| PAYMENT_CONFIRMED | Paid orders | Purchase locked |
| FULFILMENT | Pack and deliver | Source dispatching |
| SETTLED | Sale completed | Purchase received |
| FAILED / REFUNDED | Refunded / retry | Released / refunded |

## 10. B2C Demand Flow

```text
Consumer saves need, basket, price target or repeat requirement
-> local demand pool forms
-> matching engine finds verified retailers and fulfilment capacity
-> retailer sees outcome, not a lead list
-> retailer confirms price, quantity, area and time
-> consumer sees a decision-ready offer
-> social/creator/business communication may educate and activate matched users
-> threshold/payment/stock readiness locks
-> retailer fulfils
-> sale, stock, payment and attribution ledgers update
-> repeat need is scheduled with consent
```

## 11. B2B Demand Flow

```text
Retailer records planned or urgent procurement need
-> similar retailer needs aggregate by SKU, geography and timing
-> matching engine evaluates manufacturer, brand, distributor, stockist and wholesaler supply
-> qualified source outcomes compete on landed cost, MOQ, terms, delivery and trust
-> retailer sees a few source outcomes
-> retailers join quantity or lock order
-> threshold and payment readiness confirm
-> source dispatches
-> retailer receives and records accepted, short and damaged quantity
-> inventory and purchase ledger update
-> source and retailer reputation update
```

## 12. Manufacturer And Supplier Reciprocal UI

Retailer demand must create a corresponding source-side outcome.

Manufacturer `Find Buyers` sees:

```text
verified buyer demand by SKU, area and delivery window
confirmed versus forming quantity
price slab requested
payment readiness
required fulfilment route
```

Supplier `Buyer Demand` sees the same pool only when the supplier is verified, serviceable and commercially eligible.

Source users do not browse a directory of retailers. They see qualified demand outcomes and the exact terms required to serve them.

## 13. Social-Commerce Integration

Social activity participates only when it helps an economic outcome.

Examples:

```text
creator explains a household basket offer
retailer posts a verified local price
manufacturer educates users about a product
customers share a forming group price
business page shows fulfilment proof
repeat buyers follow the shop
```

The system attributes:

```text
viewed explanation
expressed interest
joined demand
confirmed order
completed transaction
creator/business contribution
```

No payout is based only on empty reach or unverified sharing.

## 14. Decision-Ready Outcome Card

Every demand outcome card must answer:

```text
What outcome is possible?
Who needs it or can supply it?
Where and when?
How much quantity is confirmed and still needed?
What price is current and what price can unlock?
What payment/token is required?
What fulfilment is ready?
What trust/proof exists?
What happens if the threshold fails?
What is the next action?
```

The card should not expose backend engine names.

## 15. Home Ranking Logic

The Retailer Outcome Home ranks actions by:

```text
outcome readiness
confirmed economic value
expiry / SLA
user benefit
matching confidence
payment readiness
fulfilment readiness
risk / compliance
repeat potential
```

Only one outcome expands. Other outcomes remain compact and scannable.

## 16. First-Time Retailer Experience

Verification alone does not justify opening an ERP setup checklist.

The first screen should ask through actionable cards:

```text
What do you sell?
What do you need to buy?
Where can you serve customers?
```

Low-effort inputs:

```text
scan products
upload purchase bill / CSV
choose master SKUs
connect billing/POS later where supported
select service area
confirm pickup/delivery
```

These inputs simultaneously build:

```text
sell capacity
procurement demand
inventory readiness
consumer publication readiness
```

Setup must therefore feel like activating demand and supply, not filling business software forms.

## 17. What Run Shop Contains

`Run Shop` is the operational tool layer:

```text
customer orders
products and inventory
purchase orders
inbound goods receipt
counter sales
pickup and delivery
payments and refunds
invoices
customers
offers and campaigns
money and ledgers
AI action drafts
staff permissions
```

It is important but secondary to `Sell More` and `Buy Better` on the demand-led Home.

## 18. Work Pulse And Personal Access

Mool remains the one-tap personal/work switch.

While the retailer watches Social or uses personal commerce, Work Pulse may show:

```text
customer pool reached threshold
wholesale price unlocked
order acceptance expiring
source delivery arrived
payment or fulfilment exception
```

Tap opens the exact outcome. No automatic context switch is allowed.

## 19. Backend Domain Contracts

Shared demand kernel:

```text
DemandEntry
DemandPool
IntentResponse
OutcomeMatch
OutcomeCard
CampaignContract
DependencyState
PriceSlab
PaymentReadiness
FulfilmentReadiness
AttributionEvent
OutcomeLedger
```

Role-owned operations:

```text
RetailCatalog
InventoryLedger
CustomerOrder
ProcurementOrder
InboundReceipt
Payment / Settlement
Customer / Supplier Chat
```

The Outcome Home reads composed projections. It never directly mutates inventory, orders or money.

## 20. Corrected Screen Sequence Direction

Do not number every backend step yet.

Recommended prototype order:

```text
74 Retailer Outcome Home
75 Sell More: matched consumer demand
76 Sell More: confirm offer/capacity and activate customers
77 Buy Better: retailer procurement needs and aggregated pool
78 Buy Better: source outcomes, quantity and price lock
79 Run Shop: live outcome completion queue
80 Goods receipt / customer fulfilment / settlement branches as required
```

Products, inventory and ledgers become focused routes within `Run Shop`, not the definition of Screen 74.

## 21. Architecture Approval Questions

Before replacing Screen 74 HTML again, approve or revise:

```text
1. Shared workspace model = Grow sell side + Improve buy side + Complete outcome.
2. Retailer Home outcome sections = Sell More | Buy Better | Complete Now.
3. Retailer dock = Mool | Orders | Stock | Wholesale Buy | Chat.
4. Screen 74 = Retailer Outcome Home, centered on matched demand outcomes.
5. Products, stock, orders and wholesale catalogs move inside Run Shop or focused outcome flows.
6. Social and campaigns appear only as contributors to measurable demand outcomes.
```

No new Screen 74 HTML should be created until these six architecture decisions are locked.
