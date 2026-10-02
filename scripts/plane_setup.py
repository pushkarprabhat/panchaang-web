"""Create Plane projects from docs/lifecycle/plane-project.json.

The key file is the parent folder, not this repo:
  D:/TheiaOne_Programs/Projects/Panchaang-Engine/.env.plane

  python scripts/plane_setup.py
  python scripts/plane_setup.py --all
  python scripts/plane_setup.py --name "Manekbaba"
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


def project_id(base, workspace, chosen):
    root = f"{base}/api/v1/workspaces/{workspace}"
    created = api("POST", f"{root}/projects/", {
        "name": chosen["project"],
        "identifier": chosen["identifier"],
    })
    if created.get("id"):
        return created["id"], root
    found = api("GET", f"{root}/projects/")
    rows = found.get("results", found if isinstance(found, list) else [])
    for row in rows:
        if row.get("identifier") == chosen["identifier"] or row.get("name") == chosen["project"]:
            return row["id"], root
    raise SystemExit(f"Could not find {chosen['project']} after it already existed")


def create_project(base, workspace, spec, chosen):
    pid, root = project_id(base, workspace, chosen)
    print(f"project {chosen['project']} {pid}")
    api("PATCH", f"{root}/projects/{pid}/", {"module_view": True}, allow=(400, 409))
    for i, name in enumerate(spec["states"], start=1):
        group = "backlog"
        if name == "Done":
            group = "completed"
        elif name == "Cancelled":
            group = "cancelled"
        elif name == "In Progress":
            group = "started"
        api("POST", f"{root}/projects/{pid}/states/", {
            "name": name, "color": "#16324f", "group": group, "sequence": i,
        })
        print(f"state {name}")
    for name in spec["labels"]:
        api("POST", f"{root}/projects/{pid}/labels/", {"name": name, "color": "#c2410c"})
        print(f"label {name}")
    modules_on = True
    for name in spec.get("modules", []):
        if not modules_on:
            break
        made = api("POST", f"{root}/projects/{pid}/modules/", {"name": name}, allow=(400, 409))
        if "not enabled" in json.dumps(made).lower():
            print("modules skipped, turn them on in Plane project settings")
            modules_on = False
            continue
        print(f"module {name}")
    csv_path = ROOT / chosen.get("import_csv", "")
    if chosen.get("import_csv") and csv_path.exists():
        with csv_path.open(encoding="utf-8") as handle:
            for row in csv.DictReader(handle):
                api("POST", f"{root}/projects/{pid}/issues/", {
                    "name": row["Name"],
                    "description_html": f"<p>{row.get('Notes', '')}</p>",
                })
                print(f"item {row['Name']}")


def choose(projects, args):
    if args.name:
        ident = "".join(ch for ch in args.name.upper() if ch.isalnum())[:5] or "PROJ"
        return [{"project": args.name, "identifier": ident, "import_csv": ""}]
    if args.all:
        return projects
    print("Create which Plane project?")
    for i, item in enumerate(projects, start=1):
        print(f"  {i}. {item['project']}")
    print(f"  {len(projects) + 1}. both")
    print("  0. type a new name")
    raw = input("Number: ").strip()
    if raw == "0":
        name = input("Project name: ").strip()
        ident = "".join(ch for ch in name.upper() if ch.isalnum())[:5] or "PROJ"
        return [{"project": name, "identifier": ident, "import_csv": ""}]
    if raw == str(len(projects) + 1):
        return projects
    return [projects[int(raw) - 1]]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--name")
    args = parser.parse_args()
    spec = json.loads(INSTRUCTION.read_text(encoding="utf-8"))
    key_file = load_key(spec)
    print(f"key file {key_file}")
    base = os.environ.get("PLANE_BASE", "https://api.plane.so").rstrip("/")
    for chosen in choose(spec["projects"], args):
        create_project(base, os.environ["PLANE_WORKSPACE"], spec, chosen)
    print("done")


if __name__ == "__main__":
    sys.exit(main())
