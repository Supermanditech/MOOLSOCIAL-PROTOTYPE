"""Discover and exercise controls revealed after user taps.

The initial rendered-control audit proves only the first visible state. This
runner replays button paths from a clean 390x844 Edge session, discovers newly
visible controls in sheets, dialogs, watch/detail modes and inline expansions,
then exercises those controls through a bounded breadth-first traversal.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
import threading
import time
from collections import deque
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlparse

from selenium import webdriver
from selenium.common.exceptions import (
    ElementClickInterceptedException,
    ElementNotInteractableException,
    NoSuchElementException,
    StaleElementReferenceException,
    WebDriverException,
)
from selenium.webdriver.edge.options import Options


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, _format: str, *_args: object) -> None:
        return


class QuietServer(ThreadingHTTPServer):
    def handle_error(self, _request: object, _client_address: object) -> None:
        return


CONTROL_SCRIPT = r"""
const selector='button,a[href],input,select,textarea,[role="button"],[role="tab"],[role="switch"],[data-audit-click-listener="true"]';
const semanticSelector='button,a[href],input,select,textarea,[role="button"],[role="tab"],[role="switch"]';
const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
const overlaySelector='[aria-modal="true"],.sheet.open,.action-sheet.open,.sheet-layer:not([hidden]),.layer:not([hidden]),.modal.open,.detail.open,.mool-contract-backdrop,.filter-layer:not(.is-hidden),.apply-layer:not(.is-hidden)';
const phone=document.querySelector('.production-phone,.phone-frame,.device,.phone');
const blockers=[...document.querySelectorAll(overlaySelector)].filter(node=>{const s=getComputedStyle(node),r=node.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&(s.position==='fixed'||s.position==='absolute'||node.classList.contains('mool-contract-backdrop'))});
const visible=el=>{
  const s=getComputedStyle(el),r=el.getBoundingClientRect();
  const blocked=blockers.some(layer=>layer!==el&&!layer.contains(el));
  const userSurface=!phone||phone.contains(el)||!!el.closest('.mool-contract-backdrop,[aria-modal="true"],.sheet.open,.action-sheet.open,.sheet-layer:not([hidden]),.layer:not([hidden]),.modal.open,.detail.open');
  return userSurface&&!blocked&&!el.disabled&&!el.readOnly&&el.getAttribute('aria-disabled')!=='true'&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.05&&r.width>0&&r.height>0&&!el.closest('[hidden]');
};
const listenerSurface=el=>{
  if(el.matches(semanticSelector))return true;
  const cls=normalize(el.className||'');
  const surface=/(^|[-_\s])(card|tile|item|row|choice|option|preview|chip|trigger|entry|line)([-_\s]|$)/i.test(cls);
  const container=/(^|[-_\s])(actions|grid|list|body|stage|shell|tray|fields|tabs|container)([-_\s]|$)/i.test(cls);
  return surface&&!container;
};
const all=[...document.querySelectorAll(selector)].filter(el=>visible(el)&&listenerSurface(el));
const label=el=>normalize(el.getAttribute('aria-label')||el.getAttribute('title')||el.getAttribute('placeholder')||el.innerText||el.textContent||el.value||el.name)||`[unlabelled ${el.tagName.toLowerCase()}]`;
return all.map((el,index)=>{
  const text=label(el),tag=el.tagName;
  const occurrence=all.slice(0,index).filter(other=>other.tagName===tag&&label(other)===text).length;
  const context=el.closest('[role="dialog"],[aria-modal="true"],.sheet,.action-sheet,.sheet-layer,.layer,.modal,.mool-contract-backdrop,form,.composer');
  const r=el.getBoundingClientRect();
  const withinViewport=r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;
  const directSurface=el.getAttribute('data-audit-click-listener')==='true'&&!el.matches(semanticSelector);
  const left=Math.max(0,r.left),right=Math.min(innerWidth,r.right),top=Math.max(0,r.top),bottom=Math.min(innerHeight,r.bottom);
  const points=[[.5,.5],[.2,.5],[.8,.5],[.5,.2],[.5,.8]];
  const exposed=!withinViewport||points.some(([xp,yp])=>{const hit=document.elementFromPoint(left+(right-left)*xp,top+(bottom-top)*yp);const nested=hit&&hit.closest?hit.closest(semanticSelector):null;return hit&&(hit===el||el.contains(hit))&&(!directSurface||!nested||nested===el)});
  const tappable=!el.matches('.root-action-button[data-root-cycle]:not([data-root-cycle="1"])')&&!el.closest('.short-card:not(.active),[aria-hidden="true"]')&&exposed;
  const data=[...el.attributes].filter(a=>a.name.startsWith('data-')).map(a=>`${a.name}=${a.value}`).sort().join(';');
  const stableClass=normalize(el.className||'').split(' ').filter(name=>name&&!['active','selected','current','done','open','mool-contract-selected'].includes(name)).join(' ');
  const identity=[tag,el.id||'',stableClass,data,index].join('|');
  const selected=el.matches('[aria-pressed="true"],[aria-selected="true"],[aria-current],.active,.selected,.current,.mool-contract-selected');
  return {label:text,tag,occurrence,index,identity,href:el.href||'',type:el.type||'',inputmode:el.getAttribute('inputmode')||'',context:context?normalize(context.getAttribute('aria-label')||context.className||context.id||context.getAttribute('role')):'',runtime:!!el.closest('.mool-contract-backdrop'),tappable,selected,directSurface};
});
"""


FIND_SCRIPT = r"""
const d=arguments[0],selector='button,a[href],input,select,textarea,[role="button"],[role="tab"],[role="switch"],[data-audit-click-listener="true"]';
const semanticSelector='button,a[href],input,select,textarea,[role="button"],[role="tab"],[role="switch"]';
const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
const overlaySelector='[aria-modal="true"],.sheet.open,.action-sheet.open,.sheet-layer:not([hidden]),.layer:not([hidden]),.modal.open,.detail.open,.mool-contract-backdrop,.filter-layer:not(.is-hidden),.apply-layer:not(.is-hidden)';
const phone=document.querySelector('.production-phone,.phone-frame,.device,.phone');
const blockers=[...document.querySelectorAll(overlaySelector)].filter(node=>{const s=getComputedStyle(node),r=node.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&(s.position==='fixed'||s.position==='absolute'||node.classList.contains('mool-contract-backdrop'))});
const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect(),blocked=blockers.some(layer=>layer!==el&&!layer.contains(el));const userSurface=!phone||phone.contains(el)||!!el.closest('.mool-contract-backdrop,[aria-modal="true"],.sheet.open,.action-sheet.open,.sheet-layer:not([hidden]),.layer:not([hidden]),.modal.open,.detail.open');return userSurface&&!blocked&&!el.disabled&&!el.readOnly&&el.getAttribute('aria-disabled')!=='true'&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.05&&r.width>0&&r.height>0&&!el.closest('[hidden]')};
const listenerSurface=el=>{if(el.matches(semanticSelector))return true;const cls=normalize(el.className||'');const surface=/(^|[-_\s])(card|tile|item|row|choice|option|preview|chip|trigger|entry|line)([-_\s]|$)/i.test(cls);const container=/(^|[-_\s])(actions|grid|list|body|stage|shell|tray|fields|tabs|container)([-_\s]|$)/i.test(cls);return surface&&!container};
const all=[...document.querySelectorAll(selector)].filter(el=>visible(el)&&listenerSurface(el));
const label=el=>normalize(el.getAttribute('aria-label')||el.getAttribute('title')||el.getAttribute('placeholder')||el.innerText||el.textContent||el.value||el.name)||`[unlabelled ${el.tagName.toLowerCase()}]`;
const identity=(el,index)=>{const data=[...el.attributes].filter(a=>a.name.startsWith('data-')).map(a=>`${a.name}=${a.value}`).sort().join(';');const stableClass=normalize(el.className||'').split(' ').filter(name=>name&&!['active','selected','current','done','open','mool-contract-selected'].includes(name)).join(' ');return [el.tagName,el.id||'',stableClass,data,index].join('|')};
const exposed=el=>{const r=el.getBoundingClientRect(),left=Math.max(0,r.left),right=Math.min(innerWidth,r.right),top=Math.max(0,r.top),bottom=Math.min(innerHeight,r.bottom);if(right<=left||bottom<=top)return false;const direct=el.getAttribute('data-audit-click-listener')==='true'&&!el.matches(semanticSelector);const points=[[.5,.5],[.2,.5],[.8,.5],[.5,.2],[.5,.8]];return points.some(([xp,yp])=>{const hit=document.elementFromPoint(left+(right-left)*xp,top+(bottom-top)*yp);const nested=hit&&hit.closest?hit.closest(semanticSelector):null;return hit&&(hit===el||el.contains(hit))&&(!direct||!nested||nested===el)})};
if(d.identity){const exact=all.find((el,index)=>identity(el,index)===d.identity&&(!d.requireExposed||exposed(el)));if(exact)return exact}
let matches=all.filter(el=>el.tagName===d.tag&&label(el)===d.label);
if(d.runtime)matches=matches.filter(el=>!!el.closest('.mool-contract-backdrop'));
if(d.requireExposed)matches=matches.filter(exposed);
return matches[d.occurrence||0]||matches[0]||null;
"""


SNAPSHOT_SCRIPT = r"""
const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.05&&r.width>0&&r.height>0&&!el.closest('[hidden]')};
const visibleNodes=[...document.querySelectorAll('body,body *')].filter(visible).map(el=>{
  const data=[...el.attributes].filter(a=>a.name.startsWith('data-')&&!a.name.startsWith('data-audit-')).map(a=>`${a.name}=${a.value}`).sort().join(';');
  const aria=[...el.attributes].filter(a=>a.name.startsWith('aria-')).map(a=>`${a.name}=${a.value}`).sort().join(';');
  return [el.tagName,el.id||'',normalize(el.className||''),data,aria,normalize(el.innerText||el.textContent)].join('|');
}).join('\n');
const signals=[...document.querySelectorAll('[role="status"],[role="alert"],[role="dialog"],[aria-live],.toast,.sheet.open,.action-sheet.open,.sheet-layer:not([hidden]),.layer:not([hidden]),.modal.open,.result,.success,.confirmation,.mool-contract-backdrop')].filter(visible).map(el=>normalize(el.innerText||el.textContent)).join(' | ').slice(0,1400);
const forms=[...document.querySelectorAll('input,select,textarea')].filter(visible).map(el=>`${el.type||el.tagName}:${el.value||''}:${el.checked?'1':'0'}:${el.selectedIndex??''}`).join('|');
const selected=[...document.querySelectorAll('[aria-pressed="true"],[aria-selected="true"],[aria-current],.active,.selected,.current,.mool-contract-selected')].filter(visible).map(el=>normalize(el.getAttribute('aria-label')||el.innerText||el.textContent)).join('|');
const focus=document.activeElement?normalize(document.activeElement.getAttribute('aria-label')||document.activeElement.getAttribute('placeholder')||document.activeElement.innerText||document.activeElement.textContent||document.activeElement.tagName):'';
const scroll=[scrollX,scrollY,...[...document.querySelectorAll('*')].filter(el=>el.scrollTop||el.scrollLeft).slice(0,30).map(el=>`${el.scrollLeft}:${el.scrollTop}`)].join('|');
return {html:visibleNodes,signals,forms,selected,focus,scroll,url:location.href};
"""


def signature(control: dict) -> str:
    return f"{control.get('tag')}|{control.get('label')}|{control.get('occurrence', 0)}"


def compact(control: dict) -> dict:
    return {
        "label": control.get("label", ""),
        "tag": control.get("tag", ""),
        "occurrence": int(control.get("occurrence", 0)),
        "href": control.get("href", ""),
        "type": control.get("type", ""),
        "inputmode": control.get("inputmode", ""),
        "context": control.get("context", ""),
        "runtime": bool(control.get("runtime")),
        "identity": control.get("identity", ""),
        "tappable": bool(control.get("tappable")),
        "selected": bool(control.get("selected")),
        "directSurface": bool(control.get("directSurface")),
    }


def meaningful_url_change(before: str, after: str) -> bool:
    """Ignore bare/hash-only anchors; they do not complete a product intent."""
    left = urlparse(before)
    right = urlparse(after)
    return (left.scheme, left.netloc, left.path, left.query) != (
        right.scheme,
        right.netloc,
        right.path,
        right.query,
    )


FOLLOW_UP_PATTERN = re.compile(
    r"^(?:add|apply|approve|book|complete|confirm|continue|create|dispatch|done|finish|invite|join|next|open|order|pay|place|post|prepare|publish|return|review|save|search|send|share|start|submit|track|upload|use|verify)\b",
    re.IGNORECASE,
)

AUDIT_QUERY_KEYS = {"nestedAudit", "nestedInventory", "visualActionAudit", "controlAudit"}

CLICK_LISTENER_PROBE = r"""
(() => {
  if (window.__moolAuditClickProbeInstalled) return;
  window.__moolAuditClickProbeInstalled = true;
  const original = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'click' && this instanceof Element) {
      this.setAttribute('data-audit-click-listener', 'true');
    }
    return original.call(this, type, listener, options);
  };
})();
"""


def canonical_state_location(value: str) -> tuple[str, str]:
    parsed = urlparse(value)
    query = urlencode([(key, item) for key, item in parse_qsl(parsed.query, keep_blank_values=True) if key not in AUDIT_QUERY_KEYS])
    return parsed.path, query


def snapshot(driver: webdriver.Edge) -> dict:
    value = driver.execute_script(SNAPSHOT_SCRIPT)
    value["hash"] = hashlib.sha256(value.pop("html").encode("utf-8")).hexdigest()
    return value


def state_key(value: dict) -> str:
    return hashlib.sha256(
        "|".join(
            [
                *canonical_state_location(value.get("url", "")),
                value.get("hash", ""),
                value.get("signals", ""),
                value.get("forms", ""),
                value.get("selected", ""),
            ]
        ).encode("utf-8")
    ).hexdigest()


def controls(driver: webdriver.Edge) -> list[dict]:
    return [compact(item) for item in driver.execute_script(CONTROL_SCRIPT)]


def find_control(driver: webdriver.Edge, descriptor: dict, require_exposed: bool = False):
    query = {**descriptor, "requireExposed": require_exposed}
    deadline = time.monotonic() + 2.0
    element = None
    while element is None and time.monotonic() < deadline:
        element = driver.execute_script(FIND_SCRIPT, query)
        if element is None:
            time.sleep(0.025)
    if element is None:
        element = driver.execute_script(FIND_SCRIPT, query)
    if element is None:
        raise NoSuchElementException(f"control not found: {descriptor.get('label')}")
    return element


def center_control(driver: webdriver.Edge, element) -> None:
    """Move a control to the usable centre of every scrollable ancestor."""
    driver.execute_script(
        """
        const el=arguments[0];
        for(let parent=el.parentElement;parent&&parent!==document.body&&parent!==document.documentElement;parent=parent.parentElement){
          if(parent.scrollHeight<=parent.clientHeight+1&&parent.scrollWidth<=parent.clientWidth+1)continue;
          const er=el.getBoundingClientRect(),pr=parent.getBoundingClientRect();
          if(parent.scrollHeight>parent.clientHeight+1){
            parent.scrollTop+=er.top+er.height/2-(pr.top+parent.clientHeight/2);
          }
          if(parent.scrollWidth>parent.clientWidth+1){
            parent.scrollLeft+=er.left+er.width/2-(pr.left+parent.clientWidth/2);
          }
        }
        const r=el.getBoundingClientRect(),margin=8;
        const phone=el.closest('.phone,.phone-frame,.device,.production-phone');
        const pr=phone&&phone.getBoundingClientRect();
        const compactPhone=pr&&pr.height<=innerHeight-16&&pr.top>=0&&pr.bottom<=innerHeight;
        if(!compactPhone){
          window.scrollBy(r.left+r.width/2-innerWidth/2,r.top+r.height/2-innerHeight/2);
        }else{
          if(r.top<margin)window.scrollBy(0,r.top-margin);
          else if(r.bottom>innerHeight-margin)window.scrollBy(0,r.bottom-innerHeight+margin);
          if(r.left<margin)window.scrollBy(r.left-margin,0);
          else if(r.right>innerWidth-margin)window.scrollBy(r.right-innerWidth+margin,0);
        }
        """,
        element,
    )


def wait_for_motion(driver: webdriver.Edge, settle: float, timeout: float = 0.08) -> None:
    """Wait for the selected settle time and any short CSS transition."""
    time.sleep(settle)
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            moving = int(
                driver.execute_script(
                    "return document.getAnimations ? document.getAnimations().filter(a=>{const t=a.effect&&a.effect.getComputedTiming?a.effect.getComputedTiming():null;return a.playState==='running'&&t&&Number.isFinite(t.endTime)&&t.endTime<=2000}).length : 0"
                )
            )
        except WebDriverException:
            return
        if not moving:
            return
        time.sleep(0.025)


def tap(driver: webdriver.Edge, descriptor: dict, type_value: str = "audit", prepared: bool = False) -> None:
    element = find_control(driver, descriptor, require_exposed=prepared)
    if not prepared:
        center_control(driver, element)
    tag = descriptor.get("tag", "")
    input_type = descriptor.get("type", "").lower()
    input_mode = descriptor.get("inputmode", "").lower()
    point = driver.execute_script(
        """
        const el=arguments[0],r=el.getBoundingClientRect();
        const left=Math.max(0,r.left),right=Math.min(innerWidth,r.right),top=Math.max(0,r.top),bottom=Math.min(innerHeight,r.bottom);
        if(right<=left||bottom<=top)return null;
        const semantic='button,a[href],input,select,textarea,[role="button"],[role="tab"],[role="switch"]';
        const direct=arguments[1];
        const points=[[.5,.5],[.25,.5],[.75,.5],[.5,.25],[.5,.75],[.2,.2],[.8,.2],[.2,.8],[.8,.8]];
        for(const [xp,yp] of points){
          const x=left+(right-left)*xp;
          const y=top+(bottom-top)*yp;
          const hit=document.elementFromPoint(x,y);
          const nested=hit&&hit.closest?hit.closest(semantic):null;
          if(hit&&(hit===el||el.contains(hit))&&(!direct||!nested||nested===el))return {x,y};
        }
        return null;
        """,
        element,
        bool(descriptor.get("directSurface")),
    )
    if not point:
        raise ElementClickInterceptedException(f"no exposed tap point: {descriptor.get('label')}")

    def physical_click() -> None:
        x, y = float(point["x"]), float(point["y"])
        driver.execute_cdp_cmd("Input.dispatchMouseEvent", {"type": "mousePressed", "x": x, "y": y, "button": "left", "clickCount": 1})
        driver.execute_cdp_cmd("Input.dispatchMouseEvent", {"type": "mouseReleased", "x": x, "y": y, "button": "left", "clickCount": 1})

    if tag in {"INPUT", "TEXTAREA"} and input_type not in {"button", "submit", "checkbox", "radio", "range", "color", "file"}:
        physical_click()
        if input_type in {"date", "month", "week", "time", "datetime-local"}:
            valid_values = {
                "date": "2026-07-15",
                "month": "2026-07",
                "week": "2026-W29",
                "time": "12:30",
                "datetime-local": "2026-07-15T12:30",
            }
            driver.execute_script(
                "arguments[0].value=arguments[1];arguments[0].dispatchEvent(new Event('input',{bubbles:true}));arguments[0].dispatchEvent(new Event('change',{bubbles:true}))",
                element,
                valid_values[input_type],
            )
        else:
            element.clear()
            if input_type == "email":
                element.send_keys("audit@example.com")
            elif input_type == "tel" or input_mode in {"numeric", "decimal"}:
                element.send_keys("9876543210" if input_type == "tel" else "123456")
            else:
                element.send_keys("42" if input_type == "number" else type_value)
    elif tag == "SELECT":
        driver.execute_script(
            "if(arguments[0].options.length>1){arguments[0].selectedIndex=arguments[0].selectedIndex===0?1:0;arguments[0].dispatchEvent(new Event('change',{bubbles:true}))}",
            element,
        )
    else:
        physical_click()


def replay(driver: webdriver.Edge, url: str, path: list[dict], settle: float) -> dict:
    driver.get(f"{url}{'&' if '?' in url else '?'}nestedAudit={time.time_ns()}")
    time.sleep(max(settle, 0.08))
    before: dict = {}
    before_controls: list[dict] = []
    for index, descriptor in enumerate(path):
        if index == len(path) - 1:
            target = find_control(driver, descriptor)
            center_control(driver, target)
            wait_for_motion(driver, settle)
            before = snapshot(driver)
            before_controls = controls(driver)
            target_was_selected = bool(
                driver.execute_script(
                    "return arguments[0].matches('[aria-pressed=\"true\"],[aria-selected=\"true\"],[aria-current],.active,.selected,.current,.mool-contract-selected')",
                    target,
                )
            )
        prior_url = driver.current_url
        tap(driver, descriptor, type_value="audit-value", prepared=index == len(path) - 1)
        wait_for_motion(driver, settle)
        if index < len(path) - 1 and meaningful_url_change(prior_url, driver.current_url):
            raise WebDriverException("path navigated before the nested target was reached")
    after = snapshot(driver)
    after_controls = controls(driver)
    url_changed = meaningful_url_change(before.get("url", ""), after.get("url", ""))
    observable = any(
        before.get(key) != after.get(key)
        for key in ("hash", "signals", "forms", "selected")
    )
    observable = observable or target_was_selected or url_changed
    target_selected_after = any(
        item.get("tag") == path[-1].get("tag")
        and item.get("label") == path[-1].get("label")
        and item.get("occurrence") == path[-1].get("occurrence")
        and item.get("selected")
        for item in after_controls
    )
    return {
        "pass": observable,
        "outcome": "route" if url_changed else "state" if observable else "dead",
        "beforeControls": before_controls,
        "afterControls": after_controls,
        "signal": after.get("signals", ""),
        "route": after.get("url", "") if url_changed else "",
        "targetBecameSelected": target_selected_after and not target_was_selected,
        "stateKey": state_key(after),
    }


def audit_screen(
    driver: webdriver.Edge,
    base_url: str,
    screen: int,
    file: str,
    max_depth: int,
    max_paths: int,
    settle: float,
    all_controls: bool,
) -> dict:
    url = f"{base_url}/screens/{file}"
    driver.get(f"{url}?nestedInventory={time.time_ns()}")
    time.sleep(max(settle, 0.08))
    initial = controls(driver)
    expanded_states = {state_key(snapshot(driver))}
    initial_signatures = {signature(item) for item in initial}
    roots = [
        [item]
        for item in initial
        if item.get("tappable")
        and ((all_controls and item.get("tag") not in {"HTML", "BODY"}) or (item.get("tag") == "BUTTON" and not item.get("href")))
    ]
    queue: deque[list[dict]] = deque(roots)
    queued = {">".join(signature(item) for item in path) for path in roots}
    results: list[dict] = []
    issues: list[dict] = []

    while queue and len(results) < max_paths:
        path = queue.popleft()
        try:
            result = replay(driver, url, path, settle)
            record = {
                "depth": len(path),
                "path": [item.get("label", "") for item in path],
                "status": "passed" if result["pass"] else "failed",
                "outcome": result["outcome"],
                "route": result["route"],
                "signal": result["signal"],
                "stateKey": result["stateKey"],
            }
            results.append(record)
            if len(results) % 100 == 0:
                print(f"  Screen {screen:03d}: {len(results)} paths tested, {len(queue)} queued", flush=True)
            if not result["pass"]:
                issues.append({**record, "error": "no visible state, input change or navigation"})
                continue
            if len(path) >= max_depth or result["outcome"] == "route":
                continue
            if result["stateKey"] in expanded_states:
                continue
            expanded_states.add(result["stateKey"])
            before_signatures = {signature(item) for item in result["beforeControls"]}
            before_identities = {item.get("identity") for item in result["beforeControls"]}
            current = path[-1]
            form_or_choice = current.get("tag") in {"INPUT", "SELECT", "TEXTAREA"} or result.get("targetBecameSelected")
            path_signatures = {signature(item) for item in path}
            for child in result["afterControls"]:
                child_signature = signature(child)
                newly_visible = child_signature not in before_signatures
                nested_context = bool(child.get("context"))
                same_control_changed = child.get("identity") in before_identities
                same_context_follow_up = bool(
                    form_or_choice
                    and nested_context
                    and child.get("context") == current.get("context")
                    and child.get("tag") in {"BUTTON", "A"}
                    and FOLLOW_UP_PATTERN.search(child.get("label", ""))
                )
                eligible = newly_visible or same_context_follow_up
                if (
                    not child.get("tappable")
                    or (same_control_changed and not same_context_follow_up)
                    or not eligible
                    or child_signature in path_signatures
                    or (not nested_context and child_signature in initial_signatures and not same_context_follow_up)
                ):
                    continue
                child_path = [*path, child]
                path_key = ">".join(signature(item) for item in child_path)
                if path_key in queued:
                    continue
                queued.add(path_key)
                queue.append(child_path)
        except (NoSuchElementException, StaleElementReferenceException, ElementClickInterceptedException, ElementNotInteractableException, WebDriverException) as exc:
            try:
                error_url = driver.current_url
                available_labels = [item.get("label", "") for item in controls(driver)][:80]
            except WebDriverException:
                error_url = ""
                available_labels = []
            record = {
                "depth": len(path),
                "path": [item.get("label", "") for item in path],
                "status": "failed",
                "outcome": "error",
                "route": "",
                "signal": "",
                "error": re.sub(r"\s+", " ", str(exc)).strip()[:600],
                "errorUrl": error_url,
                "availableControls": available_labels,
                "pathDescriptors": path,
            }
            results.append(record)
            issues.append(record)
            if len(results) % 100 == 0:
                print(f"  Screen {screen:03d}: {len(results)} paths tested, {len(queue)} queued", flush=True)

    nested = [item for item in results if item["depth"] > 1]
    state_keys = {item.get("stateKey") for item in results if item.get("status") == "passed" and item.get("stateKey")}
    return {
        "screen": screen,
        "file": file,
        "initialButtonsExplored": len(roots),
        "pathsTested": len(results),
        "nestedPathsTested": len(nested),
        "passed": sum(item["status"] == "passed" for item in results),
        "failed": sum(item["status"] == "failed" for item in results),
        "truncated": bool(queue),
        "queuedPathsRemaining": len(queue),
        "distinctStatesReached": len(state_keys),
        "issues": issues,
        "results": results,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--output", type=Path)
    parser.add_argument("--screen", type=int, action="append", default=[])
    parser.add_argument("--exclude-screen", type=int, action="append", default=[])
    parser.add_argument("--screen-from", type=int)
    parser.add_argument("--screen-to", type=int)
    parser.add_argument("--max-depth", type=int, default=3)
    parser.add_argument("--max-paths-per-screen", type=int, default=90)
    parser.add_argument("--settle", type=float, default=0.12)
    parser.add_argument("--all-controls", action="store_true", help="Exercise every phone-facing link, form control and button, including bare fragment anchors")
    args = parser.parse_args()

    root = args.root.resolve()
    output = (args.output or root / "quality/generated/nested-control-intent-audit.json").resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    screen_files = sorted(
        (
            (int(match.group(1)), path.name)
            for path in (root / "screens").glob("*.html")
            if (match := re.match(r"^(\d{2,3})-", path.name))
        ),
        key=lambda item: item[0],
    )
    if args.screen:
        selected = set(args.screen)
        screen_files = [item for item in screen_files if item[0] in selected]
    if args.exclude_screen:
        excluded = set(args.exclude_screen)
        screen_files = [item for item in screen_files if item[0] not in excluded]
    if args.screen_from is not None:
        screen_files = [item for item in screen_files if item[0] >= args.screen_from]
    if args.screen_to is not None:
        screen_files = [item for item in screen_files if item[0] <= args.screen_to]

    server = QuietServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(root)))
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

    screens: list[dict] = []
    console_errors: list[dict] = []
    try:
        with webdriver.Edge(options=options) as driver:
            driver.set_page_load_timeout(20)
            driver.set_script_timeout(8)
            driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {"source": CLICK_LISTENER_PROBE})
            driver.execute_cdp_cmd(
                "Emulation.setDeviceMetricsOverride",
                {"width": 390, "height": 844, "deviceScaleFactor": 1, "mobile": True},
            )
            for screen, file in screen_files:
                print(f"Screen {screen:03d}: exploring nested controls", flush=True)
                screens.append(
                    audit_screen(
                        driver,
                        base_url,
                        screen,
                        file,
                        args.max_depth,
                        args.max_paths_per_screen,
                        args.settle,
                        args.all_controls,
                    )
                )
                for entry in driver.get_log("browser"):
                    if entry.get("level") == "SEVERE" and "favicon.ico" not in entry.get("message", ""):
                        console_errors.append({"screen": screen, **entry})
    finally:
        server.shutdown()
        server.server_close()

    summary = {
        "screens": len(screens),
        "pathsTested": sum(item["pathsTested"] for item in screens),
        "nestedPathsTested": sum(item["nestedPathsTested"] for item in screens),
        "passed": sum(item["passed"] for item in screens),
        "failed": sum(item["failed"] for item in screens),
        "truncatedScreens": sum(bool(item["truncated"]) for item in screens),
        "consoleErrors": len(console_errors),
        "distinctStatesReached": sum(int(item.get("distinctStatesReached", 0)) for item in screens),
    }
    report = {
        "version": "nested-control-intent-audit-2026-07-15",
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "viewport": {"width": 390, "height": 844},
        "maxDepth": args.max_depth,
        "summary": summary,
        "screens": screens,
        "consoleErrors": console_errors,
    }
    output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(output), **summary}, indent=2), flush=True)
    return 0 if not summary["failed"] and not summary["consoleErrors"] and not summary["truncatedScreens"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
