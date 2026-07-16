# Second-Cycle Adversarial Micro-Interaction Audit

Generated: 2026-07-16T01:03:29Z

## Result

Status: **failed**

| Measure | Result |
| --- | ---: |
| Screen/viewport runs | 1 |
| Route resilience scenarios | 0 |
| Action/input adversarial scenarios | 5 |
| Passed | 4 |
| Failed | 1 |
| Cancel branches verified | 2 |
| Recovery branches verified | 4 |
| Severe console errors | 0 |

## Findings

| Ticket | Viewport | Screen | Scenario | Exact path | Observed | Evidence |
| --- | --- | ---: | --- | --- | --- | --- |
| C2-VAL-007 | mobile | 106 | invalid-input | Add expense → 850 | invalidState={'error': '', 'errorVisible': False, 'invalid': False, 'nativeValid': False, 'value': ''} recoveredState={'error': '', 'errorVisible': False, 'invalid': False, 'nativeValid': True, 'value': '42'} | [screenshot](mobile-106-0005-invalid-input.png) |
