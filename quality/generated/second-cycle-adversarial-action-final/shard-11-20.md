# Second-Cycle Adversarial Micro-Interaction Audit

Generated: 2026-07-16T01:02:28Z

## Result

Status: **failed**

| Measure | Result |
| --- | ---: |
| Screen/viewport runs | 20 |
| Route resilience scenarios | 0 |
| Action/input adversarial scenarios | 98 |
| Passed | 97 |
| Failed | 1 |
| Cancel branches verified | 46 |
| Recovery branches verified | 97 |
| Severe console errors | 0 |

## Findings

| Ticket | Viewport | Screen | Scenario | Exact path | Observed | Evidence |
| --- | --- | ---: | --- | --- | --- | --- |
| C2-ACT-002 | mobile | 012 | action-loading | Remove Item pay only available items | panel={'busy': False, 'buttons': [], 'contentVisible': False, 'scenario': '', 'text': '', 'title': '', 'visible': False, 'visibleButtons': []} panelAfter=False nativeCompletion=True | [screenshot](mobile-012-0001-action-loading.png) |
