"""Replay the repaired deep Social, Chat and Buy journeys in a real mobile browser."""

from __future__ import annotations

import argparse
import json
import sys
import threading
import time
import traceback
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options
from selenium.webdriver.support.ui import WebDriverWait


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
    args = parser.parse_args()
    root = args.root.resolve()
    output = (args.output or root / "quality/generated/critical-intent-journey-audit.json").resolve()
    output.parent.mkdir(parents=True, exist_ok=True)

    server = QuietServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(root)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_port}"

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=390,844")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-extensions")
    options.add_argument("--no-first-run")
    options.page_load_strategy = "eager"
    options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

    results: list[dict] = []
    console_errors: list[dict] = []

    try:
        with webdriver.Edge(options=options) as driver:
            driver.set_page_load_timeout(20)
            driver.execute_cdp_cmd(
                "Emulation.setDeviceMetricsOverride",
                {"width": 390, "height": 844, "deviceScaleFactor": 1, "mobile": True},
            )
            wait = WebDriverWait(driver, 8)

            def open_path(path: str) -> None:
                driver.get(f"{base}/{path}")
                wait.until(lambda current: current.execute_script("return document.readyState") in {"interactive", "complete"})

            def element(selector: str, index: int = 0):
                def find(current):
                    matches = current.find_elements(By.CSS_SELECTOR, selector)
                    if len(matches) <= index:
                        return False
                    candidate = matches[index]
                    return candidate if candidate.is_displayed() and candidate.is_enabled() else False

                return wait.until(find)

            def click(selector: str, index: int = 0) -> None:
                target = element(selector, index)
                driver.execute_script("arguments[0].scrollIntoView({block:'center',inline:'center'});", target)
                target.click()

            def text(selector: str) -> str:
                return element(selector).text.strip()

            def require(condition: bool, message: str) -> None:
                if not condition:
                    raise AssertionError(message)

            def run(flow_id: str, task) -> None:
                started = time.monotonic()
                try:
                    evidence = task()
                    results.append({"id": flow_id, "status": "passed", "elapsedMs": round((time.monotonic() - started) * 1000), "evidence": evidence})
                except Exception as exc:  # keep the remaining independent journeys running
                    results.append({"id": flow_id, "status": "failed", "elapsedMs": round((time.monotonic() - started) * 1000), "error": str(exc)[:900], "traceback": traceback.format_exc()[-2400:]})
                for entry in driver.get_log("browser"):
                    if entry.get("level") == "SEVERE" and "favicon.ico" not in entry.get("message", ""):
                        console_errors.append({"flow": flow_id, **entry})

            def social_video() -> dict:
                open_path("screens/06-social-videos.html")
                click('button.feed-video-main[data-video-id="task"]')
                wait.until(lambda _driver: "QR proof" in text("[data-video-title]"))
                click('[data-open-sheet="comments"]')
                comment = element("[data-video-comment-input]")
                comment.send_keys("Clear proof steps")
                click("[data-video-comment-submit]")
                wait.until(lambda _driver: "posted" in text("[data-sheet-note]").lower())
                click("[data-close-sheet]")
                click('button.recommend-card[data-video-id="lunch"]')
                require("Lunch thali" in text("[data-video-title]"), "recommended video did not replace the selected content")
                click('[data-open-sheet="more"]')
                require("More actions" in text("[data-sheet-title]"), "video More actions did not open")
                return {"selectedVideo": text("[data-video-title]"), "comment": "posted", "more": "opened"}

            def people_chat() -> dict:
                open_path("screens/25-chat-people-thread.html")
                click('[data-chat-intent="call"]')
                click('[data-chat-action="start-call"]')
                require("connected" in text("#chatSheetTitle").lower(), "voice call did not connect")
                click('[data-chat-action="end-call"]')
                click('[data-chat-intent="photo-preview"]')
                click('[data-chat-action="save-photo"]')
                require("saved" in text("#chatSheetCopy").lower(), "photo save did not complete")
                click("[data-close-chat-sheet]")
                message = element("#composerInput")
                message.send_keys("Please order this basket")
                click("[data-send-message]")
                require("Please order this basket" in driver.find_element(By.CSS_SELECTOR, ".chat-body").text, "typed message was not appended")
                click("[data-message-like]")
                click("[data-voice-note]")
                return {"call": "ended", "photo": "saved", "message": "sent", "reaction": "Liked 3", "voice": "playing"}

            def continue_product_to_order(expected_screen: str, apply_coupon: bool = False) -> dict:
                click("#addBasket")
                click('a[aria-label="Open basket"]')
                wait.until(lambda current: "12-buy-basket-checkout.html" in current.current_url, "Open basket did not reach Screen 12")
                incoming_lines = len(driver.find_elements(By.CSS_SELECTOR, "[data-item]"))
                require(incoming_lines == 1, f"selected product did not become the single incoming basket line; lines={incoming_lines}; url={driver.current_url}")
                basket_line = driver.find_element(By.CSS_SELECTOR, "[data-item]").text
                if apply_coupon:
                    before_coupon = text("#payableTotal")
                    click("#applyCoupon")
                    require(text("#applyCoupon").strip() == "", "coupon icon control unexpectedly exposed internal text")
                    require(text("#payableTotal") != before_coupon, "eligible coupon did not change the payable total")
                basket_total = text("#payableTotal")
                click("#checkoutBtn")
                wait.until(lambda current: "14-customer-payment-order-confirmation.html" in current.current_url, "Review and Pay did not reach Screen 14")
                payment_total = text("#payableAmount")
                require(basket_total == payment_total, "basket and payment payable totals do not reconcile")
                if apply_coupon:
                    click("#backToBasket")
                    wait.until(lambda current: "12-buy-basket-checkout.html" in current.current_url, "Back to basket did not return to Screen 12")
                    require(text("#payableTotal") == basket_total, "Back to basket did not preserve the selected line and coupon total")
                    click("#checkoutBtn")
                    wait.until(lambda current: "14-customer-payment-order-confirmation.html" in current.current_url, "Review and Pay did not reopen Screen 14")
                    require(text("#payableAmount") == payment_total, "reopened payment total changed")
                click('[data-method="card"]')
                require(text("#methodHint") == "Card selected", "Card payment method did not select")
                click('[data-method="upi"]')
                require(text("#methodHint") == "UPI selected", "UPI payment method did not reselect")
                click("#payButton")
                wait.until(lambda _driver: text("#payButton") == "View Order", "payment did not reach successful View Order state")
                click("#payButton")
                wait.until(lambda current: expected_screen in current.current_url, f"View Order did not reach {expected_screen}")
                return {"basketLine": basket_line, "basketTotal": basket_total, "paymentTotal": payment_total, "coupon": "applied" if apply_coupon else "not applied", "paymentMethod": "UPI", "orderRoute": expected_screen}

            def home_value_delivery() -> dict:
                open_path("screens/09-buy.html")
                at_shop_visible = driver.execute_script("const e=document.querySelector('[data-at-shop-only]');return getComputedStyle(e).display!=='none'")
                require(not at_shop_visible, "at-shop collection appeared during home ordering")
                click('[data-buy-state="home"].active .product-card[data-open-detail="tomato"] .product-image')
                wait.until(lambda current: "11-buy-product-detail.html" in current.current_url, "Home Value Pack product card did not open detail")
                click('[data-rate="pack"]')
                require("Rs 136" in text("#heroPrice"), "complete Home Value Pack total was not shown")
                return {"mode": "Home Value Pack", **continue_product_to_order("17-home-delivery-tracking.html", apply_coupon=True)}

            def business_bulk_delivery() -> dict:
                open_path("screens/09-buy.html")
                click('[data-price-mode="wholesale"]')
                visible_cards = driver.execute_script("return [...document.querySelectorAll('.product-card[data-open-detail]')].filter(e=>e.getClientRects().length>0).length")
                require(visible_cards == 2, f"Business Bulk showed {visible_cards} product cards instead of two eligible listings")
                click('[data-buy-state="home"].active .product-card[data-open-detail="atta"] .product-title')
                wait.until(lambda current: "11-buy-product-detail.html" in current.current_url)
                require("rate=wholesale" in driver.current_url, "Business Bulk selection was not retained")
                require("10-bag minimum" in text("#fixedRateUnitTitle"), "seller MOQ lot was not decisive")
                require("Rs 4550" in text("#heroPrice").replace(",", ""), "complete minimum-order total was not shown")
                return {"mode": "Business Bulk", **continue_product_to_order("17-home-delivery-tracking.html")}

            def at_shop_collection() -> dict:
                open_path("screens/09-buy.html?context=at-shop")
                click('[data-shop-action="pickup"]')
                wait.until(lambda current: "10-buy-grocery-decision.html" in current.current_url)
                require("context=at-shop" in driver.current_url, "at-shop context was not retained")
                card = element('[data-product-card][data-product="tomato"]')
                driver.execute_script("arguments[0].scrollIntoView({block:'center'});", card)
                card.find_element(By.CSS_SELECTOR, ".product-name").click()
                wait.until(lambda current: "11-buy-product-detail.html" in current.current_url)
                require("intent=pickup" in driver.current_url and "pickup=on" in driver.current_url, "collection intent did not reach product detail")
                require(element('[data-fulfil="pickup"]').is_displayed(), "at-shop collection was not available in the confirmed shop context")
                return {"mode": "At-shop collection", **continue_product_to_order("15-counter-ready-receipt.html")}

            run("social-selected-video-and-nested-actions", social_video)
            run("people-chat-call-media-message", people_chat)
            run("buy-home-value-pack-delivery", home_value_delivery)
            run("buy-business-bulk-delivery", business_bulk_delivery)
            run("buy-at-shop-collection", at_shop_collection)
    finally:
        server.shutdown()
        server.server_close()

    summary = {
        "journeys": len(results),
        "passed": sum(item["status"] == "passed" for item in results),
        "failed": sum(item["status"] == "failed" for item in results),
        "consoleErrors": len(console_errors),
    }
    report = {
        "version": "critical-intent-journey-audit-2026-07-15",
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "viewport": {"width": 390, "height": 844},
        "summary": summary,
        "journeys": results,
        "consoleErrors": console_errors,
    }
    output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(output), **summary}, indent=2), flush=True)
    return 0 if not summary["failed"] and not summary["consoleErrors"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
