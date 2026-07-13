# MoolSocial MVP Workspace Card Tree And Identity Lock

Status: LOCKED INPUT FOR SCREEN 69, SCREEN 70 AND PROVIDER ONBOARDING

Last updated: 10 July 2026 IST

## 1. Sources Reconciled

This MVP card tree reconciles:

- `supermandi app business model - audited clean.md`, Points 1-57
- `supermandi MVP only - user type plan.md`
- `DEMAND_OPERATING_SYSTEM_FINAL_END_TO_END_BUSINESS_PLAN.md`
- `FULL_HOUSEHOLD_LIVELIHOOD_DEMAND_AGGREGATION_SAVINGS_AND_INCOME_MODEL.md`
- `MY-WORK-AND-PROVIDER-WORKSPACE-ARCHITECTURE-LOCK.md`
- `WORK-PROFILE-TAXONOMY-AND-RESOLVER-LOCK.md`
- User-confirmed initial launch work profiles dated 10 July 2026

Official GST references used only for verification alignment:

- FORM GST REG-01 and CGST registration forms: https://cbic-gst.gov.in/pdf/18052021-CGST-Rules-2017-Part-B-Forms.pdf
- GST registration manual: https://tutorial.gst.gov.in/userguide/registration/Apply_for_Registration_Normal_Taxpayer.htm
- GST HSN/SAC search manual: https://tutorial.gst.gov.in/userguide/taxpayersdashboard/Search_HSN_SAC_Tax_Rates_manual.htm

## 2. GST Classification Verdict

GST structure should support MoolSocial verification but must not be copied directly as the user-facing workspace taxonomy.

FORM GST REG-01 separates:

```text
Constitution of Business
Nature of business activity at a place
Goods supplied with HSN
Services supplied with SAC
```

Its nature-of-business choices are broad, including Factory/Manufacturing, Wholesale Business, Retail Business, Warehouse/Depot, Supplier of Services, Office/Sale Office, Works Contract, Import, Export and Other.

These are useful backend verification dimensions but cannot distinguish:

```text
Doctor versus Hospital
Restaurant versus Tiffin Provider
Creator versus Freelancer
Captain versus Delivery Partner
Salon versus Home Beauty Provider
Get It Done versus Transporter
```

MoolSocial therefore uses four separate axes:

```text
Axis 1: MoolSocial workspace profile
Axis 2: Industry vertical and subtype
Axis 3: Value-chain activity / GST nature where applicable
Axis 4: Goods/services classification and profile-specific proof
```

GSTIN is not mandatory for every user merely to begin My Work. The workspace records whether GST is not applicable, not currently held, applied for or verified. Legal and tax rules determine when it becomes required.

## 3. Initial MVP Root Cards

Screen 70 shows only these six root cards:

```text
Products & Trade
Food Business
Health & Medicine
Services & Salon
Ride & Transport
Create & Work
```

Every other user remains a Consumer / Social / Chat / Pay / Buy / Book / Ride user without creating a workspace.

## 4. Progressive MVP Card Tree

### A. Products And Trade

First child cards:

```text
Make Products
Supply Businesses
Sell To Customers
```

#### Make Products

MVP leaf:

```text
FMCG Manufacturer
```

Fourth-tap primary FMCG segment:

```text
Packaged Food & Staples
Snacks, Bakery & Confectionery
Beverages
Personal Care
Home Care
Hygiene, Baby & Paper
```

Additional FMCG segments may be added server-side after operational readiness. Alcohol, tobacco, prescription drugs and other regulated categories remain unavailable unless separately approved.

#### Supply Businesses

MVP leaves:

```text
FMCG Supplier / Distributor
Raw Material Supplier
Packaging Supplier
```

These profiles build the FMCG upstream and downstream value chain. Their workspace captures MOQ, price slabs, inventory/capacity, delivery responsibility, buyer areas, tax invoice readiness and source proof.

#### Sell To Customers

MVP leaves:

```text
Grocery / Kirana Shop
General Retail Shop / Dukaan
Individual Product Seller
```

Medical Store / Pharmacy remains under Health & Medicine because its compliance and dashboard differ from ordinary retail.

### B. Food Business

MVP leaves:

```text
Restaurant / Dhaba / Cafe
Cloud Kitchen
Tiffin Provider
```

All three receive separate service logic:

- Restaurant: menu, food orders, tables, takeaway, delivery, guests and ingredient procurement.
- Cloud Kitchen: delivery/takeaway menu, preparation capacity, service radius, packaging and ingredient procurement.
- Tiffin Provider: meal plans, weekly/monthly schedule, pause/resume, subscriber delivery and recurring input procurement.

### C. Health And Medicine

MVP leaves:

```text
Individual Doctor
Clinic
Hospital
Medical Store / Licensed Pharmacy
```

Each is separate:

- Individual Doctor: professional practice, slots, consultations and follow-ups.
- Clinic: establishment, practitioners, services, slots and patient operations.
- Hospital: departments, doctors, hospital services, appointments and institutional operations.
- Pharmacy: licensed premises, pharmacist workflow, medicine/refill inventory, prescription/invoice and compliant delivery.

### D. Services And Salon

First child cards:

```text
Salon & Personal Care
Home & Local Services
```

#### Salon And Personal Care

MVP leaves:

```text
Salon / Parlour
Home Beauty Provider
```

Home Beauty Provider covers approved women-led or individual at-home services such as facial, makeup, mehendi, saree draping and other enabled service menus. Safety, gender preference, OTP start/end and service-radius rules apply.

#### Home And Local Services

MVP leaf:

```text
Individual Service Provider
```

The provider then selects only enabled service families such as cleaning, tailoring/alteration, tuition, home cooking, repair or another currently supported local service. Unsupported services do not create a workspace.

### E. Ride And Transport

First child cards:

```text
Carry Passengers
Deliver Orders
Move Goods
```

#### Carry Passengers

MVP leaves:

```text
Bike Captain
Auto Captain
Cab / Car Captain
```

#### Deliver Orders

MVP leaf:

```text
Delivery Partner
```

Initial delivery modes remain restaurant and grocery/shop delivery. Passenger ride and delivery remain separate workspaces even when one person qualifies for both.

#### Move Goods

MVP leaves:

```text
Local Porter / Goods Transporter
Transport / Fleet Operator
```

Allowed vehicle/capacity categories must remain geo-, insurance-, custody- and compliance-controlled. High-value custody, bulk wholesale and intercity freight remain hidden until the required operating controls are live.

### F. Create And Work

First child cards:

```text
Create Content
Freelance & Field Work
Get It Done
```

#### Create Content

MVP leaves:

```text
Shorts Creator
Long-Form Video Creator
Multi-Format Creator
```

#### Freelance And Field Work

MVP leaf:

```text
Freelancer / Field Partner
```

This includes supported funded onboarding, catalog, QR, verification, campaign execution, customer activation and other controlled work. Skills do not create new workspace types.

#### Get It Done

MVP leaf:

```text
Get It Done Provider
```

This workspace executes one-off destination tasks, pickup, local purchase, verification or other enabled proof-based outcomes. It is not Creator, Delivery or generic Freelancer merely because proof or payment is involved.

## 5. Tap Budget

Target:

```text
Most profiles: 2 taps after Start My Work
Profiles needing an operating split: 3 taps
FMCG segment or vehicle subtype: maximum 4 taps
```

Every card replacement happens in one dynamic Screen 70. No intermediate screen navigation and no workspace creation occurs during these taps.

The selected path is always visible and editable.

## 6. Profile Preview Before Proof

After the exact leaf, show:

```text
Exact workspace name
Primary industry/subtype
What this workspace will operate
What it will buy/procure
What it will sell/serve/execute
Primary proof required
Primary account contact
Secondary work contact
Confirm / Change
```

Only confirmation begins onboarding and proof.

## 7. Contact And Identity Continuity

Every user must have a verified primary contact before workspace onboarding begins.

### Identity Gate

```text
Mobile-login user: reuse verified mobile
Email/social-login user with verified mobile: reuse verified mobile
Email/social-login user without mobile: request one mobile OTP before showing workspace cards
```

Screen 69 and Screen 70 must not ask the user to retype a verified primary mobile or email.

The workspace preview displays:

```text
Primary account mobile - verified, read only
Account email/social login identity - read only where available
Use primary number for work - default on
Alternate mobile - requested from every profile, optional when unavailable
```

Alternate contact rules:

```text
Ask every user whether an alternate mobile is available
Allow Skip when no alternate mobile exists
If entered, require OTP verification before continuing
May be assigned Owner, Manager, Reception, Orders or Support purpose
Must not replace the personal account owner
Must not receive account-security OTPs unless separately authorized
Personal mobile is private by default
Public business contact requires explicit consent
In-app Chat remains the default customer communication channel
```

For hospitals, factories and other multi-person establishments, at least one operational secondary contact should be completed before go-live even if it is not required during the first card-selection session.

### Unsupported Workspace Intent And Admin Alert

`My work is not shown` never creates a generic or guessed workspace. It captures:

```text
requested workspace name
closest root work area
operating city, area or pincode
verified account identity and primary contact reference
current selection path where one exists
request timestamp and request ID
```

Production submission contract:

```text
POST /v1/workspace-profile-requests
event: WORKSPACE_PROFILE_REQUESTED
status: ADMIN_REVIEW_REQUIRED
```

The request must create a MoolSocial Admin alert and enter the workspace-demand queue. Admin may map it to an existing hidden template, schedule a new workspace template or decline it. The requester receives status through My Work and Chat. Notification never activates a workspace.

## 8. GST And Business-Proof Capture

After exact profile confirmation, collect only relevant fields.

Common business fields:

```text
Trade/business/work name
Constitution/ownership type
Primary operating address and pincode
Nature of business activity
GST status and GSTIN where held/applicable
Top goods or services
Authorized operator relationship
Primary and secondary contacts
Settlement identity
```

GST-aligned nature mapping:

| MoolSocial profile | GST-aligned nature where applicable |
|---|---|
| FMCG Manufacturer | Factory / Manufacturing |
| Supplier / Distributor | Wholesale Business |
| Raw Material / Packaging Supplier | Wholesale Business and/or Factory / Manufacturing as applicable |
| Retail / Grocery / Individual Product Seller | Retail Business |
| Restaurant / Cloud Kitchen / Tiffin | Supplier of Services; goods details where applicable |
| Doctor / Clinic / Hospital | Supplier of Services |
| Pharmacy / Medical Store | Retail Business; wholesale only if separately supported and licensed |
| Salon / Home Beauty / Individual Service | Supplier of Services |
| Captain / Delivery / Transporter | Supplier of Services |
| Creator / Freelancer / Get It Done | Supplier of Services where GST applies |

HSN/SAC is captured after profile confirmation, not used as the first UI card. GST registration supports up to the top five goods and five services; MoolSocial may mirror this as a verification/import step while allowing the operating catalog to expand separately.

## 9. Profile-Specific Proof Gate

| Profile | Initial proof/readiness |
|---|---|
| FMCG Manufacturer | Identity, production location, applicable GST/Udyam, product segment, capacity, settlement |
| Supplier / Distributor | Business/source identity, inventory or source authority, MOQ/price slabs, dispatch area |
| Retailer / Grocery | Shop identity/location, category/catalog, owner/operator authority, settlement |
| Restaurant / Cloud Kitchen / Tiffin | Outlet/kitchen identity, enabled menu, food registration/compliance where applicable, capacity, fulfilment |
| Individual Doctor | Professional registration, specialty, practice location/mode, settlement |
| Clinic / Hospital | Establishment identity, authorized operator, practitioners/departments, applicable registrations |
| Pharmacy | Pharmacy licence, responsible pharmacist, licensed premises, invoice and prescription workflow |
| Salon | Location/service mode, service menu, owner/operator authority, hygiene/safety readiness |
| Home Beauty / Individual Service | Identity/KYC, service skill/menu, service area, samples/references where relevant, safety readiness |
| Captain | Driving licence, vehicle RC, insurance, permit/commercial compliance where applicable, service zone |
| Delivery | Identity/KYC, movement mode/vehicle, service zone, proof capability and item/value limits |
| Transporter | Business/operator identity, vehicle/fleet details, permits/insurance where applicable, service geography |
| Creator | Identity, content format, channel/page or sample, rights/disclosure acceptance, payout identity |
| Freelancer / Field Partner | Identity/KYC, supported skills, location/availability, proof training, payout identity |
| Get It Done | Identity/KYC, enabled task families, operating geography, proof capability and payout identity |

Proof mismatch pauses approval and offers correction while preserving common data. It never silently converts or activates a different profile.

## 10. Workspace Template Requirement

Every selectable leaf must have all of the following before it appears:

```text
workspace profile and subtype IDs
onboarding schema
proof and approval policy
dashboard schema
buy/procurement modules
sell/service/work modules
money and settlement modules
chat and support modules
consumer publication gate
geo/readiness gate
compliance gate
```

No backend workspace means no selectable leaf card.

## 11. Screen Locks

```text
Screen 69 = My Work Home / identity-ready gateway
Screen 70 = dynamic two-to-four-tap card tree + exact profile preview + OTP-verified alternate contact + unsupported-profile admin alert
Screen 71 onward = selected profile proof, verification and readiness
```

The current Screen 69 visual remains unapproved until its generic capability teaser is removed and the verified-contact continuity is shown.

## 12. Screen 71 Profile Verification Contract

Screen 71 receives the exact profile ID, optional subtype/variant, verified primary identity, optional OTP-verified alternate contact and operating area from Screen 70.

It contains three progressive states in one screen:

```text
Details - only fields required by the exact profile
Proof - profile-specific requirements with camera, file or structured-detail capture
Review - selected workspace, contacts, details, proof and authorization declaration
```

Submission creates a work-profile review case. It does not immediately publish the workspace. Approval, correction or rejection appears through My Work and Chat. The consumer/social account and other approved workspaces remain active throughout review.
