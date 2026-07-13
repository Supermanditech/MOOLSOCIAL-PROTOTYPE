# Production Design System Freeze

Date: 2026-07-14
Status: frozen for production planning
Tokens: `shared/production-design-tokens.json`
Registry: `shared/production-component-registry.json`

## Decision

The 166 approved HTML screens are product and interaction references. They are not 166 separately coded production pages. Production is assembled from shared shells, route states and reusable domain-neutral components.

## Brand lock

The approved identity remains MoolSocial with navy `#000080`, saffron `#FF9933`, white `#FFFFFF` and green `#138808`. Brand colours identify the product; semantic success, warning, danger and information states use accessible semantic tokens and never rely on colour alone.

The wordmark is `MoolSocial`. `SM`, `MS` and a standalone `M` are not approved identity marks. Mool is the visible universal root control; internal terms such as root, role switcher or universal screen do not appear to users.

## Production shells

- `AppShell` owns personal consumer navigation and focused content.
- `WorkspaceShell` adds verified operating capability while retaining one-tap personal access.
- `MoolRoot` and `ChatShortcut` are stable shell controls.
- `ActionDock` and `FocusRail` adapt to route context without duplicating actions.
- `SearchAskScanVoice` is a single shared multimodal entry component.

## Decision components

`DecisionCard`, `ProductDecisionRow`, `DenseCatalogue` and `OpportunityRow` reveal enough information to make the next decision without a marketplace wall of listings. The user sees price or earning, fulfilment or deadline, trust or proof, terms, availability and the next action before commitment.

`MoneySummary`, `StatusTimeline` and `Receipt` represent authoritative records. UI code may render pending or estimated values, but cannot promote them to final.

## Shared operating components

Chat, media, evidence, availability, consent, agent approval and responsive business records use one shared implementation each. Profile configuration changes labels, fields, proof and workflow; it does not fork the component library for every workspace type.

## State completeness

Every applicable component supports loading, ready, empty, partial, submitting, success, offline, timeout, error, permission-denied, restricted, stale and duplicate-request behavior. Skeletons preserve layout. Errors preserve user input. Offline writes are queued only when safe.

## Responsive and accessibility lock

- Minimum supported width is 320 px; 390 x 844 is the mobile reference.
- Page-level horizontal overflow is prohibited.
- Tap targets are at least 44 px.
- Action labels remain readable and do not depend on viewport-scaled text.
- Safe-area and software-keyboard insets are respected.
- Focus order follows reading and action order.
- Selected, expanded, busy, invalid and live states are announced.
- Motion respects reduced-motion preference.

## Change rule

A production change to a shared component runs every route-family visual and interaction regression that consumes it. A prototype-specific exception requires a documented product reason and cannot create a second component with the same responsibility.
