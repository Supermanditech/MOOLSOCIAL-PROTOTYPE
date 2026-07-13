# MVP Workspace Economics Freeze

Date: 2026-07-14
Status: frozen for production planning
Machine contract: `shared/workspace-economics-contract.json`

## Money promise rule

MoolSocial may show an earning only when the funder, verified outcome, gross basis, deductions, net calculation, live funded capacity, release trigger, timing and dispute rule are known. A published opportunity reserves or identifies its funding basis before a user accepts it.

Savings, cashback, revenue and earnings are not interchangeable. Monthly potential is a current funded-capacity range, never guaranteed income.

## Required money view

Before acceptance, the user sees:

- who funds the outcome;
- exact work or qualifying transaction;
- gross amount or rate;
- platform fee, payment cost, tax or withholding and possible reversals;
- estimated or exact net earning;
- remaining funded capacity and expiry;
- review, release and expected payout timing;
- rework, rejection, dispute and appeal rule.

After acceptance, the ledger retains the policy version shown at commitment. Clients do not hard-code fee, payout, cap, attribution or settlement terms.

## Source-level release rules

| Source | Qualifying outcome | Release baseline |
| --- | --- | --- |
| Funded campaign | Accepted deliverable and separately funded outcome | Review window, target T+2 business days |
| Attributed commerce | Delivered retained order under stored attribution rule | Next settlement after return/refund window |
| Membership | Settled paid membership after refund window | Rolling target T+7 |
| Content pool | Eligible original performance after invalid-traffic review | Monthly close, target by next-month 15th |
| Local production | Accepted asset within frozen brief and revision limit | Review window, target T+2 business days |
| Verified onboarding | Verified workspace plus disclosed retained action | Anti-fraud window, target T+7 |
| Live event | Accepted event output or qualifying action | Reconciliation, target T+2 business days |
| Licensed reuse | Accepted rights scope and confirmed funding | Target T+2 business days |
| Freelancer task | Accepted task-specific evidence | Dispute window, target T+2 business days |
| Captain/transport | Completed trip or delivery and payment reconciliation | Configured daily or weekly settlement |
| Provider order/booking | Fulfilled service and applicable issue window | Owning settlement schedule |
| Retail/wholesale | Collected, delivered or goods-received transaction | Owning sale or procurement settlement |

These are MVP baseline targets. The server supplies the exact date and applicable policy for each record.

## Capacity and disputes

Capacity is funded units, budget, geography, period and eligible-user throughput. Accepting an opportunity reserves only available capacity. If capacity expires before acceptance, the action fails safely without creating work.

Evidence and decisions are append-only. Refunds, reversals, chargebacks and clawbacks post compensating entries; history is not rewritten. A dispute hold affects only the relevant money unless policy explicitly requires a broader risk hold.

## Workspace economics

- Creators receive eight independently funded earning engines.
- Freelancers earn from bounded verified outcomes, not vague responsibility for a whole value chain.
- Retailers earn from consumer sales, procurement savings, own fulfilment and funded growth outcomes.
- Manufacturers and suppliers earn from wholesale demand, accepted goods, contracts, campaigns and input savings.
- Captains and transporters earn from reconciled trips, deliveries and funded mobility work.
- Restaurants, salons and other providers earn from completed orders, bookings, subscriptions and capacity campaigns.
- Doctors and professionals use qualified services and applicable subscriptions; professional and healthcare activation remains subject to separate launch readiness.

## Production acceptance

Every money record exposes funder, source ID, qualifying event, gross, deductions, net, held amount, available amount, release rule, expected date, dispute state and payout state. Duplicate qualifying events cannot create duplicate earnings.
