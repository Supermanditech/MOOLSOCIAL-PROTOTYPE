# Screen 01 Approval - App Splash / First Open Handoff

Date: 2026-06-26

User approval: Approved Screen 01.

Locked approval scope:
- Screen 01 is the first open handoff after install.
- Public app identity remains MoolSocial, not SuperMandi.
- No SM icon, monogram, or role-switch UI is used.
- The screen shows a calm branded splash, silent boot checks, and route handoff.
- It does not ask for permissions, login, role selection, or business setup.
- Error cases remain limited to no internet, update required, maintenance, and invalid link.

Source files updated:
- screens/01-app-splash-first-open.html
- shared/screen-data.js

Follow-up production preview added:
- Normal open splash state.
- Silent handoff state with automatic boot checks.
- Recovery state for connection pause with Retry and Help.
- Core approved rules remain unchanged: no role switch, no permission prompt and no SuperMandi app identity.
- Brand text size normalized with Screens 02 and 03: MoolSocial uses 25px, tagline uses 12px, and the tricolor line uses the same 126px by 4px proportion across the approved first-open flow.

Next screen candidate:
- Screen 02: First Setup, likely language plus location explanation and carefully timed permissions.
