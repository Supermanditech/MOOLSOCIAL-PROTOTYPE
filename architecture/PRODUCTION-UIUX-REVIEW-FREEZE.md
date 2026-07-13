# Production UI/UX Review Freeze

Date: 2026-07-14
Status: frozen for production planning
Contract: `shared/production-ui-state-contract.json`

## Review result

- 166 approved prototype screens render at the 390 x 844 reference viewport.
- 3,190 visible interactions pass the strict interaction audit.
- 47 operational flows pass real visible-control tap replay.
- No reviewed screen has a load error, console error or page-level horizontal overflow.
- Prototype approval remains a reference for outcome and interaction. Production must consolidate repeated HTML into the shared routes and components frozen below.

## Production experience lock

1. Every account enters as an individual consumer with Social available immediately.
2. Mool and Chat remain one tap away from focused product, service, work or workspace activity.
3. A verified workspace adds operating capabilities. It never removes personal, social or consumer access.
4. The current action owns the screen. Other worlds do not compete for attention.
5. Main actions use direct, familiar words. Internal planning labels, route names and role-resolution language never appear to users.
6. Price, fulfilment time, trust or proof, payment terms, cancellation or refund and next action appear before a purchase or paid commitment.
7. An action that changes money, stock, availability, eligibility, content publication or work outcome shows its resulting state immediately.

## Progressive action rules

| Situation | Production rule |
| --- | --- |
| First view | One primary action and no more than two secondary decisions above the fold. |
| More than five choices | Use a labelled horizontal rail, filter or progressive next state. Do not shrink labels into unreadable tiles. |
| Repeated action | Keep the canonical action once. A persistent shortcut must have an explicit shortcut label. |
| Long catalogue or opportunity feed | Virtualised results, search and filters; expand one decision row at a time. |
| Confirmation | Summarise what changes, exact amount or commitment, fulfilment rule and recovery path. |
| Destructive or irreversible action | Confirm intent and provide undo, hold or support where the domain permits. |

## Route-family review

### Install, setup and identity

- Detect supported phone language and explain the fallback language only when needed.
- Location offers current location, saved or manually selected area and skip. A skipped location is requested later only at a context that requires serviceability.
- One successful identity method completes sign-in. Social, email and mobile methods are alternatives, not cumulative requirements.
- Preserve anonymous language, area and campaign attribution through sign-in.
- Required states: provider loading, OTP autofill, expired OTP, provider cancellation, offline, duplicate account merge and recovery.

### Universal, social and chat

- Open directly in Social; no static home decision screen.
- Root action rail uses a stable centre instance during keyboard and assistive navigation while preserving swipe looping for touch.
- Shorts and video remain full-screen content experiences. Additional commerce or work context opens only on demand.
- Chat is persistent and restores the prior focused world when closed.
- Required states: feed skeleton, no-following state, restricted content, upload retry, processing media, offline draft, message pending and failed-send retry.

### Buy, food, booking and provider decisions

- Show decision-ready rows or cards, not marketplace-style endless listings.
- The first product view exposes product, brand or provider, pack or service unit, exact price, fulfilment time, proof and return or cancellation rule.
- Retail, pack and wholesale choices use industry language and never imply a price that is not live and serviceable.
- Provider and shop capability controls hide unavailable wholesale, delivery, table, appointment or payment choices.
- Required states: stale price, stock changed, provider closed, area unserviceable, partial basket, scheduled slot lost, substitution approval and alternate provider offer.

### Ride, delivery and live fulfilment

- Pickup, destination, vehicle or service class, fare basis and payment timing precede booking.
- Accepted-state screens prioritise captain or provider identity, ETA, vehicle or assignment proof, call, chat and safety.
- Live tracking distinguishes telemetry-backed live data from estimated or stale data.
- Required states: no captain, reassignment, location denied, delayed pickup, trip cancellation, fare changed, payment pending and post-trip support.

### Pay and money

- Pay opens only payment-first use cases: recharge, bills, scan pay, requests and receipts.
- Product, ride, booking and work payments remain inside their originating flow.
- Every money state shows payee, purpose, exact amount, method, status and a stable reference.
- Required states: processing, duplicate request, bank decline, pending provider confirmation, reversal, refund, offline before authorization and receipt recovery.

### Earn and workspaces

- Earn is the public funded-opportunity feed. My Work is the operating destination for verified profiles.
- Opportunity rows expose work, location or remote rule, verified payout, funded capacity, expiry and one-tap details.
- Profile creation uses the approved activity card tree, carried-forward identity and profile-specific proof.
- Multi-workspace users keep one account and may add compatible workspaces without losing existing access.
- Required states: not eligible, verification needed, application saved, capacity filled, proof rejected, dispute open, payout pending and workspace paused.

### Business workspaces

- Retailer, manufacturer, captain, creator, freelancer and configurable provider workspaces reuse the same shell while loading profile-specific capabilities.
- Pending orders, messages, money exceptions and work requiring consent are prioritised; analytics and services remain secondary.
- Availability may be manual, scheduled or agent-managed. Public visibility must always show the effective state and next change time.
- Required states: no catalogue, no orders, import processing, stale stock, staff not authorised, service paused, agent awaiting approval and reconciliation mismatch.

### Admin and shared operations

- Admin pages use dense work-focused layouts, responsive rows and saved filters. They do not reuse consumer card composition.
- Every intervention shows actor, reason, affected entity, before and after state and audit reference.
- Health and activity views separate product errors from user intent signals.
- Required states: no access, redacted evidence, stale telemetry, partial outage, bulk-action preview, approval required and rollback result.

## Personalization lock

Personalization may use only explicit choices, consented location, serviceability, in-app behavior, verified workspace capability, pending operations, schedules and communication consent. Professional qualification, medical condition, financial capacity, consent and verification are never inferred.

When personalization changes ranking, eligibility, price, availability or payout, the UI must show the deciding reason. A neutral serviceable fallback is mandatory when signals are unavailable.

## Accessibility and responsive lock

- Minimum touch target is 44 x 44 CSS pixels.
- Body text contrast is at least 4.5:1; large text and meaningful icons are at least 3:1.
- Every control has a stable accessible name and exposes selected, expanded, busy, invalid and live state where applicable.
- Screen-reader and keyboard order follows visual decision order.
- Persistent controls respect safe-area insets and the software keyboard.
- No page-level horizontal overflow is allowed at 320 px or wider. Dense operational tables use a labelled inner scroll area or responsive rows.
- Reduced-motion users receive static state transitions and no auto-advancing content.

## Required state model

Every production route owns loading, ready, empty, partial, submitting, success, offline, timeout, error, permission-denied, restricted, stale and duplicate-request states. These are route states or shared panels, not additional production routes.

## Exit gate

Production UI implementation may start only when it references the shared state contract and the component registry. A ticket may not implement a prototype screen as a one-off page when an existing production route state and shared component can express it.
