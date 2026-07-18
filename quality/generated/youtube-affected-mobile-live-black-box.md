# Live Black-Box Intent-Completion Audit

Generated: 2026-07-18T07:32:38Z
Live origin: `http://127.0.0.1:8787`

## Release gate

Status: **failed**

| Measure | Result |
| --- | ---: |
| Screens/viewports | 12 |
| Paths tested | 654 |
| Nested paths | 363 |
| Genuine completions | 652 |
| Broken/incomplete intents | 2 |
| Synthetic runtime-only responses | 0 |
| Unexplained no-op taps | 1 |
| Truncated screen states | 4 |
| Severe console errors | 0 |

A generated contract toast, orange selection outline or generic contract sheet is deliberately excluded from completion evidence.

## Screenwise findings

| Ticket | Viewport | Screen | Tap path | Intent | Failure | Evidence |
| --- | --- | ---: | --- | --- | --- | --- |
| LBX-005-M-094 | mobile | 005 | More actions → Rank Not interested → RK Rasoi Kitchen Verified restaurant · Lunch live → Safety Report | task | Message: control not found: Safety Report; For documentation on this error, please visit: https://www.selenium.dev/documentation/webdriver/troubleshooting/errors#nosuchelementexception |  |
| LBX-127-M-010 | mobile | 127 | How local baskets save time YouTube metrics separate · 126 orders ₹2,840 payable › | state | Tap produced no meaningful native screen result. | [before](mobile-127-010-how-local-baskets-save-time-youtube-metrics-separate-1-before.png) / [after](mobile-127-010-how-local-baskets-save-time-youtube-metrics-separate-1-after.png) |
