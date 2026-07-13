# MoolSocial Personal, Social and Workspace Controls Lock

Date: 13 July 2026

## Outcome

Every MoolSocial user can control personal experience, social interaction, communication, discoverability and workspace availability from one progressive settings surface. The controls adapt to the exact verified workspace type and never remove personal consumer access.

## Three Controls That Must Stay Separate

1. **Visible**: whether the profile, shop, service or workspace can be discovered.
2. **Accepting**: whether new orders, bookings, rides, jobs, campaigns or enquiries may be submitted now.
3. **Communicating**: which purposes and channels may contact the user.

A retailer may remain visible while ordering is closed. A doctor may remain visible while no appointments are available. A captain may be offline without hiding the verified captain profile. A creator may remain discoverable while direct messages are limited.

## Universal Precedence

When rules conflict, resolve them in this order:

1. legal, safety, fraud or compliance restriction
2. accepted order, booking, ride, work or support obligation
3. explicit temporary owner override
4. holiday, leave or exceptional-date schedule
5. workspace weekly schedule and capacity
6. user account default
7. platform recommendation

Admin recommendations and campaigns cannot override a user’s communication withdrawal or a workspace owner’s closed state. Emergency and compliance actions require reason, scope, expiry and audit.

## Workspace Capability Templates

| Workspace | Visibility | Accepting control | Schedule and capacity | Fulfilment controls |
|---|---|---|---|---|
| Retailer or medical store | Public shop | New customer orders | Opening hours, order cutoff, holiday | Counter pickup, home delivery, scheduled delivery |
| Restaurant or cloud kitchen | Public menu | Food orders | Meal windows, kitchen capacity | Delivery, pickup, table service |
| Tiffin provider | Public plan | New subscriptions or daily orders | Meal days, cutoff, subscriber capacity | Delivery area and pause dates |
| Doctor, clinic or hospital | Public verified profile | Appointment requests | Slots, consultation type, leave | Clinic, video, follow-up |
| Salon | Public services | Booking requests | Staff, chair and service duration | At salon or supported home service |
| Captain | Verified profile | Ride requests | Online state, vehicle and service area | Bike, auto or cab availability |
| Manufacturer or supplier | Public catalogue | Wholesale orders and enquiries | Order window, production or stock capacity | Own fleet, MoolSocial transport, buyer pickup |
| Creator | Public channel | Messages, campaigns and collaborations | Publishing schedule and availability | Public, followers or selected audience |
| Freelancer or field worker | Work profile | New work matches | Available time, area and capacity | Remote, field, delivery or onboarding |
| Individual service provider | Public service profile | New requests | Service hours, travel radius, capacity | At provider, at customer or remote |

Capabilities come from the verified profile registry. Unsupported toggles must not appear.

## Availability State Machine

```text
DRAFT -> VISIBLE_CLOSED -> OPEN -> CLOSING_SOON -> CLOSED
                              |          |
                              v          v
                         TEMP_PAUSED <- OVERRIDE
```

- `VISIBLE_CLOSED`: customers can inspect the profile but cannot place an immediate request.
- `OPEN`: new demand is accepted subject to live capacity.
- `CLOSING_SOON`: show the final order or booking cutoff honestly.
- `CLOSED`: show next opening time; offer scheduled demand only when enabled.
- `TEMP_PAUSED`: stop new demand until a chosen time or manual resume.
- accepted obligations never disappear when acceptance turns off.

## Schedule Engine

- IANA time zone stored per workspace
- weekly opening or availability windows
- split shifts and meal windows
- holiday, leave and exceptional-date overrides
- order or booking cutoff before closing
- temporary pause with mandatory expiry
- capacity per slot, service, fulfilment mode or staff member
- daylight and time-zone safe server evaluation
- server is authoritative; client clock is display-only
- state changes publish immediately to consumer decision cards

## Communication Purpose Matrix

Users control purpose and channel independently:

| Purpose | In-app | Push | Chat | Email | SMS or WhatsApp |
|---|---|---|---|---|---|
| Accepted order, booking, ride or work | Required destination | Configurable alert | Canonical thread | Receipt fallback | Critical fallback only |
| Safety, fraud and account security | Required | Recommended | System thread | Fallback | Approved urgent fallback |
| Customer or business chat request | Always visible in inbox | On/off | Allow, requests only or off | Off by default | Off |
| Reorder or repeat-booking reminder | On/off | On/off | Off by default | On/off | Consent required |
| Work and campaign opportunity | On/off | On/off | On/off | On/off | Consent required |
| Product, service and feature update | On/off | On/off | Off by default | On/off | Consent required |
| Offer, promotion or advertisement | Consent required | Consent required | Off by default | Consent required | Explicit consent and approved template |

Quiet hours apply to optional communication. Safety and active transaction alerts may bypass quiet hours only under approved policy.

## Social Controls

- personalized or chronological feed
- comments from everyone, followers, selected people or nobody
- mentions and tags
- message requests
- activity status and read receipts
- nearby social discovery
- creator collaboration and campaign invitations
- autoplay and data saver
- content language and accessibility
- blocked, muted and restricted accounts
- relevant advertisements and offer personalization

Public posting visibility is chosen per post. Account discoverability and message permission remain separate.

## Progressive UX

1. Screen 162 shows a one-tap `Personalized controls` entry.
2. Screen 165 shows compact domains, not every toggle at once.
3. Tapping one domain opens its exact controls in a focused sheet.
4. A changed toggle shows its effect before saving.
5. Workspace availability shows customer-facing preview and next transition time.
6. Schedule editing opens only after `Automatic schedule` is enabled.
7. Save produces one versioned preference receipt and updates affected surfaces.

## APIs

- `GET /v1/users/me/preferences`
- `PATCH /v1/users/me/preferences`
- `GET /v1/users/me/communication-preferences`
- `PATCH /v1/users/me/communication-preferences`
- `GET /v1/workspaces/{workspace_id}/availability`
- `PUT /v1/workspaces/{workspace_id}/availability`
- `POST /v1/workspaces/{workspace_id}/availability:override`
- `DELETE /v1/workspaces/{workspace_id}/availability:override`
- `GET /v1/workspaces/{workspace_id}/availability:preview`
- `GET /v1/users/me/preference-receipts`

Writes require idempotency, expected version and actor permission. Schedule changes use the workspace time zone and return the next evaluated transition.

## Core Models

- `user_preference`: personal, social, accessibility and privacy settings
- `communication_preference`: purpose, channel, state, source and consent receipt
- `workspace_availability_policy`: visibility, acceptance, fulfilment modes and capacity
- `workspace_schedule`: weekly windows, time zone and cutoff
- `workspace_schedule_exception`: holiday, leave or exceptional date
- `workspace_availability_override`: state, reason, creator and expiry
- `preference_receipt`: before, after, actor, source, purpose and time
- `capability_setting_schema`: which controls apply to each verified profile type

## Events and Admin

Every change emits `preference_changed` or `availability_changed` through the governed activity contract. Payloads contain setting IDs and state transitions, not private content.

Admin may:

- configure allowed setting schemas and safe defaults
- see aggregate delivery, opt-out and availability health
- pause a capability for safety or compliance with reason and expiry
- support an owner through a purpose-logged workflow

Admin may not silently enable promotions, reopen a closed business, impersonate a workspace owner or change accepted commercial obligations.

## Production Acceptance

- every verified MVP workspace resolves the correct capability template
- unsupported controls never appear
- visibility and acceptance are independently tested
- schedules evaluate correctly across time zones, split shifts and exceptions
- temporary overrides always expire
- turning acceptance off blocks only new demand
- accepted obligations remain visible and actionable
- communication withdrawal suppresses future optional sends immediately
- required and optional communication are visually distinct
- all changes are versioned, audited and reversible where lawful
- consumer cards show truthful open, closed, cutoff, next-open and fulfilment states
