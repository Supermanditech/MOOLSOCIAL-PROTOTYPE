# Supplier Offer, Payment Protection And Delivery Contract

Status: Locked for future manufacturer, authorised distributor, wholesaler and supplier workspaces.

This contract applies whenever a supplier publishes a product offer that can become actionable in retailer `Wholesale Buy`. It must be read before building any manufacturer, supplier, distributor, wholesaler, transport or procurement workspace.

## 1. Offer Publication Gate

A supplier cannot publish an actionable offer until the following fields are complete and validated:

```text
supplier workspace and authorised operator
canonical SKU, brand, variant and case pack
available-to-promise quantity
MOQ and quantity-price tiers
case rate, tax treatment and freight treatment
serviceable area, PIN code, zone or route
dispatch SLA
committed delivery window in hours or days
payment term
advance percentage where applicable
credit period and limit where applicable
delivery mode and responsible party
cancellation, shortage, damage and return rules
GST invoice eligibility and invoice timing
```

Incomplete offers remain drafts and cannot reach retailer decision surfaces.

## 2. Payment-Term Resolver

Every offer must use one explicit payment structure:

```text
100% advance
percentage advance plus balance before dispatch
percentage advance plus balance on delivery
payment on delivery / against delivery
approved credit purchase with exact credit days and due-date rule
buyer pickup with agreed payment event
```

The supplier enters the percentage or credit period. MoolSocial calculates the exact retailer-visible rupee amounts before order placement. Terms cannot change silently after a retailer adds the offer to an order. Any change blocks placement or dispatch and requires retailer reconfirmation.

## 3. Protected Advance And Settlement Boundary

When an advance is required:

```text
retailer sees the exact advance percentage and amount
supplier sees that the advance has been secured
supplier does not receive the protected amount before the agreed release event
release normally follows accepted goods receipt
shortage, damage, non-delivery or invoice mismatch can hold settlement
refund or partial release follows the governed resolution outcome
```

Production payment collection, escrow/nodal account operation and merchant settlement must be provided by an RBI-authorised payment aggregator and scheduled-bank arrangement as applicable. MoolSocial must not represent that it directly holds client money unless Supermandi Tech Pvt Ltd has the required authorisation and account structure. Customer-facing wording may use `Protected Advance` and identify the regulated payment partner in payment details.

## 4. Delivery Responsibility

The supplier must select one delivery mode for every offer or serviceable route:

```text
Supplier Fleet
MoolSocial Transport
Buyer Pickup
Approved Third-Party Transporter
```

Required delivery fields:

```text
dispatch-by timestamp or SLA
delivery window start and end
freight payer and freight amount/rule
vehicle type or load requirement when known
pickup location and operating hours
tracking capability: GPS, transporter status events or manual milestones
proof-of-handover and proof-of-delivery requirement
receiving contact and goods-receipt requirement
```

## 5. Retailer Visibility

Retailers need only the terms that change a purchase decision:

### Catalog tile

```text
case rate
MOQ
committed delivery time/window
payment term or advance percentage
delivery mode
offer/deal
```

### Price & Terms detail

```text
supplier source and service area
case value and tier prices
exact advance, balance and release rule
credit period and due-date rule
freight and delivery responsibility
cancellation, shortage, damage and invoice rules
```

### Order review and confirmation

```text
exact protected advance
exact payment-on-delivery or credit amount
supplier-wise PO and delivery window
delivery owner: supplier fleet, MoolSocial transport, buyer pickup or approved transporter
advance held/released/refunded status
GST tax invoice timing
```

## 6. Real-Time Delivery Rule

Before dispatch, there is no live location. Show:

```text
order confirmed
dispatch due time
committed delivery window
assigned delivery mode
```

After dispatch, show live ETA/location only when GPS or transporter telemetry is available. Otherwise show verified milestone events and the latest confirmed ETA. Never display fabricated movement or a false real-time map.

Required events:

```text
PURCHASE_ORDER_CONFIRMED
ADVANCE_SECURED
TRANSPORT_ASSIGNED
READY_FOR_DISPATCH
DISPATCHED
IN_TRANSIT
ARRIVING
DELIVERED
GOODS_RECEIPT_PENDING
GOODS_ACCEPTED
SHORTAGE_OR_DAMAGE_REPORTED
SETTLEMENT_RELEASED
```

## 7. Supplier Workspace Capabilities

Future manufacturer, distributor and wholesaler workspaces must provide:

```text
mandatory offer-term setup
area/route-wise delivery templates
supplier-fleet setup and driver/vehicle assignment
MoolSocial transport request and quote acceptance
advance secured notification without early settlement
dispatch queue and SLA alerts
GPS or transporter event integration
proof of dispatch and delivery
goods-receipt discrepancy response
settlement release, hold, refund and reconciliation
GST invoice creation and PO linkage
```

## 8. Non-Negotiable Rules

```text
no actionable offer without payment and delivery terms
no hidden advance percentage, freight or balance amount
no supplier settlement before the agreed protected-release event
no fake real-time delivery before dispatch or without telemetry
no stock increase for the retailer before GOODS_ACCEPTED
no silent supplier, price, payment or delivery substitution
```
