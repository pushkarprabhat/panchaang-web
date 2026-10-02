# Kiro prompt

Do not read a Plane key from the repository. Ask for it as an environment variable.

```yaml
task: create Plane project
inputs:
  workspace: theiaone
  project: Panchaang
  base: https://api.plane.so
  key_env: PLANE_API_KEY
states: [Backlog, Speccing, Ready, In Progress, PR Raised, In Review, Staging, Done, Cancelled]
labels: [feature, bug, spike, docs, ops, content, blocked]
modules: [Engine, Web, Billing, Legal, Content]
cycle_days: 14
import: docs/lifecycle/plane-import.csv
rules:
  - never commit the key
  - same states on every later project
```

Command, after the key is only in the shell:

```bash
export PLANE_BASE=https://api.plane.so
export PLANE_WORKSPACE=theiaone
export PLANE_API_KEY
bash docs/lifecycle/plane-new-project.sh Panchaang
```
