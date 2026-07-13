# MoolSocial Retailer Workspace Operating Architecture Lock

Status: LOCKED PRODUCT SCOPE; SCREEN 74 REQUIRES REDESIGN

Last updated: 11 July 2026 IST

Applies from: Screen 74 onward

## 1. Product Boundary

The Retailer workspace is a two-sided operating system, not a marketplace listing tool.

```text
Sell side = catalog, stock, prices, customer orders, counter sales, delivery, offers and invoices
Buy side = wholesale discovery, procurement, purchase orders, inbound delivery and supplier terms
Shared operating truth = event-based stock and money ledgers
```

One verified personal account owns or operates the workspace. Consumer and social access remains available outside the workspace.

### Full FMCG Operating App Correction

The retailer experience must be designed as a complete B2B and B2C operating app, not as a sequence of disconnected setup utilities.

```text
Upstream B2B = FMCG manufacturer / brand / distributor / wholesaler -> retailer
Retail operations = procurement -> inward receipt -> inventory -> pricing -> offers -> order fulfilment
Downstream B2C = retailer -> nearby consumer / household
Shared truth = product master + purchase order + stock ledger + sales order + money ledger + returns
```

The app must support the complete operating chain:

```text
Manufacturer or wholesaler publishes verified sellable SKU, case pack, MOQ, slabs and terms
Retailer discovers or receives decision-ready supply options
Retailer compares landed cost, margin, credit, delivery and return terms
Retailer places and tracks procurement order
Retailer receives goods and records shortages, damage, batch and expiry where applicable
Accepted quantity credits retailer stock and purchase ledger
Retailer sets consumer price, pack/loose mode, fulfilment and offer rules
Consumer sees only retailer-confirmed available stock and decision-ready purchase terms
Consumer order reserves stock and confirmed fulfilment debits stock
Payment, invoice, settlement, return and refund update the same operating ledgers
```

Screen 74 must not be approved as only `Catalog and opening stock`. It must be redesigned as the first coherent retailer operating surface, from which the retailer can understand and enter both:

```text
Sell to customers
Buy stock for the shop
```

Stock is the shared bridge between those two flows. Setup may remain progressive inside the app, but it cannot make the retailer feel that they entered a one-purpose catalog uploader.

## 2. Retailer Catalog And Opening Stock

MoolSocial maintains a controlled master product catalog. A retailer adds only products actually stocked or intentionally ordered.

Every master SKU may contain:

```text
master_product_id
sku_id
barcode or GTIN where available
item name and regional-language aliases
brand or approved unbranded classification
product image
category and subcategory
pack size and unit of measure
variant and quality/grade
MRP where applicable
tax/HSN attributes where applicable
manufacturer/source identity
```

The retailer taps `+` to add a master SKU into the private shop catalog. Before save, the retailer may edit only shop-owned fields:

```text
opening stock quantity
selling pack or permitted loose unit
shop selling price
purchase cost where known
stock alert level
variant/grade actually stocked
retail or wholesale selling mode where enabled
pickup/delivery availability
```

Master identity fields such as barcode, manufacturer and regulated pack declarations cannot be silently overwritten. A correction request is sent to catalog review.

Product-image rule:

```text
Matched master SKU = reuse verified master image
Loose/fresh/local/unmatched item = retailer supplies a current clear image
Image replacement on a matched branded SKU = review required
```

Low-effort catalog inputs:

```text
search master SKU or brand
scan barcode or pack label
import purchase bill/invoice for matching
upload opening-stock CSV from web or mobile files
choose controlled category catalog
add loose, fresh, local or own product
```

CSV import uses one versioned template and an explicit review pipeline:

```text
download/use template
upload or share CSV from web/mobile
detect and map columns
match SKU/barcode/master product
flag duplicates, unknown products and invalid units
preview quantity, cost, price and alert changes
confirm draft import
write auditable inventory-import and opening-stock events
```

Supported columns may include SKU/barcode, item name, brand, pack size, variant/quality, opening quantity, purchase cost, selling price and low-stock threshold. Web supports drag/drop and file browse. Mobile supports the native Files/cloud picker and share-to-MoolSocial handoff. Unknown SKUs enter catalog review rather than being silently published.

An unmatched product remains `CATALOG_REVIEW` and is not consumer-visible until identity, category and required declarations are accepted.

## 3. Inventory Ledger

Inventory is event based. Never update one mutable stock number without a traceable event.

```text
PURCHASE_RECEIVED increases stock
CUSTOMER_SALE decreases stock
CUSTOMER_RETURN increases sellable or damaged stock according to inspection
SUPPLIER_RETURN decreases stock
STOCK_ADJUSTMENT changes stock with reason and operator
DAMAGE_OR_EXPIRY moves quantity out of sellable stock
LIQUIDATION_RESERVED reduces available stock
LIQUIDATION_SOLD completes transfer
ORDER_RESERVED reduces available-to-promise but not physical stock
ORDER_CANCELLED releases reservation
```

Wholesale purchases add stock only when quantity is received and accepted, not merely when the order is placed. Customer app orders reserve stock and debit it on confirmed fulfilment. Counter sales debit stock only when captured through MoolSocial billing/POS/scan or an approved integration.

The retailer always has stock adjustment with reason, proof where required and an audit trail.

## 4. Wholesale Procurement

`Wholesale Buy` is one tap from the retailer workspace dock. It is not a supplier directory.

Every procurement decision card must show:

```text
product and SKU
brand, pack and variant
available quantity
unit, case and wholesale price
MOQ and price slabs
tax/invoice status
delivery responsibility and delivery time
payment terms and credit terms where authorized
return, damage and short-supply rule
supplier/source verification
next action
```

The backend may compare verified suppliers, source partners, manufacturers and demand pools. The retailer receives a small number of actionable supply outcomes.

Confirmed procurement creates:

```text
purchase order
payment/credit obligation
inbound shipment
goods-received action
accepted quantity and discrepancy record
inventory ledger credit
purchase ledger entry
```

## 5. Retailer Daily Workspace

The live workspace dock keeps Mool and Chat fixed and makes these retailer actions one tap:

```text
Orders
Stock
Wholesale Buy
```

The workspace header shop identity returns to the Retailer Operating Home in one tap. A separate `Home` dock item is not used. `Stock` contains catalog, quantities, availability, pricing and inventory detail. `Wholesale Buy` contains procurement from verified manufacturers, brands, distributors and wholesalers.

The Home screen is attention-first, not a static feature directory. It prioritizes:

```text
customer orders awaiting acceptance
low-stock or predicted-out-of-stock items
inbound procurement and delivery exceptions
customer and supplier messages
unpaid or failed settlements
invoice/bill actions
slow or ageing inventory
offer and campaign opportunities
```

## 6. Sales, Bills, Customers And Consent

Retail sales may originate from app orders or recorded counter sales. Every completed sale creates a sales-ledger and inventory event.

Customer records may contain only purpose-limited data collected with notice and consent:

```text
customer account or consented mobile reference
purchase and invoice history
delivery preference/address when needed
communication permission
offer/marketing permission kept separately
support and return history
```

Taking a mobile number for an invoice does not automatically authorize marketing.

Invoice delivery options:

```text
MoolSocial Chat
in-app receipt
SMS/download link where enabled and consented
WhatsApp Business message through an approved integration and customer consent
print or QR receipt
```

A MoolSocial join/download link may accompany a permitted invoice message. It must not block receipt access or create forced consent.

## 7. Statements And Reports

The retailer can view and export:

```text
daily, weekly and monthly sales
purchase ledger
sales ledger
stock ledger
inventory valuation
gross margin estimate
supplier dues and payment status
customer orders, returns and refunds
invoices and tax records
slow, ageing, damaged and expiring stock
```

## 8. Retailer AI Assistant

The assistant works from permissioned workspace data and maintains an action audit log.

It may automatically:

```text
answer stock and order questions
draft purchase plans
forecast replenishment
identify slow or ageing stock
draft offers and festival campaigns
prepare product additions or edits
prepare supplier comparisons
prepare customer-service replies
```

It must request retailer confirmation before:

```text
placing or paying for procurement
deleting or hiding products
changing price or stock
publishing an offer or campaign
sharing customer data
starting liquidation
issuing refund or credit
sending external WhatsApp/SMS communication
```

Role permissions, amount limits, reversible drafts and audit history apply to owner, manager and staff actions.

## 9. Slow-Stock Liquidation

Eligible slow, excess or ageing inventory may be offered to nearby verified retailers through a controlled business liquidation event, not an open consumer auction.

Required inputs:

```text
SKU, batch and expiry where applicable
available liquidation quantity
condition and proof
reserve/floor price
bidding or fixed-price window
pickup/delivery responsibility
payment and settlement terms
return/dispute rule
eligible buyer area and profile
```

Reservation prevents double selling. Regulated, expired, unsafe, recalled or non-transferable inventory is blocked.

## 10. Offers And Campaigns

Retailers may create shop offers from selected stock and may participate in funded MoolSocial, manufacturer or supplier campaigns.

Offer creation can use:

```text
festival or local-event template
slow-stock recommendation
repeat-customer segment
basket threshold
time window
store pickup or delivery condition
funding source and margin guard
```

Offers remain drafts until price, stock, margin, expiry and communication permission checks pass.

## 11. Retailer App Flow Requirement

```text
74 Retail operating entry: sell to customers + wholesale buy + live operating attention
Product and opening-stock setup from the governed master SKU catalog
Retail price, pack, margin, sales mode and stock review
Counter pickup, delivery, payment, invoice and customer-consent setup
Retail workspace readiness and go-live decision
B2B wholesale procurement discovery, decision and purchase order
Inbound delivery, goods receipt, shortage/damage review and stock credit
Stock, batch, expiry and inventory ledger
Consumer orders, counter sales, bills and customer records
Supplier payments, customer settlements, returns and refunds
Retail AI assistant and approval queue
Slow-stock liquidation
Offers, funded campaigns and customer retention
```

Exact screen numbering after 74 will be finalized only after the complete end-to-end B2B-to-B2C information architecture is reviewed. Subflows may use progressive states within one screen where that reduces taps without hiding important decisions.

## 12. Regression Locks

Never:

```text
publish every master SKU merely because a retailer selected a category
pretend stock is accurate when counter sales are not captured
credit stock when a purchase order is placed but goods are not received
let AI spend money, change prices, delete stock or contact customers without permission
send WhatsApp marketing because a phone number was collected for an invoice
expose a customer contact list outside authorized workspace purposes
turn procurement into an endless supplier marketplace
allow slow-stock liquidation without ownership, condition and settlement controls
merge retailer private procurement data with consumer-facing catalog data
```
