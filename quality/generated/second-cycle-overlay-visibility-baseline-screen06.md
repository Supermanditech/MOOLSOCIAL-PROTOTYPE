# Second-Cycle Adversarial Micro-Interaction Audit

Generated: 2026-07-15T23:34:02Z

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
| C2-RES-001 | desktop | 006 | route-loading | route-loading | busy=True panelVisible=True contentVisible=False visibleAfter=False | [screenshot](desktop-006-0001-route-loading.png) |
| C2-RES-001 | desktop | 006 | route-empty | route-empty | Forced state was not rendered with its required visible action. panel=True content=False visibleButtons=[] allButtons=['Refresh', 'Return'] | [screenshot](desktop-006-0001-route-loading.png) |
| C2-RES-001 | desktop | 006 | route-offline | route-offline | Forced state was not rendered with its required visible action. panel=True content=False visibleButtons=[] allButtons=['Retry connection', 'Cancel'] | [screenshot](desktop-006-0001-route-loading.png) |
| C2-RES-001 | desktop | 006 | route-unauthorized | route-unauthorized | Forced state was not rendered with its required visible action. panel=True content=False visibleButtons=[] allButtons=['Sign in again', 'Return'] | [screenshot](desktop-006-0001-route-loading.png) |
| C2-RES-001 | desktop | 006 | route-error | route-error | Forced state was not rendered with its required visible action. panel=True content=False visibleButtons=[] allButtons=['Try again', 'Cancel'] | [screenshot](desktop-006-0001-route-loading.png) |
