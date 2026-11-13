---
name: walking
description: Walk a planned tree of GitHub issues in order, dispatching each
  leaf to a worker or debugger, then reviewing and committing it. Use only when
  the user asks to walk an issue tree.
---

<!-- @reference @auaust/engrenage/agents/skills/walking.md -->

# Walking

Walk an issue tree in the main session: route each issue by the handling table, review each leaf's diff, commit it and report. You own sequencing, routing, review and commits; you design and implement nothing.

## Handling table

Start at the issue the user names and run `engrenage planning walk check <n>` on it once per routing decision: it reports every issue of the tree in tree order, each parent above its sub-issues, with its state (open, closed, or closed by a local commit), `blockers`, findings, open **Planning** and **Questions** and local commits, then the ready set, every issue actionable in turn, and the next issue. Handle each issue by the first matching row; the `complexity` row applies on top of the row that dispatches.

| Issue                                                         | Walker                                                                                                                                                      |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Closed, or closed by a local commit                           | Skip                                                                                                                                                        |
| A `plan` other than the one walked                            | Stop: walked on its own                                                                                                                                     |
| Open sub-issues                                               | Walk them in order (a `segment`'s in any order), meanwhile handling the issue's own findings by the rows below without stopping the walk; then its own work |
| `plan` or `segment` with no open sub-issue                    | Closes with its last leaf's commit                                                                                                                          |
| `blockers` `drafting`, with `.ai/issues/<n>.draft.md` present | Stop: it is being planned                                                                                                                                   |
| `blockers` `drafting`, with no local draft                    | Ask the user whether to clear the claim and walk it; on yes, run `engrenage planning issue release <n>` and handle it by the next rows                      |
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
- Resume the same agent to answer its question, return review gaps and the failing commands and output from its stop or commit gate, or pass on a merger's findings.
- Brief a leaf's agent with `Issue: <owner>/<repo>#<n>` as the first line, which the dispatch hook checks, then the header chain, the plan sections the issue names and the commits the check lists towards the issue, for reference. Never paste issue or plan content: the agent reads it itself.
- Brief a debugger given a review merger's findings with those findings and no `Issue:` line: they belong to no single issue.
- Complete a leaf on the agent's final report, a completion or a blocker; never wait for a later agent-finished event, which may never wake you.
- Stay inactive between agent events: end your turn where the client wakes you, otherwise wait with its longest timeout. Never poll or sleep; request progress only when a decision depends on it.

## Concurrency

- Keep up to K leaves of the ready set in flight: K = 4 unless the walk request sets it ("pool 2"; "no pool" or "sequential" mean K = 1), and K = 1 under Codex.
- At K = 1, dispatch in the main checkout, and finish review, repairs and the passing commit gate before dispatching the next leaf; past it, the rules below apply.
- Dispatch each leaf in the background with `isolation: "worktree"`, briefing the walked branch's `HEAD` commit.
- Integrate finished leaves one at a time, in report order. First pass the leaf to the segment's integration merger, briefed as the merging skill's §Brief states for integration mode: resume the current one, or dispatch a new merger with `effort: low` under §Resumed agents. When it reports leaf findings, resume the leaf's agent with them, so its stop gate checks the worktree the merger left. Then review as §After each leaf and §Checkpoints, cherry-pick the checkpoint commits, apply the uncommitted rest, and make the closing commit.
- Leave integration conflicts to the merger's rebase; when it reports a conflict needing design, resume the leaf's agent to rebase its worktree onto the walked branch, then resume the merger.
- Remove a leaf's worktree after its closing commit, then refill the pool from a fresh `walk check`.

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

## Boundary reviews

- When a segment closes and at the walk's end, dispatch a new merger under the merging skill in the main checkout, briefed as its §Brief states for review mode, with the range since the previous review run or the walk's start.
- Brief a new debugger with its findings and the leaf findings agents declined since the previous review run, when any, and handle the outcome by §After a debugger.
- Commit the debt markers, backlog entries and discarded-solutions lines the merger added with the debugger's fix, or alone when there is none.

## Checkpoints

A worker commits at each `Checkpoint:` line of its issue; your final commit closes the issue.

- Review the commits from the dispatch base to `HEAD` one by one, then the uncommitted rest.
- Fix a gap in a new commit, never by rewriting a checkpoint.
- Read the worker's commit messages as a soft hint of how it read its Steps: compare them with the diff, never infer anything from them.

## Consultant

- Start the `planner` subagent on first need with the plan number, and resume it under §Resumed agents.
- Call it only for an unresolved worker stop, a deviation changing planned behavior, contracts, scope or tree order, or an issue fitting no handling row; answer nothing from code yourself.
- Batch what it sends back to the user with its findings and recommendations; meanwhile walk only the leaves it does not affect.

## Resumed agents

- Resume the consultant and the integration merger through the client's messaging or resume tool instead of starting new ones.
- Start a new one instead when a segment closes, when the current one has been idle longer than the prompt-cache lifetime, or once its reported context exceeds twice what it started with: past that, every resumed turn re-reads more history than a fresh start costs.
- Brief a new consultant with the plan number and the decisions taken so far, a new integration merger as the first, with the previous one's carry-over.

## Report

End at the end of the tree or at a stop, with the table of walked leaves, then each merger run's findings and where each went, then what is pending or blocked and why, then the walk's agent runs from `engrenage agents stats`, when the client records them.

<!-- @end -->
