# Prototype Flow and Tap Audit

Status: active production-readiness gate
Scope: every approved Screen 00-165 plus all registered operational flows

## Test order

1. Validate every screen and approved copy exists.
2. Validate every local route target and local asset.
3. Validate flow order, parameters, contracts and cross-workspace transitions.
4. Render every screen at the launch mobile viewport and inspect load, console and overflow state.
5. Tap every visible button and input from a clean screen state.
6. Re-test each resolved interaction inside its full operational flow.

## Current baseline

- 166 source screens and 166 approved screens rendered.
- 47 operational flows and 437 registered flow nodes validated.
- 1,037 local navigation targets and 214 local assets validated with no missing target.
- Eight creator earning flows are registered from funding source through creator, qualifying outcome, admin and ledger.
- The strict first tap baseline tested 1,694 buttons and inputs: 1,050 produced an observable result, 644 require classification or implementation, and 3 were skipped by browser timing/geometry.

The first strict baseline is deliberately conservative. An already-active tab, a browser/device integration and a truly dead control can all appear as “no visible state or navigation” until classified. The generated interaction backlog preserves every result so none is silently discarded.

The Install to Universal App flow has completed its first remediation and browser re-test. Install/open, timed splash, current/manual/skip area, manual edit/back/continue, five social providers, Email OTP, Mobile OTP and Screen 04 handoff now pass with preserved query context. Closed evidence is recorded in `quality/verified-interactions.json`; the baseline audit remains immutable.

## Pass rules

- Navigation passes only when the destination and required query context are correct.
- In-screen actions pass only when state visibly changes and survives the intended next step.
- Active controls pass only when they are explicitly selected through ARIA or a visible selected state.
- Device actions such as location, camera, call, share, OTP and external identity pass only when the prototype declares the system handoff, denial/cancel state and return route.
- Money actions must also preserve idempotency, actor, workspace, policy version and correlation context.
- Generic “make every button clickable” fallback handlers are prohibited because they conceal broken business logic.

## Outputs

- Static audit: `quality/generated/flow-static-audit.json`
- Mobile render inventory: `quality/generated/mobile-render-inventory.json`
- Strict tap baseline: `quality/generated/flow-browser-tap-audit.json`
- Verified re-test evidence: `quality/verified-interactions.json`
- Interaction backlog: `quality/generated/flow-interaction-backlog.json`
- Human-readable backlog: `quality/generated/flow-interaction-backlog.md`

Production tickets must reference the interaction ID and operational flow. A screen is production-ready only when its launch-flow tickets are closed and the complete flow re-test passes.

## Final mobile handoff gate

The final mobile app testing link must not be shown while any interaction or flow remains unresolved. Run `quality/Test-Mobile-User-Flow-ReleaseGate.ps1` before any final handoff.

The gate returns ready only when:

- the generated interaction backlog is zero;
- a fresh `flow-browser-tap-final.json` covers every approved screen with zero failed and zero skipped controls;
- all operational flows and screen coverage pass;
- a fresh `mobile-user-flow-final.json` reports zero load errors, console errors, horizontal overflows, dead ends, wrong parameters, broken back paths and broken cross-workspace transitions;
- every registered operational flow was exercised on the mobile user-flow run.

Until then, review URLs are internal development tools and must not be represented as the final app testing handoff.
