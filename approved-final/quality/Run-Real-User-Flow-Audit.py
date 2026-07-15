"""Replay every operational mobile flow with real Edge clicks.

The runner clicks only controls highlighted by mobile-user-flow.html and fails when
the highlighted control is hidden, not interactable, or does not reach the next
declared state. It never uses the runner's reviewer-only navigation as a tap.
"""

from __future__ import annotations

import argparse
import json
import re
import threading
import time
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote, urlparse

from selenium import webdriver
from selenium.common.exceptions import (
    ElementClickInterceptedException,
    ElementNotInteractableException,
    JavascriptException,
    StaleElementReferenceException,
    WebDriverException,
)
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, _format: str, *_args: object) -> None:
        return


def normalized_label(element) -> str:
    for name in ("aria-label", "title"):
        value = (element.get_attribute(name) or "").strip()
        if value:
            return re.sub(r"\s+", " ", value)
    return re.sub(r"\s+", " ", element.text or "").strip()


def screen_from_url(url: str) -> int | None:
    match = re.search(r"/(\d{2,3})-", url)
    return int(match.group(1)) if match else None


def audit_flow(driver: webdriver.Edge, base_url: str, flow: dict, timeout: float) -> dict:
    started = time.monotonic()
    url = f"{base_url}/mobile-user-flow.html?audit=1&flow={quote(flow['id'])}&fresh={time.time_ns()}"
    driver.get(url)
    turns: list[dict] = []
    screens_seen: list[int] = []
    overflows: list[dict] = []
    error: str | None = None
    last_signature = ""

    while time.monotonic() - started < timeout:
        finish = driver.find_element(By.ID, "finish")
        if finish.is_displayed():
            break

        error_box = driver.find_element(By.ID, "error")
        if error_box.is_displayed() and error_box.text.strip():
            error = error_box.text.strip()
            break

        counter = driver.find_element(By.ID, "counter").text.strip()
        instruction = driver.find_element(By.ID, "instruction").text.strip()
        frame = driver.find_element(By.ID, "appFrame")
        driver.switch_to.frame(frame)
        try:
            current_url = driver.execute_script("return window.location.href")
            screen = screen_from_url(current_url)
            if screen is not None and screen not in screens_seen:
                screens_seen.append(screen)

            overflow = driver.execute_script(
                """
                const roots=[...document.querySelectorAll('.phone,.production-phone,.phone-frame,.device')];
                return roots.filter(x=>x.scrollWidth>x.clientWidth+1).map(x=>({
                  width:x.clientWidth,scrollWidth:x.scrollWidth,label:x.getAttribute('aria-label')||x.className
                }));
                """
            )
            for item in overflow or []:
                record = {"screen": screen, **item}
                if record not in overflows:
                    overflows.append(record)

            targets = driver.find_elements(By.CSS_SELECTOR, '[data-mool-flow-target="true"]')
            visible_targets = [target for target in targets if target.is_displayed() and target.is_enabled()]
            if visible_targets:
                target = visible_targets[0]
                label = normalized_label(target)
                signature = f"{counter}|{screen}|{label}"
                if signature != last_signature:
                    turns.append(
                        {
                            "counter": counter,
                            "screen": screen,
                            "file": Path(urlparse(current_url).path).name,
                            "action": label,
                            "intent": instruction,
                        }
                    )
                    last_signature = signature
                input_value = target.get_attribute("data-mool-flow-input-value")
                if input_value is not None:
                    target.click()
                    target.clear()
                    target.send_keys(input_value)
                else:
                    target.click()
        except (ElementClickInterceptedException, ElementNotInteractableException) as exc:
            detail = re.sub(r"\s+", " ", getattr(exc, "msg", "")).strip()
            error = f"Highlighted action was not physically tappable: {exc.__class__.__name__}: {detail}"
        except (StaleElementReferenceException, JavascriptException):
            pass
        finally:
            driver.switch_to.default_content()

        if error:
            break
        time.sleep(0.06)
    else:
        error = f"Flow timed out after {timeout:.0f}s."

    final_counter = driver.find_element(By.ID, "counter").text.strip()
    passed = error is None and driver.find_element(By.ID, "finish").is_displayed()
    if not passed and error is None:
        error = "Flow did not reach its completed state."
    return {
        "flow": flow["id"],
        "title": flow["title"],
        "status": "passed" if passed else "failed",
        "expectedNodes": int(flow["nodeCount"]),
        "interactionTurns": len(turns),
        "finalCounter": final_counter,
        "screensSeen": screens_seen,
        "horizontalOverflows": overflows,
        "turns": turns,
        "error": error,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--output", type=Path)
    parser.add_argument("--flow-timeout", type=float, default=35.0)
    parser.add_argument("--flow", action="append", default=[], help="Replay only the named flow; repeat as needed")
    args = parser.parse_args()
    root = args.root.resolve()
    output = (args.output or root / "quality/generated/semantic-mobile-user-flow-final.json").resolve()
    progress_output = output.with_name(output.stem + ".partial.json")
    manifest = json.loads((root / "flows/approved-flows.json").read_text(encoding="utf-8-sig"))
    flows = [flow for flow in manifest["flows"] if flow["id"] != "all-approved"]
    if args.flow:
        requested = set(args.flow)
        flows = [flow for flow in flows if flow["id"] in requested]

    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(root)))
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base_url = f"http://127.0.0.1:{server.server_port}"

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

    results: list[dict] = []
    console_errors: list[dict] = []
    try:
        with webdriver.Edge(options=options) as driver:
            driver.set_page_load_timeout(20)
            driver.set_script_timeout(5)
            driver.execute_cdp_cmd(
                "Emulation.setDeviceMetricsOverride",
                {"width": 390, "height": 844, "deviceScaleFactor": 1, "mobile": True},
            )
            for flow in flows:
                print(f"{flow['id']}: starting", flush=True)
                try:
                    result = audit_flow(driver, base_url, flow, args.flow_timeout)
                except WebDriverException as exc:
                    result = {
                        "flow": flow["id"],
                        "title": flow["title"],
                        "status": "failed",
                        "expectedNodes": int(flow["nodeCount"]),
                        "interactionTurns": 0,
                        "finalCounter": "0 / 0",
                        "screensSeen": [],
                        "horizontalOverflows": [],
                        "turns": [],
                        "error": f"Browser error: {exc.__class__.__name__}: {exc.msg}",
                    }
                results.append(result)
                for entry in driver.get_log("browser"):
                    message = entry.get("message", "")
                    if entry.get("level") == "SEVERE" and "favicon.ico" not in message:
                        console_errors.append({"flow": flow["id"], **entry})
                print(f"{flow['id']}: {result['status']} ({result['finalCounter']})", flush=True)
                progress_output.write_text(
                    json.dumps({"complete": False, "flows": results}, indent=2, ensure_ascii=False) + "\n",
                    encoding="utf-8",
                )
    finally:
        server.shutdown()
        server.server_close()

    failed = [result for result in results if result["status"] != "passed"]
    overflow_count = sum(len(result["horizontalOverflows"]) for result in results)
    payload = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "status": "passed" if not failed and not console_errors and not overflow_count else "failed",
        "source": "Microsoft Edge at 390x844 using native clicks on only highlighted, visible user controls; no forced navigation for tap or multi-action transitions",
        "viewport": {"width": 390, "height": 844},
        "summary": {
            "operationalFlowsTested": len(results),
            "passed": len(results) - len(failed),
            "failed": len(failed),
            "approvedScreensCoveredByManifest": int(manifest["approvedScreenCount"]),
            "horizontalOverflows": overflow_count,
            "consoleErrors": len(console_errors),
        },
        "consoleErrorDetails": console_errors,
        "flows": results,
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    if progress_output.exists():
        progress_output.unlink()
    print(json.dumps(payload["summary"], indent=2), flush=True)
    return 0 if payload["status"] == "passed" else 1


if __name__ == "__main__":
    raise SystemExit(main())
