# Creator Earning End-to-End Lock

Status: Production architecture lock
Applies to: Creator, Social, Retailer, Manufacturer/Supplier, Provider, Earn, Pay and MoolSocial Admin routes
Machine contract: `shared/creator-economics-flow-contract.json`

## Locked outcome

MoolSocial does not treat creator monetisation as a single advertising payout. A creator may earn through eight independently funded engines. Every rupee must retain its source, qualifying action, attribution rule, approval state, deductions, dispute window and payout record.

The eight engines are:

1. Funded campaign fee and outcome bonus.
2. Attributed product or service commerce share.
3. Monthly and annual memberships.
4. Content-performance revenue pool.
5. Paid content production for local businesses.
6. Verified workspace or user onboarding work.
7. Live campaigns and launch events.
8. Licensed content reuse.

## One economic state machine

All engines use the same money lifecycle:

`draft -> funding_reserved -> published -> accepted -> in_progress -> submitted -> outcome_pending -> qualified -> release_pending -> available -> paid`

Exception states are `rejected`, `expired`, `disputed`, `reversed` and `clawed_back`. State changes are server-owned, idempotent and written to the authoritative ledger. A client may request an action but may never declare a payable outcome.

## Actor surfaces

### Funding workspace

Retailers, manufacturers, suppliers, verified service providers and MoolSocial Admin can create eligible briefs. Before publication they must see the objective, creator output, geography, capacity, fixed fee, outcome bonus or share, total reserved budget, tax treatment, approval rule and stop condition.

### Creator workspace

Creators see work fit, exact output, rights, disclosure, funding status, capacity, deadline, gross earning, expected deductions, net earning and release rule before accepting. Accepting reserves capacity; it does not guarantee payout.

### Consumer and social surface

Sponsored or commercial content is labelled. The next action is native to the content: shop, book, join, become a member or open the live event. Personal data and private purchase history are not exposed to the creator.

### Admin surface

Admin governs funding, eligibility, fraud, attribution versions, complaints, rights, disputes, finance reconciliation and emergency stop controls. Maker-checker approval is required for changes that affect money or eligibility.

### Creator ledger

The earnings route groups records by the eight sources. Each record opens its funder, content or work ID, qualifying event, attribution version, gross amount, fee, tax, refunds, net amount and payout state.

## Engine rules

### Funded campaign

The funder reserves the fixed fee and maximum outcome bonus before publication. A fixed fee qualifies after deliverable approval. Bonuses qualify only from the declared verified outcome. Rejected creative must include a reason and rework route.

### Attributed commerce

The business declares eligible SKUs or services, geography, share formula and attribution window. A creator attaches the eligible item to content. Only completed, paid and non-refunded orders or bookings qualify. Self-purchase, duplicate and collusive events are excluded.

### Membership

The creator publishes monthly and annual plans with benefits, renewal, cancellation and take-home preview. Member payment is the funding source. Creator earnings become available only after payment success and applicable refund or cooling window.

### Content-performance pool

MoolSocial Admin reserves a dated revenue pool and publishes the allocation formula version. Eligible, original and policy-compliant content receives a monthly allocation after invalid traffic and rights checks. Views alone never create an unfunded liability.

### Local content production

A verified business publishes a bounded creative brief, usage scope, delivery date, revision limit and fixed funded fee. The creator submits the asset. Approval or a governed review qualifies payment. Wider reuse requires a separate licence.

### Verified onboarding

MoolSocial or a verified workspace funds a defined activation outcome. Payment requires the referred user or workspace to complete applicable verification and the declared meaningful activation. Install-only and OTP-only incentives are prohibited.

### Live event

The funder reserves host fee and any outcome pool. The creator discloses the commercial relationship. Attendance, qualified engagement and completed commerce are separate events. Cancellation and reschedule rules are visible before acceptance.

### Licensed reuse

The creator owns or controls the declared rights and sets asset, media, territory, duration and permitted edits. The buyer requests a licence and funds it. Creator approval produces a versioned licence receipt. Expiry or usage outside scope can open a rights case.

## Production boundaries

- No fee, rate, cap, attribution window or payout term is hard-coded in a client.
- Funding reservation and ledger services own money truth.
- Order, booking, membership, content, identity and work services emit signed domain events.
- Attribution consumes events idempotently and stores the rule version used.
- Payout consumes only qualified ledger entries after holds expire.
- Refunds and disputes create compensating entries; history is never overwritten.
- Health, finance and other regulated content requires applicable policy and legal review.
- Creator access to Social and consumer features is never removed when a workspace is activated.

## Required APIs

- `POST /v1/economics/briefs`
- `POST /v1/economics/briefs/{id}/reserve`
- `POST /v1/economics/briefs/{id}/publish`
- `POST /v1/economics/opportunities/{id}/accept`
- `POST /v1/economics/deliverables/{id}/submit`
- `POST /v1/economics/outcomes/{id}/decision`
- `GET /v1/economics/creator/sources`
- `GET /v1/economics/ledger`
- `POST /v1/economics/licences/{id}/decision`
- `POST /v1/economics/disputes`

All write APIs require idempotency key, actor, workspace, policy version and audit correlation ID.

## Launch acceptance

Each engine must pass one success flow, one rejection or dispute flow, one duplicate-event test, one insufficient-funding test, one refund or reversal test and one unauthorized-actor test. The flow runner must prove both-side navigation from funding workspace through creator action and qualifying consumer or business outcome to the final ledger state.
