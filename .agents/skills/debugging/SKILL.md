---
name: debugging
description: Investigate a problem, fix it at its root when the fix is
  contained, and otherwise write the fix into a GitHub issue for a worker. Use
  only when the user asks for a debugger.
---

<!-- @reference @auaust/engrenage/agents/skills/debugging.md -->

# Debugging

Understand a problem, decide its fix, then apply it or write it down for a worker. Unlike a worker, you design the fix; unlike a planner, you implement it yourself when it is contained. A fix is done when it is sound, not when the reported symptom disappears.

## Input

When dispatched in a worktree, first check out the briefed commit, detached, when the worktree starts elsewhere, then install dependencies offline from the lockfile.

| Given                                                  | Read first                                                             |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| A GitHub issue                                         | Its body, comments, linked issues and ancestors up to the nearest plan |
| A backlog entry                                        | The entry and the entries closely related to it                        |
| A `@debt` marker or debt backlog entry                 | The marked code and its callers                                        |
| A direct report: an error, a failing check, a behavior | The reported output, then reproduce it yourself                        |

## Diagnosis

1. **Reproduce.** Show the behavior with a failing test, command or minimal case. When it cannot be reproduced, report what you tried instead of fixing on a guess.
2. **Cause.** Follow the execution path to where behavior first departs from its contract. The site of the symptom is not the cause.
3. **Reach.** Find every other site sharing the cause: the same assumption, pattern or caller. Fix the class of bug, not the reported instance.
4. **Contract.** Take the expected behavior from authoritative sources: types, schemas, documentation, tests and recorded decisions. When the expected behavior is itself undecided, it is a question, not a choice for you.

## A sound fix

- Corrects the cause at its owner, for every site in its reach, with no special case for the reported input.
- Makes the violated invariant explicit, through types, validation or a clear failure, so the same class of bug cannot return silently.
- Adds a regression test that fails before the fix and passes after it, and the edge case the cause suggests.
- Weakens no check and adds no assumption on code outside it. Mark whatever still falls short with debt markers.

## Debt

Mark the debt you notice while diagnosing, on the execution path, its callers and every site in the reach, whether you fix, write up or are blocked.

## Scope

| The sound fix                                                                                                                                     | You                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Stays within a limited set of files in the owner's area, needs at most a minor refactor, and adds no new pattern, architecture or shared contract | Implement it                                                         |
| Needs more: a larger refactor, a new pattern or contract, changes across several domains, or more than one reviewable pull request                | Write it into one task issue and stop                                |
| Needs several ordered tasks                                                                                                                       | Write the diagnosis into one issue and report that it needs planning |

## Questions and answers

- Ask under the project's decision protocol, batched, with the diagnosis so far.
- Weigh each answer against your diagnosis as well as under the protocol, and report its consequences: sites affected, behavior changed, risks, conflicts with earlier answers or decisions.

## Drafts

Write and edit issues as local drafts in `.ai/issues/`, revise them as the diagnosis and the conversation settle things, and publish them together. A draft edit costs a diff instead of a full body, survives a stopped session and shows the user each change. Everything this skill says about creating and editing issues applies to the drafts until they are published.

| File             | Holds                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `<ref>.md`       | The issue as `claim` fetched it, never edited: the base `publish` merges against                            |
| `<ref>.draft.md` | The manifest as frontmatter, then the body; `<ref>` is `123`, `toolkit.123`, `new-foo` or `toolkit.new-foo` |

| Manifest key   | Holds                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| `title`        | The issue title                                                                                              |
| `type`         | A type's GitHub name                                                                                         |
| `labels`       | Label names of the target repository                                                                         |
| `<field name>` | For each field pinned to the type, under its GitHub name: an option name, or a list for a multi-select field |
| `subIssues`    | The children in order; in a `plan`, `{ ref, gist, sections }` entries                                        |
| `blockedBy`    | Prerequisites, as references                                                                                 |
| `state`        | `open`, `completed`, `not planned` or `duplicate`                                                            |
| `claim`        | `existing` when another maintainer held `drafting` at claim                                                  |

| Reference            | Means                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `#123`               | Issue 123 of the current repository, only in a draft of that repository                                |
| `#{toolkit.123}`     | Issue 123 of the registered `toolkit`, the current repository's included in another repository's draft |
| `#{new-foo}`         | Local draft `new-foo`                                                                                  |
| `#{toolkit.new-foo}` | Local draft created in `toolkit`                                                                       |

- Write types, fields, options and labels by the GitHub names of the planning sheet.
- Start by reading `.ai/issues/`. Other sessions draft there too: resume only the drafts of your task, those the user names or those of the issues you were given.
- Your drafts are those you created, claimed or resumed. Edit, check and publish only them, never another session's.
- Read an issue from `.ai/issues/` when it holds a copy, and fetch it from GitHub only otherwise.
- Create an issue with `engrenage planning issue create <type> [--slug <slug>] [--repo <name>] [--parent <ref> [--after <ref>]]`: it writes the manifest with each field's options and the body skeleton, and lists the draft in its parent's `subIssues`.
- Claim an issue on its first edit with `engrenage planning issue claim <refs>`. Claim another repository's issue as `<repo>.123`: it takes no `drafting` lock. When it records `claim: existing`, another maintainer is drafting the issue: report it and keep diagnosing.
- Fill or remove every section `create` writes: `check` fails on an empty one.
- Order children only through their parent's `subIssues`: `publish` attaches and orders sub-issues, renders a plan's **Roadmap** from them and each header's ancestor chain from the tree. Write none of them by hand.
- End each round with the drafts it changed and the changes waiting on each open question.
- Run `engrenage planning issue check <refs>` on the drafts you changed before publishing them.
- Publish when none of your drafts holds a change waiting on an open question, when the user asks, or when someone else needs the issue's current state, such as a worker, with `engrenage planning issue publish <refs>` on all your drafts at once. Before publishing, report each claimed issue's change from `git diff --no-index <ref>.md <ref>.draft.md`.

## Writing the issue

When the input is an issue, turn that issue into the task, condensing its original report into **Context**. Otherwise search for an existing issue to reuse, then draft a new one. Write it as a `problem` meeting the issue contract that `engrenage planning issue check` enforces, complete through its ancestors, if any, for a worker who treats everything in it as binding and applies it without redesign:

```markdown
<sections>: <gist>

## Context

<The problem, its cause and reach, then the behavior decided, with exact paths and names.>

## Prerequisites

- #<n>: <what this task needs from it>.

## Steps

1. <Concrete change, naming the files, functions and helpers to use.>

## Tests

<The regression case, with how to reproduce it, and the edge case that prove the fix.>

## Done when

<Observable behavior beyond the Steps.>

## Questions

- <What investigation could not settle: the findings and the candidate answers.>
```

- Write the header only for an issue inside a planned tree. List under **Prerequisites** only the issues tree order does not imply.
- Drop **Prerequisites**, **Done when** or **Questions** when they would be empty, or when **Done when** would only say the Steps are done and the checks pass.
- Set the type `problem` with its `defect`, and the repository's labels whose description fits the issue. While **Questions** remain, set `blockers` to `questions`; clear it once they are gone.
- Run `engrenage planning issue check <n>` on the issue, once flushed, before reporting it ready for a worker.
- Start any worker brief you write with `Issue: <owner>/<repo>#<n>`.
- Once an issue you create or edit tracks the work of an entry in the backlog or the debt backlog, remove the entry in the same run, or reduce it to the work the issue leaves and link the issue from it.

## Finishing

- Send no message before your final report, your only message: a completion or a blocker, sent once every command you started has finished and `engrenage gate --worktree` passes, so the stop gate reuses that pass.
- The worker/debugger stop gate returns failing commands and output to the stopped agent: fix them and stop again. When you must stop with failures (a usage limit mid-refactor), list them in your report and stop again on that unchanged tree.
- When resumed with a merger's findings, fix each one your input's reach covers, and report the rest with the reason.
- When asked for a branch, create `debugger/<topic>` from the current commit, `debugger/issue-<n>` when the input is an issue.
- After a fix, remove the backlog entries, debt backlog entries and debt markers it resolves. Never close an issue you fixed: merging the fix closes it.
- Report by outcome:

  | Outcome    | Report                                                                                     |
  | ---------- | ------------------------------------------------------------------------------------------ |
  | Fixed      | The cause, the reach the fix covers, the invariant now enforced, and the debt markers left |
  | Written up | The issue URL, ready for a worker or needing planning                                      |
  | Blocked    | What is done, pending and blocked, and the batched questions                               |

- End with what remains and the kind of work it needs. Say so when nothing remains.

<!-- @end -->
