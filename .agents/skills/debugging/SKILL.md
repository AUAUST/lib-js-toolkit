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

Write and edit issues as local drafts in `.ai/issues/`, revise them as the diagnosis and the conversation settle things, and publish them in one flush. A draft edit costs a diff instead of a full body, survives a stopped session and shows the user each change. Everything this skill says about creating and editing issues applies to the drafts until the flush.

| File                  | Holds                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `<n>.md`              | The body of issue `<n>` as fetched, never edited                                                                                      |
| `<n>.draft.md`        | Its working version, with frontmatter `title`                                                                                         |
| `new-<slug>.draft.md` | An issue to create, with frontmatter `title`, `type`, fields, and inside a planned tree `parent` and `after` (the sibling it follows) |

- Start by reading `.ai/issues/`. Other sessions draft there too: resume only the drafts of your task, those the user names or those of the issues you were given.
- Your drafts are those you created, claimed or resumed. Edit, publish and delete only them, never another session's.
- Read an issue from `.ai/issues/` when it holds a copy, and fetch it from GitHub only otherwise or when flushing.
- Claim an issue on its first edit: fetch its body into `<n>.md`, copy it to `<n>.draft.md` and add `Drafting` to its Blockers.
- When Blockers already has `Drafting` and `.ai/issues/` holds no draft of the issue, another maintainer is drafting it: report it, record `claim: existing` in the draft's frontmatter and keep diagnosing.
- Reference an issue still to create as `#new-<slug>`.
- End each round with the drafts it changed and the changes waiting on each open question.
- Flush when none of your drafts holds a change waiting on an open question, when the user asks, or when someone else needs the issue's current state, such as a worker; publish all your drafts in the same flush.

To flush:

1. Fetch each claimed issue again. When its body differs from `<n>.md`, merge the remote change into the draft, or ask when the two conflict.
2. Create the new issues, in tree order inside a planned tree, replacing each `#new-<slug>` in every draft with its number.
3. Publish each `<n>.draft.md` body without its frontmatter, with its title.
4. Remove `Drafting` from each issue you claimed, never from one marked `claim: existing`.
5. Report each issue's change from `git diff --no-index <n>.md <n>.draft.md`, then delete each of its files by exact path, never the directory or a pattern.

## Writing the issue

When the input is an issue, turn that issue into the task, condensing its original report into **Context**. Otherwise search for an existing issue to reuse, then draft a new one. Write it as a Problem meeting the issue contract that `engrenage issues check` enforces, complete through its ancestors, if any, for a worker who treats everything in it as binding and applies it without redesign:

```markdown
#<plan> › … › #<parent> · <section>: <gist>

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
- Set the type Problem with its Defect, and the project's environment labels. While **Questions** remain, set Blockers `Open questions`; clear it once they are gone.
- Run `engrenage issues check <n>` on the issue, once flushed, before reporting it ready for a worker.
- Start any worker brief you write with `Issue: <owner>/<repo>#<n>`.
- Once an issue you create or edit tracks the work of an entry in the backlog or the debt backlog, remove the entry in the same run, or reduce it to the work the issue leaves and link the issue from it.

## Finishing

- Send no message before your final report, your only message: a completion or a blocker, sent once every command you started has finished and `engrenage gate --worktree` passes, so the stop gate reuses that pass.
- The worker/debugger stop gate returns failing commands and output to the stopped agent: fix them and stop again. When you must stop with failures (a usage limit mid-refactor), list them in your report and stop again on that unchanged tree.
- When asked for a branch, create `debugger/<topic>` from the current commit, `debugger/issue-<n>` when the input is an issue.
- After a fix, remove the backlog entries, debt backlog entries and debt markers it resolves. Never close an issue you fixed: merging the fix closes it.
- Report by outcome:

  | Outcome    | Report                                                                                     |
  | ---------- | ------------------------------------------------------------------------------------------ |
  | Fixed      | The cause, the reach the fix covers, the invariant now enforced, and the debt markers left |
  | Written up | The issue URL, ready for a worker or needing planning                                      |
  | Blocked    | What is done, pending and blocked, and the batched questions                               |

- End with what remains and the kind of work it needs. Say so when nothing remains.

## GitHub mechanics

- Create issues with `gh issue create` and edit them with `gh issue edit <n>`, passing bodies on standard input (`--body-file -`).

<!-- @end -->
