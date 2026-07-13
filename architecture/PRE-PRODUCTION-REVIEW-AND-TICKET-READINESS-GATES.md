# Pre-Production Review and Ticket Readiness Gates

Date: 2026-07-13
Status: mandatory before production ticket generation

## Baseline

- Screens 00 through 165 are user-approved prototype references.
- Prototype approval means the intended user outcome and concept may enter consolidated review.
- Prototype approval does not mean production-ready, legally cleared, load-tested or regression-safe.
- Production remains constrained to 120 launch routes. Current usage is 113 routes with seven reserved.
- Review changes should reuse a route state or shared component unless a genuinely new production destination is approved.

## Gate 1: Complete review runner and wiring

1. Build one consolidated mobile-first runner for Screens 00–165.
2. Group review by real user journey, not only numeric order.
3. Verify every tap, back action, cross-workspace jump and Mool root return.
4. Detect dead ends, duplicate decisions, broken parameters and unreachable states.
5. Record the canonical entry, exit and recovery destination for each route state.

Deliverable: approved flow graph and automated link-validation report.

## Gate 2: Screen-by-screen production review

Every state must pass the same review card:

- exact user goal and user type;
- why the state exists;
- minimum information needed for a decision;
- personalization inputs and fallback;
- one-tap primary action;
- loading, empty, denied, offline, timeout, duplicate and failure states;
- cancellation, recovery and support path;
- mobile safe-area, keyboard, text fit and accessibility;
- event and audit requirements;
- reusable component and route-state mapping.

Reviews may improve UI, UX, business logic and innovation without reopening approved identity, brand or universal-access principles.

## Gate 3: User economics and MoolSocial revenue

No earning, reward, campaign or referral feature may enter production without:

- funding source;
- eligible user and workspace type;
- verified outcome;
- gross amount;
- platform fee;
- payment processing, logistics, tax and fraud reserve treatment;
- net user earning;
- release condition and dispute rule;
- daily, monthly and campaign cap;
- abuse and duplicate-account controls.

The workspace economics contract is authoritative for this gate.

## Gate 4: Shared design-system freeze

Freeze production tokens and shared components for:

- Mool root and universal navigation;
- workspace and sub-action docks;
- search, ask, scan and voice;
- decision cards;
- catalogues and dense product matrices;
- orders, status timelines and receipts;
- chat, media and evidence;
- settings, schedules, consent and agent authority;
- loading, empty, error, offline and restricted states.

Deliverable: versioned component inventory with responsive and accessibility tests.

## Gate 5: Domain and data contracts

Freeze domain boundaries for:

- identity, account and workspace verification;
- catalogue, SKU, price, stock and availability;
- demand, basket, order, booking, ride and work assignment;
- payment, hold, refund, payout, ledger and reconciliation;
- social content, creator, campaign and membership;
- chat, notification, consent and preference;
- delivery, proof, issue and dispute;
- Mool Agent policy, approval and execution;
- admin configuration, observability and audit.

Deliverable: entity model, ownership boundaries, event schemas, retention classes and migration plan.

## Gate 6: API contracts and integrations

- OpenAPI contracts for every launch route and state.
- Idempotency, pagination, versioning and error model.
- Webhook signatures and replay protection.
- Payment, maps, identity, notification, media and tax integrations.
- Mock server data for every review state.
- Contract tests shared by mobile, web, backend and admin clients.

## Gate 7: Security, privacy and compliance

- role and workspace authorization matrix;
- consent purpose and channel separation;
- encryption, secret management and key rotation;
- payment and payout threat model;
- medical, pharmacy, professional and transport launch restrictions;
- evidence access, retention and deletion rules;
- admin break-glass access and complete audit;
- vulnerability, dependency and penetration-test plan.

## Gate 8: Regression and quality strategy

- golden tests for every approved flow;
- API contract and database migration tests;
- visual checks across target Android sizes and web;
- accessibility checks;
- retry, duplicate, delayed webhook and partial-failure tests;
- load tests for feed, catalogue, chat, location, order and campaign spikes;
- feature flags, canary release, rollback and kill switches;
- production telemetry that excludes private message content.

## Gate 9: Ticket generation

Tickets are cut as vertical production slices, not one ticket per HTML file.

Each ticket includes:

- route and route state;
- user type and business outcome;
- linked approved prototype states;
- UI component changes;
- API and event contracts;
- database ownership and migrations;
- permissions and consent;
- observability;
- test cases and acceptance evidence;
- feature flag and rollback plan.

Maximum recommended slice: one complete user decision or operation that can be deployed and tested independently.

## Gate 10: Launch and growth readiness

- city, category and workspace launch configuration;
- supply, demand and support capacity;
- funded incentive and campaign budgets;
- creator and workspace acquisition channels;
- fraud controls and payout liquidity;
- customer support and incident response;
- app-store, domain, analytics and release ownership;
- daily activation, retention, transaction and contribution-margin dashboard.

## Ten-million-user launch target

Ten million verified activated users in ten days equals one million activations per day. It is a launch target, not a product guarantee.

An activation must require a verified account plus a meaningful action. Install-only or OTP-only rewards are prohibited. Channel targets, funding and fraud-adjusted retention must be agreed before the target becomes an operating commitment.

## Exit condition

Production tickets may begin when Gates 1–6 have approved contracts and Gates 7–10 have named owners, acceptance criteria and scheduled execution. Screen review and ticket preparation may overlap only after the affected route and shared components are frozen.
