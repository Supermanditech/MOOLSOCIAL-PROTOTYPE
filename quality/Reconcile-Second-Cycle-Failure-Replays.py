"""Match every pre-fix adversarial failure to its final exact-path replay."""

from __future__ import annotations

import argparse
import json
import time
from pathlib import Path


def items(report: dict) -> list[dict]:
    flattened: list[dict] = []
    for run in report.get("runs", []):
        for result in [*run.get("routeResults", []), *run.get("actionResults", [])]:
            flattened.append({"screen": run["screen"], "viewport": run["viewport"], **result})
    return flattened


def key(item: dict) -> tuple:
    return (
        item.get("viewport"),
        int(item.get("screen", -1)),
        item.get("scenario", ""),
        tuple(item.get("path", [])),
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--baseline", type=Path, required=True)
    parser.add_argument("--final", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    baseline = json.loads(args.baseline.read_text(encoding="utf-8-sig"))
    final = json.loads(args.final.read_text(encoding="utf-8-sig"))
    failures = [item for item in items(baseline) if item.get("status") == "failed"]
    final_index = {key(item): item for item in items(final)}
    replays = []
    for failure in failures:
        replay = final_index.get(key(failure))
        state = "verified-passed" if replay and replay.get("status") == "passed" else "still-failed" if replay else "missing"
        replays.append({
            "viewport": failure.get("viewport"),
            "screen": failure.get("screen"),
            "scenario": failure.get("scenario"),
            "path": failure.get("path", []),
            "ticket": failure.get("ticket", ""),
            "baselineObserved": failure.get("observedResult", ""),
            "baselineEvidence": failure.get("evidence", ""),
            "replayStatus": state,
            "replayObserved": replay.get("observedResult", "") if replay else "No matching final replay record.",
            "recoveryVerified": bool(replay and replay.get("recoveryVerified")),
        })
    summary = {
        "baselineFailures": len(failures),
        "verifiedPassed": sum(item["replayStatus"] == "verified-passed" for item in replays),
        "stillFailed": sum(item["replayStatus"] == "still-failed" for item in replays),
        "missing": sum(item["replayStatus"] == "missing" for item in replays),
    }
    summary["status"] = "passed" if summary["verifiedPassed"] == len(failures) else "failed"
    report = {
        "version": "second-cycle-failure-replay-reconciliation-2026-07-16",
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "baseline": str(args.baseline),
        "final": str(args.final),
        "summary": summary,
        "replays": replays,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(args.output), **summary}, indent=2))
    return 0 if summary["status"] == "passed" else 1


if __name__ == "__main__":
    raise SystemExit(main())
