# Live Black-Box Intent-Completion Audit

## Purpose

This audit verifies whether a real user can complete the intent promised by every visible tap. It does not treat a JavaScript event, generic toast, selection outline or automatically generated “ready/completed” sheet as proof of completion.

The deployed or approved prototype is opened as a black box in Microsoft Edge. Every control is physically hit-tested, replayed from a clean page, compared before and after, and recursively followed through the states it reveals. Clean means the runner clears local storage, session storage, origin data and cookies at the inert `quality/audit-clean-state.html` boundary before every reproduction; a reload by itself is not accepted as isolation.

## Required viewports

- Mobile touch layout: 390 × 844.
- Laptop browser layout: 1440 × 1000.

The same screen and intent must pass at both sizes. Responsive presentation may differ, but the promised outcome may not disappear.

## Control discovery

The crawler inventories:

- buttons, links, inputs, selects, text areas and editable message fields;
- semantic button, tab and switch roles;
- cards, rows, chips and tiles that register click listeners;
- controls revealed inside native sheets, dialogs, menus and inline expansions;
- inputs and follow-up actions revealed only after a previous tap;
- already-visible completion actions after a user types, chooses a quick reply or selects an attachment.

Controls are hit-tested against the rendered page. Hidden, disabled, covered and off-context elements are not treated as usable controls.

## Intent classes

| Intent | Required evidence |
| --- | --- |
| Navigation | The promised, relevant destination opens without a broken or unrelated route. |
| State or toggle | The choice is visibly selected, retained and reflected in the relevant content or status. |
| Input | A valid value can be entered and retained or applied. |
| Detail | Domain content becomes visible with usable follow-up controls, or the requested content replaces the current content in place. |
| Handoff | The system action opens, or the prototype provides a usable domain-specific preview and confirmation step. |
| Task | The task advances or completes with its next step, result, reference and recovery action. |
| Dismissal | The current layer closes and returns without losing the underlying task state. |

## Explicit failures

- no-op tap;
- click interception or inaccessible hit target;
- wrong or broken route;
- generic acknowledgement without the promised result;
- synthetic central-runtime feedback as the only response;
- selection that does not affect the intended task;
- detail view without usable information or follow-up actions;
- terminal action without confirmation, result, reference or recovery;
- hidden continuation or new content outside the user’s visible position;
- recursive state traversal stopped by a safety ceiling;
- severe browser console error.

## Recursive traversal

Every screen starts from a clean page. Root controls are tested independently. When a tap reveals a new native state, the crawler follows newly visible controls and relevant next actions until one of these conditions is reached:

- a valid destination opens;
- the intent reaches a meaningful terminal result;
- no new user action remains;
- a confirmed defect prevents continuation.

The depth and path limits are only safety controls. Any remaining queued path marks the screen truncated and fails the release gate. Mutually exclusive visible choices are tested independently rather than combined into artificial journeys.

## Evidence and ledger

Each finding records:

- screen, viewport and exact tap path;
- inferred user intent;
- expected result;
- observed result and failure class;
- contract ticket where present;
- before and after screenshots;
- resulting route, native status and newly revealed controls.

The canonical outputs are:

- `quality/generated/live-black-box-intent-audit.json`;
- `quality/generated/live-black-box-intent-audit.md`;
- failure evidence under `quality/generated/live-black-box-evidence/`.

## Release gate

The prototype is ready for review only when:

- all 166 screens are present in both viewport runs;
- every discovered path has a genuine completion classification;
- synthetic-runtime-only responses are zero;
- no-op taps are zero;
- truncated screens are zero;
- severe console errors are zero;
- critical Social, Buy, Chat, service booking, payment, Work and workspace journeys are replayed separately end to end.

## Commands

Run a focused live screen:

```powershell
python quality/Run-Live-Black-Box-Intent-Audit.py --screen 6 --viewport mobile
```

Run a screen shard:

```powershell
python quality/Run-Live-Black-Box-Intent-Audit.py --screen-from 0 --screen-to 41 --max-depth 20 --max-paths-per-screen 1200
```

Merge shard reports:

```powershell
python quality/Merge-Live-Black-Box-Audit-Shards.py --input shard-000-041.json --input shard-042-083.json --input shard-084-124.json --input shard-125-165.json --output quality/generated/live-black-box-intent-audit.json
```

Run the independent adverse-state cycle from the completed positive report:

```powershell
python quality/Run-Adversarial-Micro-Interaction-Audit.py --positive-report quality/generated/second-cycle-live-black-box-audit.json --max-action-scenarios-per-screen 1200 --output quality/generated/second-cycle-adversarial-audit.json --markdown-output quality/generated/second-cycle-adversarial-audit.md
```

The adverse runner starts every scenario from a clean URL and physically verifies loading, empty, offline, unauthorized, error, retry, cancellation, duplicate, permission-denied, empty-input and invalid-input outcomes. A browser-enforced constraint counts as a pass only when the invalid value cannot enter the field and a valid replacement is subsequently accepted.
