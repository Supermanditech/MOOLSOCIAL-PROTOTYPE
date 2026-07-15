"""Audit the deployed prototype as a user-visible black box.

Unlike the legacy rendered and recursive audits, this runner does not count the
central prototype-interaction runtime's generated toast, selection outline or
generic sheet as product completion.  Each physical tap is replayed from a
clean page, classified by likely user intent, and compared using only native
screen state.  Failures retain before/after screenshots and a screenwise ledger.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
import time
from collections import deque
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
from selenium.webdriver.common.keys import Keys


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


CONTROL_SCRIPT = r"""
const selector='button,a[href],input,select,textarea,[contenteditable="true"],[role="button"],[role="tab"],[role="switch"],[data-live-audit-click-listener="true"]';
const semantic='button,a[href],input,select,textarea,[contenteditable="true"],[role="button"],[role="tab"],[role="switch"]';
const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
const runtimeSelector='.mool-contract-backdrop,.mool-contract-toast';
const overlaySelector='.mool-intent-flow-backdrop,[aria-modal="true"],.sheet.open,.action-sheet.open,.sheet-layer:not([hidden]),.layer:not([hidden]),.modal.open,.detail.open,.filter-layer:not(.is-hidden),.apply-layer:not(.is-hidden)';
const phone=document.querySelector('.production-phone,.phone-frame,.device,.phone');
const blockers=[...document.querySelectorAll(overlaySelector)].filter(node=>{
  if(node.closest(runtimeSelector))return false;
  const s=getComputedStyle(node),r=node.getBoundingClientRect();
  return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&(s.position==='fixed'||s.position==='absolute');
});
const topBlocker=blockers[blockers.length-1]||null;
const visible=el=>{
  if(el.closest(runtimeSelector))return false;
  const s=getComputedStyle(el),r=el.getBoundingClientRect();
  const blocked=topBlocker&&topBlocker!==el&&!topBlocker.contains(el);
  const userSurface=!phone||phone.contains(el)||!!el.closest(overlaySelector);
  return userSurface&&!blocked&&!el.disabled&&!el.readOnly&&el.getAttribute('aria-disabled')!=='true'&&s.display!=='none'&&s.visibility!=='hidden'&&s.pointerEvents!=='none'&&Number(s.opacity||1)>.05&&r.width>0&&r.height>0&&!el.closest('[hidden]');
};
const listenerSurface=el=>{
  if(el.matches(semantic))return true;
  const cls=normalize(el.className||'');
  const surface=/(^|[-_\s])(card|tile|item|row|choice|option|preview|chip|trigger|entry|line)([-_\s]|$)/i.test(cls);
  const container=/(^|[-_\s])(actions|grid|list|body|stage|shell|tray|fields|tabs|container)([-_\s]|$)/i.test(cls);
  return surface&&!container;
};
const all=[...document.querySelectorAll(selector)].filter(el=>visible(el)&&listenerSurface(el));
const label=el=>normalize(el.getAttribute('aria-label')||el.getAttribute('title')||el.getAttribute('placeholder')||el.innerText||el.textContent||el.value||el.name)||`[unlabelled ${el.tagName.toLowerCase()}]`;
const screenMatch=location.pathname.match(/\/(\d{2,3})-[^/]+[.]html$/);
const screen=screenMatch?String(parseInt(screenMatch[1],10)):'';
const registry=(window.MoolPrototypeInteractionContracts&&window.MoolPrototypeInteractionContracts.screens&&window.MoolPrototypeInteractionContracts.screens[screen])||{};
return all.map((el,index)=>{
  const text=label(el),tag=el.tagName;
  const occurrence=all.slice(0,index).filter(other=>other.tagName===tag&&label(other)===text).length;
  const context=el.closest('[role="dialog"],[aria-modal="true"],.sheet,.action-sheet,.sheet-layer,.layer,.modal,form,.composer');
  const r=el.getBoundingClientRect();
  const withinViewport=r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;
  const directSurface=el.getAttribute('data-live-audit-click-listener')==='true'&&!el.matches(semantic);
  const left=Math.max(0,r.left),right=Math.min(innerWidth,r.right),top=Math.max(0,r.top),bottom=Math.min(innerHeight,r.bottom);
  const points=[[.5,.5],[.2,.5],[.8,.5],[.5,.2],[.5,.8]];
  const exposed=!withinViewport||points.some(([xp,yp])=>{const hit=document.elementFromPoint(left+(right-left)*xp,top+(bottom-top)*yp);const nested=hit&&hit.closest?hit.closest(semantic):null;return hit&&(hit===el||el.contains(hit))&&(!directSurface||!nested||nested===el)});
  const data=[...el.attributes].filter(a=>a.name.startsWith('data-')&&!a.name.startsWith('data-live-audit')&&a.name!=='data-mool-contract').map(a=>`${a.name}=${a.value}`).sort().join(';');
  const stableClass=normalize(el.className||'').split(' ').filter(name=>name&&!['active','selected','current','done','open','mool-contract-selected'].includes(name)).join(' ');
  const identity=[tag,el.id||'',stableClass,data,index].join('|');
  const selected=el.matches('[aria-pressed="true"],[aria-selected="true"],[aria-current],.active,.selected,.current')&&!el.classList.contains('mool-contract-selected');
  const contract=registry[text]||null;
  return {
    label:text,tag,role:el.getAttribute('role')||'',occurrence,index,identity,href:el.href||'',type:el.type||'',inputmode:el.getAttribute('inputmode')||'',contenteditable:el.isContentEditable,
    context:context?normalize(context.getAttribute('aria-label')||context.className||context.id||context.getAttribute('role')):'',
    tappable:exposed,selected,directSurface,width:Math.round(r.width),height:Math.round(r.height),
    contractTicket:el.getAttribute('data-mool-contract')||'',contractType:contract&&contract.type||''
  };
});
"""


FIND_SCRIPT = r"""
const d=arguments[0],selector='button,a[href],input,select,textarea,[contenteditable="true"],[role="button"],[role="tab"],[role="switch"],[data-live-audit-click-listener="true"]';
const semantic='button,a[href],input,select,textarea,[contenteditable="true"],[role="button"],[role="tab"],[role="switch"]';
const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
const runtimeSelector='.mool-contract-backdrop,.mool-contract-toast';
const overlaySelector='.mool-intent-flow-backdrop,[aria-modal="true"],.sheet.open,.action-sheet.open,.sheet-layer:not([hidden]),.layer:not([hidden]),.modal.open,.detail.open,.filter-layer:not(.is-hidden),.apply-layer:not(.is-hidden)';
const blockers=[...document.querySelectorAll(overlaySelector)].filter(node=>{if(node.closest(runtimeSelector))return false;const s=getComputedStyle(node),r=node.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&(s.position==='fixed'||s.position==='absolute')});
const topBlocker=blockers[blockers.length-1]||null;
const visible=el=>{if(el.closest(runtimeSelector))return false;const s=getComputedStyle(el),r=el.getBoundingClientRect(),blocked=topBlocker&&topBlocker!==el&&!topBlocker.contains(el);return !blocked&&!el.disabled&&!el.readOnly&&el.getAttribute('aria-disabled')!=='true'&&s.display!=='none'&&s.visibility!=='hidden'&&s.pointerEvents!=='none'&&Number(s.opacity||1)>.05&&r.width>0&&r.height>0&&!el.closest('[hidden]')};
const listenerSurface=el=>{if(el.matches(semantic))return true;const cls=normalize(el.className||'');const surface=/(^|[-_\s])(card|tile|item|row|choice|option|preview|chip|trigger|entry|line)([-_\s]|$)/i.test(cls);const container=/(^|[-_\s])(actions|grid|list|body|stage|shell|tray|fields|tabs|container)([-_\s]|$)/i.test(cls);return surface&&!container};
const all=[...document.querySelectorAll(selector)].filter(el=>visible(el)&&listenerSurface(el));
const label=el=>normalize(el.getAttribute('aria-label')||el.getAttribute('title')||el.getAttribute('placeholder')||el.innerText||el.textContent||el.value||el.name)||`[unlabelled ${el.tagName.toLowerCase()}]`;
const identity=(el,index)=>{const data=[...el.attributes].filter(a=>a.name.startsWith('data-')&&!a.name.startsWith('data-live-audit')&&a.name!=='data-mool-contract').map(a=>`${a.name}=${a.value}`).sort().join(';');const stableClass=normalize(el.className||'').split(' ').filter(name=>name&&!['active','selected','current','done','open','mool-contract-selected'].includes(name)).join(' ');return [el.tagName,el.id||'',stableClass,data,index].join('|')};
const exposed=el=>{const r=el.getBoundingClientRect(),left=Math.max(0,r.left),right=Math.min(innerWidth,r.right),top=Math.max(0,r.top),bottom=Math.min(innerHeight,r.bottom);if(right<=left||bottom<=top)return false;const direct=el.getAttribute('data-live-audit-click-listener')==='true'&&!el.matches(semantic);const points=[[.5,.5],[.25,.5],[.75,.5],[.5,.25],[.5,.75],[.2,.2],[.8,.2],[.2,.8],[.8,.8]];return points.some(([xp,yp])=>{const hit=document.elementFromPoint(left+(right-left)*xp,top+(bottom-top)*yp);const nested=hit&&hit.closest?hit.closest(semantic):null;return hit&&(hit===el||el.contains(hit))&&(!direct||!nested||nested===el)})};
if(d.identity){const exact=all.find((el,index)=>el.tagName===d.tag&&label(el)===d.label&&identity(el,index)===d.identity&&(!d.requireExposed||exposed(el)));if(exact)return exact}
let matches=all.filter(el=>el.tagName===d.tag&&label(el)===d.label);
if(d.requireExposed)matches=matches.filter(exposed);
return matches[d.occurrence||0]||matches[0]||null;
"""


SNAPSHOT_SCRIPT = r"""
const normalize=v=>String(v||'').replace(/\s+/g,' ').trim();
const runtimeSelector='.mool-contract-backdrop,.mool-contract-toast,#mool-contract-styles';
const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.05&&r.width>0&&r.height>0&&!el.closest('[hidden]')};
const nativeNodes=[...document.querySelectorAll('body,body *')].filter(el=>visible(el)&&!el.matches(runtimeSelector)&&!el.closest(runtimeSelector)).map(el=>{
  let cls=normalize(el.className||'').split(' ').filter(name=>name!=='mool-contract-selected').join(' ');
  const data=[...el.attributes].filter(a=>a.name.startsWith('data-')&&!a.name.startsWith('data-live-audit')&&a.name!=='data-mool-contract').map(a=>`${a.name}=${a.value}`).sort().join(';');
  const aria=[...el.attributes].filter(a=>a.name.startsWith('aria-')&&!(a.name==='aria-pressed'&&el.classList.contains('mool-contract-selected'))).map(a=>`${a.name}=${a.value}`).sort().join(';');
  const ownText=normalize([...el.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE).map(node=>node.textContent).join(' '));
  return [el.tagName,el.id||'',cls,data,aria,ownText].join('|');
}).join('\n');
const nativeSignalSelector='[role="status"],[role="alert"],[role="dialog"],[aria-live],.toast,.sheet.open,.action-sheet.open,.sheet-layer:not([hidden]),.layer:not([hidden]),.modal.open,.result,.success,.confirmation';
const nativeSignals=[...document.querySelectorAll(nativeSignalSelector)].filter(el=>visible(el)&&!el.matches(runtimeSelector)&&!el.closest(runtimeSelector)).map(el=>normalize(el.innerText||el.textContent)).join(' | ').slice(0,2400);
const nativeDialogs=[...document.querySelectorAll('[role="dialog"],[aria-modal="true"],.sheet.open,.action-sheet.open,.sheet-layer:not([hidden]),.layer:not([hidden]),.modal.open,.detail.open')].filter(el=>visible(el)&&!el.matches(runtimeSelector)&&!el.closest(runtimeSelector)).map(el=>normalize(el.innerText||el.textContent)).join(' | ').slice(0,2400);
const runtime=[...document.querySelectorAll('.mool-contract-backdrop,.mool-contract-toast')].filter(visible).map(el=>normalize(el.innerText||el.textContent)).join(' | ').slice(0,2400);
const forms=[...document.querySelectorAll('input,select,textarea,[contenteditable="true"]')].filter(el=>visible(el)&&!el.closest(runtimeSelector)).map(el=>`${el.type||el.tagName}:${el.isContentEditable?el.textContent:(el.value||'')}:${el.checked?'1':'0'}:${el.selectedIndex??''}`).join('|');
const selected=[...document.querySelectorAll('[aria-pressed="true"],[aria-selected="true"],[aria-current],.active,.selected,.current')].filter(el=>visible(el)&&!el.classList.contains('mool-contract-selected')&&!el.closest(runtimeSelector)).map(el=>normalize(el.getAttribute('aria-label')||el.innerText||el.textContent)).join('|');
const text=normalize([...document.querySelectorAll('body *')].filter(el=>visible(el)&&!el.closest(runtimeSelector)&&!el.matches(runtimeSelector)).map(el=>el.childElementCount?'':(el.innerText||el.textContent)).join(' ')).slice(0,12000);
return {nativeNodes,nativeSignals,nativeDialogs,runtime,forms,selected,text,url:location.href,systemEvents:window.__moolLiveAuditSystemEvents||[]};
"""


CLICK_LISTENER_AND_SYSTEM_PROBE = r"""
(() => {
  if(window.__moolLiveAuditInstalled)return;
  window.__moolLiveAuditInstalled=true;
  window.__moolLiveAuditSystemEvents=[];
  const record=(type,detail)=>window.__moolLiveAuditSystemEvents.push({type,detail:String(detail||'').slice(0,300)});
  const originalAdd=EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener=function(type,listener,options){
    if(type==='click'&&this instanceof Element)this.setAttribute('data-live-audit-click-listener','true');
    return originalAdd.call(this,type,listener,options);
  };
  const originalOpen=window.open;
  window.open=function(url,...rest){record('window.open',url);return originalOpen?originalOpen.call(window,url,...rest):null};
  document.addEventListener('click',event=>{
    const a=event.target&&event.target.closest&&event.target.closest('a[href]');
    if(a&&/^(tel:|mailto:|sms:|geo:|whatsapp:)/i.test(a.getAttribute('href')||''))record('external-link',a.getAttribute('href'));
  },true);
})();
"""


AUDIT_QUERY_KEYS = {
    "blackBoxAudit",
    "nestedAudit",
    "nestedInventory",
    "visualActionAudit",
    "controlAudit",
    "review",
}

STATE_PATTERN = re.compile(
    r"\b(like|unlike|save|saved|follow|following|subscribe|bookmark|mute|unmute|favourite|favorite|select|selected|filter|sort|all|for you|near you|quantity|qty|plus|minus)\b",
    re.IGNORECASE,
)
HANDOFF_PATTERN = re.compile(
    r"\b(share|call|video call|camera|scan|voice|location|directions|map|download|export|upload|choose file|file|photo|whatsapp|print|qr)\b",
    re.IGNORECASE,
)
TASK_PATTERN = re.compile(
    r"\b(pay|place order|checkout|confirm|submit|publish|post|apply|book|send|complete|finish|release|refund|approve|reject|accept|start|activate|verify|add|order|buy|get|join|schedule|cancel|report|resolve|rate|collect|deliver|assign|go online|renew|claim|create)\b",
    re.IGNORECASE,
)
DETAIL_PATTERN = re.compile(
    r"\b(comment|comments|reply|replies|more|details?|watch|view|proof|receipt|bill|menu|history|status|terms|plan|basket|cart|open|show|manage|review|learn)\b",
    re.IGNORECASE,
)
IN_PLACE_CONTENT_PATTERN = re.compile(
    r"\b(watch|play|open (?:video|short|post|story)|recommend(?:ed|ation)?)\b",
    re.IGNORECASE,
)
GENERIC_RESULT_PATTERN = re.compile(
    r"^(?:.+?\s+)?(?:applied|selected|opened|ready|completed|available now|is ready(?: to continue)?)[.!]?(?:\s+review the information and continue when ready[.!]?)?$",
    re.IGNORECASE,
)
FOLLOW_UP_PATTERN = re.compile(
    r"^(?:add|apply|approve|book|complete|confirm|continue|create|dispatch|done|finish|invite|join|next|open|order|pay|place|post|prepare|publish|reply|return|review|save|search|send|share|show|start|submit|track|upload|use|verify)\b",
    re.IGNORECASE,
)


def canonical_location(value: str) -> tuple[str, str]:
    parsed = urlparse(value)
    query = urlencode(
        [
            (key, item)
            for key, item in parse_qsl(parsed.query, keep_blank_values=True)
            if key not in AUDIT_QUERY_KEYS
        ]
    )
    return parsed.path, query


def meaningful_url_change(before: str, after: str) -> bool:
    return canonical_location(before) != canonical_location(after)


def signature(control: dict) -> str:
    return f"{control.get('tag')}|{control.get('label')}|{control.get('occurrence', 0)}"


def compact(control: dict) -> dict:
    return {
        "label": control.get("label", ""),
        "tag": control.get("tag", ""),
        "role": control.get("role", ""),
        "occurrence": int(control.get("occurrence", 0)),
        "href": control.get("href", ""),
        "type": control.get("type", ""),
        "inputmode": control.get("inputmode", ""),
        "contenteditable": bool(control.get("contenteditable")),
        "context": control.get("context", ""),
        "identity": control.get("identity", ""),
        "tappable": bool(control.get("tappable")),
        "selected": bool(control.get("selected")),
        "directSurface": bool(control.get("directSurface")),
        "width": int(control.get("width", 0)),
        "height": int(control.get("height", 0)),
        "contractTicket": control.get("contractTicket", ""),
        "contractType": control.get("contractType", ""),
    }


def infer_intent(control: dict) -> tuple[str, str]:
    label = control.get("label", "")
    tag = control.get("tag", "")
    input_type = control.get("type", "").lower()
    href = control.get("href", "")
    if control.get("selected"):
        return "state", "Keep the current choice visibly selected or apply the named toggle."
    if re.fullmatch(r"(?:cancel|back|close(?:\s+.+)?|done|return)", label, re.IGNORECASE):
        return "dismiss", "Close the current layer and return without losing the underlying task state."
    if re.search(r"\bsearch\b", label, re.IGNORECASE) and not re.search(r"\bvoice\b", label, re.IGNORECASE):
        return "search", "Expose a query input, accept the user’s text and show relevant results or a clear empty state."
    if re.match(r"^schedule(?:\b|$)", label, re.IGNORECASE):
        return "schedule", "Expose date and time choices, retain the selection and provide a confirmation action."
    if re.search(r"data-(?:format|mode|tab|filter|view|choice)=", control.get("identity", ""), re.IGNORECASE):
        return "state", "Apply the named view or choice and visibly update the related content."
    if tag == "INPUT" and input_type in {"checkbox", "radio", "range", "color"}:
        return "state", "Apply the named choice or toggle and make the new state unambiguous."
    if control.get("role") == "switch" or control.get("contractType") in {"select", "state", "toggle"}:
        return "state", "Apply the named choice or toggle and make the new state unambiguous."
    if (tag in {"INPUT", "SELECT", "TEXTAREA"} or control.get("contenteditable") or control.get("role") == "textbox") and input_type not in {
        "button",
        "submit",
        "checkbox",
        "radio",
        "range",
        "color",
        "file",
    }:
        return "input", "Accept a valid value and visibly retain or apply it."
    if href and not href.endswith("#") and not href.lower().startswith("javascript:"):
        return "navigation", "Open the promised destination without a broken route or unrelated screen."
    if STATE_PATTERN.search(label):
        return "state", "Apply the named choice or toggle and make the new state unambiguous."
    if HANDOFF_PATTERN.search(label):
        return "handoff", "Open the specific system action or a usable, domain-specific preview with its next action."
    if TASK_PATTERN.search(label):
        return "task", "Advance or complete the named task with its real next step, result, reference or recovery action."
    if DETAIL_PATTERN.search(label):
        return "detail", "Reveal the promised domain content and its usable follow-up controls."
    return "interaction", "Produce a meaningful native screen result that explains what changed or what the user can do next."


def snapshot(driver: webdriver.Edge) -> dict:
    value = driver.execute_script(SNAPSHOT_SCRIPT)
    value["nativeHash"] = hashlib.sha256(value.pop("nativeNodes").encode("utf-8")).hexdigest()
    return value


def state_key(value: dict) -> str:
    return hashlib.sha256(
        "|".join(
            [
                *canonical_location(value.get("url", "")),
                value.get("nativeHash", ""),
                value.get("forms", ""),
                value.get("selected", ""),
                value.get("nativeDialogs", ""),
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
        raise NoSuchElementException(f"control not found: {descriptor.get('label')}")
    return element


def center_control(driver: webdriver.Edge, element) -> None:
    driver.execute_script(
        r"""
        const el=arguments[0];
        for(let parent=el.parentElement;parent&&parent!==document.body&&parent!==document.documentElement;parent=parent.parentElement){
          if(parent.scrollHeight<=parent.clientHeight+1&&parent.scrollWidth<=parent.clientWidth+1)continue;
          const er=el.getBoundingClientRect(),pr=parent.getBoundingClientRect();
          if(parent.scrollHeight>parent.clientHeight+1)parent.scrollTop+=er.top+er.height/2-(pr.top+parent.clientHeight/2);
          if(parent.scrollWidth>parent.clientWidth+1)parent.scrollLeft+=er.left+er.width/2-(pr.left+parent.clientWidth/2);
        }
        let r=el.getBoundingClientRect(),margin=8;
        const fixed=!!el.closest('[role="dialog"],[aria-modal="true"],.sheet,.action-sheet,.modal');
        if(!fixed){
          window.scrollBy(0,r.top+r.height/2-innerHeight/2);
          window.scrollBy(r.left+r.width/2-innerWidth/2,0);
          r=el.getBoundingClientRect();
        }
        if(r.top<margin)window.scrollBy(0,r.top-margin);else if(r.bottom>innerHeight-margin)window.scrollBy(0,r.bottom-innerHeight+margin);
        if(r.left<margin)window.scrollBy(r.left-margin,0);else if(r.right>innerWidth-margin)window.scrollBy(r.right-innerWidth+margin,0);
        """,
        element,
    )


def wait_for_motion(driver: webdriver.Edge, settle: float) -> None:
    time.sleep(settle)
    deadline = time.monotonic() + 0.12
    while time.monotonic() < deadline:
        try:
            moving = int(
                driver.execute_script(
                    "return document.getAnimations ? document.getAnimations().filter(a=>a.playState==='running').length : 0"
                )
            )
        except WebDriverException:
            return
        if not moving:
            return
        time.sleep(0.025)


def physical_tap(driver: webdriver.Edge, descriptor: dict, prepared: bool = False) -> None:
    element = find_control(driver, descriptor, require_exposed=prepared)
    if not prepared:
        center_control(driver, element)
        time.sleep(0.04)
    tag = descriptor.get("tag", "")
    input_type = descriptor.get("type", "").lower()
    input_mode = descriptor.get("inputmode", "").lower()
    in_fixed_layer = bool(
        driver.execute_script(
            "return !!arguments[0].closest('[role=\"dialog\"],[aria-modal=\"true\"],.sheet,.action-sheet,.modal')",
            element,
        )
    )
    point = {"x": 0.0, "y": 0.0} if in_fixed_layer else driver.execute_script(
        r"""
        const el=arguments[0],r=el.getBoundingClientRect();
        const left=Math.max(0,r.left),right=Math.min(innerWidth,r.right),top=Math.max(0,r.top),bottom=Math.min(innerHeight,r.bottom);
        if(right<=left||bottom<=top)return null;
        const semantic='button,a[href],input,select,textarea,[contenteditable="true"],[role="button"],[role="tab"],[role="switch"]';
        const direct=arguments[1],points=[[.5,.5],[.25,.5],[.75,.5],[.5,.25],[.5,.75],[.2,.2],[.8,.2],[.2,.8],[.8,.8]];
        for(const [xp,yp] of points){const x=left+(right-left)*xp,y=top+(bottom-top)*yp,hit=document.elementFromPoint(x,y),nested=hit&&hit.closest?hit.closest(semantic):null;if(hit&&(hit===el||el.contains(hit))&&(!direct||!nested||nested===el))return {x,y}}
        return null;
        """,
        element,
        bool(descriptor.get("directSurface")),
    )
    if not point:
        raise ElementClickInterceptedException(f"no exposed tap point: {descriptor.get('label')}")

    def click() -> None:
        x, y = float(point["x"]), float(point["y"])
        start_url = driver.current_url
        if in_fixed_layer:
            element.click()
            return
        driver.execute_script(
            "window.__moolLivePhysicalTapReceived=false;arguments[0].addEventListener('click',function(){window.__moolLivePhysicalTapReceived=true},{once:true,capture:true})",
            element,
        )
        driver.execute_cdp_cmd(
            "Input.dispatchMouseEvent",
            {"type": "mousePressed", "x": x, "y": y, "button": "left", "clickCount": 1},
        )
        driver.execute_cdp_cmd(
            "Input.dispatchMouseEvent",
            {"type": "mouseReleased", "x": x, "y": y, "button": "left", "clickCount": 1},
        )
        time.sleep(0.015)
        try:
            received = bool(driver.execute_script("return window.__moolLivePhysicalTapReceived===true"))
        except WebDriverException:
            return
        if not received:
            if meaningful_url_change(start_url, driver.current_url):
                return
            if descriptor.get("contractTicket"):
                return
            try:
                driver.execute_script("arguments[0].click()", element)
            except StaleElementReferenceException:
                return

    if (tag in {"INPUT", "TEXTAREA"} or descriptor.get("contenteditable")) and input_type not in {
        "button",
        "submit",
        "checkbox",
        "radio",
        "range",
        "color",
        "file",
    }:
        click()
        if descriptor.get("contenteditable"):
            element.send_keys(Keys.CONTROL, "a")
            element.send_keys("intent audit")
        elif input_type in {"date", "month", "week", "time", "datetime-local"}:
            valid = {
                "date": "2026-07-15",
                "month": "2026-07",
                "week": "2026-W29",
                "time": "12:30",
                "datetime-local": "2026-07-15T12:30",
            }[input_type]
            driver.execute_script(
                "arguments[0].value=arguments[1];arguments[0].dispatchEvent(new Event('input',{bubbles:true}));arguments[0].dispatchEvent(new Event('change',{bubbles:true}))",
                element,
                valid,
            )
        else:
            element.clear()
            if input_type == "email":
                element.send_keys("audit@example.com")
            elif input_type == "tel":
                element.send_keys("9876543210")
            elif input_type == "number" or input_mode in {"numeric", "decimal"}:
                element.send_keys("42")
            else:
                element.send_keys("intent audit")
    elif tag == "SELECT":
        driver.execute_script(
            "if(arguments[0].options.length>1){arguments[0].selectedIndex=arguments[0].selectedIndex===0?1:0;arguments[0].dispatchEvent(new Event('change',{bubbles:true}))}",
            element,
        )
    else:
        click()


def classify_observation(
    control: dict,
    before: dict,
    after: dict,
    before_controls: list[dict],
    after_controls: list[dict],
    selected_before: bool,
) -> dict:
    intent, expected = infer_intent(control)
    route = meaningful_url_change(before.get("url", ""), after.get("url", ""))
    native_state = any(
        before.get(key) != after.get(key)
        for key in ("nativeHash", "nativeSignals", "nativeDialogs", "forms", "selected")
    )
    system = before.get("systemEvents") != after.get("systemEvents")
    runtime_only = bool(after.get("runtime")) and not route and not native_state and not system
    before_signatures = {signature(item) for item in before_controls}
    new_control_details = [item for item in after_controls if signature(item) not in before_signatures]
    new_controls = [item.get("label", "") for item in new_control_details]
    search_inputs = [
        item
        for item in [*before_controls, *after_controls]
        if item.get("tag") in {"INPUT", "TEXTAREA"}
        and item.get("type", "").lower() not in {"button", "submit", "checkbox", "radio", "hidden", "file"}
    ]
    schedule_inputs = [
        item
        for item in [*before_controls, *after_controls]
        if item.get("tag") == "INPUT"
        and item.get("type", "").lower() in {"date", "datetime-local", "time", "month", "week"}
    ]
    signal = after.get("nativeSignals", "") or after.get("nativeDialogs", "")
    generic_signal = bool(signal and not new_controls and GENERIC_RESULT_PATTERN.fullmatch(signal.strip()))
    validation_signal = bool(
        signal
        and before.get("nativeSignals", "") != after.get("nativeSignals", "")
        and re.search(r"\b(type|enter|choose|select|write|add|required|before)\b", signal, re.IGNORECASE)
    )
    requested_content_changed = bool(
        intent == "detail"
        and IN_PLACE_CONTENT_PATTERN.search(control.get("label", ""))
        and before.get("text") != after.get("text")
    )
    detail_section_changed = bool(
        intent == "detail"
        and before.get("text") != after.get("text")
        and before.get("selected") != after.get("selected")
    )

    status = "failed"
    outcome = "no-op"
    reason = "Tap produced no meaningful native screen result."
    if route:
        status, outcome, reason = "passed", "route", "Promised destination opened."
    elif intent == "input" and before.get("forms") != after.get("forms"):
        status, outcome, reason = "passed", "input", "Valid input was accepted and retained."
    elif intent == "dismiss" and native_state:
        status, outcome, reason = "passed", "dismissed", "The current layer closed and returned to the underlying screen state."
    elif intent == "search" and not search_inputs:
        outcome = "incomplete-search"
        reason = "Search did not expose a query input or route to a usable search surface."
    elif intent == "schedule" and not schedule_inputs:
        outcome = "incomplete-schedule"
        reason = "Schedule did not expose date and time choices with a confirmation path."
    elif system:
        status, outcome, reason = "passed", "system-handoff", "The intended browser or device handoff was invoked."
    elif runtime_only:
        outcome = "synthetic-runtime-only"
        reason = "Only the central prototype contract toast, outline or generic sheet responded; the product screen itself did not complete the intent."
    elif validation_signal:
        status, outcome, reason = "passed", "validation", "The screen explained the required input and kept the user in the current task."
    elif selected_before and intent == "state":
        status, outcome, reason = "passed", "already-current", "The control was already visibly the current choice."
    elif not native_state:
        outcome = "no-op"
    elif generic_signal:
        outcome = "generic-acknowledgement"
        reason = "The screen showed only a generic acknowledgement instead of the promised domain result."
    elif requested_content_changed or detail_section_changed:
        status, outcome, reason = "passed", "native-content", "The requested media or detail replaced the current content in place and became visible."
    elif intent == "detail" and not new_controls and not after.get("nativeDialogs"):
        outcome = "incomplete-detail"
        reason = "Visible state changed, but no usable detail surface or follow-up action appeared."
    elif intent in {"task", "handoff"} and not new_controls and not signal and before.get("forms") == after.get("forms"):
        outcome = "incomplete-intent"
        reason = "A visual state changed without exposing the task result, next step, reference or recovery action."
    else:
        status, outcome, reason = "passed", "native-state", "The native product screen exposed a meaningful state or usable next action."

    return {
        "status": status,
        "outcome": outcome,
        "userIntent": intent,
        "expectedResult": expected,
        "observedResult": reason,
        "route": after.get("url", "") if route else "",
        "nativeSignal": signal[:1200],
        "runtimeSignal": after.get("runtime", "")[:1200],
        "newControls": new_controls[:40],
        "stateKey": state_key(after),
        "nativeStateChanged": native_state,
        "systemHandoff": system,
    }


def replay(driver: webdriver.Edge, url: str, path: list[dict], settle: float) -> dict:
    driver.get(f"{url}{'&' if '?' in url else '?'}blackBoxAudit={time.time_ns()}")
    time.sleep(max(settle, 0.12))
    before: dict = {}
    before_controls: list[dict] = []
    before_png = b""
    selected_before = False
    for index, descriptor in enumerate(path):
        if index == len(path) - 1:
            target = find_control(driver, descriptor)
            center_control(driver, target)
            wait_for_motion(driver, settle)
            before = snapshot(driver)
            before_controls = controls(driver)
            before_png = driver.get_screenshot_as_png()
            selected_before = bool(descriptor.get("selected")) or bool(
                driver.execute_script(
                    "return arguments[0].matches('[aria-pressed=\"true\"],[aria-selected=\"true\"],[aria-current],.active,.selected,.current')&&!arguments[0].classList.contains('mool-contract-selected')",
                    target,
                )
            )
        prior_url = driver.current_url
        physical_tap(driver, descriptor, prepared=index == len(path) - 1)
        wait_for_motion(driver, settle)
        if index < len(path) - 1 and meaningful_url_change(prior_url, driver.current_url):
            raise WebDriverException("path navigated before the nested target was reached")
    after = snapshot(driver)
    after_controls = controls(driver)
    observation = classify_observation(path[-1], before, after, before_controls, after_controls, selected_before)
    observation.update(
        {
            "beforeControls": before_controls,
            "afterControls": after_controls,
            "beforePng": before_png if observation["status"] == "failed" else b"",
            "afterPng": driver.get_screenshot_as_png() if observation["status"] == "failed" else b"",
        }
    )
    return observation


def safe_fragment(value: str, limit: int = 54) -> str:
    fragment = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return (fragment or "control")[:limit].rstrip("-")


def audit_screen(
    driver: webdriver.Edge,
    base_url: str,
    viewport_name: str,
    screen: int,
    file: str,
    max_depth: int,
    max_paths: int,
    settle: float,
    evidence_dir: Path,
) -> dict:
    url = f"{base_url.rstrip('/')}/screens/{file}"
    driver.get(f"{url}?blackBoxAudit={time.time_ns()}")
    time.sleep(max(settle, 0.12))
    initial = controls(driver)
    initial_state = snapshot(driver)
    expanded_states = {state_key(initial_state)}
    initial_signatures = {signature(item) for item in initial}
    roots = [[item] for item in initial if item.get("tappable")]
    queue: deque[list[dict]] = deque(roots)
    queued = {">".join(signature(item) for item in path) for path in roots}
    results: list[dict] = []
    issues: list[dict] = []

    while queue and len(results) < max_paths:
        path = queue.popleft()
        ordinal = len(results) + 1
        try:
            result = replay(driver, url, path, settle)
            record = {
                "depth": len(path),
                "path": [item.get("label", "") for item in path],
                "control": path[-1].get("label", ""),
                "tag": path[-1].get("tag", ""),
                "contractTicket": path[-1].get("contractTicket", ""),
                "contractType": path[-1].get("contractType", ""),
                "touchTarget": {"width": path[-1].get("width", 0), "height": path[-1].get("height", 0)},
                **{key: value for key, value in result.items() if key not in {"beforeControls", "afterControls", "beforePng", "afterPng"}},
            }
            results.append(record)
            if len(results) % 25 == 0:
                print(
                    f"  {viewport_name} Screen {screen:03d}: {len(results)} paths, {len(issues)} issues, {len(queue)} queued",
                    flush=True,
                )
            if record["status"] == "failed":
                stem = f"{viewport_name}-{screen:03d}-{ordinal:03d}-{safe_fragment(record['control'])}"
                before_path = evidence_dir / f"{stem}-before.png"
                after_path = evidence_dir / f"{stem}-after.png"
                before_path.write_bytes(result["beforePng"])
                after_path.write_bytes(result["afterPng"])
                finding = {
                    **record,
                    "ticket": f"LBX-{screen:03d}-{viewport_name[0].upper()}-{ordinal:03d}",
                    "evidence": {
                        "before": before_path.as_posix(),
                        "after": after_path.as_posix(),
                    },
                }
                issues.append(finding)
                continue
            if (
                len(path) >= max_depth
                or result["outcome"] == "route"
                or re.match(r"^send(?:\s+(?:message|voice note))?$", record["control"], re.IGNORECASE)
            ):
                continue
            if result["stateKey"] in expanded_states:
                continue
            expanded_states.add(result["stateKey"])
            before_signatures = {signature(item) for item in result["beforeControls"]}
            before_identities = {item.get("identity") for item in result["beforeControls"]}
            current = path[-1]
            form_or_choice = current.get("tag") in {"INPUT", "SELECT", "TEXTAREA"} or current.get("contenteditable") or result["outcome"] in {"native-state", "already-current"}
            composer_choice = bool(
                re.search(r"suggestion-button|attach-chip|data-quick-intent", current.get("identity", ""), re.IGNORECASE)
            )
            path_signatures = {signature(item) for item in path}
            for child in result["afterControls"]:
                child_signature = signature(child)
                newly_visible = child_signature not in before_signatures
                nested_context = bool(child.get("context"))
                same_control = child.get("identity") in before_identities
                already_visible_choice_sibling = bool(
                    not newly_visible
                    and "mool-intent-flow__option" in child.get("identity", "")
                )
                same_context_follow_up = bool(
                    form_or_choice
                    and nested_context
                    and child.get("context") == current.get("context")
                    and child.get("tag") in {"BUTTON", "A"}
                    and FOLLOW_UP_PATTERN.search(child.get("label", ""))
                )
                composer_follow_up = bool(
                    composer_choice
                    and child.get("tag") in {"BUTTON", "A"}
                    and re.match(r"^send(?: message)?$", child.get("label", ""), re.IGNORECASE)
                )
                if (
                    not child.get("tappable")
                    or (same_control and not same_context_follow_up and not composer_follow_up)
                    or already_visible_choice_sibling
                    or not (newly_visible or same_context_follow_up or composer_follow_up)
                    or child_signature in path_signatures
                    or (not nested_context and child_signature in initial_signatures and not same_context_follow_up and not composer_follow_up)
                ):
                    continue
                child_path = [*path, child]
                key = ">".join(signature(item) for item in child_path)
                if key not in queued:
                    queued.add(key)
                    queue.append(child_path)
        except (
            NoSuchElementException,
            StaleElementReferenceException,
            ElementClickInterceptedException,
            ElementNotInteractableException,
            WebDriverException,
        ) as exc:
            intent, expected = infer_intent(path[-1])
            record = {
                "depth": len(path),
                "path": [item.get("label", "") for item in path],
                "control": path[-1].get("label", ""),
                "status": "failed",
                "outcome": "browser-error",
                "userIntent": intent,
                "expectedResult": expected,
                "observedResult": re.sub(r"\s+", " ", str(exc)).strip()[:700],
                "route": "",
                "ticket": f"LBX-{screen:03d}-{viewport_name[0].upper()}-{ordinal:03d}",
            }
            results.append(record)
            issues.append(record)

    return {
        "screen": screen,
        "file": file,
        "viewport": viewport_name,
        "initialControls": len(initial),
        "pathsTested": len(results),
        "nestedPathsTested": sum(item["depth"] > 1 for item in results),
        "passed": sum(item["status"] == "passed" for item in results),
        "failed": sum(item["status"] == "failed" for item in results),
        "syntheticRuntimeOnly": sum(item["outcome"] == "synthetic-runtime-only" for item in results),
        "noOp": sum(item["outcome"] == "no-op" for item in results),
        "truncated": bool(queue),
        "queuedPathsRemaining": len(queue),
        "distinctNativeStates": len(expanded_states),
        "issues": issues,
        "results": results,
    }


def write_markdown(report: dict, output: Path) -> None:
    summary = report["summary"]
    lines = [
        "# Live Black-Box Intent-Completion Audit",
        "",
        f"Generated: {report['generatedAt']}",
        f"Live origin: `{report['baseUrl']}`",
        "",
        "## Release gate",
        "",
        f"Status: **{summary['status']}**",
        "",
        "| Measure | Result |",
        "| --- | ---: |",
        f"| Screens/viewports | {summary['screenViewportRuns']} |",
        f"| Paths tested | {summary['pathsTested']} |",
        f"| Nested paths | {summary['nestedPathsTested']} |",
        f"| Genuine completions | {summary['passed']} |",
        f"| Broken/incomplete intents | {summary['failed']} |",
        f"| Synthetic runtime-only responses | {summary['syntheticRuntimeOnly']} |",
        f"| Unexplained no-op taps | {summary['noOp']} |",
        f"| Truncated screen states | {summary['truncatedScreens']} |",
        f"| Severe console errors | {summary['consoleErrors']} |",
        "",
        "A generated contract toast, orange selection outline or generic contract sheet is deliberately excluded from completion evidence.",
        "",
        "## Screenwise findings",
        "",
        "| Ticket | Viewport | Screen | Tap path | Intent | Failure | Evidence |",
        "| --- | --- | ---: | --- | --- | --- | --- |",
    ]
    for run in report["runs"]:
        for issue in run["issues"]:
            evidence = issue.get("evidence", {})
            links = " / ".join(
                f"[{name}]({Path(path).name})" for name, path in evidence.items()
            )
            path = " → ".join(issue.get("path", []))
            lines.append(
                "| {ticket} | {viewport} | {screen:03d} | {path} | {intent} | {failure} | {evidence} |".format(
                    ticket=issue.get("ticket", ""),
                    viewport=run["viewport"],
                    screen=run["screen"],
                    path=path.replace("|", "\\|"),
                    intent=issue.get("userIntent", ""),
                    failure=issue.get("observedResult", "").replace("|", "\\|"),
                    evidence=links,
                )
            )
    output.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--base-url", default="https://supermanditech.github.io/MOOLSOCIAL-PROTOTYPE")
    parser.add_argument("--output", type=Path)
    parser.add_argument("--markdown-output", type=Path)
    parser.add_argument("--evidence-dir", type=Path)
    parser.add_argument("--screen", type=int, action="append", default=[])
    parser.add_argument("--screen-from", type=int)
    parser.add_argument("--screen-to", type=int)
    parser.add_argument("--viewport", choices=["mobile", "desktop"], action="append", default=[])
    parser.add_argument("--max-depth", type=int, default=12)
    parser.add_argument("--max-paths-per-screen", type=int, default=240)
    parser.add_argument("--settle", type=float, default=0.16)
    args = parser.parse_args()

    root = args.root.resolve()
    output = (args.output or root / "quality/generated/live-black-box-intent-audit.json").resolve()
    markdown = (args.markdown_output or output.with_suffix(".md")).resolve()
    evidence_dir = (args.evidence_dir or output.parent / "live-black-box-evidence").resolve()
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

    viewport_names = args.viewport or ["mobile", "desktop"]
    viewports = {
        "mobile": {"width": 390, "height": 844, "mobile": True},
        "desktop": {"width": 1440, "height": 1000, "mobile": False},
    }
    runs: list[dict] = []
    console_errors: list[dict] = []
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
        options.page_load_strategy = "eager"
        options.set_capability("goog:loggingPrefs", {"browser": "ALL"})
        with webdriver.Edge(options=options) as driver:
            driver.set_page_load_timeout(25)
            driver.set_script_timeout(10)
            driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {"source": CLICK_LISTENER_AND_SYSTEM_PROBE})
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
                print(f"{viewport_name} Screen {screen:03d}: live black-box intent audit", flush=True)
                runs.append(
                    audit_screen(
                        driver,
                        args.base_url,
                        viewport_name,
                        screen,
                        file,
                        args.max_depth,
                        args.max_paths_per_screen,
                        args.settle,
                        evidence_dir,
                    )
                )
                for entry in driver.get_log("browser"):
                    if entry.get("level") == "SEVERE" and "favicon.ico" not in entry.get("message", ""):
                        console_errors.append({"viewport": viewport_name, "screen": screen, **entry})

    summary = {
        "status": "passed",
        "screenViewportRuns": len(runs),
        "uniqueScreens": len({run["screen"] for run in runs}),
        "pathsTested": sum(run["pathsTested"] for run in runs),
        "nestedPathsTested": sum(run["nestedPathsTested"] for run in runs),
        "passed": sum(run["passed"] for run in runs),
        "failed": sum(run["failed"] for run in runs),
        "syntheticRuntimeOnly": sum(run["syntheticRuntimeOnly"] for run in runs),
        "noOp": sum(run["noOp"] for run in runs),
        "truncatedScreens": sum(bool(run["truncated"]) for run in runs),
        "consoleErrors": len(console_errors),
    }
    if summary["failed"] or summary["truncatedScreens"] or summary["consoleErrors"]:
        summary["status"] = "failed"
    report = {
        "version": "live-black-box-intent-audit-2026-07-15",
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "baseUrl": args.base_url,
        "rule": "A tap passes only when the native product screen satisfies the specific user intent. Central contract-runtime feedback is excluded.",
        "viewports": {name: viewports[name] for name in viewport_names},
        "maxDepthSafetyLimit": args.max_depth,
        "maxPathsPerScreenSafetyLimit": args.max_paths_per_screen,
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
