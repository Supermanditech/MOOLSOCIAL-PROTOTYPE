# Screen 04 Draft - Universal Focus Shell

Date: 2026-06-27

User direction:
- Screen 04 should not be a static dashboard of action words.
- The app should behave like one focused product at a time, similar to watching video inside YouTube without unrelated distractions.
- User must still have one-tap access to switch into Social, products/services, earning, wallet or chat.
- First impression should engage users even before they buy, book, pay or earn.
- Users remain individual consumers first; business/professional/creator/captain roles unlock later as verified workspaces.

Product verdict:
- Use HTML for approval because Screen 04 needs dynamic focus switching inside the phone preview.
- Navigation system: Mool button + bottom contextual dock + right-side content action rail + top Search / Ask / Scan / Voice bar.
- Secondary overflow launcher can come later for deeper actions, but it should not clutter the first approval screen.
- Chat is accessed through Mool and contextual actions, not as a floating overlay over content.
- Default mode after login is Social. There is no Home button because the user should start consuming immediately.
- Mool morphs the dock into Social, Get, Earn, Wallet and Chat without covering video/content.
- Bottom dock is contextual to the current world. In Social it shows Clips, Video and Feed, not Get, Earn and Wallet.
- Right-side rail is reserved for current content actions such as like, comment, share, remix, save, proof or apply.
- No full app switch sheet on Screen 04. The dock itself morphs when Mool is tapped.
- Mode screens should not repeat large static titles such as Needs, Earn or Money. Each mode opens directly into its usable surface and its own tabs.
- No visible role switch tabs such as Personal, Retailer, Taxi, Creator, Doctor or Manufacturer.
- No marketplace grid, yellow pages, endless products or dead service buttons.
- Get cards must be decision-ready: price, time, trust/proof, payment/refund and next action.
- Earn board must show only funded or value-backed opportunities with proof and payout conditions.

Draft source files:
- screens/04-universal-focus-shell.html
- shared/screen-data.js
- index.html

Full-stack contract added:
- Screen 04 bootstrap API.
- Social feed bootstrap.
- Get decision-card serviceability API.
- Earn opportunity board API.
- Wallet summary API.
- Focus-mode state machine and regression gates.

Status:
- Draft for review.
