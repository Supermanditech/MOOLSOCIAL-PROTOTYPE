# Screen 03 Approved - Login / Account Handoff

Date: 2026-06-27

User direction:
- Continue after approved Screen 01 and Screen 02.
- Login must be one-method only: social account, email OTP or mobile OTP.
- A successful single method should route user to Screen 04, but Screen 04 UI must not be decided inside Screen 03.
- Production phone copy should stay lean; architecture detail belongs in notes/contracts.
- Screen 02 must not duplicate social login choices; Screen 03 owns all login methods.
- Phone OTP should autofill into fields when OS support is available.
- Do not show a separate "Next / Loading your app / Moving ahead" screen after success; route automatically.
- Document what happens after tapping Google, Apple, X, Instagram and Facebook.

Product verdict:
- Screen 03 creates or resumes an individual MoolSocial user session.
- Every user remains an individual consumer first after login.
- No visible role switch, business onboarding, work role selection or creator setup appears here.
- Social login does not require routine second OTP.
- Email OTP and mobile OTP are independent login paths.
- Screen 02 language, area and anonymous setup state merge into the verified session.
- Mobile OTP autofill must use Android SMS Retriever/User Consent and iOS one-time-code autofill patterns where available.
- Never silently read the SMS inbox or depend on broad SMS permission for ordinary login.
- Screen 04 is only a next route from this screen; its user-facing layout will be designed separately.
- Provider approval screens are owned by Google, Apple, X, Facebook or Instagram/Meta. They may appear as native sheets, account chooser, secure custom tab or provider browser page after tap.
- MoolSocial owns provider availability, start/callback, cancel/error return, backend verification and immediate route to Screen 04 after success.

Approved source files:
- screens/03-login-account-handoff.html
- shared/screen-data.js
- index.html

Full-stack contract added:
- OAuth start/callback.
- Provider route handling for native provider surfaces, OAuth browser/custom tab, user consent, cancel, denial and token validation.
- Email/mobile OTP request and verify.
- Phone OTP autofill source tracking: manual, OS SMS, or OS keyboard suggestion.
- Session minting and anonymous setup merge.
- User identity and identity-method data models.
- Security controls, rate limits, session safety and regression checklist.

Status:
- Approved by user on 2026-06-27.
