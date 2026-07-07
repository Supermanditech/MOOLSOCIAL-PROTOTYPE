# MoolSocial Prototype

This repository is the approved UI/UX prototype screenbook for MoolSocial.

## Current Approved Baseline

Approved screens are frozen in:

`approved-final/`

Current approved range:

`00` to `08`

## Open Locally

From this folder:

```powershell
python -m http.server 8787 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8787/approved-final/index.html
```

## Prototype Structure

- `approved-final/` - locked approved screen baseline
- `screens/` - active working screen prototypes
- `shared/` - shared design foundation and registry
- `assets/` - prototype visual assets
- `_working-notes/` - approval notes and planning records

## Regression Rule

Approved screens must not be changed casually. Future screens should be designed, reviewed, approved, and then copied into `approved-final/` only after approval.
