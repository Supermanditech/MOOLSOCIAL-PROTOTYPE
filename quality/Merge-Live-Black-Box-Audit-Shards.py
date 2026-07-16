"""Merge live black-box audit shard reports into the canonical screenwise ledger."""

from __future__ import annotations

import argparse
import json
import time
from pathlib import Path


def summary_for(runs: list[dict], console_errors: list[dict], missing_runs: list[dict]) -> dict:
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
        "missingScreenViewportRuns": len(missing_runs),
    }
    if summary["failed"] or summary["truncatedScreens"] or summary["consoleErrors"] or summary["missingScreenViewportRuns"]:
        summary["status"] = "failed"
    return summary


def evidence_link(value: str, markdown: Path) -> str:
    path = Path(value)
    try:
        return path.resolve().relative_to(markdown.parent.resolve()).as_posix()
    except ValueError:
        return path.as_posix()


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
        f"| Screen/viewport runs | {summary['screenViewportRuns']} |",
        f"| Unique screens | {summary['uniqueScreens']} |",
        f"| Paths tested | {summary['pathsTested']} |",
        f"| Nested paths | {summary['nestedPathsTested']} |",
        f"| Genuine completions | {summary['passed']} |",
        f"| Broken/incomplete intents | {summary['failed']} |",
        f"| Synthetic runtime-only responses | {summary['syntheticRuntimeOnly']} |",
        f"| Unexplained no-op taps | {summary['noOp']} |",
        f"| Truncated screen states | {summary['truncatedScreens']} |",
        f"| Severe console errors | {summary['consoleErrors']} |",
        f"| Missing screen/viewport runs | {summary['missingScreenViewportRuns']} |",
        "",
        "Generated contract toasts, orange selection outlines and generic contract sheets are excluded from completion evidence.",
        "",
        "## Screen-by-screen tap coverage",
        "",
        "| Viewport | Screen | Tap paths | Nested paths | Passed | Failed | No-op | Truncated |",
        "| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
    ]
    for run in report["runs"]:
        lines.append(
            f"| {run['viewport']} | {run['screen']:03d} | {run.get('pathsTested', 0)} | "
            f"{run.get('nestedPathsTested', 0)} | {run.get('passed', 0)} | {run.get('failed', 0)} | "
            f"{run.get('noOp', 0)} | {'yes' if run.get('truncated') else 'no'} |"
        )
    lines.extend([
        "",
        "## Screenwise findings",
        "",
        "| Ticket | Viewport | Screen | Tap path | Intent | Failure | Evidence |",
        "| --- | --- | ---: | --- | --- | --- | --- |",
    ])
    for run in report["runs"]:
        for issue in run["issues"]:
            links = " / ".join(
                f"[{name}]({evidence_link(path, output)})"
                for name, path in issue.get("evidence", {}).items()
            )
            path = " → ".join(issue.get("path", [])).replace("|", "\\|")
            failure = issue.get("observedResult", "").replace("|", "\\|")
            lines.append(
                f"| {issue.get('ticket', '')} | {run['viewport']} | {run['screen']:03d} | {path} | {issue.get('userIntent', '')} | {failure} | {links} |"
            )
    output.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, action="append", required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--markdown-output", type=Path)
    args = parser.parse_args()

    documents = [json.loads(path.read_text(encoding="utf-8-sig")) for path in args.input]
    if not documents:
        raise SystemExit("No reports supplied")
    runs = [run for document in documents for run in document.get("runs", [])]
    console_errors = [item for document in documents for item in document.get("consoleErrors", [])]
    viewport_order = {"mobile": 0, "desktop": 1}
    runs.sort(key=lambda run: (viewport_order.get(run.get("viewport", ""), 9), int(run.get("screen", -1))))
    duplicate_keys = []
    seen = set()
    for run in runs:
        key = (run.get("viewport"), run.get("screen"))
        if key in seen:
            duplicate_keys.append(key)
        seen.add(key)
    if duplicate_keys:
        raise SystemExit(f"Duplicate screen/viewport runs: {duplicate_keys[:10]}")
    expected = {(viewport, screen) for viewport in ("mobile", "desktop") for screen in range(166)}
    missing_runs = [
        {"viewport": viewport, "screen": screen}
        for viewport, screen in sorted(expected - seen, key=lambda item: ({"mobile": 0, "desktop": 1}[item[0]], item[1]))
    ]

    report = {
        "version": "live-black-box-intent-audit-2026-07-15",
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "baseUrl": documents[0].get("baseUrl", ""),
        "rule": "A tap passes only when the native product screen satisfies the specific user intent. Central contract-runtime feedback is excluded.",
        "sourceReports": [str(path) for path in args.input],
        "viewports": {
            key: value
            for document in documents
            for key, value in document.get("viewports", {}).items()
        },
        "summary": summary_for(runs, console_errors, missing_runs),
        "missingRuns": missing_runs,
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
