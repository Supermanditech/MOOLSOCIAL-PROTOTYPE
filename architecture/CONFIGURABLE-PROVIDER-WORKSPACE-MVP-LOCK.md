# MoolSocial Configurable Provider Workspace MVP Lock

Date: 13 July 2026

## Product Boundary

MoolSocial may reuse one configurable provider operating shell, but users never create or see a vague "generic provider" workspace. Every workspace is activated from an exact verified profile such as Restaurant, Cloud Kitchen, Tiffin Provider, Salon, Doctor, Clinic, Hospital, Pharmacy, Transporter or Individual Service Provider.

Shared routes do not erase specialized rules. A Doctor is never treated as an ordinary service listing. A Pharmacy cannot publish medicine without the licensed-pharmacy and pharmacist workflow. A Restaurant uses menu, kitchen capacity and order preparation. A Salon uses service duration, staff and slots. A Transporter uses vehicle, route and capacity.

## Profile-Aware Dock

The shell keeps the same positions while labels adapt:

`Mool | Orders/Bookings/Appointments/Jobs | Menu/Services/Medicines | Money | Chat`

Profile configuration controls visible fields, labels, workflow state machine, proof, compliance, pricing, availability, fulfilment and customer records. Configuration is versioned server data, not free-text category invention.

## Direct Operating Model

The provider does not buy a marketplace listing. MoolSocial operates the request, booking/order, payment, fulfilment, communication, proof, receipt and support flow. Consumers receive decision-ready options; providers operate accepted work inside their workspace.

## Route Set

1. Screen 139: Provider Home and Readiness — `/provider`
2. Screen 140: Catalogue / Menu / Services — `/provider/catalogue`
3. Screen 141: Availability and Capacity — `/provider/availability`
4. Screen 142: Orders / Bookings / Appointments — `/provider/requests`
5. Screen 143: Fulfilment and Customer Communication — `/provider/fulfilment/:requestId`
6. Screen 144: Customers, Payments and Records — `/provider/business`
7. Screen 145: Earn Opportunities and Campaigns — `/provider/growth`
8. Screen 146: Settings, Staff and Support — `/provider/control`

All subordinate states remain inside these routes. Chat, identity, files, payments, notifications, tax documents, support, audit, delivery assignment and compliance resolution reuse shared engines.

## Readiness and Compliance

Base KYC is reused. Workspace-specific proof is resolved from profile, geography, establishment, service mode, regulated activity and current competent-authority rules. Missing optional GST may allow limited setup with reminders where legally permissible; missing mandatory professional, premises, pharmacy, food, transport or other authorization blocks only the affected capability.

Nothing becomes consumer-visible until the exact profile's minimum catalogue/service, price, availability/capacity, fulfilment, payment, cancellation/refund and compliance gates pass.

## Production Contract

Production uses a profile-definition registry, schema-driven forms, versioned workflow state machines, capability flags, role-based staff permissions, authoritative order/booking and payment ledgers, idempotent commands, event-driven notifications, compliance expiry jobs, and auditable support. Mobile and responsive web use the same routes and APIs.
