# MVP Business Logic Freeze

Date: 2026-07-14
Status: frozen for production planning
Machine contract: `shared/mvp-business-logic-contract.json`

## Purpose

This lock converts the approved 166-screen prototype and 47 operational flows into production behavior. The screen may request an action, but the owning server capability decides and records the outcome. A later UI change must not bypass these state transitions.

## Universal rules

1. Every user is an individual consumer first. A verified workspace adds a separate operating capability and never removes personal, social or consumer access.
2. Money, stock, capacity, eligibility, proof, fulfilment and payout truth are server owned.
3. Every state-changing command is idempotent. Retrying the same command returns the original result instead of creating a duplicate order, debit, ride, task or payout.
4. The committed price, quantity, tax, fulfilment, cancellation, refund, earning and payout rules retain the policy version shown to the user.
5. Stale price, stock, location, capacity or funded-work data cannot authorize an irreversible commitment.
6. A failed network request preserves input and gives a precise retry or recovery path.

## Consumer commerce

The customer progresses from decision-ready product to fresh retailer stock confirmation, stock lock, payment authorization, preparation and pickup or delivery. If a retailer declines or misses its confirmation SLA, routing selects the nearest eligible retailer with fresh stock and a reliable acceptance record. Any changed retailer, price, time or term is disclosed before capture or commitment.

Counter pickup does not require a mandatory pickup code at a busy shop. The paid receipt identifies the order and staff confirms handover. Home delivery adds assignment, live status, proof and delivery-issue states. No replacement occurs without customer approval for the exact substitute and price difference.

## Wholesale commerce

A retailer or manufacturer sees product, brand, pack, MOQ, quantity, price, tax terms, supplier identity, delivery time, payment terms, transport responsibility and shortage or return rule before placing a purchase order. Supplier acceptance, protected advance, dispatch, delivery, goods receipt, issue and release are distinct states.

Where advance payment is required, MoolSocial holds the amount under the disclosed protected-payment rule. Purchase-order placement alone never releases supplier money. Open shortage, damage, quality or invoice cases block release until resolved.

Manufacturing input recommendations are tied only to a manufacturer's verified finished-product catalogue and production activity. A trader or wholesaler sells finished products but is not assigned manufacturing inputs.

## Appointments and services

Bookings reserve exact provider capacity and prevent overbooking. Doctor, hospital, salon, restaurant, tiffin, transporter and other provider profiles retain their specific fields, evidence and fulfilment states. A clinical follow-up remains tied to the originating appointment and the provider's disclosed follow-up terms.

The prototype records the licensed-pharmacy journey, but medicine publication and fulfilment remain disabled until that workflow is live at launch.

## Ride

Quote, request, matching, captain assignment, arrival, pickup, trip, final fare, payment and completion are authoritative states. Captain acceptance commits one assignment idempotently. Cash, UPI and card may be selected, while final payment follows trip completion and approved fare. A card can be authorized earlier but is not finally debited for an unapproved amount.

## Pay

The Pay root is limited to payment-first intentions: recharge, bills, verified scan payment and verified payment request. Product orders, rides, bookings and work payments remain inside their owning journey. Provider callbacks are reconciled before payment is shown as final.

## Work and earnings

All consumers may browse funded opportunities. Applying either uses an eligible verified workspace or opens the shortest applicable workspace-creation path. Assignment reserves live funded capacity; it does not guarantee income. Proof, review, rework, approval, dispute and payout remain separate states.

Monthly potential is calculated from current funded capacity, eligible throughput and geography. It must be displayed as a realistic range with its basis and never as a guaranteed salary.

## Creator attribution

The eight creator earning sources remain independently funded: campaigns, attributed commerce, memberships, content-performance pool, local production, verified onboarding, live events and licensed reuse. Every earning retains its funder, qualifying event, policy version, gross amount, deductions, net amount, dispute state and payout state. Licensed reuse requires a separate rights decision.

## Workspace activation

The approved category-card tree determines the intended workspace type. Personal identity is checked, then profile-specific proof verifies the selected activity. One account may operate multiple separately verified workspaces. Pending, rejected or suspended work status never removes the user's personal app access.

## Availability and agent rules

Public availability combines saved schedule, temporary override, fresh stock or capacity, serviceability and restrictions. Capacity exhaustion stops new commitments without cancelling accepted work.

The Mool agent may observe, prepare or execute only within the owner's saved consent tier. Money, publication, legal filing, health action, pricing exception, refund, payout and irreversible actions always require the appropriate explicit approval.

## Disputes and recovery

Every issue remains linked to its source order, booking, ride, task, payment or workspace. Evidence is append-only. Refunds, reversals and clawbacks use compensating records. Both parties receive the decision, effective amount or action, reason, time and next support or appeal path.

## Production acceptance

- A UI cannot advance a server-owned state optimistically as final.
- Every command is safe to retry.
- Every transition records actor, time, policy version and correlation reference.
- Every irreversible decision validates data freshness and permission.
- Golden-flow tests cover success, rejection, duplicate, stale, offline, dispute and recovery paths.
