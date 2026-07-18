# Superadmin Workspace Offering Provisioning Lock

Status: PROTOTYPE PROVISIONING APPROVED; FOUNDER UI/UX REVIEW PENDING; PRODUCTION IMPLEMENTATION PENDING

Prepared: 18 July 2026 IST

Prototype owner:

- Screen 156: `screens/156-admin-audience-launch-configuration.html`
- Production route: `/admin/configuration`
- Route state: `offering-provisioning`
- Machine contract: `shared/offering-provisioning-contract.json`

Catalogue source:

- `WORKSPACE-WISE-MOOLSOCIAL-USER-OFFERING-DECISION-CATALOGUE.md`

## 1. Decision

MoolSocial Superadmin must be able to provision, target, approve, launch, pause and measure profile-specific products, services, managed offerings, outcome plans and funded work without hardcoding each offer into every client screen.

The mobile and web clients render a server-owned product version only when:

- the user or workspace matches the eligibility policy;
- the required verification, authority and operating readiness are current;
- the product version is active for that geography and app capability;
- price, funding, capacity, evidence, fulfilment and support terms are resolvable;
- and the rollout state permits exposure.

This provisioning system is part of the product from the beginning. It is not a later marketing console.

## 2. What Superadmin Can Provision

Supported commercial objects:

1. Profile-specific software entitlement.
2. MoolSocial-operated managed service.
3. Outcome Contract or guaranteed controllable result.
4. Future-demand or funded sales product.
5. Funded work opportunity.
6. Reserved capacity product.
7. Sourcing, recovery or back-office service.
8. Required compliance or readiness action.
9. Feature release and related user education.
10. Optional campaign or communication attached to an already valid product.

An offering may target:

- the permanent Individual / Consumer identity;
- one workspace profile;
- several compatible workspace profiles;
- a workspace subtype or business activity;
- a geography or service area;
- a verification/readiness state;
- a plan or entitlement;
- a permitted intent or Future-Need state;
- a controlled rollout cohort.

One offering version must not mix incompatible profile families. Selecting a profile from a different family creates a separate version so its route, terms, evidence, eligibility and user wording remain authoritative.

## 3. Configuration-Only Versus Development-Required

### Configuration-only provisioning

Superadmin may provision without a new client release when all required capabilities already exist:

- catalogue or service definition;
- stock/capacity;
- price and terms;
- order, booking, trip or task;
- payment/funding;
- evidence and acceptance;
- fulfilment;
- refund/cancellation;
- entitlement;
- notification and Priority Inbox;
- support and dispute;
- analytics and kill switch.

The offering composes these registered capabilities and binds them to an existing route state.

### Development-required provisioning

Superadmin must not invent a capability from configuration.

Development, security, compliance and runtime validation remain required for:

- a new money or settlement behaviour;
- a new regulated activity;
- a new external integration;
- a new authoritative evidence type;
- a new irreversible command;
- a new client component or interaction pattern;
- a new fulfilment, refund or dispute process;
- a new autonomous-agent authority;
- a new legal or principal-risk role.

After the reusable capability is deployed and registered, later compatible offerings may use it through configuration.

## 4. Six-Step Superadmin Journey

### Step 1 — Result And Foundation

Superadmin chooses:

- offering foundation;
- user-facing name;
- plain-language result;
- commercial direction: Grow my business, Earn from work, or two deliberately separate paths;
- owning product domain.

The product is rejected when the title or result is vague, internal or not measurable.

### Step 2 — Eligibility

Superadmin selects:

- Individual / Consumer and/or canonical workspace profiles;
- subtype/activity where required;
- geography;
- verification and licence requirements;
- catalogue, stock, staff, vehicle or capacity readiness;
- plan/entitlement;
- consent or Future-Need requirement;
- app capability/version.

The console shows an estimated eligible count. It never exposes a downloadable personal audience.

### Step 3 — Commercial And Guarantee Contract

Required configuration:

- price model;
- base price or subscription;
- funded reward/third-party-spend cap;
- capacity;
- duration;
- qualifying event;
- evidence;
- cancellation/refund;
- make-good;
- settlement delay;
- principal role, if any.

The product cannot enter approval without an exact qualifying result and maximum liability.

### Step 4 — User Experience Binding

Superadmin configures:

- user-facing headline;
- summary;
- CTA;
- authoritative destination route and route state;
- workspace home, catalogue, Priority Inbox, Chat or other permitted surfaces;
- localized copy;
- required disclosure;
- card preview.

The card opens the actual decision or operating route. It must not open a dead promotional page.

### Step 5 — Governance And Rollout

Required controls:

- product owner;
- compliance owner where applicable;
- finance approval for price, reward, money or principal exposure;
- operations owner for managed capacity;
- support owner;
- maker-checker approval;
- canary percentage/geography;
- start/end;
- stop rules;
- kill switch;
- rollback product version.

### Step 6 — Review And Provision

The console displays:

- exact selected profiles;
- eligibility summary;
- user card preview;
- commercial maximum;
- guarantee and evidence;
- approvals;
- rollout;
- affected routes;
- product version.

Available actions:

- Save draft.
- Send for approval.
- Return for correction.
- Approve canary.
- Schedule.
- Launch.
- Pause.
- Stop.
- Roll back.
- Retire.

## 5. Product Lifecycle

```text
draft
-> readiness_checked
-> approval_requested
-> product_approved
-> finance_approved_if_required
-> compliance_approved_if_required
-> scheduled
-> canary_live
-> rollout_held_or_expanded
-> live
-> paused_or_stopped
-> completed_or_retired
```

Correction paths:

```text
approval_requested -> changes_required -> draft
canary_live -> health_failed -> paused -> corrected_version
live -> funding_or_capacity_exhausted -> held
live -> policy_or_safety_stop -> stopped
```

## 6. Runtime Resolution

At card-render time the backend resolves:

```text
account identity
+ active workspace and role
+ workspace profile/subtype/activity
+ geography and serviceability
+ verification/licence/readiness
+ stock/staff/vehicle/capacity
+ consent and permitted intent
+ product version and entitlement
+ funding and commercial cap
+ rollout allocation
+ conflicts, suppression and frequency
```

The response contains:

- product/version ID;
- inclusion reason;
- exact card copy;
- CTA;
- destination route/state;
- authoritative price/terms;
- current capacity;
- disclosure;
- expiry;
- action contract.

The client does not calculate eligibility, invent price, infer regulated authority or choose an alternative destination.

## 7. Required Production Records

- `offering_template`
- `offering_version`
- `capability_binding`
- `workspace_profile_eligibility`
- `activity_and_subtype_policy`
- `geography_policy`
- `readiness_policy`
- `commercial_terms`
- `guarantee_contract`
- `evidence_contract`
- `route_binding`
- `surface_binding`
- `workspace_entitlement`
- `funding_reservation`
- `approval_case`
- `rollout`
- `offering_exposure`
- `offering_action`
- `offering_outcome`
- `offering_health`
- `audit_event`

## 8. Authority Separation

No single ordinary admin role may silently create, fund and publish a product.

Minimum roles:

- Product Provisioner.
- Product Owner.
- Finance Approver.
- Compliance Approver.
- Operations Capacity Owner.
- Launch Controller.
- Emergency Pause Controller.
- Auditor.

High-risk changes require fresh approval:

- price or maximum user payment;
- funded reward;
- guarantee or make-good;
- refund/cancellation;
- eligible profile or geography;
- regulated scope;
- principal inventory/capacity commitment;
- money destination;
- evidence or settlement rule.

## 9. UI/UX Locks

1. Reuse Screen 156 and `/admin/configuration`; do not add another production route.
2. `Create offering` opens a six-step contained provisioning journey.
3. The admin sees profile names from the canonical workspace registry.
4. Every step produces a visible result and supports Back/Close.
5. The final action produces a versioned offering reference and approval state.
6. The prototype must demonstrate laptop and mobile layouts.
7. A product card preview is mandatory before approval.
8. The review must show the exact user/workspace destination.
9. Communication channels are secondary to the product contract.
10. No raw recipient list or personal-data export is provided.

## 10. Development Gate

Before production development starts, founder review must finalize:

- user-facing product language;
- the workspace-wise launch catalogue;
- Purchase Power, Wish, Goal Credit, Signal, Pulse and Reach Power;
- YouTube Connect;
- optional YouTube-sourced Campaign Reels lasting exactly 24, 48, 72, 96, 120, 144 or 168 hours after approved activation;
- Superadmin provisioning UI;
- exact product/route bindings;
- legal and operating gates.

After those decisions, development tickets must implement one complete offering end to end before the next offering is started.

## 11. Prototype Verification Evidence

Verified locally on 18 July 2026:

- laptop and 390 x 844 phone-width layouts;
- all six provisioning steps;
- empty offering-name rejection;
- incompatible profile-family replacement;
- profile-aware destination selection;
- readiness and surface toggles;
- missing Product approval rejection;
- approval-held receipt creation;
- `Create another offering`, Close and safe reset;
- exact created-record replay after starting another draft;
- working/deployable file parity;
- JavaScript syntax and JSON parsing;
- browser console: zero warnings or errors;
- route machine: 166 screens, 113 launch routes used, 7 remaining;
- admin route budget: 10 of 10 routes, capability coverage complete.
