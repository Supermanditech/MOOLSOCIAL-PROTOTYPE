# MoolSocial Freelancer / Earn Workspace MVP Lock

Date: 13 July 2026

## Boundary

Screens 67 and 68 are the public opportunity discovery and terms surfaces available to every eligible MoolSocial user. The Freelancer / Earn workspace begins after a freelancer, field partner, onboarding partner, campaign worker, Get It Done provider or delivery worker profile is deliberately selected and verified.

Passenger Captain work remains in the Captain workspace. Delivery Partner may reuse the Earn execution shell with a separately verified delivery profile, vehicle/movement eligibility and delivery-specific proof rules. No profile silently acquires another work category.

## Permanent Dock

`Mool | Opportunities | My Work | Earnings | Chat`

- `Mool` returns to personal and Social access.
- `Opportunities` shows funded work matched by profile, skill, geography, availability and trust.
- `My Work` contains applications, accepted work, active steps and proof state.
- `Earnings` contains authoritative payable, held, released and payout records.
- `Chat` opens shared people, business, order and support conversations.

## Payable Unit

No work opens without a funder or a verified monetizable value source.

`Funded Objective + Eligible Worker + Defined Output + Proof + Verification + Payout Rule + Platform Margin`

Every opportunity shows the exact task, geography or remote rule, capacity, per-output payout, realistic funded monthly potential, proof, time limit, eligibility, rejection/redo rule, payout timing and terms before application.

Monthly potential is derived from open funded capacity and worker eligibility. It is never a guaranteed salary, employment offer or MLM-style recruitment claim.

## Work Types

MVP configuration may include business onboarding, shop/restaurant/supplier verification, QR placement, catalogue setup, price or stock checks, demand collection, buyer confirmation, local surveys, support, sales conversion, campaign execution, Get It Done tasks and separately eligible delivery work.

## Proof and Verification

Proof is task-specific and may include GPS, timestamp, photo/video, document, QR scan, OTP, business/customer confirmation, system event or reviewer approval. The system stores original evidence, integrity metadata, review decision, reason, policy/rule version and appeal route.

No proof or failed verification means no payout. Rework is allowed only when the task terms permit it; rejection must show a reason and review route.

## Route Set

1. Screen 133: Matched Opportunities — `/earn`
2. Screen 134: Applications and Eligibility — `/earn/applications`
3. Screen 135: Active Work — `/earn/work/:workId`
4. Screen 136: Proof and Outcome Submission — `/earn/work/:workId/proof`
5. Screen 137: Earnings and Payout — `/earn/earnings`
6. Screen 138: Issues, Ratings and Work History — `/earn/history`

Chat, identity, files, location, notifications, payment, support, training and audit are shared engines. Secondary states remain inside these six routes.

## Production Contract

Production uses server-side eligibility, conflict checks, funded-seat reservation, idempotent acceptance, task expiry, evidence integrity, human/automated review, immutable payout ledger, appeal and reassignment. Mobile is primary for field execution; responsive web supports opportunity review, applications, evidence review, statements and history using the same APIs.
