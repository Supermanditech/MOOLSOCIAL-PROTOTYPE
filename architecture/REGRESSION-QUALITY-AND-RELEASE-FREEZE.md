# Regression, Quality and Release Freeze

Date: 2026-07-14
Status: frozen for production planning
Manifest: `quality/regression-manifest.json`
Gate: `quality/Test-PreProduction-Contract-Gates.ps1`

## Baseline

The immutable prototype baseline is 166 approved screens, 47 operational flows and 3,190 visible interactions with zero failures and zero skipped controls. Prototype HTML remains the acceptance reference while production consolidates repeated states into shared routes and components.

## Required test layers

1. Unit tests cover state transitions, money calculations, capacity rules and pure component behavior.
2. Component tests cover all registry states, responsive composition, keyboard operation and recovery.
3. Contract tests validate OpenAPI requests and responses, event envelopes, webhooks, idempotency, pagination and problems.
4. Integration tests cover payment reconciliation, stock confirmation and reroute, ride assignment, work proof and earnings, chat delivery and agent approval.
5. End-to-end tests replay all 47 flows through visible controls.
6. Visual tests cover 320, 360, 390 and 412 px mobile widths, tablet and desktop admin.
7. Failure injection covers offline, timeout, partial, stale, duplicate, out-of-order, provider failure, exhausted capacity and permission denial.

## Golden flows

The highest-signal release subset includes onboarding, social, counter and delivery commerce, order issue, ride, Pay success and failure, work-to-workspace, retailer wholesale, manufacturer sales, captain, creator campaign, provider, admin and shared controls. The full 47-flow suite still runs before release.

## Load baselines

Initial tests exercise social reads, 50k-SKU catalogue discovery, order and stock-confirmation bursts, ride matching, chat fanout, opportunity scanning and admin communication. The first planning budgets are 500 ms read p95, 900 ms command-accepted p95, at most 1 percent request error and zero duplicate mutations. Production capacity testing may tighten these budgets but cannot weaken the no-duplicate invariant.

## Feature flags and canary

New workspace capabilities, payment providers, agent execution, earning policies, fulfilment reroute and personalization models launch behind owned, expiring flags with a kill switch and metrics. Canary stages are 1, 5, 20, 50 and 100 percent. Advancement requires golden-flow success, state and money invariants, acceptable latency and stable support signals.

Any duplicate charge, order, ride, task, earning or payout halts rollout. State divergence, a critical-flow failure, error-budget breach or unexpected access also halts rollout.

## Rollback

Rollback targets 15 minutes. Previous clients remain compatible with additive API changes. Flags disable changed behavior. Artifacts are immutable. Business state is forward-corrected, not destructively rewound. Money uses compensating entries. High-risk rollback is rehearsed on staging.

## Release evidence

Each release retains test results, contract diff, visual diff, load summary, flag snapshot, canary metrics and rollback decision with owner. The pre-production gate also reruns the strict mobile flow gate.

## Explicit exclusions

This phase still excludes item 6 domain/database architecture and item 8 security/compliance program. Item 10 production journey tickets are now defined in `architecture/PRODUCTION-JOURNEY-IMPLEMENTATION-TICKETS-2026-07-15.md`; the two remaining exclusions are recorded and are not represented as completed work.
