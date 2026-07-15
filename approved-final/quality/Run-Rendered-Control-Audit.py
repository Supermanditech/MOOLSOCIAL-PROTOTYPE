"""Exercise every initially rendered control from a clean mobile browser state.

The HTML runner inventories every visible button, link, input, select, textarea,
tab and switch across the numbered prototype screens. It reloads the source
screen before each action so one interaction cannot hide another failure.
"""

from __future__ import annotations

import argparse
import json
import sys
import threading
import time
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from selenium import webdriver
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.edge.options import Options


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, _format: str, *_args: object) -> None:
        return


class QuietServer(ThreadingHTTPServer):
    def handle_error(self, _request: object, _client_address: object) -> None:
        return


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--output", type=Path)
    parser.add_argument("--timeout", type=float, default=1200.0)
    parser.add_argument("--screen", type=int)
    parser.add_argument("--full-speed", action="store_true", help="Use the runner's slower observation timing")
    args = parser.parse_args()

    root = args.root.resolve()
    output = (args.output or root / "quality/generated/rendered-control-deep-audit.json").resolve()
    output.parent.mkdir(parents=True, exist_ok=True)

    server = QuietServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(root)))
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    query_parts = [] if args.full_speed else ["fast=1"]
    if args.screen is not None:
        query_parts.append(f"screen={args.screen}")
    query = f"?{'&'.join(query_parts)}" if query_parts else ""
    url = f"http://127.0.0.1:{server.server_port}/quality/prototype-interaction-audit-runner.html{query}"

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=390,844")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-application-cache")
    options.add_argument("--no-first-run")
    options.add_argument("--no-default-browser-check")
    options.page_load_strategy = "eager"
    options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

    report: dict = {}
    console_errors: list[dict] = []
    try:
        with webdriver.Edge(options=options) as driver:
            driver.set_page_load_timeout(30)
            driver.set_script_timeout(10)
            driver.execute_cdp_cmd(
                "Emulation.setDeviceMetricsOverride",
                {"width": 390, "height": 844, "deviceScaleFactor": 1, "mobile": True},
            )
            driver.get(url)
            started = time.monotonic()
            last_status = ""
            last_reported = 0.0
            while time.monotonic() - started < args.timeout:
                complete = driver.execute_script(
                    "return document.documentElement.dataset.auditComplete === 'true'"
                )
                status = driver.execute_script(
                    "return document.getElementById('status')?.textContent || ''"
                )
                now = time.monotonic()
                if status and status != last_status and (now - last_reported >= 10 or complete):
                    print(status, flush=True)
                    last_status = status
                    last_reported = now
                if complete:
                    report = driver.execute_script("return window.__MOOL_STRICT_AUDIT_REPORT__") or {}
                    break
                time.sleep(0.4)
            else:
                raise TimeoutException(f"Rendered-control audit timed out after {args.timeout:.0f}s")

            for entry in driver.get_log("browser"):
                message = entry.get("message", "")
                if entry.get("level") == "SEVERE" and "favicon.ico" not in message:
                    console_errors.append(entry)
    except (TimeoutException, WebDriverException) as exc:
        report = {
            "complete": False,
            "summary": {"tested": 0, "passed": 0, "failed": 1, "skipped": 0, "screens": 0},
            "issues": [{"screen": -1, "label": "audit runner", "error": str(exc)}],
        }
    finally:
        server.shutdown()
        server.server_close()

    report["consoleErrors"] = console_errors
    output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    summary = report.get("summary", {})
    print(
        json.dumps(
            {
                "output": str(output),
                "complete": report.get("complete", False),
                "screens": summary.get("screens", 0),
                "tested": summary.get("tested", 0),
                "passed": summary.get("passed", 0),
                "failed": summary.get("failed", 0),
                "consoleErrors": len(console_errors),
            },
            indent=2,
        ),
        flush=True,
    )
    return 0 if report.get("complete") and not summary.get("failed") and not console_errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
