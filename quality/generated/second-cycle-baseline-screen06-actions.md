# Second-Cycle Adversarial Micro-Interaction Audit

Generated: 2026-07-15T23:28:03Z

## Result

Status: **failed**

| Measure | Result |
| --- | ---: |
| Screen/viewport runs | 1 |
| Route resilience scenarios | 0 |
| Action/input adversarial scenarios | 45 |
| Passed | 0 |
| Failed | 45 |
| Cancel branches verified | 0 |
| Recovery branches verified | 0 |
| Severe console errors | 0 |

## Findings

| Ticket | Viewport | Screen | Scenario | Exact path | Observed | Evidence |
| --- | --- | ---: | --- | --- | --- | --- |
| C2-PERM-006 | mobile | 006 | permission-denied | Search videos → Ask Voice | panel=False settings=False fallback=False fallbackResult=False settingsResult=False | [screenshot](mobile-006-0001-permission-denied.png) |
| C2-ACT-002 | mobile | 006 | action-loading | Grow your shop with verified product videos and local orders → Start Create shop page | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} panelAfter=False nativeCompletion=True | [screenshot](mobile-006-0002-action-loading.png) |
| C2-ACT-003 | mobile | 006 | action-offline | Grow your shop with verified product videos and local orders → Start Create shop page | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0003-action-offline.png) |
| C2-ACT-004 | mobile | 006 | action-error | Grow your shop with verified product videos and local orders → Start Create shop page | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0004-action-error.png) |
| C2-IDEMP-005 | mobile | 006 | duplicate | Grow your shop with verified product videos and local orders → Start Create shop page | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} | [screenshot](mobile-006-0005-duplicate.png) |
| C2-ACT-002 | mobile | 006 | action-loading | Grow your shop with verified product videos and local orders → Create Publish product video | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} panelAfter=False nativeCompletion=True | [screenshot](mobile-006-0006-action-loading.png) |
| C2-ACT-003 | mobile | 006 | action-offline | Grow your shop with verified product videos and local orders → Create Publish product video | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0007-action-offline.png) |
| C2-ACT-004 | mobile | 006 | action-error | Grow your shop with verified product videos and local orders → Create Publish product video | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0008-action-error.png) |
| C2-IDEMP-005 | mobile | 006 | duplicate | Grow your shop with verified product videos and local orders → Create Publish product video | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} | [screenshot](mobile-006-0009-duplicate.png) |
| C2-ACT-002 | mobile | 006 | action-loading | Grow your shop with verified product videos and local orders → Continue Start shop setup | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} panelAfter=False nativeCompletion=True | [screenshot](mobile-006-0010-action-loading.png) |
| C2-ACT-003 | mobile | 006 | action-offline | Grow your shop with verified product videos and local orders → Continue Start shop setup | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0011-action-offline.png) |
| C2-ACT-004 | mobile | 006 | action-error | Grow your shop with verified product videos and local orders → Continue Start shop setup | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0012-action-error.png) |
| C2-IDEMP-005 | mobile | 006 | duplicate | Grow your shop with verified product videos and local orders → Continue Start shop setup | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} | [screenshot](mobile-006-0013-duplicate.png) |
| C2-PERM-006 | mobile | 006 | permission-denied | Proof → Required Location proof | panel=False settings=False fallback=False fallbackResult=False settingsResult=False | [screenshot](mobile-006-0014-permission-denied.png) |
| C2-ACT-002 | mobile | 006 | action-loading | Proof → Continue Apply for task | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} panelAfter=False nativeCompletion=True | [screenshot](mobile-006-0015-action-loading.png) |
| C2-ACT-003 | mobile | 006 | action-offline | Proof → Continue Apply for task | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0016-action-offline.png) |
| C2-ACT-004 | mobile | 006 | action-error | Proof → Continue Apply for task | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0017-action-error.png) |
| C2-IDEMP-005 | mobile | 006 | duplicate | Proof → Continue Apply for task | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} | [screenshot](mobile-006-0018-duplicate.png) |
| C2-PERM-006 | mobile | 006 | permission-denied | Watch how this Jodhpur shop packs a fresh morning basket → More → Jodhpur Location | panel=False settings=False fallback=False fallbackResult=False settingsResult=False | [screenshot](mobile-006-0019-permission-denied.png) |
| C2-ACT-002 | mobile | 006 | action-loading | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rule Refund | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} panelAfter=False nativeCompletion=True | [screenshot](mobile-006-0020-action-loading.png) |
| C2-ACT-003 | mobile | 006 | action-offline | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rule Refund | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0021-action-offline.png) |
| C2-ACT-004 | mobile | 006 | action-error | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rule Refund | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0022-action-error.png) |
| C2-IDEMP-005 | mobile | 006 | duplicate | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rule Refund | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} | [screenshot](mobile-006-0023-duplicate.png) |
| C2-ACT-002 | mobile | 006 | action-loading | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Order Open | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} panelAfter=False nativeCompletion=True | [screenshot](mobile-006-0024-action-loading.png) |
| C2-ACT-003 | mobile | 006 | action-offline | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Order Open | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0025-action-offline.png) |
| C2-ACT-004 | mobile | 006 | action-error | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Order Open | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0026-action-error.png) |
| C2-IDEMP-005 | mobile | 006 | duplicate | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Order Open | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} | [screenshot](mobile-006-0027-duplicate.png) |
| C2-PERM-006 | mobile | 006 | permission-denied | Watch how QR proof tasks are checked before payout → More → Jodhpur Location | panel=False settings=False fallback=False fallbackResult=False settingsResult=False | [screenshot](mobile-006-0028-permission-denied.png) |
| C2-PERM-006 | mobile | 006 | permission-denied | Watch how QR proof tasks are checked before payout → Open proof → Required Location proof | panel=False settings=False fallback=False fallbackResult=False settingsResult=False | [screenshot](mobile-006-0029-permission-denied.png) |
| C2-ACT-002 | mobile | 006 | action-loading | Watch how QR proof tasks are checked before payout → Open proof → Continue Apply for task | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} panelAfter=False nativeCompletion=True | [screenshot](mobile-006-0030-action-loading.png) |
| C2-ACT-003 | mobile | 006 | action-offline | Watch how QR proof tasks are checked before payout → Open proof → Continue Apply for task | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0031-action-offline.png) |
| C2-ACT-004 | mobile | 006 | action-error | Watch how QR proof tasks are checked before payout → Open proof → Continue Apply for task | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0032-action-error.png) |
| C2-IDEMP-005 | mobile | 006 | duplicate | Watch how QR proof tasks are checked before payout → Open proof → Continue Apply for task | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} | [screenshot](mobile-006-0033-duplicate.png) |
| C2-ACT-002 | mobile | 006 | action-loading | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rs 399 Price → Order Open | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} panelAfter=False nativeCompletion=True | [screenshot](mobile-006-0034-action-loading.png) |
| C2-ACT-003 | mobile | 006 | action-offline | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rs 399 Price → Order Open | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0035-action-offline.png) |
| C2-ACT-004 | mobile | 006 | action-error | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rs 399 Price → Order Open | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0036-action-error.png) |
| C2-IDEMP-005 | mobile | 006 | duplicate | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rs 399 Price → Order Open | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} | [screenshot](mobile-006-0037-duplicate.png) |
| C2-ACT-002 | mobile | 006 | action-loading | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → 45 min Time → Order Open | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} panelAfter=False nativeCompletion=True | [screenshot](mobile-006-0038-action-loading.png) |
| C2-ACT-003 | mobile | 006 | action-offline | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → 45 min Time → Order Open | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0039-action-offline.png) |
| C2-ACT-004 | mobile | 006 | action-error | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → 45 min Time → Order Open | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0040-action-error.png) |
| C2-IDEMP-005 | mobile | 006 | duplicate | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → 45 min Time → Order Open | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} | [screenshot](mobile-006-0041-duplicate.png) |
| C2-ACT-002 | mobile | 006 | action-loading | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rule Refund → Order Open | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} panelAfter=False nativeCompletion=True | [screenshot](mobile-006-0042-action-loading.png) |
| C2-ACT-003 | mobile | 006 | action-offline | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rule Refund → Order Open | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0043-action-offline.png) |
| C2-ACT-004 | mobile | 006 | action-error | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rule Refund → Order Open | panel=False cancel=False retryAction=False recovery=False | [screenshot](mobile-006-0044-action-error.png) |
| C2-IDEMP-005 | mobile | 006 | duplicate | Watch how this Jodhpur shop packs a fresh morning basket → Open proof → Rule Refund → Order Open | panel={'busy': False, 'buttons': [], 'scenario': '', 'text': '', 'title': '', 'visible': False} | [screenshot](mobile-006-0045-duplicate.png) |
