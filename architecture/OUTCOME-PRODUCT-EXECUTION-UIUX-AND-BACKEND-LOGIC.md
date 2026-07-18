# Outcome Product Execution: UI/UX And Backend Logic

Status: PRODUCTION ARCHITECTURE CONTRACT; SCREEN REDESIGN AND API IMPLEMENTATION PENDING

Prepared: 17 July 2026 IST

Product catalogue: `WORKSPACE-SPECIFIC-360-OUTCOME-PRODUCT-CATALOGUE-PENDING-UIUX.md`

Machine contract: `shared/outcome-product-execution-contract.json`

Implementation ticket: `PROD-JRN-023`

Concrete managed packages: `WORKSPACE-SPECIFIC-MOOL-OPERATED-MANAGED-OFFERINGS.md`

## 1. User Outcome

A workspace owner should be able to:

```text
state the business result wanted
-> see whether the business is ready
-> receive an exact operated plan
-> understand work, price, cap and qualifying result
-> authorize and fund it
-> complete only the required readiness actions
-> watch real execution and business events
-> inspect every qualified conversion
-> see achieved result, total cost and next action
```

The app must not ask the owner to translate a business problem into internal campaign, workflow, worker or software terminology.

## 2. Two Intentions That Must Never Be Mixed

Some workspaces may both buy outcomes and perform funded work. The first decision must therefore be explicit:

| User intention | Meaning | Money direction | Completion |
|---|---|---|---|
| **Grow my business** | The workspace buys a MoolSocial-operated outcome | Workspace funds base work, third-party spend and capped qualified-result fees | Accepted deliverables plus verified business results |
| **Earn from work** | The workspace accepts an already funded execution assignment | Funder reserves money; eligible participant earns after proof/outcome approval | Accepted task/campaign proof and payable ledger entry |

The UI may show both choices where eligible, but a user never unknowingly crosses from one commercial role to the other.

Examples:

- A restaurant chooses **Grow my business** to fill lunch capacity; a freelancer chooses **Earn from work** to execute verified menu digitization.
- A creator chooses **Earn from work** to produce approved content; the same creator may separately choose **Grow my creator business** for permitted channel/business operations.
- A service provider may buy customer-booking operations and separately accept funded customer-service assignments.

## 3. Route And Navigation Model

Do not create one route for every product or every prototype screen. The shared components are mounted inside existing workspace-owned routes:

| Workspace family | Outcome catalogue and plan owner |
|---|---|
| Retailer / Kirana / individual seller | `/retailer/services` and `/retailer/services/:serviceId` |
| Manufacturer / supplier / raw material / packaging | `/supply/services` |
| Food, health, salon and individual service providers | `/provider/growth` with explicit `grow-results` and `earn-work` states |
| Captain and transport participant | existing Captain home, requests and support-work routes |
| Creator | `/creator/campaigns`, `/creator/performance` and `/creator/earnings` |
| Freelancer / field / Get It Done | `/earn`, opportunity detail, proof and earnings routes |

The result plan is a coordination view. It deep-links into the authoritative operating route:

```text
Update stock -> Stock route
Set capacity -> Availability route
Review order -> Order route
Complete booking -> Fulfilment route
Submit work proof -> Earn proof route
Review charge -> Business Book or plan ledger
Resolve issue -> Linked support case
```

Returning from the operational route restores the plan, current step and scroll position.

Mool remains the stable one-tap return to the personal layer. Chat remains the stable communication shortcut.

## 4. Shared Eight-Step UI Journey

The journey uses one catalogue route and one stateful detail route or route state.

### Step 1 — Results On Workspace Home

The home shows:

```text
Results for your business
Current bottleneck
Best next result
Two alternatives
Active result plans
```

Example:

```text
Lunch capacity available: 120 orders
Best next result: Fill 80 additional lunch orders in 7 days
Why: menu, kitchen capacity and delivery area are ready
Action: Check plan and maximum cost
```

The home must not show a generic grid of all services.

### Step 2 — Goal And Baseline

The user chooses a plain-language goal:

```text
Get more retained orders
Fill available slots
Build repeat customers
Reduce purchase cost
Recover unpaid invoices
Improve delivery or route use
Complete business readiness
```

Known values are prefilled from authoritative workspace records. The user confirms only missing or stale facts.

The baseline screen shows:

- current measurement period;
- current orders/bookings/contracts;
- average retained order/booking value;
- stock, staff, slot, production, vehicle or route capacity;
- service area and operating schedule;
- current repeat, cancellation, refund or failed-fulfilment rate;
- missing readiness items.

Action: **Confirm baseline**.

### Step 3 — Readiness And Capacity Check

The backend evaluates:

```text
profile and business activity
verification and required authority
catalogue/menu/service readiness
authoritative price
stock or operating capacity
geography and schedule
fulfilment capability
payment and refund setup
evidence sources
conflicts and active-plan commitments
```

UI states:

- **Ready** — continue to plan.
- **Ready after these actions** — show the smallest ordered checklist.
- **Not eligible now** — show the exact reason and allowed next action.
- **Needs review** — preserve inputs and provide review reference/SLA.

The user cannot pay for acquisition while the business is unable to fulfil the target.

### Step 4 — Plan Builder And Target Arithmetic

The plan builder asks only product-relevant questions. It calculates:

```text
target incremental outcome
required retained conversions
available capacity
duration and geography
MoolSocial-operated work
participant or delivery capacity
base fee
approved third-party spend
fee per qualified result or accepted milestone
maximum payable amount
```

Example:

```text
Target: INR 30,000 additional retained lunch sales
Retained average order: INR 300
Required retained orders: 100
Available capacity: 120
Period: 7 days
Base operating fee: INR 1,000
Result fee: INR 50 per retained delivered order
Maximum result fees: INR 5,000
Maximum before tax: INR 6,000 plus approved media/delivery spend
```

Action: **Review exact plan**.

### Step 5 — Contract, Authorization And Funding

Before commitment, show one decision page:

```text
Result sought
Work MoolSocial commits to perform
What the workspace must provide
Qualifying conversion
Evidence and attribution window
Refund, cancellation and duplicate exclusions
Base fee
Third-party spend
Result fee
Tax
Maximum payable
SLA, rework and service-credit rule
Pause, stop, dispute and renewal rules
```

Required actions:

1. owner confirms the plan version;
2. required purpose/data permissions are granted;
3. payment mandate or funding reservation succeeds;
4. the server returns an authoritative plan reference.

Action: **Fund and start plan**. Never label it simply **Continue**.

### Step 6 — Readiness Completion

The active plan opens first to **Complete setup** when prerequisites remain.

Each task has:

- exact owner;
- required action;
- deep link to the operating route;
- due time;
- proof source;
- current state;
- retry or support action.

Examples:

```text
Publish 24 eligible products
Confirm 120 lunch-order capacity
Connect YouTube channel
Approve campaign disclosure
Verify vehicle document
Add refund rule
Reserve campaign funds
```

The plan becomes active only after the server rechecks all time-sensitive prerequisites.

### Step 7 — Live Result Centre

The active screen prioritizes decisions, not vanity analytics:

```text
Target and time remaining
Capacity committed / remaining
MoolSocial work completed / due
Transactions or milestones in progress
Qualified results
Held, excluded, refunded or disputed results
Spend, result fees and remaining maximum
Actions requiring owner attention
```

Every number opens its evidence:

- order/booking/contract/task reference;
- customer-safe or counterparty-safe identity;
- attribution version;
- payment and fulfilment state;
- refund/return window;
- fee calculation;
- dispute action.

The plan can deep-link to existing orders, bookings, stock, capacity, content, delivery and money routes. It does not duplicate those domains.

### Step 8 — Completion And Next Decision

At the end, show:

```text
Baseline
Target
Achieved qualified outcomes
Attributed retained value
MoolSocial-controlled work delivered
Excluded/reversed outcomes and reasons
Base, third-party and result charges
Total paid and maximum not used
Unresolved cases
```

Actions:

```text
Run this plan again
Increase target
Fix the limiting bottleneck
Build repeat business
Download result report
Close plan
```

The plan cannot display **Completed successfully** while required work, settlement or disputes remain unresolved.

## 5. Responsive UI/UX

### Mobile

- One-column decision flow.
- One sticky primary action above the safe-area dock.
- Mool and Chat remain available.
- Active result summary appears first; detail expands progressively.
- Operational deep links return to the same plan state.
- Evidence and terms use full-height sheets or focused routes, never tiny nested popups.

### Laptop / Responsive Web

- Left: plan steps and current status.
- Centre: current action or result ledger.
- Right: cost/cap, capacity and evidence summary.
- The same action order, labels and backend state are preserved across mobile and web.

### Shared components

Extend the production component system with:

```text
OutcomeRecommendationCard
GoalAndBaseline
PrerequisiteChecklist
OutcomePlanQuote
CommercialDecision
PlanExecutionTimeline
QualifiedOutcomeLedger
ResultComparison
```

These compose existing `WorkspaceShell`, `DecisionCard`, `MoneySummary`, `StatusTimeline`, `EvidenceUploader`, `RestrictedState`, `ErrorRecovery` and `Receipt`.

## 6. How Each Workspace Executes

The table describes the user-visible setup, operating action and terminal result. The product engine may recommend a different product when the measured bottleneck changes.

### Products And Trade

| Profile | User setup | During execution | Completion visible to owner |
|---|---|---|---|
| **1. FMCG Manufacturer** | Choose product/SKU, territory, current retailer base, stock/production capacity, dispatch SLA and sales target. Confirm retailer price, eligible channels and maximum budget. | Approve territory plan/content, respond to buyer orders, confirm full/partial capacity, produce/dispatch and resolve exceptions. | Activated retailers, retained first/repeat orders, accepted delivered value, receivables, total plan cost and territory comparison. |
| **2. FMCG Supplier / Distributor** | Choose brands/SKUs, routes, retailer area, stock, fill-rate target, credit terms and delivery capacity. | Review matched retailers, accept orders, allocate stock, run route batches, record delivery/returns and collect invoices. | Active retailers, retained reorders, route density, accepted fill rate, rotated stock and money collected. |
| **3. Raw Material Supplier** | Choose material specification, grade, MOQ, capacity, sample rule, delivery lanes and target buyer type. | Approve qualified requests, send samples, quote locked terms, fulfil PO, upload quality/dispatch documents and resolve claims. | Accepted samples, signed/paid POs, accepted quantity, repeat schedule, logistics saving and receivables. |
| **4. Packaging Supplier** | Choose packaging type/specification, print/artwork requirements, MOQ, sample capacity, lead time and buyer activity. | Complete specification review, submit sample, lock artwork/version, fulfil PO and handle quality claims. | Approved samples, paid POs, accepted repeat quantity, waste/MOQ saving and claim rate. |
| **5. Grocery / Kirana Shop** | Choose Home & Personal assortment, service area, delivery capacity, retained-order target and campaign cap. Confirm live stock/prices. | Keep stock fresh, approve exceptions, pack orders, hand over delivery, resolve substitutes/refunds and reactivate customers. | Retained orders, delivered basket value, repeat customers, stock reliability, fees/spend and net incremental margin view. |
| **6. General Retail Shop / Dukaan** | Choose assortment/category, home delivery or explicit at-shop collection availability, inactive-customer segment, stock and target. | Publish eligible assortment, fulfil orders, operate loyalty/reactivation and resolve exchange/return cases. | First/return purchases, fulfilment reliability, loyalty renewal, rotated stock and gross-to-net result. |
| **7. Individual Product Seller** | Complete identity/source proof, select product, stock, price, service area, fulfilment and first-sale/repeat target. | Maintain availability, accept/pack/dispatch, provide proof and resolve buyer issues. | First retained sale, accepted fulfilments, repeat sales, refunds/returns and net proceeds. |

### Food

| Profile | User setup | During execution | Completion visible to owner |
|---|---|---|---|
| **8. Restaurant / Dhaba / Cafe** | Choose dine-in/takeaway/delivery goal, menu, meal period, available tables/orders, service area, AOV and target. | Confirm menu availability, manage table/order queue, prepare/handover, recover service failures and request permitted return visit. | Completed paid tables/orders, off-peak utilization, retained revenue, repeat guests, cancellations and total capped cost. |
| **9. Cloud Kitchen** | Choose menu, preparation capacity by period, delivery radius, packaging, AOV and order target. | Maintain item/capacity availability, prepare, pack, hand over and resolve delivery/quality issues. | Delivered retained orders, prep-time SLA, repeat rate, packaging/input saving and net result. |
| **10. Tiffin Provider** | Choose plan/menu cycle, subscription period, daily meal capacity, delivery route, pause rules and subscriber target. | Confirm subscriber calendar, cook/pack, complete route, process pause/restart and collect renewal. | Funded subscribers, completed meal cycles, route density, renewals, failed meals and net collection. |

### Health And Medicine

| Profile | User setup | During execution | Completion visible to owner |
|---|---|---|---|
| **11. Individual Doctor** | Verify registration/practice, speciality, fees, schedule, location/mode and permitted administrative goal. | Manage availability, appointment acceptance, check-in/queue, receipts and consented administrative follow-up. | Scheduling/administrative SLA, completed appointments and follow-up tasks; no referral fee or clinical outcome metric. |
| **12. Clinic** | Verify establishment/practitioners, services, slot capacity, front-desk workflow and permitted administrative target. | Operate roster, booking, check-in, queue, billing handoff and consented follow-up tasks. | Slot utilization and completed administrative workflows, with no patient-procurement commission. |
| **13. Hospital** | Verify institution/departments/authorized roles, appointment capacity, administrative scope, consent and governance approval. | Operate department scheduling, queue/access, authorized document handoff, grievance and vendor/receivable tasks. | Accepted administrative milestones, access SLA, resolved cases and audited charges; never a clinical promise. |
| **14. Licensed Pharmacy** | Verify licence/premises/operator, eligible catalogue, prescription/category gates, delivery area, stock/batch and invoice readiness. | Validate allowed order path, reserve stock, invoice, fulfil compliantly, capture delivery and process cancellation/return. | Lawfully accepted eligible fulfilments, refill workflow status, expiry reduction, procurement saving and exceptions. |

### Services And Salon

| Profile | User setup | During execution | Completion visible to owner |
|---|---|---|---|
| **15. Salon / Parlour** | Choose services, staff, duration, price, open slots, off-peak period, booking or membership target and cap. | Maintain staff/slot capacity, confirm bookings, check in, complete service, consume entitlement and recover service issues. | Completed paid bookings, filled off-peak slots, rebookings/renewals, staff utilization and net plan cost. |
| **16. Home Beauty Provider** | Choose services, radius, schedule, travel buffer, safety preferences, kit capacity, price and booking target. | Accept serviceable bookings, travel, OTP start/end, complete service, record exception and request rebooking. | Proof-completed visits, route efficiency, retained clients, safety cases and net earning/result. |
| **17. Individual Service Provider** | Choose service scope, price basis, area, availability, parts rule, SLA and job/maintenance target. | Quote, schedule, arrive, obtain change approval, complete proof, invoice and resolve claim. | Accepted paid jobs, quote conversion, SLA, maintenance renewals, collections and claims. |

### Ride And Transport

| Profile | User setup | During execution | Completion visible to owner |
|---|---|---|---|
| **18. Bike Captain** | Declare eligible vehicle, service area, available demand hours, route preference and bounded operating target. | Go available, review exact request/net fare, accept once, arrive, verify pickup, complete and settle. | Completed settled trips, utilized hours, empty time, expenses, net earnings and safety/support cases. |
| **19. Auto Captain** | Declare zone, capacity, availability, recurring/return preference and verified documents. | Accept compatible trips, navigate, OTP start, complete, collect/settle and report issues. | Completed trips, recurring/return legs, utilized time, net payout and disputes. |
| **20. Cab / Car Captain** | Declare vehicle class, airport/business eligibility, luggage/capacity, schedule and service area. | Accept scheduled request, arrive, verify, complete, review additions and settle. | Completed scheduled/account trips, return-trip utilization, payout, costs and service cases. |
| **21. Delivery Partner** | Declare area, shift, carrying capacity, vehicle/equipment and merchant batch eligibility. | Accept batch, verify pickup, follow stops, capture delivery/failed-attempt proof, return when required and reconcile cash. | Completed deliveries per route, failed-delivery reasons, time/distance, gross-to-net payout and cases. |
| **22. Local Porter / Goods Transporter** | Declare vehicle/equipment, load type/dimensions, service area, handling limits, price basis and availability. | Review load, accept locked quote, capture custody, pickup, route and delivery/GRN proof; resolve damage/change. | Accepted completed loads, capacity/return-load use, collections, expenses and claims. |
| **23. Transport / Fleet Operator** | Choose vehicle pool, lanes, driver eligibility, B2B SLA, available capacity, target utilization and receivables. | Assign driver/vehicle, dispatch, monitor trip/delivery, manage maintenance/exception and invoice account. | Fleet utilization, completed SLA movements, uptime, route margin and collected receivables. |

### Create And Work

| Profile | User setup | During execution | Completion visible to owner |
|---|---|---|---|
| **24. Shorts Creator** | Connect eligible YouTube channel/video, select approved campaign brief, rights/disclosure, availability and exact commerce action. | Create/submit asset, complete review/rework, publish/connect eligible YouTube content and monitor MoolSocial actions. | Accepted deliverable fee, retained MoolSocial conversions, holds/reversals, deductions and net payout; no YouTube engagement payment. |
| **25. Long-Form Video Creator** | Select brief, YouTube content plan, deliverables, rights, deadline, revisions and connected MoolSocial action. | Submit script/asset as required, complete approval, publish/connect and resolve rights or delivery issues. | Accepted contracted content, separately attributed retained conversions, licence scope and payout. |
| **26. Multi-Format Creator** | Choose integrated brief, asset mix, territory, schedule, capacity, usage rights and conversion action. | Produce/approve each asset, publish native text/images and connect YouTube content; manage concurrent conflicts. | Accepted asset ledger, campaign completion, retained conversions, rights and consolidated payout. |
| **27. Freelancer / Field Partner** | Select funded opportunity, review eligibility, geography, scope, proof, deadline, gross/net and capacity. | Accept once, navigate/execute, submit required proof, respond to rework and support business activation. | Approved task or activation outcome, evidence decision, deductions, payable date and payout. |
| **28. Get It Done Provider** | Review destination task, steps, spending cap, custody, timing, permissions, proof and payout before acceptance. | Complete pickup/queue/purchase/submission/collection steps, request approvals for changes and submit receipts/OTP/proof. | Customer-accepted end intent, reconciled expenses, net payout or an explicit evidence-backed blocked/cancelled result. |

## 7. Backend Domain Ownership

The backend uses one outcome orchestration layer. It references, but never replaces, authoritative commerce, booking, ride, work, payment and workspace domains.

Each plan also declares its commercial role from `shared/managed-offering-contract.json`. Reserved capacity, sourcing agency, results workforce, marketplace operation, principal inventory purchase/capacity reservation and professional coordination cannot share ambiguous ownership, invoice, tax or refund responsibility.

| Backend domain | Owns |
|---|---|
| **Profile Registry** | verified profile, activity, capabilities, licences, restrictions and profile schema version |
| **Outcome Product Catalogue** | product/version, eligible profile/activity, required inputs, controlled work, conversion, evidence, price formula and policy |
| **Diagnostic Engine** | baseline snapshot, freshness, bottleneck scoring and recommendation explanation |
| **Eligibility & Capacity** | authority, catalogue, stock, staff, slot, production, vehicle, geography, schedule, conflicts and prerequisite decisions |
| **Quote & Contract** | target arithmetic, scope, price, tax, cap, attribution, exclusions, acceptance and contract version |
| **Funding & Mandate** | base fee, third-party budget, maximum result liability, payment authorization/reservation and release controls |
| **Outcome Orchestrator** | plan state, milestones, dependencies, due times, pause/stop and operational deep links |
| **Execution Manager** | MoolSocial teams, creators, freelancers, providers, delivery or automated jobs assigned to deliver controlled work |
| **Attribution & Qualification** | competing source precedence, conversion eligibility, retention/refund window, duplicate/fraud decision and rule version |
| **Evidence** | source event references, uploads, integrity metadata, reviewer decision and append-only history |
| **Money Ledger** | base charges, spend, result fees, holds, taxes, participant earnings, refunds, reversals and reconciliation |
| **Cases & Disputes** | prerequisite review, result dispute, service failure, appeal, compensating entry and final reason |
| **Admin Configuration** | maker-checker product versions, pricing, geographies, professional gates, emergency stop and audit |

## 8. Core Data Model

Recommended aggregates/tables:

```text
outcome_product_definitions
outcome_product_versions
outcome_product_profile_rules
workspace_baseline_snapshots
outcome_recommendations
outcome_quotes
outcome_contracts
outcome_prerequisite_checks
outcome_plans
outcome_plan_milestones
execution_assignments
outcome_evidence
attribution_decisions
qualified_outcomes
outcome_ledger_entries
outcome_cases
outcome_result_reports
```

Key rules:

- IDs are immutable and opaque.
- Money uses integer minor units plus currency.
- Every mutable aggregate has a monotonic version.
- Product, policy, price, evidence and attribution versions are retained at commitment.
- Sensitive evidence is stored outside analytics and referenced by authorized ID.
- Workspace authorization is enforced server-side; a client-supplied workspace ID never grants access.
- Original events and ledger entries are append-only. Corrections use new decisions or compensating entries.

## 9. Plan State Machine

```text
DRAFT
-> BASELINE_PENDING
-> PREREQUISITES_PENDING
-> QUOTED
-> AUTHORIZATION_PENDING
-> FUNDING_PENDING
-> SETUP_PENDING
-> READY
-> ACTIVE
-> OUTCOME_REVIEW
-> COMPLETED
-> RENEWED or CLOSED
```

Exception states:

```text
REVIEW_REQUIRED
PAUSED
FUNDING_FAILED
EXPIRED
CANCELLED
DISPUTED
PARTIALLY_COMPLETED
SERVICE_FAILURE
```

Only the server transitions state. The client submits commands and renders the returned aggregate/version.

Rules:

- `QUOTED` requires a fresh baseline and resolved product version.
- `FUNDING_PENDING` cannot be bypassed where financial liability exists.
- `READY` requires all blocking prerequisites.
- `ACTIVE` rechecks expiring capacity, authority, terms and funding.
- `COMPLETED` requires contracted deliverables, final qualification window, money reconciliation and no blocking unresolved case.
- Pause stops new commitments; it does not silently cancel already accepted orders, bookings, trips or work.

## 10. Conversion Qualification Logic

A candidate result becomes billable/payable only when:

```text
eligible profile/activity
AND eligible product/service/SKU
AND within plan geography and time
AND authoritative transaction or accepted milestone exists
AND attribution winner is this plan under the committed rule version
AND required payment/funding is valid
AND required fulfilment/acceptance proof exists
AND cancellation/refund/return window has passed or contract permits a hold
AND duplicate, self-dealing, collusion and fraud checks pass
AND plan and per-actor caps remain available
```

Pseudologic:

```text
candidate event
-> deduplicate by event ID
-> load committed plan and rule versions
-> test eligibility, scope, capacity and attribution
-> test payment and fulfilment
-> place in hold when return/dispute window remains
-> qualify or exclude with reason
-> post result fee and participant earning atomically
-> create compensating entries if a later authoritative reversal occurs
```

No client event such as `button_clicked`, `page_viewed` or `video_played` can qualify money.

## 11. Recommendation Logic

The diagnostic engine first removes ineligible products. It then scores the remaining products:

```text
impact potential
x evidence confidence
x capacity readiness
x fulfilment reliability
x margin/cash relevance
x regulatory safety
- setup effort
- conflict risk
- unresolved exception risk
```

The owner sees the explanation:

```text
Recommended because you have 120 unused lunch-order capacity,
your menu and delivery area are ready,
and your last 30-day repeat rate is below your chosen target.
```

It must not expose protected anti-fraud rules or infer regulated authority from behaviour.

## 12. API Boundary

Proposed versioned APIs:

```text
GET  /v1/workspaces/{workspaceId}/outcome-products/recommendations
POST /v1/workspaces/{workspaceId}/outcome-baselines
POST /v1/workspaces/{workspaceId}/outcome-quotes
GET  /v1/outcome-quotes/{quoteId}
POST /v1/outcome-quotes/{quoteId}/accept
POST /v1/outcome-plans/{planId}/reserve-funding
POST /v1/outcome-plans/{planId}/activate
GET  /v1/outcome-plans/{planId}
GET  /v1/outcome-plans/{planId}/milestones
POST /v1/outcome-plans/{planId}/pause
POST /v1/outcome-plans/{planId}/resume
POST /v1/outcome-plans/{planId}/close
GET  /v1/outcome-plans/{planId}/outcomes
GET  /v1/outcome-plans/{planId}/ledger
GET  /v1/outcome-plans/{planId}/report
POST /v1/outcome-plans/{planId}/cases
```

Operational actions remain with their owning APIs. For example, a plan never updates stock using an outcome-plan endpoint; it deep-links to and observes the Stock domain command/event.

All writes require:

```text
Idempotency-Key
authenticated actor
authorized workspace and role
expected aggregate version
product/policy version where relevant
audit correlation ID
```

Stale versions, exhausted capacity and invalid transitions return stable `409` problem responses with the exact recovery action.

## 13. Roles And Approvals

| Role | Allowed actions |
|---|---|
| Owner / authorized business admin | confirm target, accept contract, grant access, reserve funding, change cap, pause/close and dispute |
| Manager | prepare baseline, complete readiness, operate milestones and respond to exceptions within granted limits |
| Staff | complete assigned catalogue, order, booking, fulfilment or evidence tasks |
| Accountant / finance | inspect charges, invoices, taxes, payouts, exports and reconciliation; cannot change commercial scope unless granted |
| Execution participant | accept funded scope, complete work, submit proof, rework and dispute payout |
| MoolSocial operations | review eligibility/evidence and operate contracted work under role and policy |
| MoolSocial finance/risk | reserve/reconcile money, decide governed holds and fraud/risk cases |
| Admin maker-checker | publish product/pricing/policy versions and emergency-stop capabilities |

Money, publication, regulated action, target/cap increase and final dispute decisions cannot be silently delegated to an AI agent.

## 14. Failure And Recovery UI

Every step must implement:

| Failure | UI response | Backend rule |
|---|---|---|
| Stale baseline | Preserve choices; show changed field and **Refresh baseline** | Old snapshot cannot create quote |
| Capacity reduced | Recalculate target/cap and request confirmation | Existing commitments preserved; new commitments stop |
| Funding failed | Show reason-safe failure and **Try payment again** / change method | No active plan or participant assignment |
| Offline during setup | Save permitted local draft and show queued state | No irreversible command is assumed successful |
| Duplicate tap | Return original command result | Same idempotency key creates no duplicate charge/plan |
| Permission denied | Explain required access and consequence; allow later grant | Capability remains blocked only where necessary |
| Verification expired | Pause affected new commitments and deep-link renewal | Already accepted work follows governed resolution |
| No conversions | Show controlled work delivered, funnel evidence and next bottleneck | No result fees fabricated |
| Refund/return | Move outcome to held/reversed with reason | Post compensating ledger entry |
| Disputed result | Open linked evidence case | Charge/payout follows hold policy |
| Service failure | Show missed deliverable, recovery/rework/credit | Cannot mark plan fully completed |

## 15. End-To-End Backend Example

### Restaurant fills 100 lunch orders

```text
1. Restaurant opens Results for your business.
2. Recommendation API reads verified restaurant profile, menu, last 30 days,
   kitchen/delivery capacity and current restrictions.
3. Owner confirms 120 spare lunch-order capacity and requests 100 retained orders.
4. Quote service calculates base fee, result fee, media/delivery spend and cap.
5. Owner accepts quote version and reserves maximum funding.
6. Orchestrator creates readiness milestones and execution assignments.
7. Restaurant completes menu/capacity tasks in provider routes.
8. Campaign/work services execute approved acquisition work.
9. Commerce emits paid order, fulfilment and refund events.
10. Attribution stores the committed rule winner.
11. Qualifier holds each result until its contract window passes.
12. Ledger posts the result fee and any participant earning once.
13. Refunds create compensating entries.
14. Result report compares baseline, target, retained orders, value and cost.
```

The same orchestration applies to a manufacturer PO, salon booking, tiffin renewal, completed trip, accepted creator deliverable, procurement saving or receivable collection. The profile adapter changes inputs, operating route, qualifying event, evidence and regulated gates.

## 16. Admin Execution

Admin needs four controlled surfaces:

1. **Product definition** — profile/activity, work, conversion, evidence, price formula and wording.
2. **Eligibility and geography** — verification, licence, serviceability, capacity and launch flag.
3. **Operations and exceptions** — active plan SLA, missing work, disputed results and emergency pause.
4. **Economics and quality** — reserved liability, charges, payouts, reversals, cohort results and plan failure causes.

Publishing or changing money/eligibility rules uses maker-checker approval, future effective time, versioning, migration impact and rollback.

## 17. Production Acceptance

Each profile adapter and each Outcome Product must prove:

1. correct recommendation and a truthful reason;
2. ineligible and prerequisite-failed paths;
3. valid quote arithmetic and cap;
4. duplicate acceptance/funding safety;
5. exact operating-route deep link and return context;
6. one successful qualifying conversion or accepted milestone;
7. one excluded conversion with reason;
8. cancellation/refund/reversal;
9. dispute and service-failure recovery;
10. pause/resume/close;
11. mobile and web parity;
12. unauthorized role denial;
13. full ledger and result-report reconciliation.

The release is not complete when the plan screen merely says that work started. It is complete only when the full chain from business goal through operational execution to authoritative result, evidence and money has passed.
