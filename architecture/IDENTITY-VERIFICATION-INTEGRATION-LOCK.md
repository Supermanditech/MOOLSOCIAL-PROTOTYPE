# MoolSocial Identity Verification Integration Lock

Status: LOCKED MVP INTEGRATION DIRECTION

Last updated: 10 July 2026 IST

## 1. Timing

Identity verification starts only after the user selects an exact work profile. It must never block ordinary consumer or social access.

## 2. User Options

### Option 1 - DigiLocker

Preferred first option for most users.

```text
User taps DigiLocker
MoolSocial redirects through DigiLocker OAuth with state/PKCE
User consents to requested documents
Backend retrieves only authorized issued documents
Issuer, document URI and signature are verified
MoolSocial stores the verification result and minimum required references
Access token is revoked or expired according to partner terms
```

DigiLocker Requester onboarding, approval, agreements, testing and audit are required before production use. Official resources:

- https://api.apisetu.gov.in/
- https://www.digilocker.gov.in/web/resources
- https://www.digilocker.gov.in/web/implementation-model

### Option 2 - UIDAI Aadhaar Offline QR Or XML

Lowest-variable-cost fallback for identity verification.

```text
User voluntarily shares Secure QR or Paperless Offline e-KYC XML
MoolSocial validates the UIDAI digital signature using the current public certificate
Share phrase is used only to read user-provided XML
Name, DOB, address and photo are used only for the consented verification purpose
Full Aadhaar number is not collected or stored
```

Official UIDAI resources:

- https://uidai.gov.in/en/ecosystem/authentication-devices-documents/about-aadhaar-paperless-offline-e-kyc.html
- https://www.uidai.gov.in/en/914-developer-section.html
- https://uidai.gov.in/images/The_Aadhaar_Authentication_and_Offline_Verifications_Regulations_2021-_Clean_copy-30122025.pdf

### Option 3 - Selfie And Liveness

Use only when the profile, fraud signal or proof policy requires a live-person check.

```text
Capture a consented live selfie through a hosted/mobile SDK
Run passive or guided liveness
Compare with the consented identity-document photo
Store match/liveness result and provider reference, not reusable biometric templates
Provide manual review and retry for false rejection
```

The provider must sit behind `IdentityProviderAdapter`. Initial vendors to compare include HyperVerge and IDfy. Pricing is quote-based and must be evaluated through a controlled pilot. Do not hard-code a vendor into Screen 71.

Direct UIDAI Face Authentication is not the initial MVP route because it belongs to the AUA/KUA authentication ecosystem and requires the applicable UIDAI onboarding and controls.

## 3. Adapter Contract

```text
startVerification(profileId, method, consentId, returnUrl)
getVerificationStatus(providerReference)
getNormalizedIdentityResult(providerReference)
revokeOrCloseSession(providerReference)
```

Normalized result:

```text
verification_id
method
status
name_match
date_of_birth_match
address_available
photo_match_status
liveness_status
issuer_or_provider
source_reference
consent_id
verified_at
expires_or_recheck_at
```

## 4. Privacy And Security Rules

- Obtain explicit purpose-specific consent before redirect, upload or selfie capture.
- Do not expose Aadhaar number in URLs, logs, analytics or support tools.
- Do not store core biometrics or reusable facial templates.
- Encrypt verification records and strictly limit staff access.
- Apply documented retention and deletion rules.
- Keep a non-Aadhaar alternative for users who do not choose voluntary Aadhaar offline verification.
- Manual review must exist for accessibility, mismatch and provider failure.
