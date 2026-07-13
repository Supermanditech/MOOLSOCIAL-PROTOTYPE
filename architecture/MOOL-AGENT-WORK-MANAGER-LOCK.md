# Mool Agent Work Manager Lock

Date: 2026-07-13
Status: MVP production contract
Applies to: personal accounts, social profiles and every verified workspace type

## 1. Product decision

Mool Agent is an optional monthly subscription attached to the owner account. It may operate across the personal account and any verified workspace the owner explicitly selects.

The subscription grants access to automation. It does not grant authority. Authority is created only by the owner's saved rules, limits, schedule and consent receipts.

Mool Agent is configured inside Screen 165 and the production route state `personalized-controls` under `/account/workspaces`. It must not consume a separate MVP route.

## 2. Progressive operating model

1. Owner opens Mool Agent.
2. Owner sees plan state, selected workspaces and next scheduled run.
3. Owner chooses which workspaces the agent may assist.
4. Owner chooses routine activities and operating hours.
5. Owner reviews three authority tiers.
6. Owner activates a monthly plan.
7. Agent produces a daily brief and an approval queue.
8. Owner can pause immediately without affecting accepted orders, rides, bookings, work or payment obligations.

## 3. Authority tiers

### Tier A: Run under standing authority

These actions may run without asking every time only after the owner has enabled the exact activity and saved a limit:

- monitor orders, bookings, rides, stock, wholesale purchases, work and customer issues;
- prepare daily briefs, reminders, forecasts and exception alerts;
- classify and prioritise inbox items;
- prepare reply, offer, purchase, delivery and content drafts;
- send owner-approved templates for routine status updates;
- apply saved opening hours, availability schedules and temporary pauses;
- assign routine work under saved staff, area, capacity and value limits;
- reorder an already approved SKU only when supplier, quantity, price ceiling and spend limit are all pre-authorised.

Every autonomous execution must have a policy version, reason, before/after value, actor `mool_agent`, and an owner-visible receipt.

### Tier B: Ask the owner before execution

The agent may prepare these actions but must obtain explicit approval for the final step:

- any payment, refund, payout, money hold, release or bank instruction;
- a new purchase order or a reorder outside saved limits;
- changes to price, discount, offer, MOQ, credit or payment terms;
- accepting, cancelling or materially changing an order, booking, ride or paid work commitment;
- publishing a post, short, video, advertisement or campaign;
- contacting a new audience or using a new communication channel;
- signing or accepting contracts, commercial terms or platform commitments;
- filing GST, ITR, audit, licence or statutory information;
- adding staff, changing permissions or exposing customer data;
- changing public workspace identity, bank account, payout destination or legal profile.

Approvals expire and cannot be reused for a changed amount, counterparty, audience, document or terms version.

### Tier C: Never delegated

The agent must never:

- request, read, store or enter OTP, UPI PIN, card PIN, password or recovery secret;
- create borrowing, credit or personal guarantee commitments;
- bypass KYC, licences, prescription, statutory or workspace verification;
- sign declarations as the owner or impersonate a professional;
- use private chat content for advertising or unrelated profiling;
- silently change consent, audit history, evidence or completed transaction records;
- act after subscription expiry, owner pause, policy expiry or workspace suspension.

## 4. Workspace capability packs

The UI is capability-driven. It renders only activities supported by the selected verified workspace.

| Workspace | Agent capability examples |
|---|---|
| Retailer | order queue, stock alerts, repeat purchase drafts, delivery assignment, offer drafts, customer follow-up |
| Manufacturer / supplier | wholesale enquiries, production or stock exceptions, raw-material suggestions, dispatch planning, buyer follow-up |
| Restaurant / cloud kitchen / tiffin | order windows, kitchen capacity, menu availability, preparation queue, delivery coordination |
| Doctor / clinic / hospital | appointment reminders, slot management, follow-up queue and document requests; no medical decision automation |
| Salon / individual provider | appointment slots, reminders, repeat-booking drafts and staff allocation |
| Captain / transporter | online schedule, eligible request alerts, trip documents and earnings summary; no trip acceptance without saved authority |
| Creator | content calendar, drafts, campaign matching, comment triage and earnings summary; publishing requires approval |
| Freelancer / Get It Done provider | opportunity matching, application drafts, schedule, evidence checklist and payout tracking |
| Personal / social | daily brief, reminders, repeat-order suggestions, saved bill reminders and social drafting |

## 5. Subscription and entitlement

- Plans and prices are controlled by MoolSocial Admin and returned by entitlement API; they are not hard-coded in clients.
- Subscription is owned by the account and may include a configured number of active workspaces, schedules and monthly agent runs.
- Trial, upgrade, downgrade, renewal, grace period and cancellation must preserve settings but stop execution when entitlement is inactive.
- The owner can preview recommended automations before subscribing.
- Paid status never overrides consent, legal restrictions, workspace verification or action limits.

## 6. Scheduling

Each automation has:

- timezone;
- selected workspace;
- activity key;
- start and end time;
- days or date exceptions;
- execution mode: `draft`, `ask`, or `run_within_limit`;
- monetary, quantity, audience or capacity limit where applicable;
- notification destination;
- expiry and pause state.

Server time is authoritative. Duplicate execution is prevented with an idempotency key based on owner, workspace, automation, schedule window and policy version.

## 7. User-facing states

- `not_subscribed`
- `setup_incomplete`
- `active`
- `paused_by_owner`
- `waiting_for_approval`
- `limit_reached`
- `subscription_grace`
- `subscription_expired`
- `workspace_restricted`
- `action_blocked`

The agent must clearly say whether it drafted, recommended, scheduled, executed, failed or is waiting for approval.

## 8. Core data objects

- `agent_entitlement`
- `agent_workspace_scope`
- `agent_policy`
- `agent_schedule`
- `agent_action_request`
- `agent_approval`
- `agent_execution`
- `agent_receipt`
- `agent_pause`

## 9. Required APIs

- `GET /v1/agent/entitlement`
- `GET /v1/agent/recommendations`
- `GET /v1/agent/policies`
- `PUT /v1/agent/policies/{policy_id}`
- `POST /v1/agent/subscriptions`
- `PATCH /v1/agent/subscriptions/{subscription_id}`
- `POST /v1/agent:pause`
- `POST /v1/agent:resume`
- `GET /v1/agent/approvals`
- `POST /v1/agent/approvals/{approval_id}:approve`
- `POST /v1/agent/approvals/{approval_id}:reject`
- `GET /v1/agent/executions`
- `GET /v1/agent/receipts/{receipt_id}`

## 10. Production acceptance tests

1. Enabling a subscription without a saved policy cannot execute an action.
2. Tier B actions always wait for approval.
3. OTP, PIN, password and borrowing actions are blocked.
4. A changed amount or counterparty invalidates prior approval.
5. Pausing the agent stops new executions immediately but keeps accepted obligations visible.
6. Expired entitlement preserves settings and receipts but prevents execution.
7. Workspace suspension blocks its automations without disabling personal consumer access.
8. Duplicate schedule delivery does not duplicate the action.
9. Every draft, recommendation, approval and execution is visible in Activity with an audit receipt.
10. Admin may configure plans and safety policy, but cannot silently enable an owner's automation or promotional consent.
