# Production Journey Implementation Tickets

Date: 2026-07-15
Source of truth: approved prototype Screens 00-165 and the passing 47-journey Edge audit
Delivery rule: implement vertical user outcomes on the consolidated production routes; do not recreate 166 isolated pages.

Every ticket requires loading, empty, offline, denied, timeout, duplicate/retry and support behavior; idempotent money/stock commands; accessible mobile controls; analytics without private content; feature flag; rollback; API/contract tests; and a replay matching the linked prototype journey.

## PROD-JRN-001 - Account setup and universal entry

- Users: consumer and every workspace operator.
- Prototype: 00-04.
- Outcome: install/open, choose language/location, authenticate, return to the requested product or workspace.
- Acceptance: provider/OTP handoffs preserve `returnTo`; denial/cancel/retry are recoverable; root actions open the correct product in one tap.

## PROD-JRN-002 - Product discovery, typed search and decision-ready detail

- Users: consumer and retailer wholesale buyer.
- Prototype: 09-11 and 81.
- Outcome: type a query, filter products, choose retail/wholesale mode, inspect price/pack/MOQ/delivery/payment and add the intended SKU.
- Acceptance: server search is paginated and typo-tolerant; unavailable products cannot be added; selected product, mode and attribution survive navigation.

## PROD-JRN-003 - Availability reservation and customer checkout

- Users: consumer.
- Prototype: 10-18.
- Outcome: choose counter pickup or delivery, review basket, reserve available items, pay once and open the correct order status.
- Acceptance: no customer-visible retailer confirmation step; reservation has expiry/replacement rules; payment is idempotent; pickup routes to 15-16 and delivery to 17-18.
- Events: `availability_reserved`, `checkout_reviewed`, `payment_authorized`, `order_confirmed`, `order_completed`.

## PROD-JRN-004 - Order issue, evidence and governed resolution

- Users: consumer, retailer and support operator.
- Prototype: 19-22 and 105/155.
- Outcome: select item/issue/resolution, attach evidence, submit once, receive retailer/support response and complete refund/replacement/support.
- Acceptance: evidence integrity and SLA are visible; conflicts hold settlement; every decision stores actor, reason, rule version and appeal/support path.

## PROD-JRN-005 - Food, ride, health, salon and task bookings

- Users: consumer and service fulfiller.
- Prototype: 26-56.
- Outcome: compare decision-ready options, confirm scope/price/time/place, pay or hold funds, track fulfilment and resolve post-service issues.
- Acceptance: availability is server-authoritative; cancellation/refund terms are versioned; protected contact and proof remain attached to the booking/task.

## PROD-JRN-006 - Payment lifecycle and receipts

- Users: payer, payee and finance/support operator.
- Prototype: 57-66.
- Outcome: recharge/pay bill/scan/review request, authorize once, show pending/success/failure/reversal and retain searchable receipts.
- Acceptance: provider callback, polling and retry cannot double-debit; success is provider-confirmed; failure distinguishes no-debit/reversal; receipt/history/support remain accessible.

## PROD-JRN-007 - Work profile, eligibility and workspace handoff

- Users: creator, retailer, manufacturer, provider and freelancer.
- Prototype: 67-73.
- Outcome: choose activity, provide required proof, see verification status and enter the correct workspace.
- Acceptance: requirements depend on activity and jurisdiction; rejection includes reason/rework/appeal; permissions are workspace-scoped.

## PROD-JRN-008 - Retailer paid-order fulfilment

- Users: retailer operator and delivery captain.
- Prototype: 13 and 74-77.
- Outcome: review a paid order, accept, pack every line, mark ready, request delivery, verify captain/parcel handover and track completion.
- Acceptance: customer payment is never blocked here; stock reservation and packing proof are authoritative; incomplete packing disables ready/handover; delivery request and handover are idempotent.

## PROD-JRN-009 - Retailer POS and assisted order

- Users: retailer counter/phone/chat operator.
- Prototype: 78-80 and 90.
- Outcome: select counter/source, identify optional customer, add stock items, choose payment/fulfilment, create order, complete sale and post invoice/book event.
- Acceptance: counter and invoice references are immutable; received payment is confirmed before final stock/book posting; offline recovery cannot duplicate the sale.

## PROD-JRN-010 - Wholesale procurement through goods receipt

- Users: retailer wholesale buyer and receiving operator.
- Prototype: 81-86.
- Outcome: typed search, MOQ cart, review/place PO, track supplier delivery, confirm accepted goods and post inventory/settlement result.
- Acceptance: price/ATP/serviceability/terms revalidate before PO; protected advance releases only for accepted quantity; shortages/damage/invoice mismatch create a held discrepancy; stock posts once from accepted GRN.
- Events: `purchase_order_placed`, `shipment_dispatched`, `goods_received`, `inventory_posted`, `settlement_release_requested`.

## PROD-JRN-011 - Purchase Book, invoice capture and supplier payment

- Users: retailer finance operator/accountant.
- Prototype: 87-92.
- Outcome: open the GRN-linked ledger, scan/upload supplier invoice, review extracted fields, add purchase, reconcile PO/GRN/GST, authorize payment and see posted status.
- Acceptance: original media is retained; extraction requires review; payment cannot exceed outstanding or proceed with unresolved mismatch; outside payments record evidence without initiating a transfer.

## PROD-JRN-012 - Retailer business service activation

- Users: retailer owner/admin.
- Prototype: 93-106.
- Outcome: choose an operated service, review included work/variable charge/cap/proof/renewal/cancellation, approve and pay, then manage the active service and business reports.
- Acceptance: each service activates independently; variable charges require verified outcomes; regulated work uses qualified providers; reports are permissioned and auditable.

## PROD-JRN-013 - Manufacturer sales, stock and input procurement

- Users: manufacturer/supplier operator.
- Prototype: 107-115.
- Outcome: manage buyer-visible stock, review verified sales order, confirm full/partial/unable, dispatch with documents, procure inputs and reconcile books/services.
- Acceptance: quantity and terms lock on confirmation; partial supply returns unmet demand visibly; advance and receivable events remain linked; dispatch proof and GST documents are authoritative.

## PROD-JRN-014 - Captain pickup, OTP start and trip completion

- Users: captain and rider/customer.
- Prototype: 116-123.
- Outcome: accept assignment, navigate to pickup, record arrival, type/verify OTP, start/complete trip, see earnings and access support.
- Acceptance: fresh geofence plus OTP or approved accessibility fallback gates start; masked contact protects numbers; fare and payout events cannot duplicate.

## PROD-JRN-015 - Creator, Earn and provider operations

- Users: creator, paid worker and service provider.
- Prototype: 124-146.
- Outcome: publish governed content, deliver funded campaign/work proof, accept provider request, complete fulfilment and receive traceable earnings/payout.
- Acceptance: every earning has funder, eligible actor, verified outcome, gross-to-net, release/dispute rule and cap; disclosure/rights/safety checks gate publication and payout.

## PROD-JRN-016 - Admin governance and shared controls

- Users: authorized operations, trust, finance, support and platform admins.
- Prototype: 147-165.
- Outcome: resolve prioritized verification/catalogue/commerce/ride/work/content/finance/support cases and manage shared identity, evidence, security and preferences.
- Acceptance: least privilege, break-glass audit, reasoned decisions, bulk-action safeguards, immutable evidence references and reversible configuration changes.

## Release acceptance for every ticket

- Contract tests prove route/state, authorization, idempotency and error model.
- Mobile replay proves the same action sequence as `quality/generated/semantic-mobile-user-flow-final.json`.
- Copy audit finds no prototype/internal wording or customer-facing operational uncertainty.
- Observability identifies journey, route, correlation ID and outcome without storing private message/evidence content in analytics.
- Feature flag, migration/backfill plan, rollback and support runbook are attached before production enablement.
