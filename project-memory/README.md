# MoolSocial Project Memory

This folder preserves architectural corrections, user decisions and continuation context for future Codex sessions.

## Mandatory Reading Order

Before designing or changing Screen 69 or any provider/workspace screen, read:

1. `../architecture/MY-WORK-AND-PROVIDER-WORKSPACE-ARCHITECTURE-LOCK.md`
2. `../architecture/WORK-PROFILE-TAXONOMY-AND-RESOLVER-LOCK.md`
3. `../architecture/MVP-WORKSPACE-CARD-TREE-AND-IDENTITY-LOCK.md`
4. `../architecture/INDIA-RAJASTHAN-WORKSPACE-COMPLIANCE-RESOLVER.md`
5. `../architecture/IDENTITY-VERIFICATION-INTEGRATION-LOCK.md`
6. `../architecture/RETAILER-WORKSPACE-OPERATING-ARCHITECTURE-LOCK.md`
7. `../architecture/DEMAND-AGGREGATION-WORKSPACE-UIUX-RESET.md`
8. `../architecture/RETAILER-HYBRID-B2B-B2C-OPERATING-APP-LOCK.md`
9. `../architecture/SCREEN-74-RETAILER-OPERATING-HOME-PLAN.md` (historical and superseded)
10. `../architecture/GLOBAL-ONE-TAP-PERSONAL-WORK-SWITCH-LOCK.md`
11. `../architecture/SUPPLIER-OFFER-PAYMENT-DELIVERY-LOCK.md`
12. `DECISION-LOG.md`
13. The relevant approved screen and its immediately preceding approved route

The audited business model and MVP-only user-type plan remain the primary business and launch-scope sources.

## Logging Protocol

After any user instruction that changes architecture, taxonomy, action wording, user routing, verification, workspace behavior, compliance, approval status or backend contract, append one dated entry to `DECISION-LOG.md` containing:

```text
User decision or correction
Product interpretation
Files changed
Approval status
Next unresolved decision
```

Preserve exact locked phrases where wording matters. Do not copy temporary implementation speculation into the locked decision section.

Raw working exploration belongs in `_working-notes/`. Durable decisions belong here or in `architecture/`.

## Approval Rule

On 10 July 2026, the user delegated screen approval after Codex completes its secondary functional and mobile UI/UX checks. A screen may move to `approved-final/` when those checks pass and no unresolved product, interaction, compliance or regression issue remains. If checks fail or an important decision remains unresolved, do not approve or advance the screen; report and correct it first.
