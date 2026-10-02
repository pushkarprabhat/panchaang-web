# Plane setup

Create one project: Panchaang.

States, in this order:

Backlog, Speccing, Ready, In Progress, PR Raised, In Review, Staging, Done, Cancelled.

Labels: feature, bug, spike, docs, ops, content, blocked.

Modules: Engine, Web, Billing, Legal, Content.

Cycle: 14 days. Name it C1, C2, and so on.

Relations: use Plane relations for blocks, blocked by, and relates to. Use a parent item for a launch slice.

Import `docs/lifecycle/plane-import.csv` if the workspace allows CSV import. Otherwise create the rows by hand from that file.

Same states and labels on Manekbaba, Divine Ganesha, and Pooja Shop Online when those projects start. Do not invent a second workflow.

Production gate: Pushkar only, until a second approver is named on the item.
