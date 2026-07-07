# Screen 01 - App Splash / First Open Handoff Draft

Date: 2026-06-26

## File Created

- `C:\GUARANTEED OUTCOME\supermandi-uiux-screenbook\screens\01-app-splash-first-open.html`

## Files Updated

- `C:\GUARANTEED OUTCOME\supermandi-uiux-screenbook\index.html`
- `C:\GUARANTEED OUTCOME\supermandi-uiux-screenbook\shared\screen-data.js`

## Purpose

Screen 01 starts after the user taps Open from the Play Store, taps the app icon, or opens a valid app link. It confirms MoolSocial brand trust, performs silent boot checks, and routes the user into the right first-open path.

## Visual Direction

- Navy full-screen mobile splash.
- White `MoolSocial` wordmark.
- Approved saffron-white-green identity line.
- Tagline pill: `India Ka Socio Commerce App`.
- Boot copy:
  - `Opening your MoolSocial space`
  - `Checking app version, network and secure session`

## Flow

1. Brand Confirm.
2. Silent Boot.
3. Route.

## Routing States

- Fresh Install -> Screen 02 First Setup.
- Returning Signed Out -> mobile login after setup checks.
- Returning Signed In -> Universal Super-App Screen or pending priority action.
- Deep Link -> preserve intent, complete auth/setup if needed, then continue only if safe.

## Guardrails

- No role switch.
- No permission prompt.
- No earning claim, marketplace claim, discount claim or unavailable service claim.
- No old `SM` or `SuperMandi` app identity.

## Verification

- Browser URL tested: `http://127.0.0.1:8787/screens/01-app-splash-first-open.html`
- Page title: `01 App Splash / First Open Handoff - MoolSocial Screenbook`
- Status: `Draft for review`
- Wordmark: `MoolSocial`
- Tagline: `India Ka Socio Commerce App`
- Flow steps present: Brand Confirm, Silent Boot, Route
- Routing states present: Fresh Install, Returning Signed Out, Returning Signed In, Deep Link
- Contains no `SM` token.
- Contains no `SuperMandi`.
- Shared MoolSocial UI foundation CSS loads.
- Current browser horizontal overflow: none.
- Mobile viewport `390 x 844` horizontal overflow: none.
- Splash wordmark fits phone frame on mobile.
- Splash tagline fits phone frame on mobile.
- Console error logs: none.
