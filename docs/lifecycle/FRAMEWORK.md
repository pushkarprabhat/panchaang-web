# TheiaOne delivery lifecycle

One Plane project per product. One work item per change. Same states on every project.
Cycles are 14 days. Production approval is Pushkar until a second approver is named.

## States

| State | Meaning | Exit rule |
| --- | --- | --- |
| Backlog | Captured, not refined | A one-line outcome exists |
| Speccing | Requirement and refinement | Acceptance checks written |
| Ready | Ready to build | Definition of Ready met |
| In Progress | Being built | PR opened |
| PR Raised | Review requested | Reviewer assigned |
| In Review | Review or test in progress | Review approved |
| Staging | On a non-prod URL | Production check passed |
| Done | In production | Evidence linked |
| Cancelled | Will not be done | Reason written |

No skipping Speccing on a feature. A bug may start at Ready if the failing case is already written.

## Work item types

Feature, Bug, Spike, Docs, Ops, Content.

Each type uses the same states. The artefact set changes. See TASK.md.

## Relations

- Parent: an epic or launch slice.
- Blocks / Blocked by: cannot start or cannot finish without the other.
- Relates to: same theme, not a gate.

A blocked item stays in its state. It does not move to Done.

## Cycle

1. Pull Ready items into the cycle.
2. Build only what is in the cycle.
3. Staging is checked before Done.
4. Unfinished items return to Ready or Backlog. They are not left In Progress across a cycle boundary.

## Documents that live with the project, not in chat

- This framework.
- TASK.md template.
- DoR and DoD.
- The Plane work item, which links the spec, PR, and release note.
