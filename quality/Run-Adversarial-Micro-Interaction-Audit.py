"""Run the independent second-cycle adversarial micro-interaction audit.

The positive live black-box report supplies exact clean-state path descriptors.
This runner replays those paths while forcing route and action conditions that
ordinary success traversal cannot create: loading, empty, offline, access
expiry, recoverable error, duplicate submission, device-permission denial and
invalid or empty required input.
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.keys import Keys


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


ROOT = Path(__file__).resolve().parents[1]
BASE_RUNNER = Path(__file__).with_name("Run-Live-Black-Box-Intent-Audit.py")
SPEC = importlib.util.spec_from_file_location("mool_live_black_box", BASE_RUNNER)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError(f"Cannot load {BASE_RUNNER}")
LBX = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(LBX)


ROUTE_SCENARIOS = {
    "route-loading": {
        "ticket": "C2-RES-001",
        "expected": "Show a route-specific busy state, then settle into the requested screen without trapping the user.",
        "primary": "",
    },
    "route-empty": {
        "ticket": "C2-RES-001",
        "expected": "Explain that no current items are available and let the user refresh or return.",
        "primary": "Refresh",
    },
    "route-offline": {
        "ticket": "C2-RES-001",
        "expected": "Preserve the task context, explain the lost connection and complete a retry after reconnection.",
        "primary": "Retry connection",
    },
    "route-unauthorized": {
        "ticket": "C2-RES-001",
        "expected": "Explain that access expired and route to secure sign-in while retaining the intended return screen.",
        "primary": "Sign in again",
    },
    "route-error": {
        "ticket": "C2-RES-001",
        "expected": "Show a calm route-specific error with a working retry and return path.",
        "primary": "Try again",
    },
}

ACTION_SCENARIOS = {
    "action-loading": {
        "ticket": "C2-ACT-002",
        "expected": "Show immediate action-specific progress and then complete the original end intent.",
    },
    "action-offline": {
        "ticket": "C2-ACT-003",
        "expected": "Explain the offline interruption, preserve state, support Cancel and complete Retry.",
    },
    "action-error": {
        "ticket": "C2-ACT-004",
        "expected": "Show the failed action, support Cancel and complete the exact retry.",
    },
    "duplicate": {
        "ticket": "C2-IDEMP-005",
        "expected": "Stop the duplicate submission and retain one stable result reference.",
    },
    "permission-denied": {
        "ticket": "C2-PERM-006",
        "expected": "Explain the denied device permission and provide settings, fallback and cancel actions.",
    },
    "empty-input": {
        "ticket": "C2-VAL-007",
        "expected": "Identify the required empty field, retain the task and clear the error after valid input.",
    },
    "invalid-input": {
        "ticket": "C2-VAL-007",
        "expected": "Identify the invalid value, retain the task and clear the error after valid input.",
    },
}

TERMINAL_PATTERN = re.compile(
    r"\b(submit|send|pay|confirm|place|publish|apply|book|create|save|approve|accept|release|complete|finish|order|verify|start|activate|join|schedule|refund|resolve|collect|deliver|assign|renew|claim)\b",
    re.IGNORECASE,
)
PERMISSION_PATTERN = re.compile(
    r"\b(camera|scan|voice|microphone|location|directions|map|photo|upload|file|notification|video call)\b",
    re.IGNORECASE,
)
INPUT_TYPES = {
    "email",
    "tel",
    "number",
    "date",
    "time",
    "month",
    "week",
    "datetime-local",
}


PANEL_SCRIPT = r"""
const panel=document.querySelector('[data-mool-resilience="panel"]');
const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
const visible=el=>{if(!el)return false;const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.05&&r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth};
const buttons=panel?[...panel.querySelectorAll('button,a[href]')]:[];
return {
  visible:visible(panel),
  contentVisible:visible(panel&&panel.querySelector('.mool-resilience-card')),
  scenario:panel&&panel.getAttribute('data-scenario')||'',
  busy:!!(panel&&(panel.getAttribute('aria-busy')==='true'||panel.querySelector('[aria-busy="true"]'))),
  title:panel&&normalize(panel.querySelector('h1,h2,h3')?.textContent)||'',
  text:panel&&normalize(panel.textContent)||'',
  buttons:buttons.map(el=>normalize(el.getAttribute('aria-label')||el.textContent)),
  visibleButtons:buttons.filter(visible).map(el=>normalize(el.getAttribute('aria-label')||el.textContent))
};
"""

STATUS_SCRIPT = r"""
const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
return [...document.querySelectorAll('[role="status"],[role="alert"],[aria-live]')]
  .filter(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0})
  .map(el=>normalize(el.textContent)).join(' | ');
"""

PRODUCT_USABLE_SCRIPT = r"""
const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
const runtime='[data-mool-resilience],#mool-resilience-styles,.mool-contract-backdrop,.mool-contract-toast';
const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.05&&r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth};
const nodes=[...document.querySelectorAll('body *')].filter(el=>visible(el)&&!el.matches(runtime)&&!el.closest(runtime));
const text=normalize(nodes.filter(el=>el.childElementCount===0).map(el=>el.textContent).join(' '));
const media=nodes.some(el=>el.matches('img,svg,video,canvas'));
return text.length>=20||media;
"""

FIELD_STATE_SCRIPT = r"""
const el=arguments[0];
const error=el.parentElement?.querySelector('[data-mool-resilience="field-error"]')||
  document.querySelector('[data-mool-resilience="field-error"][data-for="'+CSS.escape(el.id||'')+'"]');
return {
  invalid:el.getAttribute('aria-invalid')==='true',
  error:error?String(error.textContent||'').replace(/\s+/g,' ').trim():'',
  errorVisible:!!(error&&(()=>{const s=getComputedStyle(error),r=error.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth})()),
  value:el.isContentEditable?el.textContent:el.value,
  nativeValid:typeof el.checkValidity==='function'?el.checkValidity():true
};
"""


PRODUCT_SNAPSHOT_SCRIPT = r"""
const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
const runtimeSelector='.mool-contract-backdrop,.mool-contract-toast,#mool-contract-styles,[data-mool-resilience],#mool-resilience-styles';
const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.05&&r.width>0&&r.height>0&&!el.closest('[hidden]')};
const cleanClass=el=>normalize(el.className||'').split(' ').filter(name=>name!=='mool-contract-selected'&&name!=='mool-resilience-surface').join(' ');
const nativeNodes=[...document.querySelectorAll('body,body *')].filter(el=>visible(el)&&!el.matches(runtimeSelector)&&!el.closest(runtimeSelector)).map(el=>{
  const data=[...el.attributes].filter(a=>a.name.startsWith('data-')&&!a.name.startsWith('data-live-audit')&&a.name!=='data-mool-contract'&&a.name!=='data-mool-micro-target').map(a=>`${a.name}=${a.value}`).sort().join(';');
  const aria=[...el.attributes].filter(a=>a.name.startsWith('aria-')&&!(a.name==='aria-pressed'&&el.classList.contains('mool-contract-selected'))).map(a=>`${a.name}=${a.value}`).sort().join(';');
  const ownText=normalize([...el.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE).map(node=>node.textContent).join(' '));
  return [el.tagName,el.id||'',cleanClass(el),data,aria,ownText].join('|');
}).join('\n');
const forms=[...document.querySelectorAll('input,select,textarea,[contenteditable="true"]')].filter(el=>visible(el)&&!el.closest(runtimeSelector)).map(el=>`${el.type||el.tagName}:${el.isContentEditable?el.textContent:(el.value||'')}:${el.checked?'1':'0'}:${el.selectedIndex??''}`).join('|');
const selected=[...document.querySelectorAll('[aria-pressed="true"],[aria-selected="true"],[aria-current],.active,.selected,.current')].filter(el=>visible(el)&&!el.classList.contains('mool-contract-selected')&&!el.closest(runtimeSelector)).map(el=>normalize(el.getAttribute('aria-label')||el.innerText||el.textContent)).join('|');
return {nativeNodes,forms,selected,url:location.href};
"""


def with_query(url: str, **values: str) -> str:
    parsed = urlsplit(url)
    query = [(key, value) for key, value in parse_qsl(parsed.query, keep_blank_values=True) if key not in values]
    query.extend((key, value) for key, value in values.items())
    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path, urlencode(query), parsed.fragment))


def panel(driver: webdriver.Edge) -> dict:
    return driver.execute_script(PANEL_SCRIPT)


def visible_controls(driver: webdriver.Edge) -> int:
    try:
        return len(LBX.controls(driver))
    except WebDriverException:
        return 0


def usable_product(driver: webdriver.Edge) -> bool:
    return visible_controls(driver) > 0 or bool(driver.execute_script(PRODUCT_USABLE_SCRIPT))


def click_panel_action(driver: webdriver.Edge, label: str) -> bool:
    target = driver.execute_script(
        r"""
        const wanted=arguments[0].toLowerCase();
        const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
        const panel=document.querySelector('[data-mool-resilience="panel"]');
        return panel&&[...panel.querySelectorAll('button,a[href]')].find(el=>normalize(el.getAttribute('aria-label')||el.textContent).toLowerCase().startsWith(wanted))||null;
        """,
        label,
    )
    if target is None:
        return False
    driver.execute_script(
        "arguments[0].scrollIntoView({block:'center',inline:'center',behavior:'instant'})",
        target,
    )
    time.sleep(0.04)
    point = driver.execute_script(
        r"""
        const el=arguments[0],r=el.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
        if(r.width<=0||r.height<=0||x<0||x>=innerWidth||y<0||y>=innerHeight)return null;
        const hit=document.elementFromPoint(x,y);
        if(!hit||!(hit===el||el.contains(hit)))return null;
        return {x,y};
        """,
        target,
    )
    if not point:
        return False
    driver.execute_cdp_cmd(
        "Input.dispatchMouseEvent",
        {"type": "mousePressed", "x": point["x"], "y": point["y"], "button": "left", "clickCount": 1},
    )
    driver.execute_cdp_cmd(
        "Input.dispatchMouseEvent",
        {"type": "mouseReleased", "x": point["x"], "y": point["y"], "button": "left", "clickCount": 1},
    )
    return True


def evidence_for(
    driver: webdriver.Edge,
    evidence_dir: Path,
    viewport: str,
    screen: int,
    scenario: str,
    ordinal: int,
    cache: dict[tuple[str, int], str],
    grouped: bool,
) -> str:
    key = (viewport, screen)
    if grouped and key in cache:
        return cache[key]
    path = evidence_dir / f"{viewport}-{screen:03d}-{ordinal:04d}-{scenario}.png"
    path.write_bytes(driver.get_screenshot_as_png())
    cache[key] = path.as_posix()
    return path.as_posix()


def route_scenario(
    driver: webdriver.Edge,
    url: str,
    viewport: str,
    screen: int,
    scenario: str,
    settle: float,
    evidence_dir: Path,
    ordinal: int,
    evidence_cache: dict[tuple[str, int], str],
) -> dict:
    meta = ROUTE_SCENARIOS[scenario]
    target_url = with_query(url, microScenario=scenario, cycle="2", auditRun=str(time.time_ns()))
    LBX.clear_origin_state(driver, url)
    driver.execute_cdp_cmd("Page.navigate", {"url": target_url})
    first = {"visible": False, "contentVisible": False, "scenario": "", "busy": False, "buttons": [], "visibleButtons": []}
    initial_deadline = time.monotonic() + 3.0
    while time.monotonic() < initial_deadline:
        try:
            candidate = panel(driver)
            if candidate["visible"] and candidate["contentVisible"]:
                first = candidate
                break
        except WebDriverException:
            pass
        time.sleep(0.025)
    passed = False
    observed = ""
    recovery = False
    if scenario == "route-loading":
        deadline = time.monotonic() + 2.8
        final = panel(driver)
        usable_after = False
        while time.monotonic() < deadline:
            final = panel(driver)
            if not final["visible"]:
                usable_after = usable_product(driver)
                if usable_after:
                    break
            time.sleep(0.08)
        passed = first["visible"] and first["contentVisible"] and first["busy"] and not final["visible"] and usable_after
        observed = (
            "Route-specific busy state settled into the usable screen."
            if passed
            else f"busy={first['busy']} panelVisible={first['visible']} contentVisible={first['contentVisible']} visibleAfter={final['visible']}"
        )
        recovery = passed
    else:
        expected_action = meta["primary"]
        has_action = any(item.lower().startswith(expected_action.lower()) for item in first["visibleButtons"])
        if first["visible"] and first["contentVisible"] and first["scenario"] == scenario and has_action:
            before_url = driver.current_url
            clicked = click_panel_action(driver, expected_action)
            time.sleep(max(0.18, settle))
            final = panel(driver)
            if scenario == "route-unauthorized":
                recovery = clicked and re.search(r"/03-[^/]+[.]html", driver.current_url) is not None
            else:
                recovery = clicked and not final["visible"] and usable_product(driver)
            passed = recovery
            observed = (
                f"{expected_action} completed the recovery path."
                if passed
                else f"panel={first['visible']} action={has_action} clicked={clicked} urlChanged={before_url != driver.current_url} panelAfter={final['visible']}"
            )
        else:
            observed = f"Forced state was not rendered with its required visible action. panel={first['visible']} content={first['contentVisible']} visibleButtons={first['visibleButtons']} allButtons={first['buttons']}"
    record = {
        "ticket": meta["ticket"],
        "screen": screen,
        "viewport": viewport,
        "scenario": scenario,
        "path": [scenario],
        "status": "passed" if passed else "failed",
        "expectedResult": meta["expected"],
        "observedResult": observed,
        "recoveryVerified": recovery,
    }
    if not passed:
        record["evidence"] = evidence_for(
            driver, evidence_dir, viewport, screen, scenario, ordinal, evidence_cache, grouped=True
        )
    return record


def prepare_action(
    driver: webdriver.Edge,
    url: str,
    path: list[dict],
    scenario: str,
    settle: float,
) -> tuple[object, dict, dict]:
    target_label = path[-1].get("label", "")
    LBX.clear_origin_state(driver, url)
    driver.get(
        with_query(
            url,
            microScenario=scenario,
            microTarget=target_label,
            cycle="2",
            auditRun=str(time.time_ns()),
        )
    )
    time.sleep(max(0.12, settle))
    driver.execute_script("window.__moolMicroDisarmed=true")
    for descriptor in path[:-1]:
        before_url = driver.current_url
        LBX.physical_tap(driver, descriptor)
        LBX.wait_for_motion(driver, settle)
        if LBX.meaningful_url_change(before_url, driver.current_url):
            raise WebDriverException("Nested prefix navigated before adversarial target")
    driver.execute_script("window.__moolMicroDisarmed=false")
    target = LBX.find_control(driver, path[-1])
    LBX.center_control(driver, target)
    LBX.wait_for_motion(driver, settle)
    driver.execute_script("arguments[0].setAttribute('data-mool-micro-target','true')", target)
    before = product_snapshot(driver)
    return target, before, {"url": driver.current_url, "controls": LBX.controls(driver)}


def product_snapshot(driver: webdriver.Edge) -> dict:
    value = driver.execute_script(PRODUCT_SNAPSHOT_SCRIPT)
    value["nativeHash"] = hashlib.sha256(value.pop("nativeNodes").encode("utf-8")).hexdigest()
    return value


def native_completion(driver: webdriver.Edge, before: dict) -> bool:
    try:
        after = product_snapshot(driver)
        return LBX.meaningful_url_change(before.get("url", ""), after.get("url", "")) or any(
            before.get(key) != after.get(key)
            for key in ("nativeHash", "forms", "selected")
        )
    except WebDriverException:
        return True


def valid_value(descriptor: dict) -> str:
    def format_number(value: float) -> str:
        return str(int(value)) if float(value).is_integer() else str(value)

    input_type = descriptor.get("type", "").lower()
    input_mode = descriptor.get("inputmode", "").lower()
    maximum_length = descriptor.get("maxlength", "")
    digit_length = int(maximum_length) if str(maximum_length).isdigit() and int(maximum_length) > 0 else 0
    if input_type == "email":
        return "audit@example.com"
    if input_type == "tel":
        return "9" * digit_length if digit_length else "9876543210"
    if input_type == "number":
        minimum = descriptor.get("min", "")
        maximum = descriptor.get("max", "")
        if minimum not in {"", None}:
            return format_number(max(float(minimum), 1))
        if maximum not in {"", None}:
            return format_number(min(float(maximum), 42))
        return "42"
    if input_mode in {"numeric", "decimal"}:
        return "4" * digit_length if digit_length else "42"
    if input_type == "date":
        return "2026-07-18"
    if input_type == "time":
        return "12:30"
    if input_type == "month":
        return "2026-07"
    if input_type == "week":
        return "2026-W29"
    if input_type == "datetime-local":
        return "2026-07-18T12:30"
    return "verified audit value"


def invalid_value(descriptor: dict) -> str:
    input_type = descriptor.get("type", "").lower()
    if input_type == "email":
        return "not-an-email"
    if input_type == "number":
        if descriptor.get("max", "") not in {"", None}:
            return str(float(descriptor["max"]) + 100)
        if descriptor.get("min", "") not in {"", None}:
            return str(float(descriptor["min"]) - 100)
        return "not-a-number"
    if input_type == "tel" or descriptor.get("inputmode", "").lower() in {"numeric", "decimal"}:
        return "12x"
    minimum = descriptor.get("minlength", "")
    if str(minimum).isdigit() and int(minimum) > 1:
        return "x" * (int(minimum) - 1)
    maximum = descriptor.get("maxlength", "")
    if str(maximum).isdigit() and int(maximum) > 0:
        return "x" * (int(maximum) + 5)
    return "invalid"


def type_field(element, value: str) -> None:
    element.send_keys(Keys.CONTROL, "a")
    element.send_keys(Keys.BACKSPACE)
    if value:
        element.send_keys(value)
    element.send_keys(Keys.TAB)


def action_scenario(
    driver: webdriver.Edge,
    url: str,
    viewport: str,
    screen: int,
    path: list[dict],
    scenario: str,
    settle: float,
    evidence_dir: Path,
    ordinal: int,
    evidence_cache: dict[tuple[str, int], str],
) -> dict:
    meta = ACTION_SCENARIOS[scenario]
    passed = False
    observed = ""
    recovery = False
    cancel_verified = False
    try:
        target, before, _ = prepare_action(driver, url, path, scenario, settle)
        if scenario in {"empty-input", "invalid-input"}:
            LBX.physical_tap(driver, path[-1], prepared=True)
            attempted_value = "" if scenario == "empty-input" else invalid_value(path[-1])
            type_field(target, attempted_value)
            time.sleep(0.08)
            invalid = driver.execute_script(FIELD_STATE_SCRIPT, target)
            target.click()
            type_field(target, valid_value(path[-1]))
            time.sleep(0.08)
            recovered = driver.execute_script(FIELD_STATE_SCRIPT, target)
            explicit_error = bool(invalid["invalid"] and invalid["error"] and invalid["errorVisible"])
            native_prevention = bool(
                scenario == "invalid-input"
                and invalid["value"] != attempted_value
            )
            passed = bool(
                (explicit_error or native_prevention)
                and not recovered["invalid"]
                and recovered["nativeValid"]
                and recovered["value"]
            )
            recovery = passed
            observed = (
                (
                    "The browser prevented the invalid value and accepted the valid replacement."
                    if native_prevention and not explicit_error
                    else "Field error was specific and cleared after a valid value."
                )
                if passed
                else f"invalidState={invalid} recoveredState={recovered}"
            )
        elif scenario == "action-loading":
            LBX.physical_tap(driver, path[-1], prepared=True)
            first = panel(driver)
            deadline = time.monotonic() + 1.8
            final = panel(driver)
            completed = False
            while time.monotonic() < deadline:
                final = panel(driver)
                if not final["visible"]:
                    completed = native_completion(driver, before)
                    if completed:
                        break
                time.sleep(0.08)
            recovery = first["visible"] and first["contentVisible"] and first["busy"] and not final["visible"] and completed
            passed = recovery
            observed = (
                "Progress appeared immediately and the original action completed."
                if passed
                else f"panel={first} panelAfter={final['visible']} nativeCompletion={completed}"
            )
        elif scenario in {"action-offline", "action-error"}:
            expected_retry = "Retry connection" if scenario == "action-offline" else "Try again"
            LBX.physical_tap(driver, path[-1], prepared=True)
            first = panel(driver)
            has_cancel = any(item.lower().startswith("cancel") for item in first["visibleButtons"])
            has_retry = any(item.lower().startswith(expected_retry.lower()) for item in first["visibleButtons"])
            clicked_cancel = click_panel_action(driver, "Cancel") if has_cancel else False
            time.sleep(0.08)
            cancel_verified = clicked_cancel and not panel(driver)["visible"] and not LBX.meaningful_url_change(before["url"], driver.current_url)

            target, retry_before, _ = prepare_action(driver, url, path, scenario, settle)
            LBX.physical_tap(driver, path[-1], prepared=True)
            retry_panel = panel(driver)
            clicked_retry = click_panel_action(driver, expected_retry)
            time.sleep(max(0.32, settle * 2))
            recovery = clicked_retry and not panel(driver)["visible"] and native_completion(driver, retry_before)
            passed = bool(first["visible"] and first["contentVisible"] and retry_panel["visible"] and retry_panel["contentVisible"] and has_cancel and has_retry and cancel_verified and recovery)
            observed = (
                "Cancel preserved context and Retry completed the exact original action."
                if passed
                else f"panel={first['visible']} cancel={cancel_verified} retryAction={has_retry} recovery={recovery}"
            )
        elif scenario == "permission-denied":
            LBX.physical_tap(driver, path[-1], prepared=True)
            first = panel(driver)
            has_settings = any(item.lower().startswith("open device settings") for item in first["visibleButtons"])
            has_fallback = any(item.lower().startswith("continue without permission") for item in first["visibleButtons"])
            clicked_fallback = click_panel_action(driver, "Continue without permission")
            time.sleep(0.08)
            fallback_status = driver.execute_script(STATUS_SCRIPT)
            fallback_verified = clicked_fallback and not panel(driver)["visible"] and bool(fallback_status)

            target, _, _ = prepare_action(driver, url, path, scenario, settle)
            LBX.physical_tap(driver, path[-1], prepared=True)
            clicked_settings = click_panel_action(driver, "Open device settings")
            time.sleep(0.08)
            settings_status = driver.execute_script(STATUS_SCRIPT)
            recovery = clicked_settings and bool(settings_status)
            passed = bool(first["visible"] and first["contentVisible"] and has_settings and has_fallback and fallback_verified and recovery)
            observed = (
                "Permission denial offered settings, a usable fallback and cancellation without losing context."
                if passed
                else f"panel={first['visible']} settings={has_settings} fallback={has_fallback} fallbackResult={fallback_verified} settingsResult={recovery}"
            )
        elif scenario == "duplicate":
            LBX.physical_tap(driver, path[-1], prepared=True)
            time.sleep(0.1)
            duplicate_panel = panel(driver)
            reference = re.search(r"\bC2-[A-Z0-9-]+\b", duplicate_panel["text"])
            has_result = any(item.lower().startswith("view result") for item in duplicate_panel["visibleButtons"])
            opened = click_panel_action(driver, "View result") if has_result else False
            time.sleep(0.08)
            result_status = driver.execute_script(STATUS_SCRIPT)
            recovery = bool(opened and reference and reference.group(0) in result_status and not panel(driver)["visible"])
            passed = bool(duplicate_panel["visible"] and duplicate_panel["contentVisible"] and "duplicate stopped" in duplicate_panel["text"].lower() and reference and has_result and recovery)
            observed = (
                f"Duplicate stopped; original reference {reference.group(0)} retained and opened."
                if passed
                else f"panel={duplicate_panel} opened={opened} status={result_status}"
            )
    except WebDriverException as exc:
        observed = re.sub(r"\s+", " ", str(exc)).strip()[:800]

    record = {
        "ticket": meta["ticket"],
        "screen": screen,
        "viewport": viewport,
        "scenario": scenario,
        "path": [item.get("label", "") for item in path],
        "status": "passed" if passed else "failed",
        "expectedResult": meta["expected"],
        "observedResult": observed,
        "cancelVerified": cancel_verified,
        "recoveryVerified": recovery,
    }
    if not passed:
        record["evidence"] = evidence_for(
            driver, evidence_dir, viewport, screen, scenario, ordinal, evidence_cache, grouped=False
        )
    return record


def applicable_scenarios(result: dict) -> list[str]:
    descriptor = (result.get("pathDescriptors") or [{}])[-1]
    intent = result.get("userIntent", "")
    label = descriptor.get("label", result.get("control", ""))
    tag = descriptor.get("tag", "")
    role = descriptor.get("role", "").lower()
    terminal_control = tag in {"BUTTON", "A"} or role == "button"
    scenarios: list[str] = []
    if intent == "task" and terminal_control and TERMINAL_PATTERN.search(label) and not re.search(r"\b(cancel|back|close|retry)\b", label, re.IGNORECASE):
        scenarios.extend(["action-loading", "action-offline", "action-error", "duplicate"])
    if intent == "handoff" and PERMISSION_PATTERN.search(label):
        scenarios.append("permission-denied")
    input_type = descriptor.get("type", "").lower()
    if tag in {"INPUT", "TEXTAREA"} or descriptor.get("contenteditable"):
        if descriptor.get("required"):
            scenarios.append("empty-input")
        constrained = bool(
            input_type in INPUT_TYPES
            or descriptor.get("inputmode", "").lower() in {"numeric", "decimal"}
            or descriptor.get("pattern")
            or descriptor.get("min") not in {"", None}
            or descriptor.get("max") not in {"", None}
            or descriptor.get("minlength") not in {"", None}
            or descriptor.get("maxlength") not in {"", None}
        )
        if constrained and input_type not in {"date", "time", "month", "week", "datetime-local"}:
            scenarios.append("invalid-input")
    return scenarios


def write_markdown(report: dict, output: Path) -> None:
    summary = report["summary"]
    lines = [
        "# Second-Cycle Adversarial Micro-Interaction Audit",
        "",
        f"Generated: {report['generatedAt']}",
        "",
        "## Result",
        "",
        f"Status: **{summary['status']}**",
        "",
        "| Measure | Result |",
        "| --- | ---: |",
        f"| Screen/viewport runs | {summary['screenViewportRuns']} |",
        f"| Route resilience scenarios | {summary['routeScenariosTested']} |",
        f"| Action/input adversarial scenarios | {summary['actionScenariosTested']} |",
        f"| Passed | {summary['passed']} |",
        f"| Failed | {summary['failed']} |",
        f"| Cancel branches verified | {summary['cancelBranchesVerified']} |",
        f"| Recovery branches verified | {summary['recoveryBranchesVerified']} |",
        f"| Severe console errors | {summary['consoleErrors']} |",
        "",
        "## Findings",
        "",
        "| Ticket | Viewport | Screen | Scenario | Exact path | Observed | Evidence |",
        "| --- | --- | ---: | --- | --- | --- | --- |",
    ]
    for run in report["runs"]:
        for item in [*run["routeResults"], *run["actionResults"]]:
            if item["status"] != "failed":
                continue
            evidence = item.get("evidence", "")
            evidence_link = f"[screenshot]({Path(evidence).name})" if evidence else ""
            path = " → ".join(item.get("path", []))
            lines.append(
                f"| {item['ticket']} | {item['viewport']} | {item['screen']:03d} | {item['scenario']} | "
                f"{path.replace('|', chr(92)+'|')} | {item['observedResult'].replace('|', chr(92)+'|')} | {evidence_link} |"
            )
    output.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--base-url", default="http://127.0.0.1:8765")
    parser.add_argument("--positive-report", type=Path)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--markdown-output", type=Path)
    parser.add_argument("--evidence-dir", type=Path)
    parser.add_argument("--screen", type=int, action="append", default=[])
    parser.add_argument("--screen-from", type=int)
    parser.add_argument("--screen-to", type=int)
    parser.add_argument("--viewport", choices=["mobile", "desktop"], action="append", default=[])
    parser.add_argument("--route-only", action="store_true")
    parser.add_argument("--action-only", action="store_true")
    parser.add_argument("--max-action-scenarios-per-screen", type=int, default=1200)
    parser.add_argument("--settle", type=float, default=0.16)
    args = parser.parse_args()

    root = args.root.resolve()
    output = (args.output or root / "quality/generated/second-cycle-adversarial-audit.json").resolve()
    markdown = (args.markdown_output or output.with_suffix(".md")).resolve()
    evidence_dir = (args.evidence_dir or output.parent / "second-cycle-adversarial-evidence").resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    evidence_dir.mkdir(parents=True, exist_ok=True)

    screen_root = root / "approved-final/screens" if (root / "approved-final/screens").exists() else root / "screens"
    screen_files = sorted(
        (
            (int(match.group(1)), path.name)
            for path in screen_root.glob("*.html")
            if (match := re.match(r"^(\d{2,3})-", path.name))
        ),
        key=lambda item: item[0],
    )
    if args.screen:
        selected = set(args.screen)
        screen_files = [item for item in screen_files if item[0] in selected]
    if args.screen_from is not None:
        screen_files = [item for item in screen_files if item[0] >= args.screen_from]
    if args.screen_to is not None:
        screen_files = [item for item in screen_files if item[0] <= args.screen_to]

    positive_index: dict[tuple[int, str], dict] = {}
    if args.positive_report:
        positive = json.loads(args.positive_report.resolve().read_text(encoding="utf-8-sig"))
        positive_index = {(run["screen"], run["viewport"]): run for run in positive.get("runs", [])}

    viewports = {
        "mobile": {"width": 390, "height": 844, "mobile": True},
        "desktop": {"width": 1440, "height": 1000, "mobile": False},
    }
    viewport_names = args.viewport or ["mobile", "desktop"]
    runs: list[dict] = []
    console_errors: list[dict] = []
    evidence_cache: dict[tuple[str, int], str] = {}
    ordinal = 0

    for viewport_name in viewport_names:
        viewport = viewports[viewport_name]
        options = Options()
        options.add_argument("--headless=new")
        options.add_argument(f"--window-size={viewport['width']},{viewport['height']}")
        options.add_argument("--disable-gpu")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-application-cache")
        options.add_argument("--no-first-run")
        options.add_argument("--no-default-browser-check")
        options.page_load_strategy = "none" if args.route_only else "eager"
        options.set_capability("goog:loggingPrefs", {"browser": "ALL"})
        with webdriver.Edge(options=options) as driver:
            driver.set_page_load_timeout(25)
            driver.set_script_timeout(10)
            driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {"source": LBX.CLICK_LISTENER_AND_SYSTEM_PROBE})
            driver.execute_cdp_cmd(
                "Emulation.setDeviceMetricsOverride",
                {
                    "width": viewport["width"],
                    "height": viewport["height"],
                    "deviceScaleFactor": 1,
                    "mobile": viewport["mobile"],
                },
            )
            for screen, file in screen_files:
                print(f"{viewport_name} Screen {screen:03d}: adversarial micro-interaction audit", flush=True)
                url = f"{args.base_url.rstrip('/')}/screens/{file}"
                route_results: list[dict] = []
                action_results: list[dict] = []
                if not args.action_only:
                    for scenario in ROUTE_SCENARIOS:
                        ordinal += 1
                        route_result = route_scenario(
                            driver,
                            url,
                            viewport_name,
                            screen,
                            scenario,
                            args.settle,
                            evidence_dir,
                            ordinal,
                            evidence_cache,
                        )
                        route_results.append(route_result)
                        if route_result["status"] == "failed":
                            print(
                                f"  {viewport_name} Screen {screen:03d} {scenario} failed: {route_result['observedResult']}",
                                flush=True,
                            )
                positive_run = positive_index.get((screen, viewport_name))
                candidates: list[tuple[list[dict], str]] = []
                if not args.route_only and positive_run:
                    for result in positive_run.get("results", []):
                        path = result.get("pathDescriptors") or []
                        if result.get("status") != "passed" or not path:
                            continue
                        for scenario in applicable_scenarios(result):
                            candidates.append((path, scenario))
                truncated = len(candidates) > args.max_action_scenarios_per_screen
                for path, scenario in candidates[: args.max_action_scenarios_per_screen]:
                    ordinal += 1
                    action_results.append(
                        action_scenario(
                            driver,
                            url,
                            viewport_name,
                            screen,
                            path,
                            scenario,
                            args.settle,
                            evidence_dir,
                            ordinal,
                            evidence_cache,
                        )
                    )
                    if len(action_results) % 25 == 0:
                        failed = sum(item["status"] == "failed" for item in action_results)
                        print(
                            f"  {viewport_name} Screen {screen:03d}: {len(action_results)} adversarial paths, {failed} issues",
                            flush=True,
                        )
                runs.append(
                    {
                        "screen": screen,
                        "file": file,
                        "viewport": viewport_name,
                        "positivePathsReferenced": positive_run.get("pathsTested", 0) if positive_run else 0,
                        "routeResults": route_results,
                        "actionResults": action_results,
                        "truncated": truncated,
                        "queuedActionScenariosRemaining": max(0, len(candidates) - args.max_action_scenarios_per_screen),
                    }
                )
                for entry in driver.get_log("browser"):
                    if entry.get("level") == "SEVERE" and "favicon.ico" not in entry.get("message", ""):
                        console_errors.append({"viewport": viewport_name, "screen": screen, **entry})

    all_results = [
        item
        for run in runs
        for item in [*run["routeResults"], *run["actionResults"]]
    ]
    summary = {
        "status": "passed",
        "screenViewportRuns": len(runs),
        "uniqueScreens": len({run["screen"] for run in runs}),
        "routeScenariosTested": sum(len(run["routeResults"]) for run in runs),
        "actionScenariosTested": sum(len(run["actionResults"]) for run in runs),
        "passed": sum(item["status"] == "passed" for item in all_results),
        "failed": sum(item["status"] == "failed" for item in all_results),
        "cancelBranchesVerified": sum(bool(item.get("cancelVerified")) for item in all_results),
        "recoveryBranchesVerified": sum(bool(item.get("recoveryVerified")) for item in all_results),
        "truncatedScreens": sum(bool(run["truncated"]) for run in runs),
        "consoleErrors": len(console_errors),
    }
    if summary["failed"] or summary["truncatedScreens"] or summary["consoleErrors"]:
        summary["status"] = "failed"
    report = {
        "version": "second-cycle-adversarial-micro-audit-2026-07-16",
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "baseUrl": args.base_url,
        "positiveReport": str(args.positive_report.resolve()) if args.positive_report else "",
        "rule": "Every forced route or action failure condition must expose a domain-specific recovery path and complete the original intent after recovery.",
        "viewports": {name: viewports[name] for name in viewport_names},
        "summary": summary,
        "runs": runs,
        "consoleErrors": console_errors,
    }
    output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    write_markdown(report, markdown)
    print(json.dumps({"output": str(output), "markdown": str(markdown), **summary}, indent=2), flush=True)
    return 0 if summary["status"] == "passed" else 1


if __name__ == "__main__":
    raise SystemExit(main())
