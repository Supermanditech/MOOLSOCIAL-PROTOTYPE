# Retailer Paid Business Services Architecture Lock

Status: LOCKED FOR SCREEN 93 ONWARD

Locked on: 2026-07-11

Frontend brand: MoolSocial

Company: SuperMandi Tech Pvt Ltd

## 1. Product Boundary

Retailer Business Services are MoolSocial-operated outcomes that help a verified retailer run or grow the shop. They are not a provider directory, yellow pages listing or unmanaged professional marketplace.

Each service is activated separately. A retailer may subscribe to one, several or none. Personal consumer and social access remain unchanged.

## 2. Screen 93 Service Families

Screen 93 is a compact progressive hub with four service families:

```text
Delivery Support
Grow Sales
Tax & Books
Offers & Ads
```

### Delivery Support

MoolSocial provides access to verified delivery capacity for customer orders. The retailer sees serviceability, estimated pickup time, completed-delivery pricing, proof and support. The charge is tied to a completed delivery, not a vague success fee.

### Grow Sales

MoolSocial may deploy verified sales teams, field partners, freelancers or creators to expand the retailer's customer radius. Any variable charge must be tied to verified attributed sales under an explicit attribution rule. Leads, views or visits are not automatically billable sales.

### Tax & Books

MoolSocial may provide GST filing, ITR support, accounts and bookkeeping through appropriately verified and authorized professionals. A variable charge is a disclosed completion fee for an agreed filing or bookkeeping milestone, not a success fee. Regulatory authorization, engagement consent and data protection are mandatory.

### Offers & Ads

MoolSocial may help create and operate sales offers, promotions, creator campaigns and advertising. Monthly service fees, advertising spend and any attributable-sales fee must be separately disclosed. Advertising spend is never hidden inside a success charge.

## 3. Progressive User Flow

```text
Screen 93 Business Services Hub
-> choose one service
-> see outcome, inclusions and price basis
-> compare eligible plans
-> review exact commercial terms
-> consent and payment mandate
-> service workspace, status and results
```

Screen 93 must not show full legal terms or operational forms on first view. It exposes decisive facts and expands one selected service at a time.

All four professional offerings remain continuously visible on Screen 93. The retailer must not switch an `Available` tab, open a menu or know that a service exists before seeing it. Each visible offering shows its outcome, included support, monthly starting price, additional-charge basis and direct plan action. A detail layer may explain more, but it cannot own the first disclosure of these commercial facts.

The retailer workspace home keeps a permanent compact `MoolSocial Business Services` entry. This preserves discoverability without changing or overcrowding the locked retailer dock.

Screen 94 should own plan comparison and activation, using a controlled service key such as:

```text
service=delivery
service=growth
service=tax-books
service=offers-ads
```

## 4. Commercial Terms Contract

Before activation, every plan must disclose:

```text
monthly base subscription
included work or usage
exact completion or result event
variable fee basis and rate
maximum payable amount or cap
applicable tax
third-party spend such as advertising or delivery
billing and renewal date
cancellation and refund rule
attribution window and exclusions where applicable
proof used to calculate the variable charge
```

Do not display the generic phrase `success fee` without defining the event, evidence, rate and cap.

Prototype prices are illustrative. Production prices, eligibility, limits, service areas and terms must be delivered by versioned server/admin configuration. The client must not hardcode commercial authority.

## 5. Outcome And Proof Rules

```text
Delivery Support = completed delivery with accepted fulfilment proof
Grow Sales = paid and non-refunded sale attributed under agreed rules
Tax & Books = accepted filing, return, reconciliation or bookkeeping milestone
Offers & Ads = delivered campaign work plus separately measured attributed sales where contracted
```

Every charged result must be auditable by the retailer. Disputed outcomes enter a support and review workflow before final settlement.

## 6. Work And Campaign Execution

MoolSocial may publish funded tasks and campaigns to eligible verified Creator, Freelancer, Field Partner, Delivery or other workspaces. The retailer buys one operated outcome from MoolSocial and does not browse an open list of workers.

Worker execution requires:

```text
verified workspace eligibility
clear task scope
location and time where relevant
completion proof
quality review
payout rule
support and dispute path
```

## 7. Subscription And Entitlement States

Each service maintains an independent state:

```text
AVAILABLE
TRIAL where offered
ACTIVATION_PENDING
ACTIVE
ACTION_REQUIRED
PAUSED
CANCELLATION_SCHEDULED
CANCELLED
```

The retailer can view active services and current usage without entering a separate provider role. Access is workspace-scoped and permission-controlled.

## 8. Privacy, Compliance And Consent

Only the minimum workspace data required for the selected service may be shared. Tax, accounts and advertising integrations require explicit purpose consent, revocable access where technically possible, access logs and a grievance route.

GST, ITR, accounting, audit, advertising, payments and delivery must respect applicable Indian law and professional authorization. The prototype describes the workflow; production activation remains gated by verified providers, contracts and integrations.

## 9. UI And Regression Locks

```text
Do not bundle all services by default.
Do not use a provider listing or directory.
Do not hide advertising spend, delivery fees or taxes.
Do not call every variable charge a success fee.
Do not promise guaranteed sales or income.
Do not charge for unverified leads, impressions or failed delivery.
Do not expose internal planning terminology in the app UI.
Do not change the locked retailer dock: Mool | Orders | Stock | Wholesale Buy | Chat.
Do not remove the retailer's one-tap return to personal MoolSocial.
Do not hide the service catalogue behind Available/My Services tabs, menus or a promotional carousel.
Do not remove the permanent Business Services entry from the retailer workspace home.
```

## 10. Screen 93 Lock

Screen 93 is the Retailer Business Services hub. It answers:

```text
What help can MoolSocial provide?
What outcome will the retailer receive?
What is the monthly starting price?
What additional charge applies, and only after what event?
What is already active?
What is the next action?
```

Full plan comparison, authorization and activation belong to subsequent progressive screens.
