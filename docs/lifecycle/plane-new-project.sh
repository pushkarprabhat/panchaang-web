#!/usr/bin/env bash
# Usage:
#   export PLANE_BASE=https://api.plane.so
#   export PLANE_API_KEY=plane_api_...
#   export PLANE_WORKSPACE=theiaone
#   bash docs/lifecycle/plane-new-project.sh Panchaang
# Do not commit the key. Do not put it in the repository.
set -euo pipefail
NAME="${1:-Panchaang}"
: "${PLANE_BASE:?set PLANE_BASE}"
: "${PLANE_API_KEY:?set PLANE_API_KEY}"
: "${PLANE_WORKSPACE:?set PLANE_WORKSPACE}"
AUTH="Authorization: Bearer ${PLANE_API_KEY}"
SLUG=$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
PROJECT=$(curl -fsS -X POST "$PLANE_BASE/api/v1/workspaces/${PLANE_WORKSPACE}/projects/" \
  -H "$AUTH" -H "Content-Type: application/json" \
  -d "{\"name\":\"$NAME\",\"identifier\":\"${SLUG:0:5}\"}")
PID=$(echo "$PROJECT" | python -c 'import json,sys; print(json.load(sys.stdin)["id"])')
echo "project $PID"
i=0
for state in Backlog Speccing Ready "In Progress" "PR Raised" "In Review" Staging Done Cancelled; do
  i=$((i+1))
  group=backlog
  [ "$state" = Done ] && group=completed
  [ "$state" = Cancelled ] && group=cancelled
  [ "$state" = "In Progress" ] && group=started
  curl -fsS -X POST "$PLANE_BASE/api/v1/workspaces/${PLANE_WORKSPACE}/projects/${PID}/states/" \
    -H "$AUTH" -H "Content-Type: application/json" \
    -d "{\"name\":\"$state\",\"color\":\"#16324f\",\"group\":\"$group\",\"sequence\":$i}" >/dev/null
  echo "state $state"
done
for label in feature bug spike docs ops content blocked; do
  curl -fsS -X POST "$PLANE_BASE/api/v1/workspaces/${PLANE_WORKSPACE}/projects/${PID}/labels/" \
    -H "$AUTH" -H "Content-Type: application/json" \
    -d "{\"name\":\"$label\",\"color\":\"#c2410c\"}" >/dev/null || true
  echo "label $label"
done
echo "done $NAME"
