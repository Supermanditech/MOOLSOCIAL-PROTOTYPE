# YouTube Connect, Campaign Reels and Distributed Earning — Founder Review Candidate

Date: 2026-07-18
Status: product direction implemented in the local prototype; founder UI/UX review and public redeployment pending
Authority: supersedes native open-ended MoolSocial video hosting assumptions for launch planning
Implementation state: Screen 166, the affected replacement surfaces and machine contracts are implemented locally. Screen 166 has passed mobile and desktop black-box and adversarial route-state audits but is not yet founder-approved or published.

## 1. Locked launch decision

MoolSocial will not launch as a permanent host for unrestricted creator reels or long-form video.

- Text and image posts remain native MoolSocial content.
- Creator video remains hosted on the creator's YouTube channel.
- MoolSocial uses YouTube Connect to import, embed and add independent MoolSocial value around eligible YouTube videos and Shorts.
- The creator retains the YouTube asset, channel relationship and any eligible YouTube earnings.
- MoolSocial supplies local discovery, product and service context, `Buy`, `Book`, `Order`, `Apply`, `Visit` and `Chat` actions, verified leads, attributable commerce and campaign work.
- MoolSocial must not reward or compensate a viewer for a YouTube view, like, share, comment or subscription.
- Creator incentives may fund an approved original promotional deliverable and independently verified MoolSocial outcomes such as an eligible lead, order, booking, activation or approved field result.

Official dependencies:

- YouTube IFrame Player API: <https://developers.google.com/youtube/iframe_api_reference>
- YouTube Data API upload flow: <https://developers.google.com/youtube/v3/guides/uploading_a_video>
- YouTube API developer policies: <https://developers.google.com/youtube/terms/developer-policies>
- YouTube quota and compliance audit: <https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits>

## 2. Proposed prototype Screen 166

Add one new prototype acceptance screen:

**Screen 166 — YouTube Connect and Shoppable Promotion**

The screen increases the prototype catalogue from Screens 00–165 to Screens 00–166, or 167 screens, only after its UI, interactions and regression evidence are implemented.

It is a progressive state of the existing production routes `/social/create` and `/creator/publish`; it does not require a new production route.

Required screen states:

1. Explain the benefit: keep the video on YouTube and add MoolSocial sales, booking, lead or work actions.
2. Offer `Paste YouTube link` and `Connect my YouTube channel`.
3. Explain Google authorization before requesting it.
4. Handle OAuth allow, deny, cancel, expiry, revoke and reconnect.
5. Show public, embeddable videos and Shorts without presenting private or unsupported content as publishable.
6. Let the creator select one item and attach one decisive MoolSocial outcome.
7. Capture location, category, product/service/work reference, disclosure, rights confirmation and campaign association.
8. Preview YouTube attribution and player separately from MoolSocial actions.
9. Publish the MoolSocial post and show a durable result reference.
10. Handle removed, private, embedding-disabled, age-restricted, made-for-kids, unavailable and policy-blocked videos.

The first launch may use link paste and existing-channel import. Direct `Record in MoolSocial -> upload to the creator's YouTube channel` remains blocked until OAuth verification, YouTube compliance audit and sufficient `videos.insert` quota are approved.

## 3. Existing prototype replacement map

The replacement must be implemented and audited as one controlled change:

| Existing surface | Required replacement |
| --- | --- |
| Screen 04 Social entry | Explain YouTube-connected video discovery and separate native text/image posts. |
| Screen 05 Social Shorts | Replace permanent native Shorts with funded `Campaign Reels` sourced from eligible YouTube content. |
| Screen 06 Social Videos | Use click-to-play, clearly attributed YouTube video discovery with independent MoolSocial actions outside the player. |
| Screen 07 Social Feed | Mix native text/images and clearly labelled YouTube-connected video posts without merging Mool metrics with YouTube metrics. |
| Screen 08 Social Create | Replace native Short/Video upload with text, image, poll, `Add YouTube video` and `Connect channel`. |
| Screen 124 Creator Studio | Add channel status, connected content, Mool outcomes and active funded campaign placements. |
| Screen 125 Creator Publish | Replace the native upload/transcode composer with YouTube Connect selection and Mool action attachment. |
| Screen 126 Content Library | Separate native text/image posts from YouTube-connected content and unavailable/reconnect states. |
| Screen 127 Performance | Label Mool opens, Mool actions, qualified leads, orders and bookings separately from YouTube-provided metrics. |
| Screen 129 Campaigns | Accept a funded brief, attach or create eligible YouTube content, disclose sponsorship and submit the Mool outcome. |
| Screen 131 Rights and Safety | Add YouTube connection, revocation, embedding, disclosure and unavailable-content controls. |
| Screen 113 Manufacturer Campaigns | Fund creator deliverables and distributed outcome work from a reserved campaign wallet. |

No old native-upload copy, API contract, media-storage promise or creator-earnings statement may remain authoritative after the replacement is released.

## 4. Campaign Reels lifecycle

The MoolSocial Reels surface becomes a funded campaign-placement product rather than permanent open video hosting.

- Video remains hosted on YouTube.
- The business chooses any launch duration from one through seven days.
- The server stores the chosen duration precisely as `24`, `48`, `72`, `96`, `120`, `144` or `168` hours from approved activation.
- The user sees both the friendly day label and the exact start and end timestamp before funding.
- Campaign funding is reserved before the placement becomes eligible.
- Duration starts from approved activation, not from payment initiation or a failed publish attempt.
- Approval delay, failed activation, pause before activation or retry time does not consume the purchased duration.
- The placement has a start time, end time, geography, eligible audience, frequency cap, budget cap, objective and stop rule.
- Expiry removes the reel from MoolSocial campaign feeds, recommendations and promotional placements.
- Expiry does not delete the creator's YouTube video.
- MoolSocial retains only the campaign receipt, evidence, aggregate outcome, settlement and dispute records required for operations and compliance.
- A business may renew by approving and funding a new placement; renewal is not automatic unless explicitly accepted.
- Campaign reach is never guaranteed merely because a duration was purchased.
- Arbitrary sub-day durations are not part of launch. A separate 6-hour or 12-hour `Burst` product may be considered later only after demand, pricing, moderation and settlement are validated.

## 5. Allowed creator and individual incentives

Allowed funded outcomes include:

- approved original promotional content;
- approved product demonstration or local-language explanation;
- eligible product or service lead;
- completed and non-refunded order or booking;
- verified retailer or provider activation;
- consented catalogue, menu or product digitisation;
- approved store, stock, shelf, service-area or field evidence;
- customer-success or repeat-order work;
- other bounded, legal and independently verifiable business outcomes.

Prohibited or launch-blocked outcomes include:

- payment for watching a YouTube video;
- payment for a YouTube like, comment, share or subscription;
- automatic, coerced or deceptive engagement;
- install-only or OTP-only bounties;
- self-purchase, duplicate, collusive or fabricated outcomes;
- medical referral, prescription or clinical-outcome incentives;
- unfunded earnings, uncapped liabilities or revenue guarantees.

## 6. Enterprise problem-to-individual-opportunity exchange

MoolSocial can convert a verified enterprise growth problem into bounded, funded opportunities for eligible individuals.

### Enterprise demand

Manufacturers, brands, retailers, salons, taxi and ride operators, hospitals and clinics, restaurants and other verified providers may need:

- more customers or verified buyers;
- geographical expansion;
- product education and local-language content;
- retailer, supplier or provider activation;
- catalogue and service digitisation;
- sampling, field verification or market feedback;
- sales, booking, delivery or customer-success execution;
- repeat demand and attributable conversion.

### Individual supply

Eligible individuals may participate as:

- creator or promoter;
- local-language product educator;
- verified lead generator;
- sales or booking activator;
- retailer/provider onboarding worker;
- catalogue or menu digitiser;
- field verifier;
- delivery or service coordinator;
- customer-success or repeat-order worker.

Every opportunity must show the funder, exact task, capacity, eligibility, geography, evidence, gross amount, deductions, net amount, deadline, review rule, release time, rejection reason and dispute route before acceptance.

## 7. The ₹9,999 manufacturer example

₹9,999 cannot honestly fund meaningful payment to 10,000 people. It provides less than ₹1 per person before platform, verification, payment and support costs.

The sustainable structure is:

1. **Workspace subscription:** for example ₹9,999 per month for campaign tools, targeting, workflow, reporting and a defined number of active briefs.
2. **Separate prepaid campaign wallet:** funds individual base payments and outcome bonuses.
3. **Orchestration charge:** funds matching, verification, fraud controls, support, evidence review and settlement.
4. **Optional success-linked charge:** applies only to a defined, attributable and verified incremental business outcome.

Illustrative capacity:

| Desired funded participants | Participant allocation only | Minimum payout pool before fees |
| ---: | ---: | ---: |
| 100 | ₹500 each | ₹50,000 |
| 1,000 | ₹100 each | ₹1,00,000 |
| 10,000 | ₹50 each | ₹5,00,000 |
| 10,000 | ₹100 each | ₹10,00,000 |

The client must calculate the full amount as:

`participant payout pool + outcome bonus cap + payment/tax cost + verification/fraud reserve + MoolSocial orchestration charge`

The opportunity cannot publish until the maximum payable amount is reserved.

## 8. Enterprise revenue-target campaigns

Every eligible verified workspace may publish a daily, weekly or monthly incremental growth target. Individuals join funded target capacity and earn only from the disclosed approved deliverable or independently verified MoolSocial transaction outcome.

The configurable target builder captures:

- business objective and incremental revenue target;
- eligible products, services, menu items, bookings or buyer profiles;
- geography and campaign start/end;
- current price, expected average order value and contribution margin;
- required new customers, retained orders, bookings, activations or B2B buyers;
- stock, production, staff, slot, delivery and service-area capacity;
- participant eligibility, funded seats and per-person cap;
- fixed deliverable fee, per-outcome commission and milestone bonus;
- maximum payout pool, MoolSocial charges, tax/payment cost and fraud reserve;
- attribution method and window;
- cancellation, return, refund, dispute and payout-release rules;
- stop conditions for budget, inventory, capacity, quality or economics.

The client calculates:

`required qualified orders = incremental revenue target / expected retained average order value`

`maximum worker commission pool = qualified outcome capacity * commission per qualified outcome + milestone bonus cap`

`maximum campaign funding = worker commission pool + fixed deliverable fees + verification/payment/tax reserve + MoolSocial charge`

Revenue is a target until completed, non-cancelled and non-refunded MoolSocial transactions settle. A sales target never creates an earning or an enterprise-revenue claim by itself.

### Individual join flow

1. Open an eligible funded target.
2. Review product/service, geography, customer eligibility, remaining capacity, commission, evidence, attribution, expiry and expected net earning.
3. Accept a funded seat.
4. Receive a unique MoolSocial campaign link, code, QR or assigned task reference.
5. Promote through permitted channels or complete the bounded work.
6. Customer discovers the offer but places the order, booking or application through MoolSocial.
7. MoolSocial records attribution, payment, fulfilment, cancellation/refund and retained completion.
8. Commission releases only after the disclosed settlement window.

The customer remains free to choose. Participants cannot spam, misrepresent a product, conceal sponsorship, capture payment privately or obtain customer contact data without a valid purpose and consent.

### Correct restaurant example

A restaurant cannot combine a ₹10,00,000 revenue target, 1,000 additional customers and a ₹300 thali unless each customer purchases more than one thali or the retained average order value is higher.

Two internally consistent examples are:

**Example A — 1,000 additional orders**

- Retained average order value: ₹300
- Incremental gross-sales target: ₹3,00,000
- Individual commission: ₹50 per completed, paid and non-refunded order
- Maximum worker commission pool: ₹50,000
- Additional funding: MoolSocial charge, payment/tax cost, refund reserve and any approved content-production fees

**Example B — ₹10,00,000 additional sales**

- Retained average order value: ₹300
- Required retained orders: approximately 3,334
- Individual commission: ₹50 per completed, paid and non-refunded order
- Maximum worker commission pool: ₹1,66,700
- Inventory, kitchen, packaging, delivery and support capacity must prove that the restaurant can fulfil the target before publication

If the restaurant wants exactly 1,000 additional customers and ₹10,00,000 sales, the campaign must show a retained average revenue of ₹1,000 per customer.

### Correct manufacturer example

A manufacturer may create:

**Jodhpur wheat-flour incremental sales target — ₹1,00,00,000**

The product must already be an eligible MoolSocial listing with authoritative price, stock/production capacity, tax, delivery, serviceability and return terms.

Possible B2B decomposition:

- Retained average buyer order: ₹10,000
- Required retained buyer orders: 1,000
- Commission: ₹100 per eligible new buyer's first completed and retained order
- Maximum base commission pool: ₹1,00,000
- Optional milestone bonuses: separately capped and funded

Possible household decomposition:

- Retained average order: ₹500
- Required retained orders: 20,000
- At ₹100 per retained order, the base commission pool would be ₹20,00,000

The household version must be rejected or repriced if product contribution margin cannot support the commission, fulfilment and MoolSocial costs.

The phrase `₹100 commission if you bring 1,000 customers` is not acceptable because it can mean ₹0.10 per customer. The campaign must state either `₹100 per qualified customer/order` or a clearly funded milestone amount for 1,000 qualified customers.

### MoolSocial-only transaction attribution

For a sale or booking to create commission:

- the eligible product/service and campaign version are stored before the customer acts;
- order or booking creation occurs in MoolSocial;
- payment or approved cash collection is reconciled to the MoolSocial transaction;
- fulfilment is confirmed by the owning order, booking, trip or goods-receipt system;
- cancellation, refund, return and chargeback windows are applied;
- one disclosed attribution rule decides between competing participants;
- self-purchase, household duplication, collusion, fabricated accounts and circular buying are excluded;
- the ledger posts one qualifying commission event idempotently.

YouTube views and engagement may support the creator's independent YouTube presence but never qualify the MoolSocial sales commission. The qualifying event is the governed MoolSocial outcome.

## 9. Coverage across the 28 launch workspaces

The target-campaign engine is configuration-driven and may be enabled for all 28 leaf workspaces in `MVP-WORKSPACE-CARD-TREE-AND-IDENTITY-LOCK.md`, subject to profile-specific compliance and operational readiness.

| Workspace family | Example enterprise target | Individual earning outcomes |
| --- | --- | --- |
| Manufacturer, supplier and distributor | Incremental B2B/B2C sales, retailer activation, new territory | Approved product content, verified buyer activation, retained order |
| Grocery, retail and product seller | New customers, repeat orders, catalogue coverage, slow-stock campaign | Catalogue task, completed sale, retained customer |
| Restaurant, cloud kitchen and tiffin | Incremental orders, subscriptions, tables, off-peak utilisation | Approved content, retained order, completed booking/subscription |
| Doctor, clinic, hospital and pharmacy | Approved education, non-clinical administration, appointment capacity | Approved information task or administrative completion; no patient-referral, prescription or clinical-outcome commission |
| Salon, home beauty and local services | New or repeat bookings, off-peak slots, geographical reach | Approved content, retained booking, customer-success task |
| Captain, delivery, porter and fleet | Completed trips/deliveries, zone activation, eligible operator onboarding | Reconciled trip/delivery, verified activation or field task |
| Creator, freelancer and Get It Done | Content, field execution, onboarding, sales activation, verification | Accepted deliverable or verified retained outcome |

One shared engine changes labels, eligibility, proof, attribution, release and compliance by workspace profile. It must not create 28 separate hard-coded campaign systems.

## 10. Enterprise value and employment boundary

This model gives a business variable, measurable growth capacity without hiring a permanent employee for every short campaign, geography or specialist task.

It must not be marketed as a mechanism to evade employment, wage, tax, safety or professional obligations. Continuous controlled work that functions like an ongoing role requires the appropriate employment, provider or contracted-service structure. The target marketplace is for bounded, voluntarily accepted, funded outcomes with disclosed terms.

MoolSocial revenue may combine:

- workspace subscription;
- campaign setup/orchestration charge;
- transaction or booking charge;
- separately disclosed success-linked charge;
- qualified managed-service or analytics charge.

No charge may be hidden inside the worker's promised earning or the customer's displayed product price.

## 11. MoolSocial managed-responsibility contract

For an activated managed campaign, MoolSocial may take responsibility for:

1. converting the business problem into an objective and bounded brief;
2. calculating funded capacity and stop conditions;
3. matching eligible people without promising availability;
4. reserving funds before acceptance;
5. collecting and validating evidence;
6. preventing duplicate, self-generated and collusive outcomes;
7. reporting approved, rejected, pending and disputed results;
8. paying qualified participants from the authoritative ledger;
9. giving the enterprise an attributable outcome report;
10. pausing or stopping the campaign when funding, quality, safety or economics fail.

MoolSocial may target higher or even doubled incremental revenue as an enterprise hypothesis, but it must not promise that the enterprise will double revenue. The system must distinguish target, forecast, attributed result and guaranteed contractual obligation.

## 12. Campaign state machine

`draft -> priced -> funding_reserved -> published -> seats_available -> accepted -> in_progress -> submitted -> under_review -> qualified -> release_pending -> paid -> closed`

Exception states:

`paused`, `capacity_full`, `expired`, `rejected`, `rework_requested`, `disputed`, `cancelled`, `refunded`, `reversed`, `clawed_back`

Money, capacity, evidence and attribution are server-authoritative. A client tap can request a transition but cannot declare qualification or payment.

## 13. Required production records

- YouTube connection and revocation state;
- external video ID, channel ID, embeddable status and last validation time;
- MoolSocial post and attached action;
- campaign brief, audience, geography and duration;
- funding reservation and payout-cap ledger;
- participant eligibility and reserved seat;
- deliverable, evidence and disclosure;
- independently verified MoolSocial outcome;
- attribution rule and version;
- gross, deductions, net, hold, reversal and payout;
- expiry, renewal, dispute and support audit.

## 14. Release gate

Completed locally:

- Screen 166 and all affected YouTube replacement surfaces are implemented.
- Obsolete native video-upload launch assumptions are superseded in visible user surfaces and Creator Publish/Content Library machine contracts.
- OAuth explain, allow, deny, cancel, expiry, revoke, reconnect and unavailable-video states are represented.
- All seven campaign durations (`24` through `168` hours), exact end time, approval-delay protection and non-automatic renewal are represented and replayed.
- Screen 166 passed the independent mobile and desktop live black-box audit: `52/52` intent paths, `0` failures and `0` console errors.
- Screen 166 passed `10/10` adversarial route-state scenarios and `14/14` clean-state rendered controls.

Still required before this candidate becomes frozen and publicly reviewable:

- founder UI/UX approval of Screen 166 and the affected replacement surfaces;
- restaurant, manufacturer and at least one profile from each workspace family target-to-transaction-to-payout replay;
- inconsistent target, customer-count, average-order-value and commission arithmetic rejection before funding;
- funded capacity, insufficient funding, duplicate evidence, rejection, dispute, cancellation and payout coverage;
- approved-flow regeneration after the founder-review governance gate is cleared;
- commit, push and GitHub Pages redeployment.
