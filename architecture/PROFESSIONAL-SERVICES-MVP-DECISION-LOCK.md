# MoolSocial Professional Services MVP Decision Lock

Date: 13 July 2026

## Architecture Decision

Professional services reuse the approved configurable provider routes 139-146. They do not receive another workspace shell or consume another production route. Every professional profile remains exact, verified and controlled by its own configuration, proof, permissions, engagement workflow and professional-body rules.

MoolSocial must never create a broad "professional" profile and must never infer a protected professional designation from free text.

## MVP Profiles

### Accountant / Bookkeeper - MVP Core

May provide configured bookkeeping, accounts preparation, invoice records, reconciliation and other legally permitted support. The profile must not use the designation Chartered Accountant and must not expose statutory audit, attestation or another reserved professional service unless an appropriately qualified and verified professional owns the engagement.

### Chartered Accountant / CA Firm - MVP Conditional

Activate only after ICAI membership, Certificate of Practice where required, firm details, contact, engagement acceptance, conflict and independence checks, service permission and payout identity are verified. Presentation, fee display, communication, campaigns and public visibility must comply with the Code of Ethics and current ICAI advertisement and website guidelines.

The initial service set may include configured GST, income-tax, accounting, advisory and other permitted engagements. Audit or assurance work requires a separate engagement rule set and cannot be combined with conflicting accounting work for the same entity.

## Post-MVP Gated Profile

### Advocate / Lawyer / Law Firm

Do not activate as a consumer-visible MVP provider, campaign participant or ranked professional. Bar Council of India rules prohibit advocates from advertising or soliciting work. A future legal-services route state requires written Indian legal review, verified Bar enrolment, neutral factual presentation, client-initiated engagement, conflict checks, confidentiality, fee and withdrawal rules, and an explicit decision on whether the platform model is permissible.

No lawyer ranking, promotional claims, paid placement, lead auction, success-fee campaign or provider solicitation is permitted in the current launch scope.

## Other Professions

Unsupported professions may submit a structured workspace request to MoolSocial Admin. The platform records profession, service mode, geography and professional-body details but does not activate the workspace until a versioned profile definition, statutory resolver, proof schema, permissions and fulfilment workflow exist.

## Reused Provider Routes

1. Home and readiness
2. Services and engagement catalogue
3. Client capacity and availability
4. Engagement requests
5. Engagement execution, secure files and communication
6. Clients, fees, receipts and records
7. Permitted earning opportunities and campaigns
8. Professional proof, staff, security and support

Professional document vault, consent, files, notifications, payment and support reuse shared engines. Confidential client files cannot appear in ordinary Chat, campaign analytics or general staff access.

## Production Guardrails

- Resolve exact professional profile from verified evidence, never user marketing text.
- Keep personal consumer and Social access active for every professional.
- Separate professional-body verification from ordinary KYC.
- Keep service permissions versioned by profile, geography and effective date.
- Prevent restricted services, claims, advertising and campaign types at policy and API layers.
- Require explicit client engagement, scope, fee, cancellation, record retention and grievance terms.
- Preserve audit logs for verification, engagement acceptance, file access, advice delivery, fees and complaints.

## Official References Reviewed

- ICAI Code of Ethics resources and 2026 editions: https://disc.icai.org/code-of-ethics/
- ICAI announcement on revised Code of Ethics effective 1 April 2026: https://www.icai.org/post/prc-icai-press-release-12-12-2025
- Bar Council of India Rules, including the prohibition on advertising and solicitation: https://www.barcouncilofindia.org/info/bci-rules
