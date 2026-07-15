"""Find visible action-like words that are not backed by semantic controls.

This complements the control and nested-intent runners. It renders every
screen at the launch phone viewport and reports cards, CTAs, links, tabs or
pointer targets that look actionable but are not a button, link or form
control and are not contained by one.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import threading
import time
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.edge.options import Options


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, _format: str, *_args: object) -> None:
        return


class QuietServer(ThreadingHTTPServer):
    def handle_error(self, _request: object, _client_address: object) -> None:
        return


AUDIT_SCRIPT = r"""
const semantic='button,a[href],input,select,textarea,[role="button"],[role="link"],[role="tab"],[role="switch"]';
const classPattern=/(^|[-_\s])(action|button|btn|cta|link|tab|chip|command|trigger)([-_\s]|$)/i;
const verbPattern=/^(accept|add|apply|book|buy|call|cancel|change|check|choose|close|compare|confirm|continue|create|delete|done|download|edit|finish|follow|get|join|learn|like|manage|message|more|next|open|order|pay|play|post|publish|raise|record|refund|remix|reply|request|reserve|retry|review|save|scan|schedule|search|select|send|set|share|shop|start|submit|track|try|upload|use|verify|view|watch)\b/i;
const normalize=value=>String(value||'').replace(/\s+/g,' ').trim();
const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.05&&r.width>0&&r.height>0&&!el.closest('[hidden],[aria-hidden="true"]')};
const selector='div,span,strong,b,i,em,article,section,li,p';
const candidates=[];
for(const el of document.querySelectorAll(selector)){
  if(!visible(el)||el.closest(semantic)||el.querySelector(semantic))continue;
  const text=normalize(el.innerText||el.textContent);
  if(!text||text.length>110||!verbPattern.test(text))continue;
  const className=normalize(el.className||'');
  const style=getComputedStyle(el);
  const pointer=style.cursor==='pointer';
  const ownHandler=typeof el.onclick==='function'||el.hasAttribute('onclick');
  const actionClass=classPattern.test(className);
  const passiveStatus=/(^|\s)(command-text|action-copy|proof-chip)(\s|$)/i.test(className);
  if(passiveStatus&&!pointer&&!ownHandler)continue;
  if(!pointer&&!ownHandler&&!actionClass)continue;
  if([...el.children].some(child=>{const childText=normalize(child.innerText||child.textContent);return childText===text&&visible(child)}))continue;
  const r=el.getBoundingClientRect();
  candidates.push({
    tag:el.tagName.toLowerCase(),
    text,
    className,
    reason:[pointer?'pointer':'',ownHandler?'handler':'',actionClass?'action-class':''].filter(Boolean).join('+'),
    position:{x:Math.round(r.left),y:Math.round(r.top),width:Math.round(r.width),height:Math.round(r.height)}
  });
}
return candidates;
"""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--output", type=Path)
    parser.add_argument("--screen", type=int, action="append", default=[])
    parser.add_argument("--settle", type=float, default=0.14)
    args = parser.parse_args()

    root = args.root.resolve()
    output = (args.output or root / "quality/generated/visual-action-semantics-audit.json").resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    selected = set(args.screen)
    screen_files = sorted(
        (
            (int(match.group(1)), path.name)
            for path in (root / "screens").glob("*.html")
            if (match := re.match(r"^(\d{2,3})-", path.name)) and (not selected or int(match.group(1)) in selected)
        ),
        key=lambda item: item[0],
    )

    server = QuietServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(root)))
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base_url = f"http://127.0.0.1:{server.server_port}"

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=390,844")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-extensions")
    options.add_argument("--no-first-run")
    options.add_argument("--no-default-browser-check")
    options.page_load_strategy = "eager"

    screens: list[dict] = []
    try:
        with webdriver.Edge(options=options) as driver:
            driver.set_page_load_timeout(20)
            driver.execute_cdp_cmd(
                "Emulation.setDeviceMetricsOverride",
                {"width": 390, "height": 844, "deviceScaleFactor": 1, "mobile": True},
            )
            for screen, file in screen_files:
                driver.get(f"{base_url}/screens/{file}?visualActionAudit={time.time_ns()}")
                time.sleep(args.settle)
                findings = driver.execute_script(AUDIT_SCRIPT)
                screens.append({"screen": screen, "file": file, "findings": findings})
    finally:
        server.shutdown()
        server.server_close()

    findings = [{"screen": item["screen"], "file": item["file"], **finding} for item in screens for finding in item["findings"]]
    report = {
        "version": "visual-action-semantics-audit-2026-07-15",
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "viewport": {"width": 390, "height": 844},
        "summary": {"screens": len(screens), "findings": len(findings)},
        "findings": findings,
    }
    output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(output), **report["summary"]}, indent=2), flush=True)
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
