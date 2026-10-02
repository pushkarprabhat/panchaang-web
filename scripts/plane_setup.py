"""Fill a Plane project from docs/lifecycle/plane-project.json.

One workspace. One project for both repositories.
Key file: D:/TheiaOne_Programs/Projects/Panchaang-Engine/.env.plane

  python scripts/plane_setup.py --into PANCHAANG
"""
import argparse
import csv
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INSTRUCTION = ROOT / "docs" / "lifecycle" / "plane-project.json"


def load_key(spec):
    key_file = (ROOT / spec.get("key_file", "../.env.plane")).resolve()
    if key_file.exists():
        for line in key_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"'))
    missing = [k for k in ("PLANE_API_KEY", "PLANE_WORKSPACE") if not os.environ.get(k)]
    if missing:
        raise SystemExit(f"Missing {', '.join(missing)} in {key_file}")
    return key_file


def api(method, url, payload=None, allow=(409,)):
    data = None if payload is None else json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("X-API-Key", os.environ["PLANE_API_KEY"])
    req.add_header("Content-Type", "application/json")
    req.add_header("User-Agent", "Mozilla/5.0")
    try:
        with urllib.request.urlopen(req) as res:
            body = res.read().decode()
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode()
        if exc.code in allow:
            try:
                return json.loads(detail)
            except json.JSONDecodeError:
                return {"exists": True, "detail": detail}
        raise SystemExit(f"{method} {url} failed: {exc.code} {detail}") from exc


def rows_of(payload):
    if isinstance(payload, list):
        return payload
    return payload.get("results", [])


def find_project(base, workspace, name):
    root = f"{base}/api/v1/workspaces/{workspace}"
    found = api("GET", f"{root}/projects/")
    want = name.lower()
    for row in rows_of(found):
        if row.get("name", "").lower() == want or row.get("identifier", "").lower() == want:
            return row["id"], root
    raise SystemExit(f"No project named {name} in workspace {workspace}")


def fill(base, workspace, spec, name, import_csv):
    pid, root = find_project(base, workspace, name)
    print(f"project {name} {pid}")
    api("PATCH", f"{root}/projects/{pid}/", {"module_view": True}, allow=(400, 409))
    for i, state in enumerate(spec["states"], start=1):
        group = "backlog"
        if state == "Done":
            group = "completed"
        elif state == "Cancelled":
            group = "cancelled"
        elif state == "In Progress":
            group = "started"
        api("POST", f"{root}/projects/{pid}/states/", {
            "name": state, "color": "#16324f", "group": group, "sequence": i,
        })
        print(f"state {state}")
    for label in spec["labels"]:
        api("POST", f"{root}/projects/{pid}/labels/", {"name": label, "color": "#c2410c"})
        print(f"label {label}")
    modules_on = True
    for module in spec.get("modules", []):
        if not modules_on:
            break
        made = api("POST", f"{root}/projects/{pid}/modules/", {"name": module}, allow=(400, 409))
        if "not enabled" in json.dumps(made).lower():
            print("modules skipped")
            modules_on = False
            continue
        print(f"module {module}")
    if not import_csv:
        return
    existing = {row.get("name") for row in rows_of(api("GET", f"{root}/projects/{pid}/issues/"))}
    csv_path = ROOT / import_csv
    with csv_path.open(encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            if row["Name"] in existing:
                print(f"item exists {row['Name']}")
                continue
            api("POST", f"{root}/projects/{pid}/issues/", {
                "name": row["Name"],
                "description_html": f"<p>{row.get('Notes', '')}</p>",
            })
            print(f"item {row['Name']}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--into", default="PANCHAANG")
    args = parser.parse_args()
    spec = json.loads(INSTRUCTION.read_text(encoding="utf-8"))
    key_file = load_key(spec)
    print(f"key file {key_file}")
    base = os.environ.get("PLANE_BASE", "https://api.plane.so").rstrip("/")
    fill(base, os.environ["PLANE_WORKSPACE"], spec, args.into, spec["projects"][0]["import_csv"])
    print("done")


if __name__ == "__main__":
    sys.exit(main())
