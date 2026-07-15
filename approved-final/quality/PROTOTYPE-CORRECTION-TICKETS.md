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
- Problem: the commerce-share flow jumped from Buy directly to payment confirmation and bypassed basket review.
- Required result: route attributed commerce through Basket and customer payment before delivery outcome and creator settlement. Availability must be reserved automatically; the customer must never wait for a retailer stock-confirmation step.
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

## PRT-015 - Choose Home Buying or Business Bulk Once

- Screen: 09.
- Problem: every product repeated Retail, Family Pack and Wholesale ladders, making the purchase decision dense and unclear for household customers.
- Required result: a single persistent `Home & Personal | Business Bulk` switch changes the catalogue. Home & Personal offers Single Quantity and a complete-price Home Value Pack; Business Bulk shows only eligible direct seller listings with case rate, minimum-order total, MOQ, GST, delivery and payment terms.
- Priority: P0
- Status: completed

## PRT-016 - Replace Generic Fallbacks and Dead Cards

- Scope: 63 curated outcomes across commerce, food, ride, booking, Get It Done, Pay, Work, retailer, manufacturer, creator, provider and admin screens.
- Problem: 56 high-intent controls opened generic sheets, seven controls were dead, and three live-countdown cards had unstable accessible labels.
- Required result: all curated controls produce screen-specific routes or states; live labels remain native and are verified by the clean browser replay.
- Priority: P0
- Status: completed

## PRT-017 - Real Tap Runner Cannot Force Ordinary Navigation

- Scope: all 47 operational journeys.
- Problem: the earlier flow runner could force the declared destination after a tap even when the clicked control did not navigate, creating false passes.
- Required result: ordinary `tap`, `direct` and `multi` actions pass only when the clicked control opens the declared screen. Only explicit automatic or governed handoff transitions may simulate an external event.
- Priority: P0
- Status: completed

## PRT-018 - Customer Checkout Is Immediate and Trustworthy

- Screens: 10-18.
- Problem: customer checkout exposed an internal retailer stock-confirmation dependency after basket review and before payment.
- Required result: show automatic availability, default home sessions to delivery, expose at-shop collection only after an explicit QR/location shop context, review the basket, pay and immediately open the correct delivery or collection status. Screen 13 remains a retailer-only paid-order preparation state.
- Priority: P0
- Status: completed

## PRT-019 - Operational State Changes Continue to the Next User Task

- Screens: 19, 63, 74-89, 92-94, 107-112, 118-119 and 136-137.
- Problem: several controls changed text or opened a sheet but did not expose the next required action or destination.
- Required result: complete issue evidence submission, retailer acceptance/packing/handover, wholesale PO/receipt/books/payment, business reports, service activation, manufacturer confirmation, captain OTP start and work-verification flows through their final user-facing outcome.
- Priority: P0
- Status: completed

## PRT-020 - Mobile Taps, Search and Copy Are Production-Facing

- Scope: all 166 screens, with focused fixes on Screens 40, 49, 59-61 and 81.
- Problem: fixed bottom navigation could cover important CTAs; wholesale search did not filter results; some runtime feedback exposed prototype or implementation wording.
- Required result: scroll every target clear of fixed navigation, support real typed product search before add-to-cart, and show only professional, action-oriented user copy in the phone surface.
- Priority: P0
- Status: completed

## PRT-021 - Every Revealed Control Completes Its Tap Intent

- Scope: all numbered Screens 00-165, including controls revealed inside sheets, dialogs, content detail, comments, filters, statements, support and verification states.
- Problem: initial-screen inventories and 47 representative journeys did not prove every second- or third-level tap; some nested controls were visible but inert.
- Required result: physically replay every button path from a clean 390 x 844 session to depth three. A route, meaningful visible state/input/result, or clearly marked already-current selection passes; scroll/focus-only changes and generic acknowledgements fail.
- Evidence: the superseding depth-eight release replay passes 5,670/5,670 paths, including 3,040 nested paths and 4,062 distinct states, with zero truncation and zero console errors.
- Priority: P0
- Status: completed

## PRT-022 - Social Content Engagement Is Deeply Functional

- Screens: 05 Shorts, 06 Videos and 07 Feed, entered from Screen 04 Social.
- Problem: visible content and promotional cards could open the surface but stop before the user completed Follow, Like, Comments, Share, Remix, Save, More or the sponsored business CTA.
- Required result: selected content opens; every engagement action produces its real visible state or governed handoff; comments expose discussion/reply controls; sponsored “Grow your shop” content opens its decision state; Feed comments already open are explicitly marked current.
- Priority: P0
- Status: completed

## PRT-023 - Business Sheets and Work Cards Remain Actionable

- Screens: 67, 92, 108, 110, 118, 122, 128, 130, 131, 135 and 137.
- Problem: lower Work opportunities could be snapped out of reach during the first 600 ms, and several dynamically revealed report, exception, OTP, verification, share, statement and support controls had no completed user result.
- Required result: never override user scroll after initial layout; give every dynamic sheet action a specific state or route; retain OTP validation; expose real custom-period start/end inputs and Apply action.
- Priority: P0
- Status: completed

## PRT-024 - Recursive Micro-Intent Audit Covers the Whole App

- Scope: all 166 numbered HTML screens plus every discoverable local state, sheet, dialog, input, choice, confirmation and terminal action.
- Problem: the earlier depth-three button-only audit did not exercise links, form controls, same-form submit actions, fragment-only no-ops or deeper branches.
- Required result: replay all phone-facing buttons, links, inputs, selects and textareas through a cycle-safe depth-eight graph. Ignore fragment-only URL changes; require a meaningful state, route, selected/current result or immediate completed action.
- Audit rule: discover direct JavaScript card/row tap surfaces as well as semantic controls, and deduplicate identical states reached again after Close, Cancel or Back so path limits are spent on unique branches.
- Evidence: 5,670/5,670 clean-state paths pass across all 166 screens, including 3,040 actions revealed after an earlier tap and 4,062 distinct screen-local states/outcomes; zero failed paths, truncation or console errors.
- Priority: P0
- Status: completed

## PRT-025 - Long-Form Video Opens the Selected Content and Its Actions

- Screen: 06 Social Videos.
- Problem: multiple feed and recommended-video taps opened one hard-coded basket video, recommended cards were passive, and each feed card's More intent had no independent outcome.
- Required result: every feed or recommendation tap selects and renders its own title, duration, creator, proof and context; recommended videos are semantic controls; More opens video-specific Watch, Save, Share, Hide and Report actions.
- Priority: P0
- Status: completed

## PRT-026 - People Chat Completes Header, Composer and Nested Utility Intents

- Screen: 25 Chat / People Thread.
- Problem: Call, Video, More, Edit list, Add option, quick replies and Send used fragment-only links with no completed outcome.
- Required result: support Call -> Start -> in-call controls -> End; Video -> Start -> camera/mic controls -> End; More -> members/search/media/notifications/leave; editable basket and poll forms; attachment choices; voice note record/send; typed message send.
- Priority: P0
- Status: completed

## PRT-027 - Buy Modes and Fulfilment Are Decisive

- Screens: 09-12 and 14 consumer Buy; 74 retailer listing; 109 manufacturer listing.
- Problem: Retail, Family Pack and Wholesale appeared as competing columns; pooled-demand/campaign language appeared inside consumer product decisions; Counter Pickup appeared during home ordering; seller listing screens did not clearly govern Business Bulk visibility.
- Required result: separate Home & Personal (Single Quantity and fixed Home Value Pack) from Business Bulk (direct seller case/MOQ listing). Show one selected rate at a time and display the complete fixed-pack or minimum-order total, not an ambiguous per-unit price beside a larger pack. Carry the selected product, rate, pack/MOQ, quantity and exact total into Basket and Payment. Require eligible seller type, case/pack, MOQ, direct price, GST, quantity, delivery and payment terms. Keep campaigns and demand aggregation out of the consumer grid. Default home sessions to delivery and expose at-shop collection only with explicit at-shop context.
- Priority: P0
- Status: completed

## PRT-028 - User Scroll Is Never Repositioned After Interaction Begins

- Screens: 29-68, covering Tiffin, Ride, Book, Doctor, Salon, Get It Done, Pay and Work journeys.
- Problem: delayed load and `pageshow` scroll resets could move lower actions out from under a real user's tap during the first 80-600 ms, even though the control itself was correctly implemented.
- Required result: set the initial phone position once on load, then preserve every user scroll position while cards, sheets, forms and follow-up actions are used. Back/Close actions may restore their owning state but must not unexpectedly jump the user to the top.
- Priority: P0
- Status: completed

## PRT-029 - Dynamic Export, Sharing and Terms Actions Show Exact Outcomes

- Screens: 70 workspace contact verification, 90 Sales Book, 95 service activation and 104 store readiness.
- Problem: numeric verification fields could be exercised with invalid characters; PDF/GST/accountant/WhatsApp/QR choices, the service-terms link and the readiness reminder could appear actionable without a persistent result.
- Required result: accept realistic numeric mobile/OTP input; prepare the selected export or receipt; open a governed sharing handoff; and visibly identify the exact terms or licence reminder that needs review.
- Priority: P0
- Status: completed

## Verification Evidence

- Semantic mobile flows: `quality/generated/semantic-mobile-user-flow-final.json`
- Result: 47/47 operational flows passed at 390 x 844 with zero browser console errors.
- Static graph: 166 source and approved screens, 483 flow nodes, 1,104 local navigation targets and 475 assets passed.
- Source/approved parity and full interaction gates passed. Public GitHub Pages verification is the final publication check before the mobile URL is shared.
- Intent completion: 475/475 current high-intent controls declared, zero generic fallbacks, uncontracted actions or dead controls.
- Production-facing screen audit: 3,210 controls and 490 high-intent controls checked; zero P0/P1 findings, generic outcomes, internal wording or customer-facing retailer stock-confirmation language.
- Independent rendered audit: 3,210/3,210 controls passed; visual action-semantics findings: 0.
- Nested intent audit: 5,670/5,670 tap paths passed, including 3,040 revealed actions and 4,062 distinct states/outcomes; zero truncation and console errors.
