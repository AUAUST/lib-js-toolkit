---
name: merging
description: Review what a walk landed for what per-leaf review cannot see,
  rebasing a concurrent leaf onto the walked branch first. Use only when the
  user asks for a merger.
---

<!-- @reference @auaust/engrenage/agents/skills/merging.md -->

# Merging

Review what a walk landed for what per-leaf review cannot see: duplication across leaves, diverging choices, missed reuse, and bugs and improvements around the changed code. The walker reviews each diff against its own issue; you review it against its siblings and its surroundings. You find; the leaf's worker or a debugger fixes, and the walker commits.

## Brief

| Walk       | Given                                                                                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Concurrent | The plan and segment, the leaf's issue, its worktree path, the walked branch's `HEAD` commit, the commit range landed since the leaf's base (empty when the branch did not move), the previous carry-over |
| Sequential | The plan and segment, the commit range landed since the previous merger run, the previous carry-over                                                                                                      |

- Read the issues and plan sections the brief names, and the landed commits.
- Treat the carry-over as findings already handled: never report them again.

## Rebase

In a concurrent walk only, and only when the briefed landed range is not empty. Work in the briefed worktree: run every command from it and edit its files by their absolute paths, never the main checkout.

1. Set the uncommitted rest aside with `git stash push --include-untracked`.
2. Rebase the leaf's commits onto the briefed `HEAD` commit, then restore the rest with `git stash pop`.
3. Resolve each conflict: regenerate a generated file with `engrenage sync`, keep both sides of an append-only agent log, and merge a hand-written file so both sides' intent holds.
4. When a hand-written conflict needs a choice neither side's issue settles, run `git rebase --abort`, restore the rest, and report the conflict with each side's intent.

- Create no commit beyond the ones the rebase rewrites.

## Scope

The range base is the briefed `HEAD` commit in a concurrent walk, the range's first parent in a sequential one.

- Read whole every file the range changes; search beyond them only for twins of what the range adds, by name and shape, in the changed domains and the domains they import.
- Leave to the commit gate whatever it enforces.
- Base each finding on a defect or on a project rule no tool enforces, and name it.
- When the project has jscpd, run `engrenage jscpd:new <range base>` once, and verify each clone it lists as a lead.

## Review

- Compare the leaf, or each leaf of the range, with the rest of the range: duplicated helpers, tests or fixtures; diverging names, patterns or choices for one concern; code one leaf added that another could reuse; release or project requirements one leaf meets and a sibling misses.
- In each changed module, look for helpers two modules now need, helpers duplicating an export of a dependency or another domain, and near-twins to merge; check that each function still serves its module's concern and role, and that no concern is handled two ways.
- Read the code around each change for bugs, and for improvements the change makes worth doing.

## Routing

A finding is within the fix radius when its fix stays in the range's files, or extracts a helper they share into their domain, and changes no shared contract.

| Finding                                                           | Route                                                            |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| Within the fix radius and the leaf's issue                        | Leaf findings in a concurrent walk; findings in a sequential one |
| Within the fix radius, outside the leaf's issue                   | Walk findings                                                    |
| Located in the code, beyond the fix radius                        | A `@debt` marker at its site                                     |
| Not located: a missing abstraction, drift across domains, tooling | A backlog entry                                                  |
| A solution you weighed and set aside                              | A line under the discarded-solutions rule                        |

- Edit only debt markers, the backlog and the agent logs, in the tree you review; never implement a finding, edit an issue or commit.

## Report

Send no message before your final report, your only message, once every command you started has finished:

- The conflicts you resolved, each with its resolution, or the aborted rebase and the conflict that stopped it.
- The leaf findings and the walk findings, or the findings in a sequential walk, each with its file, the defect or rule, and the expected change.
- The debt markers, backlog entries and discarded-solutions lines you added.
- **Carry-over**: one line per finding, for the next merger.
- What remains and the kind of work it needs; say so when nothing remains.

<!-- @end -->
