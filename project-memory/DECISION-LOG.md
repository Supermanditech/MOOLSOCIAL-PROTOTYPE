# MoolSocial Architecture And Decision Log

## 10 July 2026 - My Work Profile Resolution Correction

### User decision or correction

Screen 69 must not lead a user into the wrong work profile. Creator, Get It Done provider, Retailer, Manufacturer, Doctor, Restaurant, Captain, Salon and every other provider type require distinct workspaces and distinct operating dashboards.

The generic Screen 69 claims `Run your work`, `Orders, bookings and customers`, `Buy for work`, `Stock, supplies and services`, `Earn more` and `Verified work and campaigns` were rejected because they appear before MoolSocial understands what the user actually operates.

Examples locked by the user:

- A Retailer needs the sell side and wholesale procurement side: products, customer orders, counter/home delivery, delivery assignment, stock liquidation, offers, payments, purchases and purchase-delivery tracking.
- A Manufacturer needs finished-goods selling, buyer demand, raw-material and packaging procurement, production, quality, inventory, dispatch and contracts.
- A Restaurant needs menu publication, orders, table/tiffin operations, kitchen capacity, delivery and input procurement.
- A Doctor, Hospital or Clinic needs healthcare-specific appointment, patient, follow-up, reports, receipt, registration and compliance workflows.
- A Captain/Rider needs vehicle, ride, live-trip, zone, fare, settlement and safety operations.
- A Creator needs shorts, long-form video, publishing, creator studio, campaigns, analytics and payouts.
- A Get It Done/Freelancer provider needs task matching, assignment, proof, approval, payout and issue handling rather than Creator tools.

### Product interpretation

MoolSocial will use a controlled Work Profile Resolver. It identifies the delivered outcome, operating model and exact subtype, then shows one recommended workspace and its modules before creation. The user confirms the recommendation before role-specific verification begins.

Capabilities such as Sell, Procure, Deliver, Campaigns, Earn and Payments are reusable modules, not user types.

One personal consumer/social account may own multiple separate workspaces. Valid common identity may be reused, while role-specific data, dashboards, verification, money records and compliance remain separate.

### Files changed

```text
architecture/WORK-PROFILE-TAXONOMY-AND-RESOLVER-LOCK.md
project-memory/README.md
project-memory/DECISION-LOG.md
README.md
architecture/MY-WORK-AND-PROVIDER-WORKSPACE-ARCHITECTURE-LOCK.md
index.html
```

### Approval status

```text
Canonical work-profile taxonomy: saved as architecture input
Profile Resolver architecture: saved as architecture input
Screen 69 current visual: NOT APPROVED; redesign required
Screens 00-68: no approval status changed by this correction
```

### Next unresolved decision

Redesign Screen 69 as a precise My Work Home without generic capability claims, then design Screen 70 as the progressive Work Profile Resolver.

## 10 July 2026 - Rejected Primary Approach: Natural-Language Profile Identification

### User concern

A rigid outcome-first question flow can still send a user into the wrong profile when one answer is tapped incorrectly. Going back or restarting would make workspace creation difficult and inconvenient.

### Earlier proposal

Replace the visible classification tree with `Smart Work Setup`:

1. User says, types, scans or imports what they do in ordinary language.
2. MoolSocial proposes one exact controlled workspace profile.
3. If confidence is low, ask only one distinguishing question.
4. Show the exact dashboard preview before creation.
5. Corrections happen inline without restarting or losing common information.
6. Verification validates the profile before activation; it never silently changes the role.

The controlled Work Profile Resolver would remain an internal policy engine and fallback rather than a long visible questionnaire.

### Approval status

Rejected as the primary classification method. Text, voice and AI cannot authoritatively assign workspaces because users may use local terms, ambiguous descriptions, spelling variations or unsupported professions.

## 10 July 2026 - Supported Workspace Selector Direction

### User decision or correction

Users must know which workspace profiles are actually available in MoolSocial and deliberately tap one. Examples such as `dukaan`, `clinic`, `cloud kitchen`, `cook`, `maa ka dhaba`, `motel` or `full stack developer` cannot be trusted to produce the correct backend workspace automatically.

MVP may not have templates for thousands of possible professions. Unsupported professions must not receive an invented generic workspace.

### Product interpretation

Screen 70 will show only controlled, supported workspace profiles available for the current MVP, location and compliance state.

Text, voice, multilingual terms and regional aliases may filter those existing choices but cannot create or assign a profile. The user must tap an exact supported profile and confirm its dashboard preview.

Wrong taps do not force a restart. Categories only filter choices; no workspace exists until final confirmation. `Change` reopens the selector inline and preserves common information.

Similar profiles receive short comparisons, including Retailer versus Manufacturer, Restaurant versus Cloud Kitchen/Tiffin, Doctor versus Clinic/Hospital, Creator versus Freelancer/Get It Done and Captain versus Delivery.

If no suitable profile exists, show `This work profile is not available yet` and allow notification/request capture without creating a workspace.

### Approval status

Rejected by the user on 10 July 2026. Do not use the Supported Workspace Selector as the basis for Screen 69 or Screen 70. Screen 69 remains not approved.

## 10 July 2026 - Selected Direction: Progressive Workspace Card Tree

### User decision or correction

Use controlled cards rather than typing, automatic classification or one flat workspace selector.

The user first taps a relevant main category card. MoolSocial then shows more specific child cards, followed by sub-child cards where required. Two, three or at most four taps identify the exact intended work profile.

The user cannot create an unsupported role by typing. If an incorrect card path is selected, profile-specific business or professional proof reveals the mismatch before account approval.

### Product interpretation

1. Only MVP-supported, location-eligible and compliance-eligible workspace cards are displayed.
2. Intermediate card taps only filter the next card set; they never create a workspace.
3. A compact breadcrumb keeps the selected path visible and editable.
4. Changing a card happens inline without restarting or losing common information.
5. The exact leaf profile displays its dashboard preview before confirmation.
6. Profile-specific proof is collected only after leaf confirmation.
7. Proof mismatch pauses approval and proposes correction; it does not silently activate or change a profile.
8. One personal account may later add another separate workspace through the same card tree.

### Screen implication

Screen 69 remains the My Work Home and status gateway. Screen 70 is one dynamic Progressive Workspace Card Tree containing all two-to-four-tap identification states.

### Approval status

Progressive card-tree architecture selected by the user. Screen 69 visual remains not approved and must now be redesigned from this architecture.

## 10 July 2026 - MVP Workspace Card Tree, GST Verification and Contact Continuity

### User decision or correction

The workspace tree must be derived from the audited master plan, MVP user plan, industry vertical, value chain, product or service and operating activity. It must cover the launch profiles below with the fewest practical taps while every account remains a consumer/social account:

- FMCG manufacturer and its input/supply chain
- supplier/distributor, raw-material supplier and packaging supplier
- retailer, shop, dukaan and grocery/kirana
- restaurant, cloud kitchen and tiffin provider
- salon, home beauty provider and individual service provider
- individual doctor, clinic, hospital and licensed pharmacy/medical store
- bike, auto and cab/car captain
- delivery partner, local goods transporter and fleet operator
- freelancer/field partner and Get It Done provider
- shorts, long-form and multi-format content creator
- individual product seller

Use a controlled progressive card tree. Do not let typed words create unsupported or incorrectly classified workspaces.

The verified login contact and identity must carry forward into My Work. Do not ask the user to type the same mobile number or email again. Ask for an OTP-verified secondary work number, optional for an individual and required before publication for a multi-person establishment. Keep the personal number private by default and use in-app Chat as the public contact unless the owner explicitly consents.

### Product interpretation

The user-facing tree has six stable root cards:

1. Products & Trade
2. Food Business
3. Health & Medicine
4. Services & Salon
5. Ride & Transport
6. Create & Work

Each path resolves to an exact supported workspace in two to four taps. The exact leaf previews its own sell/serve, buy/procure and operate modules before proof begins. Intermediate taps never create a workspace.

GST classification is a verification axis, not the user-facing navigation. Internally, the selected profile maps to applicable GST nature-of-activity categories such as Factory/Manufacturing, Wholesale Business, Retail Business or Supplier of Services. HSN/SAC and registration details are captured only after the exact profile is known. Professional and sector-specific proof remains profile-specific.

### Files changed

```text
architecture/MVP-WORKSPACE-CARD-TREE-AND-IDENTITY-LOCK.md
project-memory/README.md
project-memory/DECISION-LOG.md
shared/workspace-profile-registry.js
screens/69-my-work-setup.html
screens/70-my-work-choose-activity.html
index.html
```

### Approval status

```text
Progressive workspace architecture: selected and saved
MVP workspace taxonomy and identity rules: saved as implementation basis
Screen 69 revised visual: DRAFT, awaiting user review
Screen 70 dynamic card tree: DRAFT, awaiting user review
Approved-final folder: unchanged
```

### Next unresolved decision

Review Screen 69 and Screen 70 in the browser. After approval, create Screen 71 as the exact profile proof and contact confirmation flow driven by the selected profile registry entry.

## 10 July 2026 - Universal Alternate Mobile And Unsupported Workspace Admin Alert

### User decision or correction

Every work-profile applicant must be asked for an alternate mobile number when one is available. Any entered alternate number must be OTP verified.

When a required workspace is not shown, notification alone is insufficient. MoolSocial must collect the intended workspace and route it to the MoolSocial Admin as an actionable alert.

### Product interpretation

The exact-profile preview asks for an optional alternate mobile for every profile. Blank means unavailable and does not block an individual user. Entering a number creates a mandatory inline OTP step; Continue to proof is blocked until that number is verified.

`My work is not shown` opens a compact request form containing requested workspace, closest root work area and operating city/area. The verified account identity and contact attach automatically. Submission produces a `WORKSPACE_PROFILE_REQUESTED` event with `ADMIN_REVIEW_REQUIRED` status and a traceable request ID. It does not create or guess a workspace.

### Files changed

```text
architecture/MVP-WORKSPACE-CARD-TREE-AND-IDENTITY-LOCK.md
project-memory/DECISION-LOG.md
screens/70-my-work-choose-activity.html
```

### Approval status

```text
Alternate mobile and OTP rule: implemented as Screen 70 draft
Unsupported workspace intent and admin alert: implemented as Screen 70 draft
Screen 70: awaiting user approval
Approved-final folder: unchanged
```

### Next unresolved decision

User review of the new alternate-mobile verification and requested-workspace admin-alert states.

## 10 July 2026 - Screen 70 Approved

### User decision or correction

Screen 70, including its progressive card tree, optional alternate-mobile OTP flow and unsupported-workspace admin alert, is approved.

### Product interpretation

Freeze the Screen 70 visual hierarchy, tap budget, labels, contact behavior and request behavior. Future route wiring may pass the selected profile and verified contacts forward but must not change the approved selection experience without regression review.

### Files changed

```text
approved-final/screens/70-my-work-choose-activity.html
approved-final/shared/workspace-profile-registry.js
approved-final/index.html
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 70: APPROVED
Screen 69: approval status unchanged
Screen 71: next draft
```

### Next unresolved decision

Create and review Screen 71 as the exact-profile details, proof and submission flow.

## 10 July 2026 - Screen 71 Profile Verification Draft

### Product interpretation

After Screen 70 identifies an exact supported profile, Screen 71 opens with that profile already selected. It does not repeat identity, contact registration or workspace classification.

One dynamic screen progresses through profile-specific Details, Proof and Review. Proof source choices are Camera, Upload and Enter details. Submission creates a review case while personal consumer/social access remains active.

### Files changed

```text
screens/70-my-work-choose-activity.html
screens/71-work-profile-proof.html
architecture/MVP-WORKSPACE-CARD-TREE-AND-IDENTITY-LOCK.md
project-memory/DECISION-LOG.md
index.html
```

### Approval status

```text
Screen 70: APPROVED and preserved in approved-final
Screen 71: DRAFT, awaiting review
```

### Next unresolved decision

Review Screen 71 interaction, profile-specific field labels, proof capture and submission state.

## 10 July 2026 - India And Rajasthan Compliance Resolver, Personal KYC And GST Pending

### User decision or correction

Proof must follow statutory requirements applicable in India, starting with Rajasthan. Personal KYC is mandatory for individuals. Business profiles must be asked for a GST certificate; when unavailable, onboarding may continue while the platform keeps reminding the user.

### Product interpretation

Screen 71 now consumes a versioned compliance registry instead of generic proof strings. It separates required statutory documents, mandatory MoolSocial platform checks, conditional statutory documents, GST-pending proof and optional registrations.

Every individual and every authorized business operator must complete personal KYC. Business workspaces may be submitted in `GST_PENDING` state, with persistent My Work and Chat reminders. This is a MoolSocial verification policy and must not be presented as a claim that GST law requires registration for every business.

### Files changed

```text
shared/india-rajasthan-compliance-registry.js
screens/71-work-profile-proof.html
architecture/INDIA-RAJASTHAN-WORKSPACE-COMPLIANCE-RESOLVER.md
project-memory/README.md
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 70: APPROVED
Screen 71 compliance-enhanced draft: awaiting review
```

### Next unresolved decision

Review the compliance labels, Doctor proof flow and business GST-pending experience on Screen 71.

## 10 July 2026 - Post-Profile Identity Verification Options

### User decision or correction

After a user selects a workspace, provide two or three easy identity-verification options, including Aadhaar and facial verification, with preference for free or lower-cost integrations.

### Product interpretation

Screen 71 personal KYC offers:

1. DigiLocker as the preferred consent-based route.
2. UIDAI Aadhaar Offline QR/XML as the low-variable-cost fallback.
3. Selfie and liveness through a replaceable provider adapter when risk requires it.

Direct UIDAI Face Authentication is deferred because it requires the applicable AUA/KUA ecosystem onboarding. MoolSocial will compare hosted selfie/liveness vendors before launch and will not hard-code one provider into the UI.

### Files changed

```text
screens/71-work-profile-proof.html
architecture/IDENTITY-VERIFICATION-INTEGRATION-LOCK.md
project-memory/README.md
project-memory/DECISION-LOG.md
```

### Approval status

```text
Identity integration direction: saved
Screen 71 identity-source picker: draft, awaiting review
```

### Next unresolved decision

Choose the commercial selfie/liveness vendor after sandbox testing, pricing quotes, security review and false-rejection comparison.

## 10 July 2026 - Screen 72 Verification Status Draft

### Product interpretation

After Screen 71 submission, Screen 72 becomes the single review-status surface. It shows the exact profile and case, received checks, review stage, corrections and business GST-pending action.

Users may attach GST later or set a reminder without creating a duplicate application. The reminder remains visible until GST is verified or compliance review resolves non-applicability.

### Files changed

```text
screens/71-work-profile-proof.html
screens/72-my-work-verification-status.html
index.html
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 71: compliance-enhanced draft awaiting review
Screen 72: draft awaiting review
```

### Next unresolved decision

Review Screen 72 GST-pending, reminder, attachment and correction experience.

## 10 July 2026 - Screen 71 Approved After Mobile QA

### User decision or correction

Screen 71 is approved. Recheck its UI and UX before freezing it, then continue to the next screen.

### Product interpretation

Screen 71 is the approved profile-specific Details, Proof and Review flow after workspace selection. Personal KYC remains mandatory and offers DigiLocker, Aadhaar Offline QR/XML, or risk-based selfie and liveness. Applicable India and Rajasthan statutory proof is resolved by profile. Business onboarding may continue with GST pending and recurring reminders.

The 360 px mobile QA confirmed readable statutory labels, no horizontal overflow, safe bottom-sheet sizing, dock clearance and correct Review unlocking only after every blocking check is added.

### Files changed

```text
approved-final/screens/71-work-profile-proof.html
approved-final/shared/india-rajasthan-compliance-registry.js
approved-final/shared/workspace-profile-registry.js
approved-final/index.html
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 71: APPROVED
Screen 72: draft awaiting review
```

### Next unresolved decision

Review and approve Screen 72 as the single work-profile verification status, GST reminder and correction surface.

## 10 July 2026 - Delegated Screen Approval And Screens 72-73 Approved

### User decision or correction

The user delegated screen approval to Codex after Codex performs its secondary functional, responsive UI/UX and regression checks. The user will not always repeat the word `approved` after each screen.

### Product interpretation

A screen may be frozen after secondary QA only when no unresolved product, interaction, compliance, responsive-layout or regression issue remains. A failed check still blocks approval and advancement.

Screen 72 passed its single-case review, GST reminder, later attachment, no-duplicate-application, 360 px layout and console-error checks.

Screen 73 is the approved post-review handoff. Review approval creates the exact workspace but does not publish its products, menu, appointments, rides, services or work. The confirmed profile ID loads three exact readiness steps and one primary setup action from the versioned activation registry. All 28 MVP profiles have a complete activation configuration.

### Files changed

```text
approved-final/screens/72-my-work-verification-status.html
approved-final/screens/73-workspace-ready-handoff.html
approved-final/shared/workspace-activation-registry.js
approved-final/index.html
shared/workspace-activation-registry.js
screens/73-workspace-ready-handoff.html
index.html
project-memory/README.md
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 72: APPROVED after secondary QA
Screen 73: APPROVED after secondary QA
```

### Next unresolved decision

Create Screen 74 as the profile-specific operating setup entered from Screen 73, beginning with the Grocery / Kirana Shop readiness branch while keeping the shell server driven for every supported profile.

## 11 July 2026 - Retailer Operating Architecture, Global Work Switch And Screen 74 Approved

### User decision or correction

The retailer workspace must operate both sides of the shop: products and customer sales, plus wholesale procurement and inventory receipt. Retailers must be able to upload opening stock from CSV on a webpage or mobile phone. Every activated provider must also retain one-tap access between the consumer/social experience and their live workspace.

### Product interpretation

Screen 74 starts from a governed MoolSocial master SKU catalog. A retailer adds only products actually stocked, then edits pack, quality, opening quantity, purchase cost, selling price and low-stock alert. Unmatched products require a current photo and catalog review before becoming consumer-visible.

CSV import uses one device-neutral validation pipeline. Web supports file browse or drag and drop. Mobile supports Files, cloud storage or share-sheet handoff. Rows are mapped, matched by SKU or barcode, checked for duplicates and errors, previewed, then confirmed as auditable opening-stock events. Unknown rows remain in catalog review and never become sellable automatically.

The retailer workspace architecture is locked as a two-sided operating system covering Stock, Buy Stock, Orders, Sales, purchase and stock ledgers, fulfilment, invoices, consented customer messaging, AI-assisted operations, forecasting, slow-stock liquidation, offers and campaigns.

The global navigation contract is also locked: a tap on Mool toggles between the last personal focus and last active workspace; long-press or swipe-up opens the full launcher; actionable orders and messages surface through a Work Pulse without forcing a screen switch. Personal media position, drafts and workspace state are preserved.

### Files changed

```text
architecture/RETAILER-WORKSPACE-OPERATING-ARCHITECTURE-LOCK.md
architecture/GLOBAL-ONE-TAP-PERSONAL-WORK-SWITCH-LOCK.md
screens/74-retail-products-stock-setup.html
approved-final/screens/74-retail-products-stock-setup.html
approved-final/index.html
index.html
project-memory/README.md
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 74: APPROVED after functional and 360 px mobile QA
```

### Next unresolved decision

Create Screen 75 for retailer prices, pack modes and offers, preserving the approved master-SKU inventory handoff and the global one-tap personal/work navigation contract.

## 11 July 2026 - Screen 74 Approval Withdrawn; Full B2B-To-B2C Retail App Required

### User decision or correction

Screen 74 is not approved. The retailer experience must be a proper end-to-end B2B wholesale and retail operating app, comparable in completeness to a dedicated FMCG B2B application, while also operating retailer-to-consumer commerce.

### Product interpretation

The corrected scope is one connected FMCG value chain:

```text
manufacturer / brand / distributor / wholesaler -> retailer -> consumer
```

It must cover verified wholesale SKU supply, packs and cases, MOQ and price slabs, landed cost, margin, credit/payment terms, procurement order, inbound delivery, goods receipt and discrepancy, inventory credit, retailer pricing, customer ordering, counter or home fulfilment, stock debit, invoice, settlement, return and refund.

Screen 74 cannot be only a catalog or opening-stock setup page. It must be redesigned as the retailer operating entry where `Sell to customers` and `Buy stock for the shop` are immediately understood as two sides of one workspace. Stock and ledgers connect both sides.

The existing Screen 74 prototype remains only a working reference for master-SKU, CSV and unmatched-product review behavior. It is removed from `approved-final/` and must not be treated as frozen production architecture.

### Files changed

```text
architecture/RETAILER-WORKSPACE-OPERATING-ARCHITECTURE-LOCK.md
approved-final/index.html
approved-final/screens/74-retail-products-stock-setup.html (removed)
index.html
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 73: last approved screen
Screen 74: NOT APPROVED; full retailer operating app redesign required
```

### Next unresolved decision

Resume with the complete Screen 74 retailer operating information architecture and progressive UX for B2B procurement, stock operations and B2C selling before creating another screen.

## 11 July 2026 - Screen 74 Full Plan Completed Before HTML

### User decision or correction

Prepare and approve the complete Screen 74 plan before restarting HTML so the implementation reaches the precise intended operating outcome.

### Product interpretation

Screen 74 is planned as `Retailer Operating Home`, not a product-upload or onboarding screen. It composes one server-driven operating view across retailer sell-side, B2B buy-side, stock, inbound delivery, customer orders, supplier obligations, settlements and urgent actions.

The locked structural proposal is:

```text
Mool | Home | Orders | Stock | Buy Stock | Chat
```

First-run shop selling setup is progressive. A verified retailer can use `Buy Stock` immediately, but products cannot become consumer-visible until catalog, stock, price, fulfilment, payment and support readiness pass.

Home shows one expanded urgent action and compact operating status for Sell To Customers, Buy Stock For Shop and Business Today. It never exposes an endless supplier directory or product grid.

### Files changed

```text
architecture/SCREEN-74-RETAILER-OPERATING-HOME-PLAN.md
index.html
project-memory/README.md
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 74 plan: AWAITING APPROVAL
Screen 74 HTML: NOT STARTED under the corrected plan
Screen 73: last approved production-facing screen
```

## 11 July 2026 - Screen 74 Approved And Frozen

### User decision

Approve Screen 74 now and perform any broader review later, then continue to the next retailer-store screen.

### Frozen outcome

Screen 74 is the approved retailer hybrid B2B-B2C operating app shell. It includes Business Home, unified Orders summary, My Stock separated from the 10,000-plus master catalog, product add/edit and campaigns, Wholesale Buy cart-to-purchase-order, delivery actions, invoices, Business Book and the locked dock.

### Regression boundary

```text
Source: screens/74-retail-products-stock-setup.html
Frozen copy: approved-final/screens/74-retail-products-stock-setup.html
SHA-256 equality at approval: verified
Screen 74: APPROVED
Screen 74: last approved production-facing screen
```

### Next screen

Screen 75 continues progressively from the Orders summary into retailer order review, acceptance and fulfilment. It must not duplicate the already approved Orders inbox surface inside Screen 74.

### Next unresolved decision

Approve or revise the four structural choices at the end of the Screen 74 plan before any HTML redesign begins.

## 11 July 2026 - Screen 74 Dock And Wholesale Wording Corrected

### User decision or correction

`Mool` and `Home` must not both consume dock positions. `Buy Stock` is incorrect because stock is inventory, not the commercial purchase action. `Stock` and `Buy Stock` also repeat the same word and create ambiguity.

### Product interpretation

The corrected retailer workspace dock is:

```text
Mool | Orders | Products | Wholesale Buy | Chat
```

`Mool` remains the one-tap personal/work context toggle. Tapping the shop identity in the workspace header returns to the Retailer Operating Home from any retailer subflow.

`Products` owns the shop catalog, quantities, availability, pricing and inventory detail. `Wholesale Buy` owns procurement from verified manufacturers, brands, distributors and wholesalers. The word `Stock` remains an internal inventory concept where technically required, but it is not duplicated as two bottom navigation actions.

### Files changed

```text
architecture/SCREEN-74-RETAILER-OPERATING-HOME-PLAN.md
architecture/RETAILER-WORKSPACE-OPERATING-ARCHITECTURE-LOCK.md
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 74 plan: AWAITING APPROVAL with corrected dock wording
Screen 74 HTML: NOT STARTED under the corrected plan
```

### Next unresolved decision

Approve or revise the corrected dock and remaining Screen 74 information hierarchy before HTML begins.

## 11 July 2026 - Screen 74 Retailer Dock Wording Locked

### User decision or correction

Use this retailer workspace dock:

```text
Mool | Orders | Stock | Wholesale Buy | Chat
```

### Product interpretation

`Stock` is the retailer's current shop inventory, catalog, quantity, availability, pricing and inventory ledger. `Wholesale Buy` is the separate upstream procurement action. Because `Buy Stock` has been removed, the two actions no longer repeat or compete semantically.

The shop identity in the header remains the one-tap route to Retailer Operating Home. `Mool` remains the one-tap personal/work context switch.

### Files changed

```text
architecture/SCREEN-74-RETAILER-OPERATING-HOME-PLAN.md
architecture/RETAILER-WORKSPACE-OPERATING-ARCHITECTURE-LOCK.md
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 74 dock wording: LOCKED
Screen 74 plan: AWAITING APPROVAL
Screen 74 HTML: NOT STARTED under the corrected plan
```

### Next unresolved decision

Review the remaining Screen 74 information hierarchy before HTML begins.

## 11 July 2026 - Screen 74 Retailer Operating Home Draft Implemented

### User decision or correction

Proceed with Screen 74 after locking the retailer dock as `Mool | Orders | Stock | Wholesale Buy | Chat`.

### Product interpretation

The old catalog-first Screen 74 draft was replaced with a server-state-driven Retailer Operating Home. The default first-entry state keeps consumer selling gated behind progressive shop setup while making Wholesale Buy immediately available.

The prototype includes:

```text
first entry and progressive shop setup
live shop with calm operating status
new customer order priority
wholesale opportunity
inbound goods receipt
paused customer orders
offline/sync protection
Stock sheet with web/mobile CSV entry
Wholesale Buy decision sheet with MOQ, landed cost, margin, delivery, GST and claim terms
```

The shop identity returns Home. Mool switches to personal/social context. The dock contains only Orders, Stock and Wholesale Buy between Mool and Chat.

The screen passed browser checks at 320, 360, 390 and 430 px widths with no horizontal overflow, dock/action truncation or console errors.

### Files changed

```text
screens/74-retail-products-stock-setup.html
architecture/SCREEN-74-RETAILER-OPERATING-HOME-PLAN.md
index.html
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 74: IMPLEMENTED DRAFT; NOT APPROVED
Screen 73: last approved production-facing screen
```

### Next unresolved decision

Review Screen 74 production UI, operating hierarchy and progressive states. Do not copy it to `approved-final/` until the user approves it or delegates approval after review.

## 11 July 2026 - Full Workspace UI/UX Reset To Demand Aggregation

### User decision or correction

The Screen 74 UI, UX and overall design architecture do not properly represent the B2B-to-B2C demand-aggregation socio-commerce super-app business model. The full architecture must change.

### Product interpretation

The previous Screen 74 is feature-first and behaves like a retailer ERP/dashboard. It organizes Orders, Stock and Wholesale Buy, while MoolSocial's core economic model organizes aggregated demand and verified outcomes.

The corrected shared workspace model is:

```text
Grow the sell side
Improve the buy side
Complete the outcome
```

Recommended retailer language is:

```text
Sell More
Buy Better
Run Shop
```

Proposed retailer dock for approval:

```text
Mool | Sell More | Buy Better | Run Shop | Chat
```

Screen 74 becomes `Retailer Outcome Home`. It centers matched consumer demand, aggregated B2B procurement demand and live completion dependencies. Products, inventory, orders, purchase orders, fulfilment, payments and ledgers remain inside Run Shop or focused outcome flows.

The full value chain is:

```text
consumer need -> local demand pool -> retailer offer/capacity -> retailer procurement pool -> source/manufacturer offer -> payment/supply lock -> inbound -> consumer fulfilment -> proof/settlement/attribution -> repeat demand
```

Social content, creators, business pages and campaigns appear only when they help educate, confirm, aggregate or fulfil measurable economic demand.

### Files changed

```text
architecture/DEMAND-AGGREGATION-WORKSPACE-UIUX-RESET.md
architecture/SCREEN-74-RETAILER-OPERATING-HOME-PLAN.md
index.html
project-memory/README.md
project-memory/DECISION-LOG.md
```

### Approval status

```text
Current Screen 74 HTML: SUPERSEDED / NOT APPROVED
Previous Screen 74 plan: SUPERSEDED
Demand-aggregation workspace reset: AWAITING ARCHITECTURE APPROVAL
Screen 73: last approved production-facing screen
```

### Next unresolved decision

Approve or revise the six architecture questions in `DEMAND-AGGREGATION-WORKSPACE-UIUX-RESET.md` before replacing Screen 74 HTML.

## 11 July 2026 - Retailer Bottom Dock Restored During Demand Reset

### User decision or correction

The previous bottom action words are clearer and must remain:

```text
Mool | Orders | Stock | Wholesale Buy | Chat
```

### Product interpretation

The demand-aggregation reset changes the Home content architecture, matching logic and outcome hierarchy. It does not replace familiar retailer dock actions with abstract growth language.

`Sell More`, `Buy Better` and `Complete Now` remain demand-led Home sections and dynamic outcome states. The permanent dock remains operational:

```text
Orders = confirmed customer demand and fulfilment
Stock = products, quantity, availability, pricing and sell capacity
Wholesale Buy = aggregated retailer procurement and source outcomes
```

### Files changed

```text
architecture/DEMAND-AGGREGATION-WORKSPACE-UIUX-RESET.md
project-memory/DECISION-LOG.md
```

### Approval status

```text
Retailer dock wording: LOCKED
Demand-aggregation Home architecture: AWAITING APPROVAL
Current Screen 74 HTML: SUPERSEDED / NOT APPROVED
```

### Next unresolved decision

Redesign Screen 74 Home content around aggregated demand while preserving the locked dock.

## 11 July 2026 - Full Retailer Hybrid B2B-B2C Operating App Locked For Planning

### User decision or correction

Keep the retailer dock as `Mool | Orders | Stock | Wholesale Buy | Chat`, then design a complete retailer app combining wholesale marketplace browsing, QuickBooks-like business records, B2B buying, B2C selling, phone/counter/app orders, home delivery, inventory, invoices and demand aggregation. Screen 74 remains unapproved.

### Product interpretation

The controlling retailer architecture now combines:

```text
marketplace-grade Wholesale Buy UX
Business Book accounting utility
retailer-to-consumer Orders and delivery
Stock catalog and inventory statement
MoolSocial B2B and B2C demand aggregation
```

Wholesale Buy supports search, categories, product cards, exact SKU/pack/case, MOQ, quantity slabs, landed cost, margin, GST invoice, payment/credit terms, delivery responsibility/time, source proof and shortage/damage/return rules. It uses familiar B2B-commerce interaction patterns but keeps verified sources, payment, fulfilment and structured terms inside MoolSocial.

Orders combines consumer-app orders, counter sales, customer phone orders, Chat orders, repeat baskets and demand-pool orders. A retailer can create an order during a customer call and request MoolSocial home delivery after packing.

Stock begins with master catalog/barcode/invoice/CSV onboarding and then updates from accepted purchase receipts, completed sales, reservations, returns, damage and adjustments. Daily work is exception-based rather than manually recounting every SKU.

Business Book provides automatic sales, purchase, inventory, cash/UPI/bank, payable, receivable, expense, invoice, margin, P&L, GST-summary and reconciliation projections. The UI must not use the third-party QuickBooks trademark as a MoolSocial product name.

Customer invoices may be sent through MoolSocial Chat, in-app receipt, consented WhatsApp Business flow, SMS/download link, QR or print. Invoice-purpose contact collection never creates automatic marketing consent.

### Files changed

```text
architecture/RETAILER-HYBRID-B2B-B2C-OPERATING-APP-LOCK.md
architecture/DEMAND-AGGREGATION-WORKSPACE-UIUX-RESET.md
architecture/SCREEN-74-RETAILER-OPERATING-HOME-PLAN.md
index.html
project-memory/README.md
project-memory/DECISION-LOG.md
```

### Approval status

```text
Retailer hybrid architecture: CONTROLLING PLAN; AWAITING REVIEW
Screen 74 HTML: NOT APPROVED
Screen 73: last approved production-facing screen
```

### Next unresolved decision

Approve or revise the Retailer Business Home hierarchy before replacing Screen 74 HTML. Then prototype each focused Orders, Stock, Wholesale Buy, delivery, Business Book and invoice flow progressively.

## 11 July 2026 - Hybrid Retailer Screen 74 Draft Implemented

### User decision or correction

Create Screen 74 from `RETAILER-HYBRID-B2B-B2C-OPERATING-APP-LOCK.md` while keeping Screen 74 unapproved.

### Product interpretation

Screen 74 is now an interactive retailer app shell with five views:

```text
Business Home
Orders
Stock
Wholesale Buy
Business Book
```

The locked dock remains:

```text
Mool | Orders | Stock | Wholesale Buy | Chat
```

Implemented prototype flows include customer phone-order capture, counter/app/phone order inbox, MoolSocial home-delivery request, invoice sharing, web/mobile CSV stock input, daily inventory statement, marketplace-style wholesale browsing, MOQ and commercial terms, group-price opportunity, wholesale basket, and automatic Business Book summaries.

The Home includes one urgent order/delivery action, one-tap New Order/Home Delivery/Add Stock/Send Invoice, a matched B2C household-demand opportunity and a matched B2B wholesale-price opportunity.

Browser QA passed all five views at 320, 360, 390 and 430 px widths. No horizontal overflow, dock/action truncation or console errors were found.

### Files changed

```text
screens/74-retail-products-stock-setup.html
architecture/RETAILER-HYBRID-B2B-B2C-OPERATING-APP-LOCK.md
index.html
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 74: IMPLEMENTED DRAFT; NOT APPROVED
Screen 73: last approved production-facing screen
```

### Next unresolved decision

Review the hybrid Screen 74 Home and each module view. Do not copy Screen 74 to `approved-final/` until approved.

## 11 July 2026 - Screen 74 Product-First Wholesale And Stock Revision

### User decision or correction

Long product strips are rejected. Wholesale Buy must work like a compact professional B2B ecommerce catalog, while Stock must begin from a prebuilt product catalog that the retailer can add to the shop and customize.

### Product interpretation

Wholesale Buy now uses a two-column mobile product grid with image, brand, exact product, case/pack, landed unit price, MOQ, delivery time, supplier payment terms, GST/source proof, margin and one-tap Add to Cart. The prototype includes case quantity control, commercial review, checkout and purchase-order confirmation.

Stock now uses the same product-title interaction model for a governed master catalog. A retailer can add or edit quantity, purchase price, selling price, pack and campaign; create a missing local product; or retain barcode, purchase-bill and CSV input. A product becomes consumer-orderable only after live quantity and selling price are saved.

The locked dock remains:

```text
Mool | Orders | Stock | Wholesale Buy | Chat
```

### Verification

```text
JavaScript parse: passed
Wholesale Add to Cart -> quantity -> checkout -> purchase order: passed
Stock master product -> customize -> live shop product: passed
New Product -> shop catalog: passed
Responsive product grids at 320, 360, 390 and 430 px: passed
Horizontal overflow or clipped product/dock actions: none found
```

### Approval status

```text
Screen 74: REVISED IMPLEMENTED DRAFT; NOT APPROVED
Screen 73: last approved production-facing screen
approved-final Screen 74 copy: absent
```

## 11 July 2026 - My Stock Separated From 10,000-Plus Master Catalog

### User decision or correction

The retailer must clearly see where selected master-catalog products become final shop inventory. A 10,000-plus SKU master catalog cannot remain mixed with the retailer's live stock.

### Locked UX

```text
Stock dock entry -> My Stock by default
My Stock -> only retailer-selected or retailer-created products
Add from Catalog -> searchable server master catalog
catalog product -> set pack, quantity, purchase price, selling price and campaign
save -> return immediately to My Stock
My Stock card -> available quantity, purchase price, selling price, campaign and Consumer live
```

The large catalog uses category filtering, barcode/search and server-side lazy loading. The phone never loads all 10,000-plus SKUs together.

### Prototype verification

The catalog showed already-added and available-to-add products distinctly. Adding Parle-G returned to `My Stock`, increased the displayed shop-product sample from four to five, and showed quantity, purchase price, selling price, pack, campaign and consumer-live status with no horizontal overflow.

### Approval status

```text
Screen 74: REVISED IMPLEMENTED DRAFT; NOT APPROVED
Screen 73: last approved production-facing screen
```

## 11 July 2026 - Screen 75 Retailer Order Review And Fulfilment Draft

### Progression decision

Screen 74 already contains the approved unified Orders summary. Screen 75 therefore does not duplicate an inbox. It opens one selected order for decision and fulfilment.

### Screen 75 flow

```text
new order review
customer and source
12 reserved items
payment state
delivery promise
accept or cannot fulfil
start packing
confirm all 12 items
mark packed
choose fulfilment
request delivery
```

The order keeps inventory, payment, invoice and delivery linked to one order reference. Packing progress counts actual units, not UI controls, and delivery cannot start before all 12 items are confirmed.

### Files

```text
screens/75-retailer-order-review-fulfilment.html
index.html
project-memory/DECISION-LOG.md
```

### Approval status

```text
Screen 74: APPROVED AND FROZEN
Screen 75: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 75 copy: absent
```

## 11 July 2026 - Screen 75 Enhanced, Approved And Frozen

### User decision and correction

Approve Screen 75 after making the item area compact and bill-like, and ensure `Cannot fulfil` immediately routes the order to the best nearby retailer with certain stock and a strong acceptance record.

### Approved behavior

```text
compact sales bill: item, pack/SKU, quantity, rate, amount and post-reservation stock
items subtotal ₹597
home delivery ₹48
UPI paid total ₹645
packing progress 1, 2, 3, then 12 of 12
delivery request locked until 12 of 12
cannot fulfil -> reason -> immediate governed best-retailer matching
replacement criteria -> exact stock, freshness, distance, capacity, acceptance SLA, on-time history
customer payment and promised price protected during transfer
```

### Verification and freeze

```text
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors: none
rerouting criteria and transfer status: passed
packing and delivery gate: passed
source and approved SHA-256 equality: verified
Screen 75: APPROVED AND FROZEN
Screen 75: last approved production-facing screen
```

## 11 July 2026 - Screen 76 Retailer Delivery Assignment And Handover Draft

### Progressive entry

Screen 76 begins after Screen 75 requests MoolSocial delivery and a verified captain accepts.

### Flow

```text
captain assigned
captain identity, rating, trip record and vehicle visible
one sealed parcel and digital invoice verified
retailer marks parcel ready
captain approaches
retailer confirms captain is at shop with pickup geofence
captain and parcel label match
retailer confirms handover
retailer and captain events create pickup proof
order becomes out for delivery
```

No customer or counter OTP is required. A mismatch blocks handover and routes to verification or reassignment.

### Verification

```text
assigned -> ready -> arrived -> handed: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors: none
Screen 75 frozen source/approved equality retained
```

### Approval status

```text
Screen 75: APPROVED AND FROZEN
Screen 76: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 76 copy: absent
```

## 11 July 2026 - Screen 76 Approved And Frozen

### User decision

Approve Screen 76 and proceed immediately to the next retailer-store screen.

### Frozen outcome

```text
verified captain and vehicle visible
parcel readiness
pickup geofence
captain-at-shop validation
one sealed bag and linked invoice
dual-event handover proof
no counter OTP
out-for-delivery handoff
```

### Regression boundary

```text
Source: screens/76-retailer-delivery-assignment-handover.html
Frozen copy: approved-final/screens/76-retailer-delivery-assignment-handover.html
Source and approved SHA-256 equality: verified
Screen 76: APPROVED AND FROZEN
Screen 76: last approved production-facing screen
```

## 11 July 2026 - Screen 77 Retailer Delivery Tracking And Completion Draft

### Progressive entry

Screen 77 begins after Screen 76 records the retailer-to-captain parcel handover.

### Server-driven states

```text
out for delivery
delayed with customer notification and order-linked support
delivered through verified captain and customer proof
```

The retailer does not receive a `Mark delivered` control.

### Verified completion postings

```text
inventory: 12 units debited
sales entry: + ₹597
invoice: sent to customer
delivery settlement: ₹48 customer-funded
UPI payment: reconciled
```

### Verification

```text
live state: passed
delayed state: passed
delivered posting state: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors: none
Screen 76 frozen source/approved equality retained
```

### Approval status

```text
Screen 76: APPROVED AND FROZEN
Screen 77: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 77 copy: absent
```

## 11 July 2026 - Screen 77 Approved And Frozen

### User decision

Enhance Screen 77, approve the tested result and proceed to the next retailer-store screen.

### Frozen outcome

```text
live route progress with distance and update freshness
delay-specific revised ETA and customer notification
captain and order-linked support during active delivery
verified customer and captain completion proof
inventory, sale, invoice, payment and delivery settlement postings
no retailer Mark delivered control
```

### Verification

```text
out-for-delivery state: passed
delayed state: passed
delivered proof and posting state: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
```

### UI/UX redesign after review

The first Screen 79 draft was rejected as unprofessional. The replacement removes repeated full counter cards and the duplicate audit table.

```text
one consolidated today-across-shop summary
horizontal swipe selector for Counter 1 through Counter N
one selected counter expanded at a time
clear purpose, operator, state, orders and sales
focused Start order or Open counter action
compact selected-counter activity only
plus button remains inside the scalable counter selector
```

### Redesigned verification

```text
create counter and select new counter: passed
purpose example and operator assignment: passed
close and reopen counter: passed
counter rail remains horizontally swipeable where required
320, 360, 390 and 430 px: no page overflow
console errors and warnings: none
Screen 79 remains DRAFT; NOT APPROVED
```

## 11 July 2026 - Screen 79 Approved And Frozen

### User decision

Approve the redesigned focused counter control and proceed to the next retailer screen.

### Frozen outcome

```text
shop-wide daily counter summary
swipeable Counter 1 through Counter N selector
one selected counter expanded at a time
automatic counter number and editable purpose
optional operator assignment
open, closed and reopen control
selected-counter order and sales activity
one-tap Start order routing with the counter retained
shared shop stock, prices, invoice sequence and Business Book
```

### Regression boundary

```text
Source: screens/79-retailer-counter-management.html
Frozen copy: approved-final/screens/79-retailer-counter-management.html
Source and approved SHA-256 equality: verified
Screen 79: APPROVED AND FROZEN
Screen 79: last approved production-facing screen
```

## 11 July 2026 - Screen 80 Retailer Counter Sale And Invoice Draft

### Progressive route

```text
Screen 79 selects Counter N
Screen 78 creates the counter order and reserves live stock
Screen 80 verifies the final bill and actual received payment
one completion posts stock, sales, payment and Business Book
invoice MSI-3028 is generated from the same order
invoice can be delivered through Mool Chat, consented WhatsApp/SMS, QR or print
```

### Verification

```text
cash, UPI and card selection: passed
sale completion posting: passed
invoice creation and delivery choices: passed
Screen 78 Counter completion routing to Screen 80: implemented
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
```

### Approval status

```text
Screen 79: APPROVED AND FROZEN
Screen 80: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 80 copy: absent
```

### UI/UX redesign after review

The first Screen 80 draft was rejected for cramped text, excessive bordered blocks, a compulsory item table and visible accounting narration.

The replacement is a focused counter POS:

```text
large amount to receive
counter and customer context in one compact band
item details hidden behind one View action
large Cash, UPI and Card choices
one payment-proof strip
one Complete sale action
clean receipt state after completion
silent stock, sale and invoice confirmation
Mool Chat, consented WhatsApp/SMS and QR/Print invoice delivery
```

### Redesigned verification

```text
item detail drawer: passed
Cash, UPI and Card switching: passed
sale completion and receipt: passed
invoice channels: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
Screen 80 remains DRAFT; NOT APPROVED
```

## 11 July 2026 - Screen 80 Approved And Reusable POS Locked

### User decision

Approve Screen 80 and retain its POS features across retailer workspaces.

### Reusable POS outcome

```text
counter and customer context
large amount to receive
optional item-detail drawer
Cash, UPI and Card selection
payment evidence or confirmation
one Complete sale action
stock and Business Book posting
receipt and invoice creation
Mool Chat, consented WhatsApp/SMS and QR/Print delivery
```

Retail verticals reuse this interaction and data contract. They may add compliance or domain rules, but they must not create unrelated POS navigation or duplicate sale posting.

### Regression boundary

```text
Source: screens/80-retailer-counter-sale-invoice.html
Frozen copy: approved-final/screens/80-retailer-counter-sale-invoice.html
Source and approved SHA-256 equality: verified
Screen 80: APPROVED AND FROZEN
Screen 80: last approved production-facing screen
```

## 11 July 2026 - Screen 81 Retailer Wholesale Buy Catalog Draft

### Purpose

Provide a direct B2B procurement catalog for the retailer workspace. This is an operating wholesale module, not a supplier directory or marketplace listing surface.

### Decision contract

```text
master product and SKU
brand and exact case pack
landed unit cost and case value
minimum order quantity
verified source type
GST invoice availability
delivery date
payment or credit terms
estimated retailer margin
demand-pool progress and target price where available
```

### UX behavior

```text
search, barcode and decision filters
live-stock-driven reorder entry
compact category rail
two-column commerce catalog
first Add cases action adds the exact MOQ
case stepper cannot leave an invalid below-MOQ quantity
sticky cart shows total cases and landed value
product and cart decisions expand on demand
```

### Verification

```text
MOQ-aware add and case adjustment: passed
product detail: passed
live-stock reorder: passed
landed cart review: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
```

### Approval status

```text
Screen 80: APPROVED AND FROZEN
Screen 81: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 81 copy: absent
```

### Reconsidered catalog architecture

The retailer procurement catalog is expected to exceed 20,000 SKUs and hundreds of brands.

```text
all purchase invoices issued by Supermandi Tech Pvt Ltd
supply source is a manufacturer or authorised distributor
supply is matched area-wise
initial delivery and payment terms are the supplier's terms
brand, product, pack, MOQ and wholesale price remain visible
offers and deals remain directly visible
catalog supports brand, deal, offer, fast-delivery and credit filtering
```

The product grid was reduced from approximately 278 px to approximately 237-239 px per card. Four cards are visible in the initial mobile viewport while retaining the decisive B2B terms.

### Reconsidered verification

```text
20,480 SKU and 312 brand catalog scale shown
Supermandi Tech Pvt Ltd invoice issuer shown globally and in detail
manufacturer or authorised-distributor source shown per product
supplier delivery and payment terms shown per product
MOQ, wholesale unit price, case value, offer and area shown per product
MOQ-aware add from detail: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
Screen 81 remains DRAFT; NOT APPROVED
```

### Dense procurement-row revision

The compact two-column tiles were still judged too large and unprofessional for the available mobile space. They were replaced with a one-column, high-density B2B procurement row.

```text
small product and brand visual
readable product and pack identity
wholesale unit and case price
MOQ and delivery
manufacturer or authorised-distributor source
area and supplier payment terms
offer or deal
Details and Add MOQ actions
```

Measured row height is approximately 92 px on 360-430 px screens and approximately 106 px at 320 px, compared with approximately 237 px for the rejected tile layout. MOQ add and full decision detail continue to work without page overflow.

### Compact product-title matrix revision

The long left-to-right procurement rows were rejected because each row consumed the full mobile width while still showing too few product titles. Screen 81 now uses a dense two-column title matrix.

```text
catalog surface: brand, exact product, pack, wholesale unit price, MOQ, delivery and offer
one-tap buying terms: case value, supplier payment, verified source, area and invoice issuer
primary action: Add to cart
first cart action: inserts the supplier's exact MOQ
cart state: total cases, landed value and MOQ confirmation
```

Four product titles remain visible together in the initial mobile viewport. Card height is approximately 147 px at 320, 360, 390 and 430 px, with no horizontal overflow. The matrix supports rapid scanning while keeping complete commercial terms one tap away.

### Production-scale contract

Screen 81 now embeds a machine-readable `screen81-production-contract` in its HTML so implementation agents inherit the scaling rules directly from the prototype.

```text
30,000-50,000+ canonical SKU target
millions of supplier offers supported behind canonical SKUs
one product tile per canonical SKU/pack/variant
no duplicate supplier tiles
area-wise ranked actionable supply
24-product initial and subsequent cursor windows
server-driven search, barcode, categories and decision filters
virtualized progressive rendering
server revalidation of price, stock and terms before purchase order
```

### Regression boundary

```text
Source: screens/80-retailer-counter-sale-invoice.html
Frozen copy: approved-final/screens/80-retailer-counter-sale-invoice.html
Screen 80: APPROVED AND FROZEN
Screen 80: last approved production-facing screen
Screen 81: IMPLEMENTED DRAFT; NOT APPROVED
```

## 11 July 2026 - Screen 81 Approved And Frozen

### User decision

Screen 81 is approved. Proceed with the next wholesale procurement screen.

### Approved contract

```text
canonical-SKU procurement catalogue
30,000-50,000+ SKU target
millions of supplier offers remain behind canonical SKUs
compact two-column product-title matrix
area-ranked verified and fulfilment-ready supply
one-tap full buying terms
Add to cart inserts exact MOQ
Review routes to Screen 82 wholesale cart and purchase-order review
```

### Regression boundary

```text
Source: screens/81-retailer-wholesale-buy-catalog.html
Frozen copy: approved-final/screens/81-retailer-wholesale-buy-catalog.html
Screen 81: APPROVED AND FROZEN
Screen 81: last approved production-facing screen
Screen 82: next draft
```

## 11 July 2026 - Screen 82 Wholesale Cart And Purchase Order Draft

### Purpose

Convert Screen 81's selected canonical-SKU offers into a compact, auditable procurement bill and fulfilment-safe purchase orders without repeating catalogue discovery.

### Draft contract

```text
MOQ-safe editable case quantities
selected supplier offer and case value retained per line
one checkout may split into multiple supply orders
delivery and payment terms remain supplier-specific
immediate debit and approved credit shown separately
retailer delivery address and GST identity confirmed
Supermandi Tech Pvt Ltd invoice rule retained
price, stock, serviceability and terms revalidated before placement
changed terms block placement and require reconfirmation
idempotency key prevents duplicate purchase orders
```

### Approval status

```text
Screen 81: APPROVED AND FROZEN
Screen 82: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 82 copy: absent
```

### Verification

```text
Screen 81 cart handoff parameters: implemented
MOQ-safe increment and remove-at-MOQ behavior: passed
one-tap product buying terms: passed
immediate-payment and approved-credit split: passed
GST and delivery identity controls: passed
review and idempotent placement result: passed
empty-cart recovery to Screen 81: passed
320, 360, 390 and 430 px: no clipping, overlap or horizontal overflow
console errors and warnings: none
Screen 81 approved source/frozen hash equality: passed
```

## 11 July 2026 - Screen 82 Indian Wholesale Terminology And Approval

### User correction

Visible actions, CTAs and commercial terms must follow Indian wholesale purchasing language. `Pay on placement` was rejected because placement reads as recruitment terminology.

### Approved visible terminology

```text
Review Order
MOQ met
Qty · Rate · Amount
Case Rate
Price & Terms
Delivery & GST Details
GSTIN
Payment Terms
Pay Now
Advance Payment by UPI
7-day Credit
Payment Due
Total Order Value
Purchase Order
Place Order
```

### UI/UX verification

```text
two-stage Review Order to Place Purchase Order flow: passed
advance payment and credit period remain separate: passed
GST and delivery details remain one tap editable: passed
MOQ-safe quantities and empty-order recovery: passed
320, 360, 390 and 430 px: no clipping, overlap or horizontal overflow
console errors and warnings: none
```

### Regression boundary

```text
Source: screens/82-retailer-wholesale-cart-purchase-order.html
Frozen copy: approved-final/screens/82-retailer-wholesale-cart-purchase-order.html
Screen 82: APPROVED AND FROZEN
Screen 82: last approved production-facing screen
Screen 83: next draft
```

## 11 July 2026 - Screen 83 Wholesale Order Confirmation Draft

### Purpose

Show the authoritative supplier-wise purchase-order result after Screen 82 without confusing a purchase order with a GST tax invoice or ordered quantity with available stock.

### Draft contract

```text
immutable supplier-wise PO numbers
advance-paid amount and payment reference
credit-purchase amount, credit period and payment due date
supplier delivery commitment per PO
GST tax invoice generated on the applicable dispatch or supply event
stock increases only after goods receipt is accepted
confirmation, dispatch, delivery and goods receipt remain auditable events
delay, shortage, damage and invoice mismatch route to support
```

### Approval status

```text
Screen 82: APPROVED AND FROZEN
Screen 83: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 83 copy: absent
```

### Verification

```text
supplier-wise PO summaries: passed
advance-paid reference and credit due date: passed
PO detail with quantity, value, payment, delivery and invoice timing: passed
all-orders tracking entry: passed
GST tax invoice is not represented as the purchase order: passed
stock remains pending until goods receipt: passed
320, 360, 390 and 430 px: no clipping, overlap or horizontal overflow
console errors and warnings: none
Screen 82 approved source/frozen hash equality: passed
```

## 11 July 2026 - Screens 81-83 Protected Payment And Delivery Approval

### Approved retailer-visible behavior

```text
catalog decision tile shows delivery window, payment term and delivery owner
Price & Terms shows exact advance and settlement-release rule
order review separates protected advance and payment-on-delivery balance
order confirmation states advance is secured but not released to supplier
each PO shows dispatch SLA, delivery window and Supplier Fleet or MoolSocial Transport
live ETA/location starts only after dispatch and available telemetry
GST tax invoice follows dispatch/supply event
retailer stock increases only after accepted goods receipt
```

### Verification

```text
Screen 81: four product titles visible at 320, 360, 390 and 430 px
Screen 81 protected-payment detail: passed
Screen 82 protected advance ₹856.80 and payment on delivery ₹4,840.80: passed
Screen 82 release and delivery-owner confirmation: passed
Screen 83 dispatch SLA, delivery window, delivery mode and live-tracking start rule: passed
Screens 81-83: no clipping, overlap or horizontal overflow
console errors and warnings: none
```

### Regression boundary

```text
Screens 81, 82 and 83 source copies match approved-final frozen copies
Screen 83: APPROVED AND FROZEN
Screen 83: last approved production-facing screen
Screen 84: next draft
```

## 11 July 2026 - Screen 84 Wholesale Delivery Tracking Draft

### Purpose

Provide supplier-wise delivery tracking without showing a false real-time map before dispatch or when telemetry is unavailable.

### Draft contract

```text
PO selector keeps one delivery focused at a time
pre-dispatch state shows dispatch SLA, committed window and delivery owner
in-transit state shows vehicle, current location, ETA and telemetry freshness
GPS unavailable/stale state falls back to verified milestones
Supplier Fleet and MoolSocial Transport remain explicit
protected advance remains held until accepted goods receipt
delay, no movement and unreachable-contact routes are available
stock remains unchanged before GOODS_ACCEPTED
```

### Approval status

```text
Screen 83: APPROVED AND FROZEN
Screen 84: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 84 copy: absent
```

### Verification

```text
pre-dispatch PO: no map, dispatch SLA and committed window visible
Supplier Fleet ownership: visible
in-transit PO: route, vehicle, current location, ETA and telemetry freshness visible
MoolSocial Transport ownership: visible
protected advance and release-after-goods-receipt rule: visible
delay, stale movement and failed-contact support routes: passed
PO switching preserves one focused delivery: passed
320, 360, 390 and 430 px: no clipping, overlap or horizontal overflow
console errors and warnings: none
Screens 81-83 approved source/frozen hash equality: passed
```

## 11 July 2026 - Screen 84 Final UX Approval

### Final UX improvements

```text
PO selector minimum height increased
Call, Chat and Report Delay touch targets increased
sticky Delivery Help target increased
GPS freshness above threshold changes Live to Update delayed
stale state shows Last GPS age and never implies current movement
```

### Approval

```text
pre-dispatch and live-transit states: passed
stale telemetry state: passed
320, 360, 390 and 430 px: no clipping, overlap or horizontal overflow
console errors and warnings: none
Source: screens/84-retailer-wholesale-delivery-tracking.html
Frozen copy: approved-final/screens/84-retailer-wholesale-delivery-tracking.html
Screen 84: APPROVED AND FROZEN
Screen 84: last approved production-facing screen
Screen 85: next draft
```

## 11 July 2026 - Screen 85 Wholesale Goods Receipt Draft

### Purpose

Make goods receipt the explicit control point for inventory posting and protected-payment release after wholesale delivery.

### Draft contract

```text
delivery event alone does not add stock or release payment
retailer chooses All Received or Report Issue
accepted and rejected quantities remain separate
only accepted packs enter inventory and purchase ledger
GST tax invoice is matched to PO and accepted quantity
shortage, damage, wrong goods or invoice mismatch keeps settlement held
protected advance releases only after accepted receipt
payment-on-delivery balance is authorised only for accepted goods
GRN and discrepancy commands are idempotent and auditable
```

### Verification

```text
initial confirmation remains disabled until retailer records receipt outcome: passed
All Received flow posts 3 cases / 12 packs and presents the agreed advance and balance events: passed
Short Quantity flow posts only 2 cases / 8 packs and keeps the disputed settlement held: passed
GST invoice and GRN references remain attached to the receipt: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
sticky receipt action remains clear of the retailer workspace dock: passed
console errors and warnings: none
```

### Compact UI correction

```text
removed oversized browser-default receipt checkmark rendering
receipt choices are compact 56 px professional action rows
invoice and payment decision context remains visible without opening another layer
320, 360, 390 and 430 px: both actions fit with no overflow
```

### Approval status

```text
Screen 84: APPROVED AND FROZEN
Screen 85: APPROVED AND FROZEN
approved-final Screen 85 copy: present and hash-equal to source
Screen 85: last approved production-facing screen
Screen 86: next draft
```

## 11 July 2026 - Screen 86 Wholesale Receipt Result Draft

### Purpose

Show the posted operational result after Screen 85 without asking the retailer to confirm the same receipt again.

### Draft contract

```text
accepted inventory is posted exactly once and linked to the GRN
purchase value is posted against accepted quantity
selling price and catalogue status do not change silently
protected advance shows processing until partner settlement is authoritative
delivery balance shows authorized, processing, settled, failed or held truthfully
PO, GRN and GST invoice stay linked and auditable
partial or disputed receipts route to an exception result instead
duplicate progress strip removed because the result sections already expose authoritative status
```

### Verification

```text
stock, payment, purchase-book, GRN and GST invoice detail sheets: passed
View Stock deep link contains workspace stock mode and canonical SKU: passed
payment labels distinguish processing, authorized and posted states: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
compact result content remains clear of fixed action and workspace dock: passed
console errors and warnings: none
```

### Approval status

```text
Screen 85: APPROVED AND FROZEN
Screen 86: APPROVED AND FROZEN
approved-final Screen 86 copy: present and hash-equal to source
Screen 86: last approved production-facing screen
Screen 87: next draft
```

## 11 July 2026 - Screen 87 Retailer Purchase Book Draft

### Purpose

Give the retailer one operating book for wholesale POs and offline supplier bills, with received stock, invoice, payment and supplier references kept together.

### Draft contract

```text
wholesale procurement and offline supplier bills remain distinguishable sources
purchase book alone never increases inventory without accepted receipt
payment due, authorized, processing, settled, failed and held remain distinct
valid invoice and tax eligibility govern input GST treatment
server-side totals, search, filters and cursor pagination support long-term scale
offline bills may be scanned, uploaded or entered manually
```

### Verification

```text
Purchases, Payables and Returns operating-view behavior: passed
MoolSocial PO, Direct Bill and Paid source filters: passed
supplier, PO and invoice search plus empty state: passed
purchase detail with PO, GRN, invoice and payment status: passed
offline bill capture choices for scan, upload and manual entry: passed
payment-attention Review shortcut and accounting-period sheet: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
purchase rows remain readable 62 px operating entries
purchase action centre for dues, GST correction, cost changes and reconciliation: passed
landed cost, selling price and gross margin detail: passed
Reorder, Return Goods, Invoice and Supplier Statement actions: passed
export, accountant share, GST summary and validated import tools: passed
invoice photo scan/upload, original-file retention and extraction review: passed
supplier, GSTIN, invoice, line items, pack, quantity, HSN, tax, total and payment extraction: passed
review-before-posting and retained invoice access from purchase detail: passed
console errors and warnings: none
```

### Approval status

```text
Screen 86: APPROVED AND FROZEN
Screen 87: APPROVED AND FROZEN
approved-final Screen 87 copy: present and hash-equal to source
Screen 87: last approved production-facing screen
Screen 88: next draft
```

## 11 July 2026 - Screen 88 Supplier Bill And Payment Draft

### Purpose

Give the retailer one authoritative supplier-obligation view before payment: original invoice, extracted lines, PO/GRN/GST match, outstanding amount, due terms, dispute state and verified beneficiary.

### Draft contract

```text
outstanding equals invoice total less settled payments, credits, returns and approved disputes
payment remains disabled when supplier, invoice, GRN, amount or dispute state is unresolved
authorized payment cannot exceed outstanding and requires idempotency
outside payments record method, date, reference and evidence without triggering transfer
original invoice photo and reviewed extraction remain attached
payment status remains processing until authoritative partner settlement
```

### Verification

```text
original invoice photo and extracted invoice detail: passed
supplier, PO, GRN, GST and amount reconciliation drill-downs: passed
bill issue control can hold affected payment obligation: passed
UPI and bank-transfer review with verified beneficiary: passed
authorization result remains processing until partner settlement: passed
outside-payment, reminder, share and invoice tool routing: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
```

### Approval status

```text
Screen 87: APPROVED AND FROZEN
Screen 88: APPROVED AND FROZEN
approved-final Screen 88 copy: present and hash-equal to source
Screen 88: last approved production-facing screen
Screen 89: next draft
```

## 11 July 2026 - Screen 89 Supplier Payment Status Draft

### Purpose

Render authoritative supplier-payment processing, settled, failed and reversed states without treating authorization as final payment.

### Draft contract

```text
processing prohibits duplicate retry and shows acknowledgement only
settled requires verified payment-partner confirmation before final receipt
failed keeps the supplier bill outstanding and permits idempotent retry
reversed restores the obligation and retains reversal evidence
partner webhooks are signature-verified, deduplicated, ordered and audited
Purchase Book and supplier balance update only from authoritative state
```

### Approval status

```text
Screen 88: APPROVED AND FROZEN
Screen 89: APPROVED AND FROZEN
approved-final Screen 89 copy: present and hash-equal to source
Screen 89: last approved production-facing screen
Screen 90: next draft - Retailer Sales Book
```

### Verification

```text
processing: acknowledgement only; duplicate retry blocked
settled: partner-confirmed UTR and final receipt shown
failed: obligation remains due; safe idempotent retry shown
reversed: outstanding restored and reversal evidence retained
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
JavaScript syntax and production contract JSON: passed
```

## 11 July 2026 - Screen 90 Retailer Sales Book Draft

### Purpose

Create one compact sales ledger for app, counter, phone and Chat sales without duplicating order, payment, invoice, inventory or return records.

### Draft contract

```text
all sales channels write into one server-driven Sales Book projection
collected, due, failed and refunded states come from authoritative payment events
physical inventory decreases only after the owning completed-sale event
every completed sale links to one immutable invoice or receipt
estimated margin uses posted landed cost and sale value
returns remain linked to original sale and inspected stock outcome
search, filters and opaque cursor pagination support production-scale history
```

### Approval status

```text
Screen 89: APPROVED AND FROZEN
Screen 90: APPROVED AND FROZEN
approved-final Screen 90 copy: present and hash-equal to source
Screen 90: last approved production-facing screen
Screen 91: next draft - Retailer Stock Statement
```

### Retailer wording lock

```text
Retailer-facing screens use Stock, Stock Statement, Stock Value and Stock Movement.
Inventory remains an internal technical ledger/domain term only where architecture requires it.
Manufacturing workspaces may use Inventory when appropriate to that industry.
```

### Verification

```text
app, counter, phone and Chat source filtering: passed
payment follow-up and due-sale projection: passed
sale detail, invoice and receipt-sharing actions: passed
counter, phone and Chat new-sale routing: passed
returns/refunds view and original-sale linkage: passed
search by invoice, customer and order: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
source-label CSS namespace collision found and corrected
console errors and warnings: none
JavaScript syntax and production contract JSON: passed
```

## 11 July 2026 - Screen 91 Retailer Stock Statement Draft

### Purpose

Show available stock, stock value, reservations, incoming goods and auditable product movements without duplicating the editable Stock catalogue.

### Draft contract

```text
retailer-facing terminology uses Stock rather than Inventory
opening stock comes from approved onboarding/import events
accepted goods receipt increases stock exactly once
completed sale decreases physical stock
accepted order reduces available-to-sell through reservation without changing physical stock
inspected return becomes sellable or damaged stock
manual stock change requires reason, operator permission, idempotency and audit history
server search, filters, periods and opaque cursor pagination support scale
```

### Approval status

```text
Screen 90: APPROVED AND FROZEN
Screen 91: APPROVED AND FROZEN
approved-final Screen 91 copy: present and hash-equal to source
Screen 91: last approved production-facing screen
Screen 92: next draft - Retailer Business Book Home
```

### Verification

```text
received, sold, reserved, return, damage and count filters: passed
product stock-balance detail: passed
stock checks and linked actions: passed
controlled count change requires quantity, reason, approval and audit record
unrecorded counter sale routes to the missing sale rather than a stock shortcut
search by product, SKU, barcode and source: passed
retailer-facing Screen 91 contains no Inventory wording
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
JavaScript syntax and production contract JSON: passed
```

## 11 July 2026 - Screen 92 Retailer Business Book Home Draft

### Purpose

Compose Sales Book, Purchase Book, Stock Statement, authoritative money states, recorded expenses, GST-ready records, margin and reconciliation into one compact business position.

### Draft contract

```text
Business Book Home reads approved projections and never mutates owning transaction domains
transactions already captured by MoolSocial require no duplicate book entry
profit is a working estimate using net sales, posted cost and recorded expenses
GST figures are a working summary, not a filed return or tax advice
receipts and dues come from authoritative payment states
unmatched records remain in one progressive attention queue
exports and accountant access are role-controlled and audited
AI may explain or draft but cannot change money or books without approval
```

### Approval status

```text
Screen 91: APPROVED AND FROZEN
Screen 92: APPROVED AND FROZEN
approved-final Screen 92 copy: present and hash-equal to source
Screen 92: last approved production-facing screen
Screen 93: next draft - Retailer Business Services
```

### Verification

```text
estimated profit breakdown and working-estimate labels: passed
payment, supplier-invoice and customer-due attention queue: passed
one-tap Sales Book, Purchase Book and Stock Statement routes: passed
Business Book assistant questions: passed
GST output/input/difference with explicit not-filed state: passed
period selection, reports, detailed export and accountant access: passed
retailer-facing Screen 92 contains no Inventory wording
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
JavaScript syntax and production contract JSON: passed
```

### UI/UX redesign after review

```text
removed equal-weight 2x2 report tiles and duplicated fixed due-payment banner
added Purchases, Payables and Returns operating views
consolidated month purchases, settled amount and due amount into one overview
added a single supplier-payment attention queue
increased transaction typography and row density for professional scanning
separated MoolSocial POs from direct supplier bills
added progressive action centre for dues, GST issues, cost changes and reconciliation
added landed-cost and gross-margin insight inside purchase detail
added Reorder, Return Goods, Invoice and Supplier Statement actions per purchase
added export, accountant sharing, GST summary and validated CSV/Excel import tools
original invoice photo or PDF remains attached with audit metadata
invoice extraction covers supplier, GSTIN, invoice, line items, packs, quantity, HSN, tax, totals and payment terms
retailer reviews extracted fields and received quantities before posting
```

## 11 July 2026 - Supplier Payment And Delivery Terms Locked

### User decision

Suppliers must enter payment terms, advance percentage, delivery time and delivery responsibility when publishing offers. Retailers must see the parts of those terms that materially change the purchase decision.

### Locked interpretation

```text
payment structures include advance, split advance/balance, payment on delivery and approved credit
advance percentage and exact rupee amount are visible before purchase
protected advance is not released to the supplier before the agreed delivery/goods-receipt event
payment custody and settlement use an RBI-authorised payment aggregator/escrow arrangement as applicable
supplier chooses Supplier Fleet, MoolSocial Transport, Buyer Pickup or Approved Transporter
delivery window is mandatory in hours/days with dispatch SLA
before dispatch show commitment; after dispatch show live ETA only with telemetry
manufacturer, distributor and wholesaler workspaces inherit the full operating contract
```

### Files

```text
architecture/SUPPLIER-OFFER-PAYMENT-DELIVERY-LOCK.md
project-memory/README.md
README.md
```

### Approval impact

Screens 81 and 82 require a controlled retailer-visible terms update and refreeze. Screen 83 requires the corresponding order-confirmation update before approval. Screen 84 will implement supplier-wise real-time tracking.

### Retailer-visible application

```text
Screen 81 tile: delivery window, payment term and delivery owner
Screen 81 detail: advance/release rule, supplier source and protected payment partner
Screen 82: protected advance amount, payment-on-delivery balance and supplier/Mool delivery ownership
Screen 83: advance secured but not released, dispatch SLA, delivery window and live-tracking start rule
```

## 11 July 2026 - Screen 78 Retailer Create Order Draft

### Purpose

Create counter, phone and order-linked Chat orders from the same retailer inventory, customer, invoice, payment, fulfilment and accounting truth.

### Progressive flow

```text
choose Counter, Phone or Chat
resolve customer only when relevant
search, scan, voice-add or use repeat basket
add products from live My Stock
review one compact live bill
choose counter handover, own delivery or Mool delivery
choose the available payment route
create one order and reserve stock once
send invoice and order link from the same order ID
```

Counter mobile remains optional and includes an explicit purpose notice. Phone and Chat preserve the known customer identity. Fulfilment and payment choices appear only after the order has products.

### Verification

```text
Counter, Phone and Chat source states: passed
quantity and live-bill updates: passed
fulfilment and payment selection: passed
order creation and reservation outcome: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
```

### Approval status

```text
Screen 77: APPROVED AND FROZEN
Screen 78: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 78 copy: absent
```

## 11 July 2026 - Screen 79 Retailer Counter Management Draft

### User direction

Retail counters must not be limited to a fixed count. A retailer taps `+` to create Counter N and can immediately use the new counter for order entry.

### Implemented behavior

```text
Screen 78 Counter mode shows the active counter and a plus control
plus opens Screen 79 counter management
new counter receives automatic Counter N name and stable CTR-N ID
retailer may rename it, assign an operator and open it now or later
counter appears immediately in counter list and sales summary
Start order returns to Screen 78 with that counter selected
all counters share stock, prices, invoice sequence and Business Book
every sale retains its counter and operator audit trail
```

Counter names retain the automatic number and may add a clear purpose. Initial examples are:

```text
Counter 1 - Main Billing
Counter 2 - Express
Counter 3 - Delivery Orders
```

One-tap naming examples in the creation sheet include Main Billing, Express, Delivery Orders, Wholesale and Returns. The retailer may still type any custom purpose.

### Verification

```text
Screen 78 Counter plus routing: passed
Counter N automatic creation: passed
purpose-name suggestion: passed
new-counter Start order routing: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
```

### Approval status

```text
Screen 77: APPROVED AND FROZEN
Screen 78: IMPLEMENTED DRAFT; NOT APPROVED
Screen 79: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 79 copy: absent
```

## 11 July 2026 - Screen 92 Approval And Screen 93 Retailer Business Services Draft

### Screen 92 approval

```text
Screen 92 Retailer Business Book Home: APPROVED AND FROZEN
approved-final Screen 92 copy: present and hash-equal to source
Screen 92 internal next-screen note: corrected to Retailer Business Services
```

### Retailer paid-services decision

Retailers may independently activate MoolSocial-operated services for:

```text
Delivery Support
Grow Sales
Tax & Books
Offers & Ads
```

Each service uses a low monthly base and a separately disclosed variable charge. The variable event must be exact and auditable: completed delivery, verified attributed sale, accepted filing/bookkeeping milestone or agreed campaign result. Advertising spend, delivery fees, taxes, maximum payable amount, attribution, cancellation and proof are disclosed before activation. These services are not a provider directory.

Binding architecture:

`architecture/RETAILER-PAID-BUSINESS-SERVICES-LOCK.md`

### Screen 93 behavior

```text
compact Available and My Services views
four service families visible without scrolling at standard phone height
one selected service expands at a time
monthly starting price and variable charge basis visible before expansion
detail sheet shows outcome, extra-charge event, proof and non-charge condition
locked retailer dock remains Mool | Orders | Stock | Wholesale Buy | Chat
plan activation continues progressively to Screen 94
```

### Verification

```text
all four service detail states: passed
Available and My Services switching: passed
pricing and proof disclosures: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
Screen 93: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 93 copy: absent
```

## 11 July 2026 - Screen 93 Professional Offering Visibility Correction

### User correction

Retailer Business Services are paid professional products and services. They must remain visibly offered to the retailer and must not disappear behind `Available`, `My Services`, menus or detail sheets.

### Locked correction

```text
Screen 93 always shows Delivery Support, Grow Sales, Tax & Books and Offers & Ads
each offering visibly shows outcome, included support, monthly starting price and additional-charge basis
one tap may expand full terms, but no key buying fact is hidden there
all four offerings fit together above the fixed retailer dock at standard phone height
retailer workspace home keeps a permanent MoolSocial Business Services entry
locked dock remains Mool | Orders | Stock | Wholesale Buy | Chat
```

### Verification

```text
320, 360, 390 and 430 px: all four offerings visible; no horizontal overflow
service detail expansion: passed
retailer workspace home service entry: visible and one tap from Screen 93
console errors and warnings: none
Screen 93: REVISED DRAFT; NOT APPROVED
```

## 11 July 2026 - Screen 93 Professional UI/UX Enhancement

Screen 93 was further refined into a professional paid-services storefront while preserving continuous visibility.

```text
stronger individual service identity and colour accent
monthly subscription price promoted into a dedicated decision column
outcome, included support and conditional charge visually separated
direct View plan action on every offering
MoolSocial-managed and verified service assurance visible above the catalogue
all four offerings remain together above the fixed retailer dock
320, 360, 390 and 430 px: no card or page overflow
Tax & Books detail expansion: passed
Screen 93 remains draft pending user approval
```

## 11 July 2026 - Screen 93 Approved And Frozen

```text
Screen 93 Retailer Business Services: APPROVED AND FROZEN
approved-final Screen 93 copy: required and hash-equal to source
permanent Business Services entry on approved retailer workspace home: retained
Screen 94: next draft - Retailer Business Service Plan
```

## 11 July 2026 - Screen 94 Retailer Business Service Plan Draft

### Progressive purpose

Screen 94 receives one selected service from approved Screen 93. It does not repeat the four-service catalogue.

```text
selected service and shop context
two eligible plans
monthly subscription
included work
exact additional charge
billable completion or attribution event
non-charge conditions
retailer-controlled monthly spending limit
renewal and cancellation summary
Review activation handoff to Screen 95
```

The same controlled screen supports Delivery Support, Grow Sales, Tax & Books and Offers & Ads through service-specific server-driven plan configuration.

### Verification

```text
Screen 93 Delivery Support to Screen 94 route: passed
Starter and Growth plan selection: passed
due amount and additional-charge rule update: passed
monthly spending-limit selection: passed
Delivery, Grow Sales, Tax & Books and Offers & Ads configurations: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
Screen 94: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 94 copy: absent
```

## 11 July 2026 - Screen 94 Approved And Frozen

```text
Screen 94 Retailer Business Service Plan: APPROVED AND FROZEN
approved-final Screen 94 copy: required and hash-equal to source
Screen 95: next draft - Retailer Business Service Activation
```

## 11 July 2026 - Screen 95 Retailer Business Service Activation Draft

### Activation contract

```text
selected service and plan summary
monthly charge due now
additional-charge rule and proof timing
retailer-approved monthly spending limit
next renewal and cancellation timing
UPI AutoPay, saved card mandate or manual monthly payment
unselected commercial consent
separate purpose-limited data consent for Tax & Books
idempotent Pay & activate handoff to Screen 96
```

Only the plan charge is collected at activation. Conditional service charges are not collected upfront.

### Verification

```text
default activation disabled before consent: passed
commercial consent enables ordinary service activation: passed
payment-method switching: passed
Tax & Books data consent visible and separately required: passed
service, plan, due amount and monthly limit projection: passed
Screen 96 handoff carries service, plan, limit and payment method: passed
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
Screen 95: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 95 copy: absent
```

## 11 July 2026 - Screen 95 Approved And Frozen

```text
Screen 95 Retailer Business Service Activation: APPROVED AND FROZEN
approved-final Screen 95 copy: required and hash-equal to source
Screen 96: next draft - Retailer Active Business Service
```

## 11 July 2026 - Screen 96 Retailer Active Business Service Draft

### Operating-home behavior

```text
active entitlement and service ID
selected plan, payment mandate and renewal
included usage, remaining entitlement, plan spend, monthly limit and additional charges
service-specific first useful action
service readiness and setup controls
auditable recent activity with charge state
plan and billing access
service support
```

Delivery Support opens packed customer orders. Grow Sales opens campaign creation. Tax & Books opens purpose-limited record connection. Offers & Ads opens offer creation. No new role switch is introduced.

### Verification

```text
Delivery active entitlement, plan, usage and spend projection: passed
Grow Sales, Tax & Books and Offers & Ads active modes: passed
service-specific first action and destination: passed
setup control completion feedback: passed
plan/billing and support access present
320, 360, 390 and 430 px: no clipping or horizontal overflow
console errors and warnings: none
Screen 96: IMPLEMENTED DRAFT; NOT APPROVED
approved-final Screen 96 copy: absent
```

## 12 July 2026 - Screen 96 Approved And Retailer Workspace Completion Locked

```text
Screen 96 Retailer Active Business Service: APPROVED AND FROZEN
Screens 97-106: retailer workspace completion set; draft until consolidated review
97 Customers & Loyalty
98 Customer Detail & Retention
99 Offers & Campaigns
100 Offer & Campaign Builder
101 Slow Stock Liquidation
102 AI Operating Assistant
103 Staff & Permissions
104 Store Settings & Readiness
105 Returns & Customer Issues
106 Cash, Bank, Expenses & Reconciliation
```

Screen 74 Retailer Home exposes all eight completion modules without adding another role switch. Customer contact channels remain permission-bound. AI actions produce reviewable drafts and never alter stock, price, money or campaigns without retailer approval. All completion screens retain the locked `Mool | Orders | Stock | Wholesale Buy | Chat` workspace dock.

### Retailer completion verification

```text
33 consolidated retailer review routes (Screens 74-106): present
Screens 97-106 shared retailer foundation: present
Screens 97-106 status: draft-until-consolidated-review
320 px and 430 px: no document, device or dock overflow
nested interactive controls: none
Screen 74 completion-module links: 8 and all routed
campaign builder four-step publish: passed
slow-stock recovery publish: passed
staff invite flow: passed
customer issue resolution: passed
expense entry and save: passed
reviewer narrow-screen direct navigation: passed
browser console errors and warnings: none
```

The consolidated reviewer is `retailer-workspace-review.html`. Screens 97-106 must not be copied into `approved-final` before explicit consolidated approval.

## 12 July 2026 - Prototype To Production Route Contracts Added

Every source prototype from Screen 00 through Screen 106 now contains an invisible `productionRouteContract` with:

```text
production module
route ID
production URL
route state
implementation type
launch scope
standalone-route decision
production implementation note
canonical architecture reference
```

Current conversion result:

```text
107 prototype screens
74 total production route groups represented
51 MVP-core route groups
7 MVP-conditional route groups
16 post-MVP route groups
1 superseded prototype: Screen 69, do not implement
58 existing launch-relevant route groups before missing workspaces are added
```

Approved-final copies received the same non-visual contracts without changing visible UI. Production Codex must consolidate route-state and embedded-panel prototypes instead of reproducing every prototype number as a separate route.

## 12 July 2026 - All Screens Through 106 Approved And 120-Route Machine Locked

The user approved the complete prototype baseline from Screen 00 through Screen 106, including all 33 retailer screens from 74 through 106.

```text
approved prototype count: 107 (numbered 00-106)
existing production route groups: 74
launch-relevant route groups used: 58
launch route ceiling: 120
launch route capacity remaining: 62
```

The remaining route capacity is permanently allocated for the 45-day MVP:

```text
manufacturer / supplier: 16
captain: 8
creator: 8
freelancer / Earn: 6
generic service-provider workspace: 8
MoolSocial administration: 10
shared cross-workspace capabilities: 6
```

Future workspace prototypes must be registered through `architecture/Mvp-Screen-Machine.ps1`. New route shells consume budget. Route states and embedded panels reuse an existing route and consume no additional route. Every new route must declare the operating pain solved and its feature outcomes. The machine must reject any route/path conflict, workspace allocation overflow or global route count above 120.

## 13 July 2026 - Creator earnings are cross-workspace, funded journeys

The following eight creator earning engines are locked end to end: funded campaign fee and outcome bonus, attributed commerce share, monthly or annual membership, content-performance pool, paid local content production, verified workspace or user onboarding, live campaign or launch event, and licensed content reuse.

They are not creator-only balances. Every applicable journey begins with a verified business, member or MoolSocial funding source, continues through creator terms and delivery, consumes a verified outcome event, passes admin attribution and finance controls, and ends in a source-specific creator ledger and payout state. The machine contract is `shared/creator-economics-flow-contract.json`; the architecture lock is `architecture/CREATOR-EARNING-END-TO-END-LOCK.md`; and the approved flow runner contains one operational review for each engine.

Static route and asset validation is mandatory before browser testing. Browser testing must then inspect every visible user control. A visually tappable control is not considered implemented unless it navigates, changes an observable state, or declares a governed device/external-integration handoff and return contract. Every unresolved control must remain in the generated interaction backlog; it may not disappear through a generic fallback click handler.

The user has locked the final mobile testing handoff: do not provide a final app testing URL while any known interaction, tap, route, parameter, back path, dead end, cross-workspace transition, mobile overflow, console error or load error remains. The mandatory gate is `quality/Test-Mobile-User-Flow-ReleaseGate.ps1`. It must return `ready` before the final mobile user-flow link is shared. Interim flow-runner URLs remain internal development and review tools only.
