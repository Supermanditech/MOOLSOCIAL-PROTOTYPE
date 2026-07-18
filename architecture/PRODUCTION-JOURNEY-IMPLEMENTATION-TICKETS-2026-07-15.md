# Production Journey Implementation Tickets

Date: 2026-07-15
Source of truth: approved prototype Screens 00-165, the passing 47-journey Edge audit and the canonical two-viewport live black-box intent ledger
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
- Outcome: type a query, filter products, choose Home & Personal or Business Bulk, then add the intended SKU with one decisive rate visible at a time.
- Acceptance: Single Quantity and fixed Home Value Pack remain household choices; every fixed pack shows its complete payable pack total; Business Bulk returns only direct case/MOQ listings published by an eligible seller and shows per-unit/case basis plus the complete minimum-order total, quantity, GST, delivery and payment terms; campaign/demand-aggregation records never enter consumer product results; selected product, mode, pack/MOQ, quantity, exact total and attribution survive navigation.

## PROD-JRN-003 - Availability reservation and customer checkout

- Users: consumer.
- Prototype: 10-18.
- Outcome: order to a confirmed home address by default, or choose at-shop collection only from an explicit QR/location-confirmed shop session; review basket, reserve available items, pay once and open the correct order status.
- Acceptance: home sessions never expose at-shop collection or counter QR; at-shop context is explicit and expires safely; the Basket and Payment summaries reconcile the exact selected product/rate/quantity, item subtotal, saving, fulfilment fee and payable amount; no customer-visible retailer confirmation step; reservation has expiry/replacement rules; payment is idempotent; at-shop collection routes to 15-16 and delivery to 17-18.
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
- Pending replacement: `YOUTUBE-CONNECT-CAMPAIGN-REELS-AND-DISTRIBUTED-EARNING-PENDING-UIUX.md`.
- Outcome: connect eligible YouTube content, attach independent MoolSocial commerce/work actions, deliver funded campaign/work proof, accept provider requests, complete fulfilment and receive traceable earnings/payout.
- Acceptance: launch video remains YouTube-hosted; viewer YouTube engagement is never incentivized; every creator or distributed-work earning has a reserved funder, eligible actor, verified MoolSocial outcome or approved deliverable, gross-to-net, release/dispute rule and cap; disclosure/rights/safety checks gate campaign activation and payout.

## PROD-JRN-016 - Admin governance and shared controls

- Users: authorized operations, trust, finance, support and platform admins.
- Prototype: 147-165.
- Outcome: resolve prioritized verification/catalogue/commerce/ride/work/content/finance/support cases and manage shared identity, evidence, security and preferences.
- Acceptance: least privilege, break-glass audit, reasoned decisions, bulk-action safeguards, immutable evidence references and reversible configuration changes.

## PROD-JRN-017 - Social discovery, engagement and publishing

- Users: viewer, follower, creator and verified business.
- Prototype: 04-08 plus pending Screen 166.
- Pending replacement: `YOUTUBE-CONNECT-CAMPAIGN-REELS-AND-DISTRIBUTED-EARNING-PENDING-UIUX.md`.
- Outcome: enter Social once, move between Campaign Reels, YouTube Videos, Feed and Create, open selected content, complete MoolSocial follow/comment/share/save actions, inspect contextual actions, publish native text/images and connect eligible YouTube content.
- Acceptance: YouTube playback is click-to-play and clearly attributed; MoolSocial controls never obscure the YouTube player; MoolSocial metrics remain separate from YouTube metrics; viewer YouTube engagement is not rewarded; Campaign Reels use funded one-day, two-day or seven-day placement and disappear from promotional surfaces on expiry; back navigation preserves selected content and scroll; MoolSocial engagement commands are idempotent; sponsored content opens the exact product/service CTA; paste-link, channel-connect, denial, revoke, unavailable-video, expiry and renewal paths expose specific completion states.
- Events: `social_surface_opened`, `content_opened`, `follow_changed`, `reaction_changed`, `comment_submitted`, `share_started`, `remix_started`, `content_saved`, `publish_completed`.

## PROD-JRN-018 - Business Book periods, reports and operational sheets

- Users: retailer/manufacturer owner, authorized operator and accountant.
- Prototype: 87-92 and 108-110.
- Outcome: select today/week/month/custom dates, open evidence-backed answers, match or review records, prepare exports, grant timed accountant access and complete order exception decisions.
- Acceptance: custom start/end dates validate and apply; every answer links to source ledger records; exports are period-locked and audited; access has role and expiry; exception reasons are explicit; full/partial/unable order decisions preserve quantity, terms and buyer impact.

## PROD-JRN-019 - People chat, calls and shared group utilities

- Users: private chat members and group admins.
- Prototype: 23 and 25.
- Outcome: send a typed message, attachment or voice note; start/end voice or video calls; search messages; view members/media; edit a shared basket; create/update a poll; invite a member; change notifications; leave the group with confirmation.
- Acceptance: message/attachment upload is queued offline and idempotent; call signaling exposes connecting/connected/ended and device controls; membership and leave actions are authorized and audited; basket/poll revisions reconcile concurrent edits; private content never enters analytics; every header/composer action has an accessible immediate state and a recoverable failure path.

## PROD-JRN-020 - Seller-governed Business Bulk publication

- Users: eligible retailer, wholesaler, distributor and manufacturer operators; business/bulk buyers.
- Prototype: 09-11, 74, 81-86, 107 and 109-113.
- Outcome: an authorized seller explicitly publishes a direct Business Bulk listing; a buyer sees and orders only confirmed case/MOQ terms through purchase order, delivery, goods receipt and reconciliation.
- Acceptance: seller type and authorization gate publication; required fields are canonical SKU, case/pack, available quantity, bulk price/unit, MOQ, HSN/GST invoice, delivery responsibility/date, payment terms and claim rules; consumer and wholesale visibility are separate flags; campaigns, pooled demand and internal matches cannot publish product cards; existing orders retain versioned locked terms after edits.
- Events: `bulk_listing_published`, `bulk_terms_versioned`, `bulk_listing_paused`, `bulk_order_placed`, `bulk_goods_received`.

## PROD-JRN-021 - Screenwise micro-intent completion and responsive parity

- Users: every consumer, creator, worker, workspace operator and administrator.
- Prototype: every visible and recursively revealed action on Screens 00-165.
- Outcome: each tap, subtap, input, choice, search, composer, menu, popup and terminal action completes the intent stated by its label in mobile and laptop layouts.
- Acceptance: controls have accessible names and physical hit targets; fixed rails never cover the intended action; selected/current states are explicit; typed input is retained and applied; searches expose relevant results; task actions advance to a domain-specific next step or final result; completion records include a useful reference and recovery path; navigation opens the promised destination; no fragment-only link, scroll/focus-only change, generic acknowledgement or synthetic runtime fallback passes as completion.
- Quality evidence: `quality/generated/live-black-box-intent-audit.json` must contain all 166 screens in both required viewports with zero failed paths, no-op outcomes, synthetic-runtime-only outcomes, truncations and severe console errors.

## PROD-JRN-022 - Enterprise revenue targets and distributed attributed earning

- Users: verified operators across the 28 launch workspace profiles; eligible creators, freelancers, providers and individual campaign participants.
- Prototype: existing campaign and Earn states plus the pending contract in `YOUTUBE-CONNECT-CAMPAIGN-REELS-AND-DISTRIBUTED-EARNING-PENDING-UIUX.md`.
- Outcome: a business defines a daily, weekly or monthly incremental sales/order/booking/activation target; MoolSocial validates target arithmetic, operating capacity and maximum liability; the business reserves the full campaign funding; eligible individuals accept funded seats; customers transact through MoolSocial; retained outcomes release one attributable earning and an evidence-backed enterprise result.
- Acceptance: target revenue, retained average order value, required outcomes, commission and maximum funding reconcile before publication; eligible products/services are authoritative and serviceable; inventory, production, staff, slot, delivery and geography capacity are enforced; every seat, participant and campaign has a cap; competing attribution follows one disclosed versioned rule; self-purchase, duplicate, collusive and fabricated outcomes do not qualify; cancellation, return, refund and chargeback create holds or compensating entries; YouTube engagement never qualifies payment; healthcare and other regulated profiles use approved non-referral outcomes; one configurable engine changes profile rules without creating 28 separate systems.
- Events: `growth_target_priced`, `campaign_funding_reserved`, `campaign_seat_accepted`, `attributed_transaction_created`, `attributed_outcome_retained`, `participant_earning_qualified`, `participant_earning_reversed`, `campaign_target_closed`.

## PROD-JRN-023 - Workspace-specific 360-degree Outcome Products

- Users: verified operators across all 28 launch workspace profiles; authorized staff, execution participants and MoolSocial operations.
- Prototype: Retailer Screen 93 onward, Manufacturer Screen 115, Provider Screen 145, Creator/Earn Screens 124-146 and each workspace home; detailed pending contract in `WORKSPACE-SPECIFIC-360-OUTCOME-PRODUCT-CATALOGUE-PENDING-UIUX.md`.
- Execution architecture: `OUTCOME-PRODUCT-EXECUTION-UIUX-AND-BACKEND-LOGIC.md`; machine contract: `shared/outcome-product-execution-contract.json`.
- Concrete managed packages: `WORKSPACE-SPECIFIC-MOOL-OPERATED-MANAGED-OFFERINGS.md`; commercial-role machine contract: `shared/managed-offering-contract.json`.
- Outcome: diagnose the workspace's business activity, current baseline, capacity and bottleneck; recommend three to five activity-specific Outcome Products across acquisition, conversion, operation, fulfilment, retention, sourcing, cash and protection; price and activate one exact plan; perform controlled work; verify conversions or accepted milestones; settle within the accepted cap; and show the achieved result, evidence and next-best action.
- Acceptance: every product version declares eligible profile/activity, controlled deliverables, commercial role, buyer/seller/invoice/inventory/refund/tax responsibility, primary conversion, required inputs, capacity/geography/licence gates, base fee, third-party spend, result fee, tax, cap, evidence, attribution, exclusions, SLA, dispute and stop rules; “unlimited” is never used for unfunded quantity or credit and “dedicated” capacity preserves worker eligibility, safety and limits; marketplace and MoolSocial-principal stock never mix; no raw lead/view/click is billed as a sale; no uncontrollable revenue, income or clinical outcome is guaranteed; healthcare uses non-referral administrative outcomes; YouTube engagement never qualifies payment; a failed prerequisite blocks activation with an exact corrective action; one shared outcome engine plus profile adapters prevents divergent workspace backends; all charges and payouts reference authoritative domain events and compensating entries.
- Events: `outcome_product_recommended`, `outcome_product_quote_created`, `outcome_product_prerequisite_failed`, `outcome_product_activated`, `outcome_milestone_accepted`, `qualified_outcome_recorded`, `outcome_charge_posted`, `outcome_result_reported`, `outcome_product_paused`, `outcome_product_closed`.

## PROD-JRN-024 - Future-ready platform primitives and innovation portfolio

- Users: all personal and workspace users over time; initial implementation is limited to shared foundations and approved pilots.
- Strategy: `MOOLSOCIAL-2026-2076-INNOVATION-PORTFOLIO.md`; machine portfolio: `shared/fifty-year-innovation-portfolio.json`.
- Outcome: build canonical identity/capability, product/service/activity, demand/capacity, place, event/evidence, money/rights, consent/authority and device contracts that serve today's production journeys while preserving migration paths to multilingual agents, portable trust, open networks, traceability, digital twins and human-supervised physical automation.
- MVP boundary: no speculative robot, autonomous vehicle, clinical AI, universal score, digital-twin claim or future screen becomes a launch dependency. MVP implements only foundations already required for reliable transactions, bounded agent actions, evidence, money, consent and interoperability.
- Acceptance: schemas and events are versioned, exportable and vendor-neutral; agent recommendation/simulation/execution states are distinct; consequential actions retain data snapshot, policy/model reference, confidence, approval and receipt; credentials are contextual and revocable; adapters isolate external networks; device events require identity and integrity; experiments carry cohort, consent, exposure cap, success/harm metrics, feature flag, kill switch, retention and retirement decision; regulated capabilities remain disabled until authorized.

## PROD-JRN-025 - Workspace-specific paid technology products

- Users and payers: verified workspace owners, authorized organizations and enterprise/API customers; workers receive free funded-work access and may optionally buy productivity tools.
- Product strategy: `WORKSPACE-SPECIFIC-REVENUE-TECHNOLOGY-PRODUCTS.md`; machine contract: `shared/revenue-technology-product-contract.json`.
- Outcome: sell profile-specific CoreOS subscriptions, measurable automation/intelligence add-ons and metered network/API products across all 28 workspace profiles using seven configurable engines rather than separate applications.
- Acceptance: every SKU declares eligible activity, payer, modules, workspace/location, seats/assets, included usage, meter, overage and hard cap, trial, billing/tax, support, cancel/export, data retention, version/migration, ROI measure and MoolSocial cost driver; the UI reports subscription/usage paid against time, cost, capacity, collection and retained-transaction value; healthcare never uses referral/prescription/clinical-outcome pricing; funded work has no pay-to-apply fee; AI, maps, voice, messages, hardware and partner costs are metered into cohort contribution; a SKU cannot scale without positive contribution, reliable execution and renewal evidence.

## Release acceptance for every ticket

- Contract tests prove route/state, authorization, idempotency and error model.
- Mobile replay proves the same action sequence as `quality/generated/semantic-mobile-user-flow-final.json`.
- Recursive replay proves every relevant action, popup, input, same-form submit, nested confirmation and terminal result to depth eight from `quality/generated/nested-control-intent-audit.json`; fragment-only links and generic acknowledgements do not pass.
- Live black-box replay physically hit-tests every discoverable root and recursively revealed action to depth twelve from a clean state at 390 x 844 and 1440 x 1000, using `quality/generated/live-black-box-intent-audit.json` as the release ledger.
- Copy audit finds no prototype/internal wording or customer-facing operational uncertainty.
- Observability identifies journey, route, correlation ID and outcome without storing private message/evidence content in analytics.
- Feature flag, migration/backfill plan, rollback and support runbook are attached before production enablement.
