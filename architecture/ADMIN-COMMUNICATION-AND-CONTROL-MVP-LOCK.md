# MoolSocial Admin Communication and Control MVP Lock

Date: 13 July 2026

## Outcome

MoolSocial Admin can operate the platform and communicate relevant offers, products, services, feature launches, upgrades, work opportunities, tasks, safety notices and required actions to every eligible consumer and verified workspace type.

Full control means complete governed operational reach. It does not mean that one human account may silently publish, move money, change eligibility or expose private data without authorization and audit.

## Audience Resolver

Every outbound communication uses server-resolved audiences based on approved fields:

- consumer or verified workspace type
- geography, service area, pin code, district, state or country
- language and supported fallback language
- account, readiness, eligibility and compliance state
- product, service, order, booking, ride, work or campaign relationship
- app version, feature entitlement and subscription
- consent, notification preferences and legal basis
- risk suppression, quiet hours and frequency limits

Admins see estimated eligible reach before approval. Private customer, patient, creator audience, employee or financial data is never exported into a campaign audience.

## Communication Types

1. Required action or compliance notice
2. Safety, fraud, outage or service notice
3. New product or service activation
4. New feature or version launch
5. Funded work, task or campaign opportunity
6. Workspace upgrade or paid operating service
7. Consumer offer or demand campaign
8. Transactional order, booking, ride, payment or support update

Transactional and legally required communications cannot be disguised promotions. Promotional communication requires applicable consent and unsubscribe controls.

## Progressive Publishing

Admin creation follows one progressive route state:

1. Choose purpose
2. Resolve audience
3. Compose localized content and destination action
4. Preview every channel
5. Run policy, consent, frequency and conflict checks
6. Obtain maker-checker or specialist approval when required
7. Schedule, publish or hold
8. Monitor delivery, action, conversion, complaints and stop conditions

The draft collapses completed steps and keeps only the next required action open.

## Channels

- in-app Priority Inbox
- push notification
- workspace banner or task card
- Chat system thread
- email
- SMS or WhatsApp only through approved integrations, templates and consent rules

Channel failure uses configured fallback rules. No channel may bypass the canonical communication event and audit record.

## Approval Policy

- routine informational notices: authorized operator
- promotional offers and campaigns: campaign owner plus policy check
- work opportunities: work-operations owner plus verified funding and eligibility
- compliance, medical, financial or legal messaging: specialist approval
- mass nationwide communication: maker-checker approval
- emergency safety communication: authorized incident commander with post-event review
- money movement, refund policy or eligibility changes: separate finance or policy approver

## Shared Delivery Contract

The Admin communication route owns creation, targeting, approval and measurement. Shared Screen 157 owns the user-facing Priority Inbox and notification state. Workspaces receive counters and deep links but do not duplicate the communication engine.

Users can open the destination in one tap, dismiss optional communication, manage preferences, report abuse and see why a message was received. Required notices state why dismissal is unavailable.

## Production Requirements

- versioned templates, audiences, policies and translations
- idempotent publish command and immutable campaign ID
- outbox and delivery event processing
- consent and suppression checks at send time
- channel rate limits, quiet hours and frequency caps
- maker-checker approvals and least-privilege roles
- delivery, open, action, conversion and complaint events
- pause, stop and recall where technically possible
- immutable audit of creator, approver, audience rule and content version
- no raw bulk recipient export
- test audience and canary delivery before large sends

## Route Ownership

Screen 156 owns audience, communication, feature-launch, offer, configuration and analytics states under `/admin/configuration`. It reuses the existing `configuration-analytics` capability and does not add an eleventh Admin route.
