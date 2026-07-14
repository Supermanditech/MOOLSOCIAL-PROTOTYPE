# Prototype Correction Tickets

Status: active mobile-review correction batch  
Source: real-user review of the public mobile flow runner  
Rule: a primary user action passes only when it opens the correct product state or performs the correct in-context action. A generic acknowledgement, placeholder card or unrelated route is not a pass.

## PRT-001 - Universal Short Preview Opens Full Viewer

- Screen: 04 Universal Focus Shell
- Problem: the visible Short preview looks tappable but does not open the full-screen Shorts product.
- Required result: tapping the preview or the active Shorts sub-action opens Screen 05 at the selected short.
- Priority: P0
- Status: completed

## PRT-002 - Content Comment Is Not Global Chat

- Screens: 04 and 05
- Problem: the Short action rail calls the content discussion `Chat` and Screen 04 routes it to the global inbox.
- Required result: label it `Comments`; open the selected Short with its comments visible. The pinned bottom Chat remains the only global inbox entry.
- Priority: P0
- Status: completed

## PRT-003 - Shorts Comments Need Real Discussion UI

- Screen: 05 Social Shorts
- Problem: comments open a feature-description grid instead of a readable comment thread.
- Required result: show comment count, sorting, real comment rows, creator reply state, like/reply actions and a reply composer without leaving the Short.
- Priority: P0
- Status: completed

## PRT-004 - Buy Must Open the Real Commerce Product

- Screens: 04 and 09
- Problem: tapping Buy opens an intermediate sparse world inside Screen 04 instead of the decision-ready Buy experience.
- Required result: one tap on Buy opens Screen 09 with categories, products, price, fulfilment, offers and cart visible immediately.
- Priority: P0
- Status: completed

## PRT-005 - Universal Main Actions Are One-Tap Product Entries

- Screen: 04
- Problem: Eat, Ride, Book, Pay and Work can stop at explanatory preview states.
- Required result: each root action opens its real MVP product entry in one tap: Buy 09, Eat 26, Ride 30, Book 36, Pay 57, Work 67 and Chat 23.
- Priority: P0
- Status: completed

## PRT-006 - Social Sub-Actions Open Their Full Products

- Screens: 04-08
- Problem: Shorts, Videos, Feed and Create can behave as preview tabs instead of actual product entry points.
- Required result: route directly to Screens 05, 06, 07 and 08. Preserve selected content and requested comment/reply state through query parameters.
- Priority: P0
- Status: completed

## PRT-007 - Buy Deep Links and Cart Must Be Progressive

- Screens: 09 and 12
- Problem: Screen 09 ignores some `view=` entry parameters and the visible cart opens an explanatory sheet.
- Required result: apply Grocery/Categories/Medicine/Basket entry context and route a populated cart to Screen 12 checkout.
- Priority: P0
- Status: completed

## PRT-008 - Remove Unsupported Primary Sub-Actions

- Screen: 04
- Problem: a generic Book > Services action remains visible even though that service catalogue was removed from MVP.
- Required result: show only Get It Done, Doctor and Salon until a governed service product exists.
- Priority: P1
- Status: completed

## PRT-009 - Semantic Route Audit for Every Primary Entry

- Scope: consumer main actions, domain sub-actions, content cards, comments/replies, cart/checkout and cross-workspace entry controls.
- Problem: the earlier strict audit proved observable response but did not always prove that the response matched user intent.
- Required result: maintain a machine-readable semantic route contract and validate destination, state and retained parameters.
- Priority: P0
- Status: completed

## PRT-010 - Operational Flows Must Begin at the Universal Screen

- Scope: Social, Chat, Eat, Ride, Book, Pay, Buy and Work flows.
- Problem: several flow-runner journeys begin on a domain screen and therefore do not test the user’s real first tap from Screen 04.
- Required result: each consumer flow begins at Screen 04 and verifies the correct one-tap domain entry.
- Priority: P0
- Status: completed

## PRT-011 - Approved Bundle and Regression Evidence Stay in Sync

- Scope: source screens, `approved-final`, public flow runner and quality evidence.
- Required result: source/approved parity, zero missing routes, mobile responsive fit, no console errors and semantic journey checks all pass before republishing.
- Priority: P0
- Status: completed

## PRT-012 - Creator Commerce Uses Protected Checkout

- Scope: creator-attributed Buy journey across Screens 09, 12, 13 and 14.
- Problem: the commerce-share flow jumped from Buy directly to payment confirmation, bypassing basket review and retailer stock confirmation.
- Required result: route attributed commerce through Basket, retailer stock confirmation and customer payment before delivery outcome and creator settlement.
- Priority: P0
- Status: completed

## PRT-013 - High-Intent Controls Must Reach a Declared Outcome

- Scope: all 166 screens and every visible install, create, post, buy, book, pay, apply, confirm, save, submit, refund, schedule and related control.
- Problem: a mechanically responsive control could pass the old audit even when it only displayed generic fallback feedback.
- Required result: every high-intent control declares and demonstrates a route, meaningful native state, governed handoff or terminal result.
- Priority: P0
- Status: completed

## PRT-014 - Social Create Steps Are Progressive

- Screens: 04 and 08.
- Problem: `Record`, `Caption` and `Post` looked actionable but did not enter or complete the corresponding creation step.
- Required result: each step opens Screen 08 in the requested Short mode; recording, captioning, draft, schedule and publish actions produce visible, specific outcomes and publishing links to the created Short.
- Priority: P0
- Status: completed

## PRT-015 - Choose Retail or Wholesale Once

- Screen: 09.
- Problem: every product repeated Retail, Pack and Wholesale ladders, making the purchase decision dense and repetitive.
- Required result: a single persistent `Retail Buy | Wholesale Buy` switch changes every product card. Pack size stays inside product details; wholesale mode shows unit rate, MOQ, delivery and payment terms.
- Priority: P0
- Status: completed

## PRT-016 - Replace Generic Fallbacks and Dead Cards

- Scope: 63 curated outcomes across commerce, food, ride, booking, Get It Done, Pay, Work, retailer, manufacturer, creator, provider and admin screens.
- Problem: 56 high-intent controls opened generic sheets, seven controls were dead, and three live-countdown cards had unstable accessible labels.
- Required result: all curated controls produce screen-specific routes or states; live labels remain native and are verified by the clean browser replay.
- Priority: P0
- Status: completed

## Verification Evidence

- Semantic mobile flows: `quality/generated/semantic-mobile-user-flow-final.json`
- Result: 47/47 operational flows passed at 390 x 844 with zero browser console errors.
- Static graph: 166 source and approved screens, 484 flow nodes, 1,057 local navigation targets and 474 assets passed.
- Source/approved parity and full interaction gates passed. Public GitHub Pages verification is the final publication check before the mobile URL is shared.
- Intent completion: 483/483 high-intent controls declared, 63/63 curated outcomes replayed, zero generic fallbacks and zero dead controls.
