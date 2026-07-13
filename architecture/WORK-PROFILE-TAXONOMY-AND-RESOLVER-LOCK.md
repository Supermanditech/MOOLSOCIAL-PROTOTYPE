# MoolSocial Work Profile Taxonomy And Resolver Lock

Status: WORK PROFILE TAXONOMY AND PROGRESSIVE CARD TREE LOCKED

Applies to: My Work, Screen 69 redesign, Screen 70 onward, provider onboarding, workspace creation, dashboards, verification, procurement, consumer publication and opportunity eligibility

Last updated: 10 July 2026 IST

## 1. Purpose

MoolSocial must never ask a user to create an ambiguous or incorrect work profile.

A Creator must not accidentally enter Get It Done.

A Get It Done provider must not accidentally enter Creator.

A Retailer must not accidentally enter Manufacturing.

A Doctor must not accidentally enter a generic service-provider workspace.

A Captain must not enter a retailer, delivery or fleet workspace unless that is a separate activity the person deliberately adds.

The system must identify what the user actually operates before creating a workspace. Each confirmed profile loads a different prebuilt operating system, dashboard schema, verification policy, procurement model and consumer-publication gate.

## 2. Permanent Identity Rule

Every account is permanently an Individual / Consumer / Social User first.

This is the personal identity and is not a work profile.

One personal account may own or operate multiple separate workspaces. Common valid identity, mobile, chat and payout information may be reused, but role-specific data and operations remain isolated.

## 3. Canonical Work Profile Families

These are controlled backend workspace families. The frontend must reveal them progressively rather than displaying one giant directory.

### A. Retail And Local Selling

Controlled subtypes:

```text
Retail shop
Kirana / grocery shop
Supermarket
Street vendor
Small seller
Speciality store
Product provider
Gift / flower / cake shop
Stationery / print shop
Water / repeat-delivery seller
Other approved local seller
```

### B. Wholesale And Distribution

Controlled subtypes:

```text
Wholesaler
Supplier
Distributor
Stockist
Authorized source partner
Brand distributor
Raw-material supplier
Packaging supplier
Equipment or machinery supplier
```

### C. Manufacturing And Production

Controlled subtypes:

```text
Manufacturer
Factory
MSME production unit
Brand owner with production
Processor
Farmer
Producer
Originator
Packaging producer
```

### D. Food And Hospitality

Controlled subtypes:

```text
Restaurant
Cafe
Hotel food operation
Cloud kitchen
Tiffin provider
Caterer
Independent food provider
```

### E. Healthcare And Medicine

Controlled subtypes:

```text
Individual doctor
Specialist doctor
Clinic
Hospital
Diagnostic center / laboratory
Physiotherapist or authorized allied-health specialist
Licensed pharmacy / medical store
```

Healthcare and medicine profiles remain hidden or limited until the required licensing, registration, professional verification, prescription, invoice, privacy and grievance workflows are live.

### F. Beauty, Wellness And Personal Care

Controlled subtypes:

```text
Salon
Barber
Beauty parlour
Spa
Gym
Makeup artist
Mehendi artist
Home beauty provider
```

### G. Home, Repair And Local Services

Controlled subtypes:

```text
Electrician
Plumber
Carpenter
Appliance repair provider
Device repair provider
Cleaner
Laundry / dry cleaner
Tailor / boutique / alteration provider
Local specialist
Get It Done provider
```

### H. Mobility

Controlled subtypes:

```text
Bike captain
Auto captain
Cab / car captain
Fleet operator
```

### I. Delivery And Logistics

Controlled subtypes:

```text
Delivery partner
Restaurant delivery partner
Grocery / shop delivery partner
Local pickup-and-drop provider
Tempo / goods carrier
Logistics operator
Warehouse / dispatch partner
```

### J. Creator And Media

Controlled subtypes:

```text
Short-video creator
Long-form video creator
Multi-format creator
Media page
Influencer
Educator creator
Publisher
Promotional content producer
```

Creator is identified by the creation and publication of media/content. It is not a generic paid-task profile.

### K. Freelance, Field Work And Get It Done

Controlled subtypes:

```text
Freelancer
Get It Done provider
Field partner
Campaign executor
Business onboarding partner
Catalog / QR partner
Verification partner
Customer activation partner
```

This family delivers a defined task or outcome for payment. It must not absorb creators, retailers, doctors, captains or other established professions merely because those users can also earn.

### L. Employment

Controlled subtypes:

```text
Job seeker
Full-time applicant
Part-time applicant
Contractual worker
Employer-posted role applicant
```

Employment salary and selection terms remain separate from flexible task-income potential.

### M. Professional And Business Services

Controlled subtypes:

```text
Accountant
ITR / GST professional
Auditor
Compliance professional
Legal / documentation provider
Staffing / payroll provider
Sales and marketing provider
Exclusive-sales or territory-sales partner
IT / software provider
Packaging / design provider
Equipment / maintenance provider
Quality / testing provider
Authorized insurance-support provider
```

### N. Education And Training

Controlled subtypes:

```text
Tutor
Coaching provider
School
Training center
Course provider
Education institution
```

### O. Organizations And Institutions

Controlled subtypes:

```text
Company
Housing society
Association
Institution
NGO
Trust
Permitted public body
```

## 4. Capabilities Are Not Work Profiles

The following are reusable workspace capabilities. They must never be presented as proof that two users need the same workspace:

```text
Sell products
Buy or procure inputs
Manage catalog, menu or service list
Receive customer orders
Receive bookings or appointments
Accept tasks, rides or delivery work
Manage stock, raw material, capacity, slots or availability
Assign fulfilment, pickup or delivery
Manage customers and business chat
Set prices, wholesale slabs, MOQ, offers and liquidation
Publish funded campaigns or opportunities
Apply for eligible paid work
Receive payment, settlement or payout
Manage refunds, disputes, proof and support
Buy professional and business services
Manage staff, access and approvals
Create social content
View reports, tax and compliance records
```

Examples:

- A Retailer may Sell, Procure, Deliver, Publish Campaigns and Earn, but remains a Retailer workspace.
- A Manufacturer may Sell, Procure, Hire Logistics and appoint Sales Partners, but remains a Manufacturer workspace.
- A Doctor may accept Appointments and publish educational content, but remains a Doctor workspace unless the person deliberately adds a separate Creator workspace.
- A Creator may accept funded campaigns, but does not become a Freelancer merely because the campaign pays money.
- A Get It Done provider may submit photo/video proof, but does not become a Creator because media is used as evidence.

## 5. The Work Profile Resolver

The approved user-identification direction is a `Progressive Workspace Card Tree`.

The user does not type or invent a role. MoolSocial displays only controlled workspace cards that have a working backend template for the current MVP, location and compliance state.

The tree resolves intent through two, three or at most four card taps:

```text
Main category card
-> operating-model card
-> exact profile card
-> exact subtype card only where required
```

Every intermediate tap only narrows the visible cards. It does not create, save or assign a workspace.

The full path remains visible as a compact breadcrumb. The user can change any earlier card inline without restarting or losing common information.

### Main Category Cards

Only categories with at least one active child profile are shown:

```text
Products & Trade
Food & Hospitality
Health & Medicine
Beauty & Local Services
Ride, Delivery & Logistics
Create, Freelance & Jobs
Professional & Business Services
Education & Organizations
```

### Example Progressive Paths

```text
Products & Trade
-> Sell to customers
-> Retail Shop / Kirana

Products & Trade
-> Supply businesses
-> Wholesaler / Distributor / Stockist

Products & Trade
-> Make or produce goods
-> Manufacturer / Factory / Producer

Food & Hospitality
-> Serve prepared food
-> Restaurant / Dhaba / Cafe

Food & Hospitality
-> Delivery or scheduled meals
-> Cloud Kitchen / Tiffin Provider

Health & Medicine
-> Provide medical care
-> Individual Doctor / Clinic / Hospital

Ride, Delivery & Logistics
-> Carry passengers
-> Bike / Auto / Cab Captain

Ride, Delivery & Logistics
-> Move orders or goods
-> Delivery Partner / Goods Carrier / Logistics Operator

Create, Freelance & Jobs
-> Publish media
-> Shorts Creator / Long-form Creator / Media Page

Create, Freelance & Jobs
-> Complete paid outcomes
-> Freelancer / Get It Done / Field Partner
```

Cards use a clear icon, plain label and familiar examples. Examples help recognition but do not create extra backend profiles.

### Supported Workspace Availability Registry

Every profile and subtype must be controlled by a server-side availability record:

```text
workspace_profile_id
workspace_subtype_id
display_name_by_language
card_label_by_language
card_examples_by_language_and_region
icon_or_visual_id
template_status
allowed_locations
verification_policy_id
dashboard_schema_id
consumer_publication_gate_id
```

Allowed `template_status` values:

```text
ACTIVE
PILOT_LOCATION_ONLY
COMING_LATER
COMPLIANCE_BLOCKED
PAUSED
RETIRED
```

Only `ACTIVE` profiles and eligible `PILOT_LOCATION_ONLY` profiles can be displayed as selectable leaf cards. MoolSocial never produces a generic or improvised workspace.

If the user cannot find a suitable profile in the available cards, show:

```text
This work profile is not available yet
Notify me when available
```

The user remains a consumer/social user and may continue using Earn only where an already-supported work identity is not required. No workspace is created from the request.

### Stage 0: Existing Workspace Check

Before asking anything:

1. Load active and pending workspaces owned or operated by the user.
2. Check whether a valid existing workspace already satisfies the current action or opportunity.
3. Reuse that workspace when eligible.
4. Never create a duplicate workspace silently.

### Stage 1: Choose A Main Category Card

Show only main categories containing at least one available workspace leaf.

This first tap only filters available profiles. It does not select or create a workspace.

### Stage 2: Narrow By Operating Model

Show the next controlled card level. For example, Products & Trade narrows to Sell to Customers, Supply Businesses or Make/Produce Goods.

Examples:

Products:

```text
I sell from a shop
I supply other businesses
I manufacture or produce goods
I grow or originate goods
```

Videos or media:

```text
I create short videos
I create long videos
I create both
I operate a media page
```

Paid tasks or field work:

```text
I complete real-world tasks
I onboard businesses or customers
I execute campaigns
I do catalog, QR or verification work
```

Healthcare:

```text
I am an individual doctor
I operate a clinic
I operate a hospital
I operate a diagnostic center
I operate a licensed pharmacy
```

Mobility and delivery:

```text
I carry passengers
I deliver orders or parcels
I operate multiple vehicles
I operate logistics or goods transport
```

### Stage 3: Select The Exact Supported Profile

Show exact supported profile cards with familiar examples and one-line distinctions. Add a fourth subtype level only when required. The selected leaf maps directly to a controlled profile and subtype ID.

### Stage 4: Show The Workspace Preview Before Creation

Before any workspace is created, show one clear recommendation:

```text
We found your work profile
Retail Shop

This workspace includes:
Products and stock
Customer orders
Home delivery
Offers and liquidation
Wholesale procurement
Payments and settlements

This is correct
Change answer
```

The preview must also name important exclusions where confusion is likely:

```text
Manufacturing and medical tools are not included.
You can add another separate work profile later.
```

Common confusion pairs must provide a short comparison without leaving the current screen:

| Choice | Clear distinction |
|---|---|
| Retail Shop | Sells products to customers; usually procures products from suppliers |
| Manufacturer | Makes or produces goods and procures raw materials |
| Restaurant / Dhaba | Serves prepared food and may support dining or tables |
| Cloud Kitchen | Prepares food primarily for delivery or takeaway |
| Tiffin Provider | Provides recurring or scheduled meal plans |
| Individual Doctor | A professional practitioner operating personally |
| Clinic | A healthcare establishment with one or more practitioners |
| Hospital | A larger healthcare establishment with departments and hospital operations |
| Creator | Publishes owned media/content and operates a creator studio |
| Freelancer / Get It Done | Completes assigned client or field outcomes for payment |
| Captain | Carries passengers using an eligible vehicle |
| Delivery Partner | Moves eligible orders, goods or parcels |

`Change` reopens the relevant card level inline. Common information remains saved. The user never restarts onboarding because of a wrong tap.

### Stage 5: Confirm Intent And Begin Relevant Verification

Only after the user confirms the recommended profile may MoolSocial start the exact verification and readiness process for that profile.

Proof is profile-specific. If proof contradicts the selected leaf, approval pauses and shows the likely correct profile for review. MoolSocial preserves the submitted information, never silently changes the profile and never activates the wrong workspace.

## 6. Evidence-Assisted Misclassification Prevention

The resolver uses intent first and evidence second. Evidence does not replace user confirmation.

| Recommended profile | Profile-specific evidence or readiness signal |
|---|---|
| Retailer | Shop identity, address/area, product categories, billing/settlement readiness |
| Supplier | Business buyers, MOQ/price slabs, dispatch area, source inventory |
| Manufacturer | Factory/production identity, finished goods, raw materials, capacity and applicable registration |
| Restaurant | Outlet/kitchen identity, menu, food readiness, service mode and fulfilment area |
| Doctor | Professional registration, specialty, clinic/hospital linkage and appointment mode |
| Hospital/Clinic | Establishment identity, practitioners, departments, slots and compliant patient workflow |
| Pharmacy | Licence, responsible pharmacist, invoice, batch/expiry and prescription workflow |
| Creator | Content formats, channel/page identity or sample, language and publishing intent |
| Get It Done | Task families, operating area, proof capability, availability and payout identity |
| Captain | Driving licence, vehicle, permit/insurance where required, service zone |
| Delivery | Vehicle or movement mode, service zone, item/value limits and proof capability |
| Professional service | Qualification/authorization where applicable, defined outcomes, engagement terms and grievance route |

If the evidence contradicts the selected profile, the system pauses and asks the user to correct the profile. It must not silently switch profiles.

## 7. Workspace Template Engine

Every confirmed work profile selects a server-controlled template containing:

```text
workspace_profile_id
workspace_subtype_id
dashboard_schema_id
capability_policy_version
verification_policy_id
readiness_checklist_id
procurement_graph_id
consumer_publication_gate_id
opportunity_eligibility_policy_id
settlement_policy_id
support_and_dispute_policy_id
```

The frontend renders only modules authorized by that template.

## 8. Different Dashboards Are Mandatory

### Retailer Workspace

```text
Sell: products, prices, customer orders, counter pickup, home delivery, offers, liquidation
Buy: wholesale listings, source comparison, replenishment, purchase orders, delivery tracking
Operate: stock, customers, staff, QR, payments, settlements, returns, campaigns
```

### Manufacturer Workspace

```text
Sell: finished goods, MOQ, wholesale slabs, ready buyers, contracts, dispatch
Buy: raw materials, packaging, machinery, labour and logistics
Operate: production, capacity, quality, inventory, orders, revenue, compliance
```

### Restaurant Workspace

```text
Sell: menu, food orders, takeaway, tables, tiffin and catering
Buy: ingredients, packaging, cleaning supplies, equipment and delivery
Operate: kitchen capacity, preparation time, orders, guests, offers and settlements
```

### Doctor Workspace

```text
Serve: appointment slots, consultation mode, follow-ups and patient communication
Buy: clinic supplies and authorized professional services
Operate: schedule, patient queue, reports, follow-ups, receipts and compliant records
```

### Creator Workspace

```text
Create: shorts, long videos, feed posts and media publishing
Earn: campaigns, sponsorships, monetization and payouts
Operate: content library, analytics, audience, rights, disclosures and creator studio
```

### Get It Done / Freelancer Workspace

```text
Work: eligible tasks, accepted assignments, deadlines and routes
Proof: required evidence, corrections and completion
Earn: funded amount, approval, payout and issue handling
Operate: availability, areas, skills, history and ratings
```

### Captain Workspace

```text
Work: ride requests, accept/decline, pickup and live trip
Operate: vehicle, documents, zone, safety, availability and support
Earn: fares, incentives, settlements and ratings
```

## 9. Multiple Workspace Rule

One user may deliberately activate multiple separate workspaces.

Examples:

- Retailer + Creator
- Doctor + Creator
- Manufacturer + Sales Campaign Publisher
- Captain + Delivery Partner
- Restaurant + Tiffin Provider

Rules:

1. Shared valid identity may be reused.
2. Role-specific verification remains separate.
3. Role-specific data, dashboard, money records and compliance remain separate.
4. Only one workspace is actively operated at a time.
5. Consumer and social access is never removed.

## 10. Screen 69 And Screen 70 Lock

The current Screen 69 draft is not approved because its generic capability teaser can mislead users before profile resolution.

Screen 69 redesign must be only the My Work Home and status gateway:

```text
No workspace: Start My Work
One workspace: open the current workspace and urgent actions
Multiple workspaces: current workspace, deliberate switch and Add Another Work
Opportunity entry: preserve opportunity and route through the resolver only if no eligible workspace exists
```

Screen 70 becomes one dynamic Progressive Workspace Card Tree. It replaces the card set in place after each tap, keeps a compact editable breadcrumb, shows only available controlled children and reaches an exact profile in two to four taps.

After the exact leaf is selected, MoolSocial shows the workspace preview and then begins profile-specific proof and approval. No intermediate card tap creates a workspace.

Do not place these generic capability claims on the new-user Screen 69 before profile resolution:

```text
Run your work
Orders, bookings and customers
Buy for work
Stock, supplies and services
Earn more
Verified work and campaigns
```

They are not universally precise enough to identify the correct workspace.

## 11. Regression Locks

Never:

```text
Create a workspace from one ambiguous tap
Create or assign a profile from natural-language classification
Show unsupported workspace types as selectable
Use Earn as a work profile
Treat every paid activity as Freelancer
Treat every uploaded video as Creator work
Treat every product seller as Retailer
Treat every product business as Manufacturer
Treat medical practice as a generic service
Merge two work profiles into one universal dashboard
Allow free text to create backend profile IDs
Repeat valid common verification without reason
Expose role tools before profile confirmation and readiness
Publish products or services to consumers merely because a workspace exists
```

## 12. Final Product Rule

MoolSocial does not give every provider the same dashboard.

It gives every person one permanent consumer account and the exact operating workspace required by each deliberately confirmed activity.
