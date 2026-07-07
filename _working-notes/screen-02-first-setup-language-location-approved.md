# Screen 02 Approved - First Setup / Language + Location

Date: 2026-06-26

User direction:
- Prefer phone language auto-selection instead of asking the user to choose language.
- Show location logic in the UI, but keep it automated wherever possible.
- Handle travel install versus returning home town later.
- Use one tap only where consent is needed.

Product verdict:
- Do not show a language picker during first setup.
- If phone language is unsupported, fall back to English India and let setup continue.
- Build language-pack architecture for major Indian territory languages, including all 22 scheduled Indian languages over time.
- Launch only with professionally checked languages; avoid broken automatic UI translation for critical app controls.
- Do not treat first detected location as permanent home.
- Do not use always-on live tracking for general app browsing.
- Use foreground/app-open refresh plus task-based precise location.
- Ask background location only for active ride, delivery, field work or safety-critical tasks with separate consent.

Draft source files:
- screens/02-first-setup-language-location.html
- shared/screen-data.js
- index.html

Full-stack contract added:
- Frontend modules and client state machine.
- API flow for bootstrap, language resolve, location resolve, denied/skip outcome and setup complete.
- Example request/response payloads.
- Backend ownership, data model, integrations, privacy/security/observability and production tests.

Final production UI preview added:
- Revised to one real user-facing setup view for language/area only.
- Location copy is neutral for any user type: social visitor, creator, consumer, worker, business owner or captain.
- If skipped or phone permission is not available, current area remains unset and MoolSocial asks again after signup before location-based results or actions.
- After location outcome, user goes to Screen 03 Login / Account Handoff. Provider icons, OTP, session creation and autofill logic belong only to Screen 03.
- Reassessed after review: user-facing location choices are Use current location, Set manually and Skip now.
- Set manually supports search, pin code, address text and map picker, and can create a user-selected home/default area.
- GPS current location must never become permanent home automatically, especially if the user installs while travelling.
- Revised UI to make the icon cards themselves tappable actions, removing repeated bottom text buttons.
- Login icon work moved out of Screen 02 and into Screen 03, where sign-in actually happens.
- Removed repeated visible language confirmation from the phone mock. Language detection remains automatic background behavior and is documented in the architecture notes.
- Fixed hidden location/action icons caused by white icon strokes on white tiles.
- Removed the repeated login handoff phone from Screen 02 after flow review, so social/provider login appears only in Screen 03.
- Replaced location icon tiles with direct colored icons and removed the white square background.
- Clarified Screen 02 boundary: it only routes to one-method login; it does not show login choices itself.
- Removed explanatory role/layer copy from the production phone screen. Such logic stays in notes/contracts, not visible onboarding UI.
- Upgraded location icons to more polished colored SVGs with gradients/highlights instead of flat cartoon color blocks.
- Brand text size normalized with Screens 01 and 03: MoolSocial uses 25px, tagline uses 12px, and the tricolor line uses the same 126px by 4px proportion across the approved first-open flow.

Approval:
- Approved by user on 2026-06-27.

Status:
- Approved.
