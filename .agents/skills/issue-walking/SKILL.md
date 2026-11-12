---
name: issue-walking
description: Walk a planned tree of GitHub issues in order, dispatching each
  leaf to a worker or debugger, then reviewing and committing it. Use only when
  the user asks to walk an issue tree.
---

<!-- @reference @auaust/engrenage/agents/skills/issue-walking.md -->

# Issue walking

Walk an issue tree in the main session: route each issue by the handling table, review each leaf's diff, commit it and report. You own sequencing, routing, review and commits; you design and implement nothing.

## Handling table

Start at the issue the user names and run `engrenage planning walk check <n>` on it once per routing decision: it reports every issue of the tree in walk order with its state (open, closed, or closed by a local commit), `blockers`, findings, open **Planning** and **Questions** and local commits, then the next actionable issue. Handle each issue by the first matching row; the `complexity` row applies on top of the row that dispatches.

| Issue                                                         | Walker                                                                                                                                                      |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Closed, or closed by a local commit                           | Skip                                                                                                                                                        |
| A `plan` other than the one walked                            | Stop: walked on its own                                                                                                                                     |
| Open sub-issues                                               | Walk them in order (a `segment`'s in any order), meanwhile handling the issue's own findings by the rows below without stopping the walk; then its own work |
| `plan` or `segment` with no open sub-issue                    | Closes with its last leaf's commit                                                                                                                          |
| `blockers` `drafting`, with `.ai/issues/<n>.draft.md` present | Stop: it is being planned                                                                                                                                   |
| `blockers` `drafting`, with no local draft                    | Ask the user whether to clear the claim and walk it; on yes, remove `drafting` and handle it by the next rows                                               |
| Any `blockers`, or an open blocked-by issue                   | Stop and report                                                                                                                                             |
| Has findings for **Planning**, `outdated` or structure        | Stop; send it to the consultant                                                                                                                             |
| Has **Questions** open                                        | Stop; batch the questions to the user                                                                                                                       |
| `problem` without **Steps**                                   | Debugger                                                                                                                                                    |
| `task` or `problem` with **Steps**                            | Worker                                                                                                                                                      |
| `complexity` set                                              | Worker: `effort: medium` for `involved` or `complex`. Debugger: `effort: low` for `trivial`, `effort: high` for `complex`. Otherwise the agent's default    |
| `resource` or `idea` in a tree                                | Never dispatched; report it to the consultant                                                                                                               |

`priority` never reorders a tree: order states dependencies.

## Dispatching

- Dispatch every leaf to a new agent: a worker under the issue-implementation skill, a debugger under the debugging skill.
- Resume the same agent to answer its question or return review gaps and the failing commands and output from its stop or commit gate.
- Brief with `Issue: <owner>/<repo>#<n>` as the first line, which the dispatch hook checks, then the header chain, the plan sections the issue names and the commits the check lists towards the issue, for reference. Never paste issue or plan content: the agent reads it itself.
- Complete a leaf on the agent's final report, a completion or a blocker; never wait for a later agent-finished event, which may never wake you.
- Finish review, repairs and the passing commit gate before dispatching the next leaf in the same worktree.
- Stay inactive between agent events: end your turn where the client wakes you, otherwise wait with its longest timeout. Never poll or sleep; request progress only when a decision depends on it.

## After a debugger

| Its outcome                      | Next                                      |
| -------------------------------- | ----------------------------------------- |
| Fixed                            | Review and commit it as any leaf          |
| Written up, ready for a worker   | Dispatch the written-up issue to a worker |
| Written up for planning, Blocked | Stop and report it to the user            |

## After each leaf

1. Review only the diff against the issue's **Steps**, **Tests** and names; read no code beyond it. Send each gap back to the agent that did the work.
2. Add the `@debt` markers the diff calls for and the agent missed.
3. Commit under the project's git rules, closing the issue and every segment or parent it completes. Do not run the checks: the commit gate runs them.
4. Report one row to the user: issue · consequences · decisions and deviations.

## Checkpoints

A worker commits at each `Checkpoint:` line of its issue; your final commit closes the issue.

- Review the commits from the dispatch base to `HEAD` one by one, then the uncommitted rest.
- Fix a gap in a new commit, never by rewriting a checkpoint.
- Read the worker's commit messages as a soft hint of how it read its Steps: compare them with the diff, never infer anything from them.

## Consultant

- Start the `planner` subagent on first need with the plan number, and resume the same agent through the client’s messaging or resume tool.
- Call it only for an unresolved worker stop, a deviation changing planned behavior, contracts, scope or tree order, or an issue fitting no handling row; answer nothing from code yourself.
- Batch what it sends back to the user with its findings and recommendations; meanwhile walk only the leaves it does not affect.

## Report

End at the end of the tree or at a stop, with the table of walked leaves, then what is pending or blocked and why.

## GitHub mechanics

- Remove `drafting` by clearing `blockers` with `gh api -X DELETE repos/{owner}/{repo}/issues/<n>/issue-field-values/<id>`, then posting its other values, if any, with `gh api -X POST repos/{owner}/{repo}/issues/<n>/issue-field-values --input -` and `{"issue_field_values":[{"field_id":<id>,"value":["<option>"]}]}` on standard input; the field id comes from `gh api orgs/{org}/issue-fields`.

<!-- @end -->
