# Second-Cycle Adversarial Micro-Interaction Audit

Generated: 2026-07-16T02:54:54Z

## Result

Status: **failed**

| Measure | Result |
| --- | ---: |
| Screen/viewport runs | 1 |
| Route resilience scenarios | 0 |
| Action/input adversarial scenarios | 6 |
| Passed | 2 |
| Failed | 4 |
| Cancel branches verified | 0 |
| Recovery branches verified | 2 |
| Severe console errors | 0 |

## Findings

| Ticket | Viewport | Screen | Scenario | Exact path | Observed | Evidence |
| --- | --- | ---: | --- | --- | --- | --- |
| C2-ACT-003 | mobile | 159 | action-offline | Buy → • Atta under ₹300 delivered today BUY Compare final price, pack, delivery and refund before adding. Personal · current area › | panel=True cancel=False retryAction=True recovery=False | [screenshot](mobile-159-0003-action-offline.png) |
| C2-ACT-004 | mobile | 159 | action-error | Buy → • Atta under ₹300 delivered today BUY Compare final price, pack, delivery and refund before adding. Personal · current area › | panel=True cancel=False retryAction=False recovery=False | [screenshot](mobile-159-0004-action-error.png) |
| C2-IDEMP-005 | mobile | 159 | duplicate | Buy → • Atta under ₹300 delivered today BUY Compare final price, pack, delivery and refund before adding. Personal · current area › | panel={'busy': False, 'buttons': ['View result', 'Close'], 'contentVisible': True, 'scenario': 'duplicate', 'text': 'Shared · Universal InputDuplicate stoppedOriginal request C2-159-85866 remains active. No second order, payment, message or submission was created.• Atta under ₹300 delivered today BUY Compare final price, pack, delivery and refund before adding. Personal · current area › can continue from its one retained result.View resultClose', 'title': 'Duplicate stopped', 'visible': True, 'visibleButtons': ['View result', 'Close']} opened=False status= | [screenshot](mobile-159-0005-duplicate.png) |
| C2-PERM-006 | mobile | 159 | permission-denied | Book → • Book a cab to Jodhpur Airport BOOK Set pickup, compare ride options and confirm fare. Personal · location needed › | panel=True settings=True fallback=True fallbackResult=False settingsResult=False | [screenshot](mobile-159-0006-permission-denied.png) |
