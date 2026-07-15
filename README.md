# MoolSocial Prototype

This repository is the approved UI/UX prototype screenbook for MoolSocial.

## Required Architecture Reading

Before designing Screen 69 or any provider, business, professional, creator, worker or organization screen, read:

`architecture/MY-WORK-AND-PROVIDER-WORKSPACE-ARCHITECTURE-LOCK.md`

`architecture/WORK-PROFILE-TAXONOMY-AND-RESOLVER-LOCK.md`

`project-memory/DECISION-LOG.md`

Before manufacturer, distributor, wholesaler, supplier, transport or wholesale-procurement implementation, also read:

`architecture/SUPPLIER-OFFER-PAYMENT-DELIVERY-LOCK.md`

Visual architecture map:

`architecture/my-work-provider-workspace-architecture.html`

This file locks My Work as the universal workspace gateway, the consumer-first identity rule, provider/value-chain coverage, two-sided sell and procurement operations, activation gates and the screen architecture from Screen 69 onward.

## Current Approved Baseline

Approved screens are frozen in:

`approved-final/`

Approved prototype baseline:

`Screens 00 through 165 - all approved and frozen`

Every prototype remains subject to its production route contract. Approval of a prototype does not require a separate production route.

## Open Locally

From this folder:

```powershell
python -m http.server 8787 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8787/approved-final/index.html
```

Complete retailer workspace review:

```text
http://127.0.0.1:8787/retailer-workspace-review.html
```

The approved bundle contains all 166 numbered screens and the passing mobile-review evidence.

## Prototype Structure

- `approved-final/` - locked approved screen baseline
- `screens/` - active working screen prototypes
- `shared/` - shared design foundation and registry
- `assets/` - prototype visual assets
- `architecture/` - locked production and UI/UX architecture decisions
- `project-memory/` - durable user decisions and continuation context
- `_working-notes/` - approval notes and planning records

## Production Route Contracts

Every numbered screen from 00 through 165 contains an invisible `script#productionRouteContract`. Production implementation must read this contract before creating a route.

- Canonical rules: `architecture/MVP-PRODUCTION-ROUTE-CONSOLIDATION.md`
- Machine-readable registry: `shared/production-route-map.json`
- Reproducible updater: `architecture/Apply-Production-Route-Contracts.ps1`
- 120-route launch machine: `architecture/Mvp-Screen-Machine.ps1`
- Locked route budget: `shared/mvp-route-budget.json`

The 166 approved prototypes resolve through the consolidated production route machine. Post-MVP and superseded routes do not consume the launch budget.

## Regression Rule

Approved screens must not be changed casually. Future screens should be designed, reviewed, approved, and then copied into `approved-final/` only after approval.
