"""Merge non-overlapping second-cycle adversarial audit shards."""

from __future__ import annotations

import argparse
import json
import time
from pathlib import Path


def flatten(run: dict) -> list[dict]:
    return [*run.get("routeResults", []), *run.get("actionResults", [])]


def result_summary(runs: list[dict], console_errors: list[dict], missing: list[dict]) -> dict:
    results = [item for run in runs for item in flatten(run)]
    summary = {
        "status": "passed",
        "screenViewportRuns": len(runs),
        "uniqueScreens": len({run["screen"] for run in runs}),
        "routeScenariosTested": sum(len(run.get("routeResults", [])) for run in runs),
        "actionScenariosTested": sum(len(run.get("actionResults", [])) for run in runs),
        "passed": sum(item.get("status") == "passed" for item in results),
        "failed": sum(item.get("status") == "failed" for item in results),
        "cancelBranchesVerified": sum(bool(item.get("cancelVerified")) for item in results),
        "recoveryBranchesVerified": sum(bool(item.get("recoveryVerified")) for item in results),
        "truncatedScreens": sum(bool(run.get("truncated")) for run in runs),
        "consoleErrors": len(console_errors),
        "missingScreenViewportRuns": len(missing),
    }
    if summary["failed"] or summary["truncatedScreens"] or summary["consoleErrors"] or summary["missingScreenViewportRuns"]:
        summary["status"] = "failed"
    return summary


def relative_evidence(value: str, output: Path) -> str:
    if not value:
        return ""
    path = Path(value)
    try:
        return path.resolve().relative_to(output.parent.resolve()).as_posix()
    except ValueError:
        return path.as_posix()


def write_markdown(report: dict, output: Path) -> None:
    summary = report["summary"]
    lines = [
        "# Second-Cycle Adversarial Micro-Interaction Audit",
        "",
        f"Generated: {report['generatedAt']}",
        f"Test origin: `{report['baseUrl']}`",
        "",
        "## Release gate",
        "",
        f"Status: **{summary['status']}**",
        "",
        "| Measure | Result |",
        "| --- | ---: |",
        f"| Screen/viewport runs | {summary['screenViewportRuns']} |",
        f"| Unique screens | {summary['uniqueScreens']} |",
        f"| Route-state scenarios | {summary['routeScenariosTested']} |",
        f"| Action/input scenarios | {summary['actionScenariosTested']} |",
        f"| Passed | {summary['passed']} |",
        f"| Failed | {summary['failed']} |",
        f"| Cancel branches verified | {summary['cancelBranchesVerified']} |",
        f"| Recovery branches verified | {summary['recoveryBranchesVerified']} |",
        f"| Truncated screens | {summary['truncatedScreens']} |",
        f"| Severe console errors | {summary['consoleErrors']} |",
        f"| Missing screen/viewport runs | {summary['missingScreenViewportRuns']} |",
        "",
        "## Screen-by-screen coverage",
        "",
        "| Viewport | Screen | Positive paths referenced | Route states | Action/input states | Passed | Failed | Truncated |",
        "| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
    ]
    for run in report["runs"]:
        results = flatten(run)
        lines.append(
            f"| {run['viewport']} | {run['screen']:03d} | {run.get('positivePathsReferenced', 0)} | "
            f"{len(run.get('routeResults', []))} | {len(run.get('actionResults', []))} | "
            f"{sum(item.get('status') == 'passed' for item in results)} | "
            f"{sum(item.get('status') == 'failed' for item in results)} | "
            f"{'yes' if run.get('truncated') else 'no'} |"
        )
    lines.extend([
        "",
        "## Failed paths",
        "",
        "| Ticket | Viewport | Screen | Scenario | Exact path | Observed | Evidence |",
        "| --- | --- | ---: | --- | --- | --- | --- |",
    ])
    for run in report["runs"]:
        for item in flatten(run):
            if item.get("status") != "failed":
                continue
            path = " → ".join(item.get("path", [])).replace("|", "\\|")
            observed = item.get("observedResult", "").replace("|", "\\|")
            evidence = relative_evidence(item.get("evidence", ""), output)
            link = f"[screenshot]({evidence})" if evidence else ""
            lines.append(
                f"| {item.get('ticket', '')} | {run['viewport']} | {run['screen']:03d} | "
                f"{item.get('scenario', '')} | {path} | {observed} | {link} |"
            )
    output.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, action="append", required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--markdown-output", type=Path)
    args = parser.parse_args()

    documents = [json.loads(path.read_text(encoding="utf-8-sig")) for path in args.input]
    raw_runs = [run for document in documents for run in document.get("runs", [])]
    console_errors = [item for document in documents for item in document.get("consoleErrors", [])]
    order = {"mobile": 0, "desktop": 1}
    combined: dict[tuple[str, int], dict] = {}
    incompatible: list[tuple[str, int]] = []
    for run in raw_runs:
        key = (run.get("viewport", ""), int(run.get("screen", -1)))
        if key not in combined:
            combined[key] = {
                **run,
                "routeResults": list(run.get("routeResults", [])),
                "actionResults": list(run.get("actionResults", [])),
            }
            continue
        existing = combined[key]
        if existing.get("routeResults") and run.get("routeResults"):
            incompatible.append(key)
        if existing.get("actionResults") and run.get("actionResults"):
            incompatible.append(key)
        existing["routeResults"].extend(run.get("routeResults", []))
        existing["actionResults"].extend(run.get("actionResults", []))
        existing["positivePathsReferenced"] = max(
            int(existing.get("positivePathsReferenced", 0)),
            int(run.get("positivePathsReferenced", 0)),
        )
        existing["truncated"] = bool(existing.get("truncated") or run.get("truncated"))
        existing["queuedActionScenariosRemaining"] = (
            int(existing.get("queuedActionScenariosRemaining", 0))
            + int(run.get("queuedActionScenariosRemaining", 0))
        )
    if incompatible:
        raise SystemExit(f"Overlapping adversarial result classes for screen/viewport runs: {incompatible[:10]}")
    runs = sorted(
        combined.values(),
        key=lambda run: (order.get(run.get("viewport", ""), 9), int(run.get("screen", -1))),
    )
    seen = set(combined)
    expected = {(viewport, screen) for viewport in ("mobile", "desktop") for screen in range(166)}
    missing = [
        {"viewport": viewport, "screen": screen}
        for viewport, screen in sorted(expected - seen, key=lambda item: (order[item[0]], item[1]))
    ]
    report = {
        "version": "second-cycle-adversarial-micro-audit-2026-07-16",
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "baseUrl": documents[0].get("baseUrl", "") if documents else "",
        "positiveReport": documents[0].get("positiveReport", "") if documents else "",
        "rule": "Every forced route or action failure condition must expose a domain-specific recovery path and complete the original intent after recovery.",
        "sourceReports": [str(path) for path in args.input],
        "viewports": {key: value for document in documents for key, value in document.get("viewports", {}).items()},
        "summary": result_summary(runs, console_errors, missing),
        "missingRuns": missing,
        "runs": runs,
        "consoleErrors": console_errors,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    markdown = args.markdown_output or args.output.with_suffix(".md")
    write_markdown(report, markdown)
    print(json.dumps({"output": str(args.output), "markdown": str(markdown), **report["summary"]}, indent=2))
    return 0 if report["summary"]["status"] == "passed" else 1


if __name__ == "__main__":
    raise SystemExit(main())
