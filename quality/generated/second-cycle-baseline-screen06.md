# Second-Cycle Adversarial Micro-Interaction Audit

Generated: 2026-07-15T23:07:56Z

## Result

Status: **failed**

| Measure | Result |
| --- | ---: |
| Screen/viewport runs | 1 |
| Route resilience scenarios | 5 |
| Action/input adversarial scenarios | 0 |
| Passed | 0 |
| Failed | 5 |
| Cancel branches verified | 0 |
| Recovery branches verified | 0 |
| Severe console errors | 0 |

## Findings

| Ticket | Viewport | Screen | Scenario | Exact path | Observed | Evidence |
| --- | --- | ---: | --- | --- | --- | --- |
| C2-RES-001 | mobile | 006 | route-loading | route-loading | busy=False visibleBefore=False visibleAfter=False | [screenshot](mobile-006-0001-route-loading.png) |
| C2-RES-001 | mobile | 006 | route-empty | route-empty | Forced state was not rendered with its required action. panel=False buttons=[] | [screenshot](mobile-006-0001-route-loading.png) |
| C2-RES-001 | mobile | 006 | route-offline | route-offline | Forced state was not rendered with its required action. panel=False buttons=[] | [screenshot](mobile-006-0001-route-loading.png) |
| C2-RES-001 | mobile | 006 | route-unauthorized | route-unauthorized | Forced state was not rendered with its required action. panel=False buttons=[] | [screenshot](mobile-006-0001-route-loading.png) |
| C2-RES-001 | mobile | 006 | route-error | route-error | Forced state was not rendered with its required action. panel=False buttons=[] | [screenshot](mobile-006-0001-route-loading.png) |
