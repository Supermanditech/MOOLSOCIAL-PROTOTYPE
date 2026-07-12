# MoolSocial 120-Route MVP Machine

Date: 12 July 2026

## Outcome

MoolSocial will plan the MVP around a baseline of 120 launch-relevant production routes. This is a delivery-control target, not an artificial product ceiling. The machine keeps consolidation mandatory and permits a route above 120 only when it is explicitly registered as a controlled extension with a written reason.

The current approved prototypes represent 58 launch-relevant route groups. The remaining 62 routes are reserved for manufacturer/supplier, captain, creator, freelancer, generic provider, MoolSocial administration and shared cross-workspace capabilities.

## Screen Versus Route

A prototype is an acceptance example. A production route is an implemented navigation and ownership boundary.

Future prototype numbers may exceed 120 when they describe additional states of an existing route. They do not consume route budget when their contract says `route-state` or `embedded-panel` and reuses an existing `routeId`.

Only a new launch-relevant `route-shell` with a new `routeId` consumes one baseline route position. States, panels and responsive variants do not consume another route.

## Maximum Capability With Fewer Routes

Each workspace must use:

1. One operating home with priority work and counters.
2. Progressive disclosure instead of separate question and confirmation routes.
3. Stateful detail routes for accepted, active, completed, failed and disputed stages.
4. Shared KYC, payments, chat, files, notifications, audit and support engines.
5. Configuration-driven catalogues, forms, permissions and commercial terms.
6. Role-specific data and actions inside the shared workspace shell.
7. Embedded panels for AI help, summaries and secondary analytics.

## Required Machine Checks

Before a new screen can be registered:

- Screen number and file must be unique.
- Route ID must map to exactly one path.
- Route state must be unique inside its route.
- Route-state and embedded-panel screens must reuse an existing route.
- A new MVP route should have remaining baseline and workspace allowance.
- A route beyond either planning allowance requires `AllowBudgetExtension` and an `ExtensionReason`; silent route growth is rejected.
- A new route must declare the primary pain solved and its feature outcomes.
- Every future launch screen must declare one or more capability keys from its workspace allocation.
- `ValidateWorkspace` must pass with no missing capability keys before that workspace can be called complete.
- Post-MVP screens cannot enter the launch router.
- Approved files cannot be overwritten by draft registration.

## Machine Files

- Route budget: `shared/mvp-route-budget.json`
- Production route map: `shared/production-route-map.json`
- New-screen machine: `architecture/Mvp-Screen-Machine.ps1`
- Existing-screen contract tool: `architecture/Apply-Production-Route-Contracts.ps1`

## Planning Baseline

```text
Existing launch-relevant routes       58
Manufacturer / supplier               16
Captain                                8
Creator                                8
Freelancer / Earn                      6
Generic service provider               8
MoolSocial administration             10
Shared cross-workspace                 6
-----------------------------------------
Baseline launch routes               120
```

The user has authorised controlled expansion beyond 120 when a distinct production journey cannot be safely represented as a state or embedded panel. Expansion must remain visible in machine reports and must never be used to avoid progressive disclosure or shared engines.
