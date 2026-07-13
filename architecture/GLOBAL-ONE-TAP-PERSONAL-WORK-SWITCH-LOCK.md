# MoolSocial Global One-Tap Personal And Work Switch Lock

Status: LOCKED INPUT FOR ALL PERSONAL AND WORKSPACE SCREENS

Last updated: 11 July 2026 IST

## 1. Objective

Every person remains a consumer and social user while operating zero or more workspaces. Switching must preserve focused use and must not require a visible role strip.

```text
One focused surface at a time
Personal/social and work remain live
One tap reaches the last opposite context
One tap on an urgent event reaches the exact action
```

## 2. Mool Toggle

The fixed Mool button has one consistent production behavior after at least one workspace exists:

```text
From personal/social/consumer context:
Tap Mool -> last active workspace and last workspace position

From workspace context:
Tap Mool -> last personal focus and last personal position

Long-press or swipe up on Mool:
Open the full Mool launcher for Social, Buy, Eat, Ride, Book, Pay, Work, Chat and deliberate workspace selection
```

For a user with no workspace, Mool continues to open the universal launcher.

The first use may show one short contextual coach mark. Persistent instructional text is prohibited.

## 3. Focus-State Preservation

Switching does not restart either side.

Personal focus state may preserve:

```text
current Social surface
feed/short/video item and scroll position
video playback timestamp
search or basket draft
unsent Chat draft
```

Workspace focus state may preserve:

```text
active workspace ID
current order, booking, trip, task or setup step
filters and scroll position
unsaved form draft
open customer or supplier Chat
```

Media pauses when the user enters work and resumes only when the user deliberately returns. Two distracting audio/interaction surfaces never remain active together.

## 4. Work Pulse

Workspaces remain connected in the background through server events, WebSocket/stream updates where appropriate and push notifications when the app is backgrounded.

While the user is consuming Social or another personal surface, a compact `Work Pulse` appears only for actionable events:

```text
new order awaiting acceptance
ride/delivery request
appointment or booking action
stock or fulfilment exception
payment or settlement failure
urgent customer/supplier message
proof/correction deadline
```

Work Pulse rules:

```text
does not auto-switch the screen
does not cover content controls
auto-collapses to a count/status indicator
uses silent visual update by default
respects workspace availability and do-not-disturb rules
tap opens the exact action, not a generic dashboard
dismiss does not reject or complete the work
critical SLA events may also use configured sound/haptic/push
```

Automatic screen switching is prohibited because it interrupts Social, video, payment or another focused action and could cause accidental acceptance.

## 5. Chat And Messages

Chat remains one-tap accessible across personal and workspace contexts. The global badge aggregates unread counts, while the inbox separates:

```text
People
Business
Orders
Workspace
Support
```

An urgent order/customer message may also create Work Pulse. Opening it routes to the exact linked thread and order context.

## 6. Multiple Workspaces

Mool tap opens the last active workspace. It never guesses a different role.

Long-press/swipe-up opens the deliberate workspace selector when more than one workspace exists. Each item shows only:

```text
workspace name and type
live/paused state
urgent count
last activity
```

Selecting another workspace preserves the previous workspace state and applies separate permissions and data boundaries.

## 7. Online And Availability State

Being logged in is not the same as accepting work.

Each workspace controls its own availability:

```text
shop/restaurant order acceptance
captain/delivery go-online state
doctor/salon appointment availability
freelancer/task availability
creator campaign availability
```

The user may enjoy Social while a workspace is live. Work Pulse and background events continue according to that workspace's settings.

## 8. Backend Contracts

```text
PersonalFocusState
WorkspaceFocusState
ActiveWorkspacePointer
WorkspaceAvailability
WorkspaceEventInbox
WorkPulsePriority
UnreadAggregation
NavigationDeepLink
DraftState
```

Every actionable event contains a workspace ID, object ID, event type, priority, expiry/SLA and authorized deep link.

## 9. Regression Locks

Never:

```text
show a permanent Personal | Retailer | Creator | Captain role strip
auto-switch away from a video, payment or personal action
require Home -> My Work -> Workspace for a routine return
lose video, scroll, draft or workspace position during switching
play personal media audio behind an active workspace
merge unread counts without preserving source context
open a generic dashboard when an exact urgent action is known
let one workspace receive another workspace's private events
equate logged in with available for orders, rides or tasks
```
