# MoolSocial Captain Workspace MVP Lock

Date: 12 July 2026

## Scope

The Captain workspace serves verified bike, auto and taxi/car passenger-ride captains in an activated city or zone. It mirrors the approved consumer Ride journey without duplicating the trip ledger, payment truth, safety case or chat identity.

Passenger rides and shop, food or parcel delivery are separate backend service workspaces. One person may activate both, but ride requests must never enter the delivery queue and delivery tasks must never use passenger-ride pricing or safety rules.

## Permanent Captain Dock

`Mool | Requests | Trips | Earnings | Chat`

- `Mool` returns to the universal personal and social surface.
- `Requests` opens eligible live ride demand.
- `Trips` opens accepted, arriving, live and completed trip states.
- `Earnings` opens authoritative earnings, deductions, incentives and payouts.
- `Chat` opens the shared MoolSocial inbox.

Logging in does not make a captain available. `Go Online` is a deliberate action and remains separate for every activated Captain workspace.

## Readiness Gate

Ride availability is enabled only when all applicable conditions pass:

- personal identity and face match verified;
- valid driving licence;
- vehicle RC and ownership/authorization verified;
- insurance and PUC valid;
- commercial permit, service authorization and fitness verified where applicable;
- payout account verified;
- live location permission active while online;
- fare rule, serviceable zone, backup capacity and SOS/support are active.

Compliance applicability is resolved from versioned India and Rajasthan rules. Screen copy is guidance, not a permanent legal determination.

## Request Decision Contract

Before acceptance the captain sees pickup, destination, route distance, pickup distance, expected duration, customer payment method, gross fare, platform charge, applicable additions and expected net earning. Countdown is quiet and cannot use deceptive urgency. Acceptance creates a committed trip state.

No movement after acceptance triggers warning, customer notification and automatic reassignment. Repeated failure affects reliability and availability.

## Trip Truth

- Pickup arrival is geofence-backed.
- Trip starts only after customer OTP or approved accessibility fallback.
- Live trip has shared route, ETA and SOS/support.
- Destination arrival is location-backed.
- Toll, parking or approved additions require evidence and customer visibility.
- Fare completion and payment are authoritative backend states.
- Cash remains recorded inside the trip ledger; cash must not create an uncontrolled off-platform trip.
- Captain payout becomes eligible only after completed trip and payment reconciliation.

## Route Set

1. Screen 116: Captain Home and Availability — `/captain`
2. Screen 117: Ride Request Decision — `/captain/requests`
3. Screen 118: Pickup Navigation and Arrival — `/captain/trips/:tripId/pickup`
4. Screen 119: Live Trip and Safety — `/captain/trips/:tripId`
5. Screen 120: Fare Completion and Collection — `/captain/trips/:tripId/complete`
6. Screen 121: Earnings and Payouts — `/captain/earnings`
7. Screen 122: Vehicle and Compliance — `/captain/compliance`
8. Screen 123: Support and Paid Work — `/captain/support-work`

All secondary states remain inside these routes. Chat, payment, notification, file, identity, support, safety and audit engines are shared services rather than new Captain routes.

## Paid Work Boundary

Captain-specific paid opportunities may include verified captain onboarding, local business onboarding, route surveys and funded mobility campaigns. Delivery work requires a separately activated Delivery Partner workspace. Paid tasks never silently change the Captain workspace or vehicle eligibility.

## Production Boundary

The prototype is an acceptance contract. Production must use idempotent trip commands, immutable fare and payout ledgers, location freshness controls, role-based permissions, document expiry jobs, event-driven reassignment, case-linked support and auditable state transitions.
