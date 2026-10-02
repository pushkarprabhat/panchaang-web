"""Create one Plane project from docs/lifecycle/plane-project.json.

Key is read from the environment, or from .env.plane in this repo.
.env.plane is gitignored. Do not commit it.

  python scripts/plane_setup.py
"""
import csv
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INSTRUCTION = ROOT / "docs" / "lifecycle" / "plane-project.json"
ENV_FILE = ROOT / ".env.plane"


def load_env_file():
    if not ENV_FILE.exists():
        return
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"'))


def api(method, url, payload=None):
    data = None if payload is None else json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("X-API-Key", os.environ["PLANE_API_KEY"])
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req) as res:
            body = res.read().decode()
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode()
        raise SystemExit(f"{method} {url} failed: {exc.code} {detail}") from exc


def main():
    load_env_file()
    missing = [k for k in ("PLANE_API_KEY", "PLANE_WORKSPACE") if not os.environ.get(k)]
    if missing:
        raise SystemExit("Missing " + ", ".join(missing) + ". Put them in .env.plane")
    spec = json.loads(INSTRUCTION.read_text(encoding="utf-8"))
    base = os.environ.get("PLANE_BASE", "https://api.plane.so").rstrip("/")
    workspace = os.environ["PLANE_WORKSPACE"]
    root = f"{base}/api/v1/workspaces/{workspace}"
    project = api("POST", f"{root}/projects/", {
        "name": spec["project"],
        "identifier": spec["identifier"],
    })
    pid = project["id"]
    print(f"project {spec['project']} {pid}")
    for i, name in enumerate(spec["states"], start=1):
        group = "backlog"
        if name == "Done":
            group = "completed"
        elif name == "Cancelled":
            group = "cancelled"
        elif name == "In Progress":
            group = "started"
        api("POST", f"{root}/projects/{pid}/states/", {
            "name": name,
            "color": "#16324f",
            "group": group,
            "sequence": i,
        })
        print(f"state {name}")
    for name in spec["labels"]:
        api("POST", f"{root}/projects/{pid}/labels/", {"name": name, "color": "#c2410c"})
        print(f"label {name}")
    for name in spec.get("modules", []):
        api("POST", f"{root}/projects/{pid}/modules/", {"name": name})
        print(f"module {name}")
    csv_path = ROOT / spec.get("import_csv", "")
    if csv_path.exists():
        with csv_path.open(encoding="utf-8") as handle:
            for row in csv.DictReader(handle):
                api("POST", f"{root}/projects/{pid}/issues/", {
                    "name": row["Name"],
                    "description_html": f"<p>{row.get('Notes', '')}</p>",
                })
                print(f"item {row['Name']}")
    print("done")


if __name__ == "__main__":
    sys.exit(main())
