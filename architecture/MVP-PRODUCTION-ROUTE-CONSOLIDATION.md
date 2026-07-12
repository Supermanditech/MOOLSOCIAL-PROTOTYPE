# MoolSocial MVP Production Route Consolidation Lock

Date: 12 July 2026

## Purpose

The numbered HTML screens are detailed UX prototypes and acceptance references. A prototype screen number does not automatically become a separate production route, frontend bundle, backend service, or deployable application.

Production Codex must read the embedded `productionRouteContract` in every screen before implementation.

## Locked Rules

1. Preserve every approved prototype as visual and behavioral acceptance evidence.
2. Consolidate sequential confirmation, processing, success, failure, tracking and resolution prototypes into explicit states of one production route.
3. Build a new route only when the contract says `route-shell`.
4. Build `route-state` screens inside the route identified by `routeId` and `routePath`.
5. Build `embedded-panel` screens inside their owning route. They must not receive a standalone production route.
6. Do not implement `superseded-do-not-implement` screens. They remain historical decision evidence only.
7. `post-mvp` screens are not launch blockers and must remain behind disabled route registration or a feature flag.
8. Loading, empty, offline, unauthorized, error and retry behavior are route states, not additional numbered screens.
9. A shared route owns its API orchestration, authorization boundary, analytics contract and regression suite.
10. Approved visual files may receive this non-visual metadata without changing their frozen UI.

## Launch Scope Values

- `mvp-core`: required for the 45-day launch.
- `mvp-conditional`: may launch only when its owning core route is stable; it cannot delay the core release.
- `post-mvp`: retained prototype, excluded from the first production release.
- `superseded-do-not-implement`: historical reference only.

## Implementation Values

- `route-shell`: owns a distinct production URL and route-level state machine.
- `route-state`: implemented as a state of an existing route shell.
- `embedded-panel`: rendered inside an owning route; no standalone route.
- `external-surface`: Play Store, distribution or another surface outside the authenticated application router.
- `reference-only`: no production implementation.

## Examples

Retailer wholesale Screens 83-86 share:

```text
/retailer/wholesale/orders/:orderId
```

Their states are `confirmed`, `delivery-tracking`, `goods-receipt`, and `receipt-result`.

Payment Screens 63, 65 and 66 share:

```text
/payments/:paymentId
```

Their states are `processing-receipt`, `pending-refund`, and `failed-reversal-retry`.

Retailer AI Assistant Screen 102 is an embedded panel of `/retailer`, not a separate production route.

## Machine-Readable Sources

- Embedded per-screen contract: `script#productionRouteContract`
- Consolidated registry: `shared/production-route-map.json`
- Reproducible contract tool: `architecture/Apply-Production-Route-Contracts.ps1`

## Current Prototype Conversion Count

```text
Prototype screens: 107
Distinct production route groups represented: 74
MVP-core route groups represented: 51
MVP-conditional route groups represented: 7
Post-MVP route groups retained as references: 16
Superseded prototype screens: 1 (Screen 69)
```

The 58 core plus conditional route groups are the production-route equivalent of the existing launch-relevant prototypes. Missing manufacturer/supplier, captain, creator and administration workspaces are added against the overall 105-120 route ceiling; deferred Eat, health, salon and Get It Done route groups do not consume the 45-day launch budget.

If a later implementation conflicts with a prototype number, this consolidation contract controls route ownership while the prototype continues to control approved UI and behavior.
