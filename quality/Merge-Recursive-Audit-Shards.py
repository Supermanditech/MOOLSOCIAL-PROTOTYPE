"""Merge non-overlapping recursive intent-audit reports into release evidence."""

from __future__ import annotations

import argparse
import json
import time
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("inputs", nargs="+", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--expected-screens", type=int, default=166)
    args = parser.parse_args()

    reports = [json.loads(path.read_text(encoding="utf-8-sig")) for path in args.inputs]
    by_screen: dict[int, dict] = {}
    duplicates: list[int] = []
    for report in reports:
        for screen in report.get("screens", []):
            number = int(screen["screen"])
            if number in by_screen:
                duplicates.append(number)
            by_screen[number] = screen

    screens = [by_screen[number] for number in sorted(by_screen)]
    console_errors = [entry for report in reports for entry in report.get("consoleErrors", [])]
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
        "version": "recursive-control-intent-audit-release-2026-07-15",
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "viewport": {"width": 390, "height": 844},
        "maxDepth": max(int(item.get("maxDepth", 0)) for item in reports),
        "sourceReports": [str(path) for path in args.inputs],
        "summary": summary,
        "screens": screens,
        "consoleErrors": console_errors,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    valid = (
        not duplicates
        and summary["screens"] == args.expected_screens
        and not summary["failed"]
        and not summary["truncatedScreens"]
        and not summary["consoleErrors"]
    )
    print(json.dumps({"output": str(args.output), "valid": valid, "duplicates": sorted(set(duplicates)), **summary}, indent=2))
    return 0 if valid else 1


if __name__ == "__main__":
    raise SystemExit(main())
