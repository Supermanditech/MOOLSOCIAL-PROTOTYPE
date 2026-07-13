# MoolSocial Retailer Hybrid B2B-B2C Operating App Architecture

Status: CONTROLLING RETAILER PLAN; SCREEN 74 APPROVED

Last updated: 11 July 2026 IST

Applies from: Retailer workspace entry after Screen 73

## 1. Product Definition

The retailer workspace combines four systems:

```text
1. Wholesale commerce comparable in ease to a modern B2B marketplace
2. Business books comparable in usefulness to small-business accounting software
3. Retailer-to-consumer ordering, pickup and home delivery
4. MoolSocial demand aggregation, social conversion and outcome matching
```

This is not four disconnected products. One catalog, inventory ledger, order engine, money ledger, customer/supplier identity and fulfilment system must support all four.

## 2. Locked Retailer Dock

```text
Mool | Orders | Stock | Wholesale Buy | Chat
```

Meaning:

```text
Mool = one-tap switch to personal/social/consumer focus
Orders = every customer sale and its pickup/delivery fulfilment
Stock = retailer catalog, quantities, availability, prices and inventory statement
Wholesale Buy = B2B browse, compare, negotiate through structured terms, purchase and receive
Chat = customers, suppliers, delivery, order, workspace and support conversations
```

The shop identity in the header returns to the retailer Home. No separate Home dock item is added.

## 3. Screen 74 Purpose

Screen 74 becomes the **Retailer Business Home**.

It is a compact operating command surface that answers:

```text
What customer order needs action?
What must be delivered or picked up?
What inventory needs attention?
What should I buy wholesale today?
What did I sell and purchase today?
What money is due, received or blocked?
What aggregated demand can help me sell or buy better?
```

It must not be a wholesale catalog, accounting report or inventory editor itself. Those open as focused modules through one tap.

## 4. One Transaction Truth

Every transaction channel writes to the same operating system.

Customer sales may start from:

```text
MoolSocial consumer app order
walk-in counter sale
customer phone call to the retailer
customer MoolSocial Chat message
repeat basket
local demand/group-price outcome
```

Wholesale purchases may start from:

```text
Wholesale Buy browse/search
barcode/SKU search
low-inventory recommendation
purchase-bill repeat
retailer-created procurement requirement
aggregated retailer demand pool
manufacturer/distributor source offer
```

All channels update the same:

```text
products
inventory
orders
invoices
delivery
payments
sales/purchase ledgers
customer/supplier history
```

## 5. Orders Module

`Orders` is the complete retailer-to-consumer sales and fulfilment module.

### Order sources

```text
App order
Counter sale
Phone order
Chat order
Repeat order
Demand-pool/group order
```

Every order clearly displays its source.

### Phone-call order flow

```text
Customer calls retailer
-> retailer taps New Order
-> enters or selects customer mobile number
-> adds products by search, barcode, recent basket or voice
-> confirms price and available quantity
-> chooses counter pickup or home delivery
-> selects payment method
-> confirms order
-> inventory is reserved
-> invoice/order link is sent through allowed channel
-> delivery is assigned if required
```

This lets existing offline retailer relationships move into MoolSocial without forcing the customer to place the first order personally.

### Counter sale flow

```text
scan/search product
-> quantity
-> customer mobile optional for invoice/loyalty with notice
-> cash/UPI/card/credit where enabled
-> invoice
-> completed sale debits inventory
```

### Consumer app order flow

```text
consumer chooses retailer outcome
-> inventory reserved
-> retailer accepts
-> pack
-> pickup or delivery
-> proof
-> completed sale
-> inventory and money ledger update
```

### Order states

```text
New
Accepted
Packing
Ready for pickup
Delivery requested
Out for delivery
Delivered
Completed
Cancelled
Refund / issue
```

### Cannot-fulfil rerouting

When a retailer cannot fulfil before acceptance, the order does not simply fail or return the customer to search.

```text
retailer reports one structured reason
-> system begins immediate replacement matching
-> replacement must hold available-to-promise stock for the complete order
-> stock freshness, shop distance and open capacity are checked
-> acceptance SLA and on-time fulfilment history are ranked
-> original customer payment and promised price remain protected
-> original retailer reservation releases only after replacement acceptance
-> customer sees one continuous order reference and updated fulfilment party
```

Partial-stock retailers are excluded from an exact-order reroute unless the customer has explicitly accepted a split fulfilment outcome.

## 6. Home Delivery Operating Model

For every eligible order, the retailer chooses:

```text
Counter pickup
Retailer's own delivery
MoolSocial delivery partner
```

MoolSocial delivery flow:

```text
retailer confirms packed order
-> taps Request Delivery
-> pickup and customer address are validated
-> fare and ETA are shown
-> retailer/customer payment responsibility is clear
-> verified delivery partner accepts
-> retailer sees captain and vehicle
-> pickup proof
-> live status
-> customer delivery proof/OTP
-> delivery settlement
```

A customer phone call can therefore become a structured app order and app-managed home delivery without the customer repeating the order in the app.

## 7. Stock Module

`Stock` is the retailer's current catalog and inventory truth.

### Initial onboarding

The retailer builds the shop catalog through:

```text
master SKU catalog
barcode scan
category selection
purchase invoice/bill import
CSV upload from web
CSV upload from mobile Files/cloud/share sheet
new local/unmatched product review
```

### Product fields

```text
item and master SKU
photo
brand
variant / quality
pack size and unit
barcode
MRP
retailer selling price
purchase cost
GST / HSN where applicable
available quantity
low-inventory level
pickup / delivery availability
batch / expiry where applicable
```

### Daily inventory behavior

Inventory should update automatically from captured events:

```text
accepted wholesale receipt increases inventory
completed customer/counter sale decreases inventory
customer return increases sellable or damaged quantity after inspection
supplier return decreases inventory
order reservation reduces available-to-promise
cancelled order releases reservation
damage/expiry moves quantity out of sellable inventory
manual adjustment requires reason
```

The retailer should not manually recount every SKU daily. The app provides a short daily exception check:

```text
products running low
negative/conflicting quantity
high-selling products needing count
products not sold through MoolSocial/POS
damaged/expired products
unreceived wholesale purchase
```

### Inventory availability statement

```text
opening quantity
purchases received
sales completed
returns
adjustments
reserved quantity
damaged/expired quantity
closing physical estimate
available to promise
inbound confirmed
```

The statement is available by day, week, month, SKU, category and branch.

## 8. Wholesale Buy Module

`Wholesale Buy` uses the browsing ease of a large B2B commerce app while preserving MoolSocial's operated, verified transaction rules.

### Wholesale Home

```text
search item, brand, SKU or barcode
category navigation
buy again
running-low recommendations
price-drop/source offers
nearby delivery offers
credit-eligible offers
aggregated price pools
recently purchased
```

### Product listing card

Every card shows enough for initial comparison:

```text
product image and exact SKU
brand, variant and pack
case configuration
price from / current slab
MOQ
GST invoice
delivery date or lead time
verified source
```

### Product detail and source outcomes

```text
unit, inner pack and case
MOQ and order multiple
quantity-based price slabs
price before/after tax
landed cost to retailer
available quantity
estimated margin against retailer selling price
manufacturer/distributor/wholesaler identity
source verification and performance
payment terms
approved credit terms
delivery terms and responsibility
delivery time
batch/expiry where relevant
shortage, damage and return rule
offer validity
```

### Wholesale actions

```text
Add case
Buy now
Add quantity
Join price
Request structured quote
Buy again
Save need
Compare terms
```

Outside negotiation is prohibited. A quote request must return structured price, quantity, tax, delivery, payment and validity terms inside MoolSocial.

### Wholesale checkout

```text
purchase basket
MOQ validation
case/order multiple validation
price slab validation
GST and landed-cost summary
delivery address
payment/credit selection
return and shortage terms
purchase order
```

### Inbound and goods receipt

```text
source confirmation
dispatch and tracking
invoice/e-way details where applicable
expected cases and units
received quantity
short quantity
damaged quantity
batch/expiry capture where applicable
credit-note/claim
accepted quantity credits inventory
purchase ledger and payable update
```

Placing a purchase order never increases inventory. Only accepted goods receipt does.

## 9. Marketplace-Style UX Without Becoming A Directory

The Wholesale Buy section may use familiar B2B commerce patterns:

```text
categories
search
filters
product cards
product detail
source comparison
basket
purchase order
tracking
```

But MoolSocial remains an operated socio-commerce platform:

```text
only verified/serviceable sources appear
every offer has price/MOQ/terms/time
payment and fulfilment stay inside MoolSocial
demand can aggregate across retailers
failed thresholds have release/refund rules
no supplier phone directory
no unpriced lead listing
```

## 10. QuickBooks-Style Business Book

The app should provide equivalent small-business accounting utility, but must not use `QuickBooks` as a MoolSocial feature name.

Recommended user-facing name:

```text
Business Book
```

Business Book is visible as a one-tap band on Retailer Home and from relevant Orders, Stock and Wholesale Buy transactions.

### Automated books

```text
daily sales
daily purchases
sales ledger
purchase ledger
inventory ledger and valuation
cash, UPI, bank and card receipts
supplier payments
customer receivables where credit is enabled
supplier payables
expenses
returns, refunds and credit notes
gross margin estimate
profit and loss summary
GST input/output summary where configured
invoice register
payment reconciliation
```

### Reports

```text
Today
Week
Month
Custom period
SKU/category/brand
customer
supplier
payment method
branch
```

### Accountant/CA support

```text
export statements
download invoice register
GST-ready data export where compliant
role-based accountant access
audit trail
period lock
```

No double entry should be required for a transaction already completed through Orders or Wholesale Buy.

## 11. Customer Invoice And WhatsApp

Every completed sale creates a retailer invoice/receipt.

Delivery options:

```text
MoolSocial Chat
in-app receipt
WhatsApp Business approved template/link with customer consent
SMS/download link where enabled
QR receipt
print
```

Phone number collection rules:

```text
invoice purpose is disclosed
marketing consent is separate
invoice cannot be withheld if marketing consent is refused
customer can access the invoice without installing the app
MoolSocial join link may accompany the invoice where permitted
```

## 12. Customers And Retention

The retailer may view purpose-limited customer history:

```text
orders and invoices
repeat basket
last purchase
delivery preference
open issue/refund
loyalty/offer eligibility
communication permission
```

Retention actions:

```text
repeat basket reminder
festival offer
price-drop notification
back-in-stock notification
group-price invitation
shop loyalty benefit
```

Messages are sent only through permitted channels and consent rules.

## 13. Demand Aggregation Layer

Demand aggregation improves the three operating modules without replacing them.

### B2C aggregation

```text
consumer baskets and future needs aggregate by area/time/SKU
retailer sees qualified local demand
retailer confirms capacity and price
consumer receives decision-ready outcome
retailer fulfils pickup/delivery
```

### B2B aggregation

```text
retailer procurement needs aggregate by SKU/area/time
combined quantity approaches source MOQ or better price slab
manufacturer/distributor/wholesaler competes on verified terms
retailers lock quantity/payment
source fulfils aggregated order
```

### Social-commerce contribution

```text
creator explains offer
retailer shares verified local price
manufacturer educates matched buyers
customers join forming demand
fulfilment proof builds trust
```

The Home screen shows only useful actions such as:

```text
Customers need this
Better price forming
Wholesale price unlocked
Confirm quantity
Serve this area
Buy again
```

## 14. Screen 74 Retailer Home Structure

### Header

```text
shop identity and branch
accepting-orders state
Business Book shortcut
alerts
```

### Search / Ask / Scan

```text
search customer order
search shop product
search wholesale product
scan barcode
voice action
```

### Act Now

One expanded urgent action:

```text
accept customer order
create delivery from phone order
confirm running-low quantity
lock wholesale price
receive wholesale delivery
resolve payment/invoice issue
```

### Business Today

Compact and actionable:

```text
sales
purchases
cash/UPI received
payable/receivable exception
estimated margin
```

### Smart Opportunities

Maximum two cards:

```text
local customer demand opportunity
wholesale procurement/price opportunity
```

### Dock

```text
Mool | Orders | Stock | Wholesale Buy | Chat
```

## 15. Essential Retailer Pain Points Covered

```text
fragmented wholesale prices -> comparable landed-cost outcomes
MOQ too high -> aggregate retailer demand / join quantity
unclear delivery/payment terms -> visible before commitment
inventory mismatch -> shared event-based inventory ledger
manual daily stock work -> automatic event updates plus exception count
phone orders outside system -> New Order from call
home delivery difficulty -> MoolSocial delivery request
counter and app stock conflict -> one available-to-promise quantity
duplicate accounting -> automatic Business Book entries
supplier/customer dues -> payable/receivable statements
invoice sharing -> in-app/WhatsApp/SMS/QR/print options
slow inventory -> offers and controlled retailer liquidation
customer retention -> repeat basket, loyalty and consented offers
```

## 16. Core Event Rules

```text
PURCHASE_ORDER_PLACED creates commitment, not inventory
GOODS_ACCEPTED increases inventory and purchase ledger
CUSTOMER_ORDER_ACCEPTED reserves inventory
SALE_COMPLETED decreases physical inventory and creates sales ledger
COUNTER_SALE_CAPTURED follows the same sale rule
CUSTOMER_RETURN_INSPECTED updates sellable/damaged inventory
SUPPLIER_CLAIM_APPROVED creates debit/credit-note adjustment
DELIVERY_COMPLETED closes fulfilment and delivery settlement
PAYMENT_SETTLED updates money ledger
```

All commands require workspace ID, operator ID, idempotency key and audit history.

## 17. Domain Architecture

```text
Workspace and permissions
Master catalog
Retail catalog
Inventory
Customer orders
Wholesale commerce
Procurement orders
Inbound/goods receipt
Delivery orchestration
Payments and settlements
Business Book / accounting projections
Invoices and tax documents
Customer and supplier relationships
Chat
Demand aggregation and matching
Campaign and attribution
Notifications / Work Pulse
```

These domains can begin in a modular monolith for MVP with strict module contracts and event ownership. They should not begin as many independently deployed microservices unless scale or team ownership requires it.

## 18. Required Focused Screens After Screen 74

Exact numbering remains pending, but the prototype must eventually include:

```text
Retailer Business Home
Orders inbox
Create phone/counter order
Order detail and fulfilment
Request home delivery
Stock catalog and onboarding
Stock item detail and adjustment
Daily inventory statement
Wholesale Buy home/categories/search
Wholesale product listing
Wholesale product/source detail
Wholesale basket/purchase order
Payment/credit confirmation
Wholesale order tracking
Goods receipt and discrepancy
Business Book home
Sales/purchase/inventory statements
Invoice and WhatsApp sharing
Customers and retention
```

## 19. Product-First Commerce UI Lock

`Wholesale Buy` and `Stock` must be product-first, not long operational lists.

### Wholesale Buy

```text
compact two-column product grid on mobile
product image, brand and exact product title
case/pack configuration
landed unit price
MOQ in cases
delivery time
payment term or advance percentage
delivery mode and responsible party
offer or deal signal
one-tap buying terms for supplier, payment/credit, protected advance release, freight, case value, source, area and invoice issuer
one-tap Add to Cart inserts the supplier's exact MOQ
cart quantity control
checkout with delivery, payment and GST profile
purchase-order confirmation
```

Long left-to-right procurement rows are rejected. The catalog surface must maximise the number of readable product titles while keeping only decision-changing information visible. Complete commercial and supplier terms remain one tap away and must be reviewed before purchase-order confirmation.

The commercial terms are supplier-specific and locked into the purchase order. Inventory increases only after goods receipt, never when a product is merely added to cart or when the purchase order is placed.

### Stock

```text
My Stock is the default and final retailer inventory view
My Stock contains only products selected or created by that retailer
every live card shows quantity, purchase price, selling price, pack, campaign and consumer visibility
Add from Catalog is a separate acquisition mode, not the final stock ledger
prebuilt governed master product catalog
one-tap Add to Shop from a product tile
editable quantity, purchase price, selling price and pack size
product-level consumer visibility only after quantity and selling price are live
retailer campaign choice during setup or later from Campaigns
New Product flow for items missing from the master catalog
photo/barcode/SKU input and catalog review for unmatched products
CSV, purchase bill and barcode bulk/assisted input retained
```

The retailer-facing grid may show representative catalog items while the production catalog remains server-driven and searchable at scale.

For catalogs with 10,000 or more SKUs, the production UI must use server-side search, category filters, barcode lookup and paginated or virtualized lazy loading. It must never render the complete master catalog into the phone at once. After an item is saved, the user returns to `My Stock` and the SKU appears there immediately.

## 20. Screen 74 Approval Status

```text
Current Screen 74 HTML: APPROVED AND FROZEN
Current Screen 74 architecture: replaced by this controlling plan
Screen 74: last approved production-facing screen
```

Screen 74 implements the approved Home hierarchy, separated My Stock and master catalog, and complete Wholesale Buy cart-to-purchase-order flow. The approved copy is frozen in `approved-final/screens/74-retail-products-stock-setup.html`.

## 21. Screen 81 Production-Scale Catalog Contract

Screen 81 must support 30,000-50,000 or more canonical SKUs and millions of supplier offers without becoming a supplier directory.

```text
one canonical product tile per SKU/pack/variant
supplier offers remain behind the canonical SKU
duplicate supplier product tiles are prohibited
MoolSocial ranks and selects the best actionable area-wise offer
only verified, serviceable, stock-confirmed and fulfilment-ready supply is actionable
price, MOQ, delivery, payment terms, reliability and demand aggregation influence ranking
next ranked verified offer becomes fallback when the primary offer is unavailable
```

The mobile client must never download the complete catalog or all supplier offers. Discovery is server-driven using search-as-you-type, barcode lookup, category hierarchy, decision filters, opaque cursor pagination and virtualized progressive loading. A normal result window should begin at 24 products and fetch subsequent windows only as required.

The catalog tile exposes only:

```text
brand
exact product name
pack or variant
wholesale unit price
MOQ
delivery
offer or deal
Add to cart
```

One-tap buying terms expose case value, supplier payment, verified source, supply area, invoice issuer and materially better alternative verified supply. `Add to cart` inserts the selected supplier offer's exact MOQ. Price, available-to-promise stock and commercial terms must be revalidated by the server before purchase-order confirmation.

The matching/query layer requires a dedicated denormalized catalog and offer read model. Product images must be responsive, lazy-loaded and CDN-backed. Every procurement command carries workspace ID, operator ID, selected offer ID, locked commercial terms and an idempotency key.
