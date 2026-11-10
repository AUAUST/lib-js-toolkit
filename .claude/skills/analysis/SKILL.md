---
name: analysis
description: Analyse a request, concern or part of the project in depth and
  record its ideal solution, its reach and a recommendation in Resource or Idea
  issues. Use when the user asks to analyse, assess, review or rethink
  something, or when a request is neither a defect to debug nor work to plan.
---

<!-- @reference @auaust/engrenage/agents/skills/analysis.md -->

# Analysis

Apply the project's Analysis rules at full depth, record what they find in issues and report it. Unlike the debugger, you start from no defect; unlike the planner, you build no issue tree.

## Depth

- Read everything sharing the concern, not only what the request names: code, configuration, instructions, skills, issues, backlog and debt entries.
- Look for conflicts, duplication and drift between the request and what it touches: sources contradicting each other, one fact stated in several places, copies that diverged.
- Search beyond the current dependencies for libraries providing the capability, comparing their size, maintenance, adoption and maturity.
- Read the discarded-solutions and agent-friction logs for every subject the analysis meets, and report the recurring ones as candidates.

## Outcome

| The analysis                                                                         | You                                                                           |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Answers a question or a review                                                       | Record and report it; edit nothing but issues                                 |
| Supports the requested change within the reach it names, with no new shared contract | Apply it                                                                      |
| Calls for a reach the request does not name                                          | Pause under the decision protocol with the ideal and the confined alternative |
| Calls for several ordered tasks                                                      | Report that it needs planning, with the analysis the planner starts from      |

## Issues

Record every finding worth keeping in an issue, without being asked, so it outlives the session. Answer in chat alone only a narrow question whose request expects a short answer.

| Finding                                                                            | Issue                                                   |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------- |
| An analysis later work draws on: a study, a comparison, an audit, a recommendation | Resource, Material `Report`                             |
| An internal behavior or contract the project keeps track of                        | Resource, Material `Specification`                      |
| Outside documentation the project relies on                                        | Resource, Material `Reference`                          |
| Work worth considering, with or without a solution                                 | Idea, with the Nature or Defect a Task or Problem takes |

- Create and edit only Resource and Idea issues.
- Search for an existing issue on the concern and extend it before creating one.
- Title each issue `<area>: <subject>`, and set the project's environment labels.
- Write a Report with the parts of your report as `##` sections, and link from it each Idea it leads to.

## Drafts

Write and edit issues as local drafts in `.ai/issues/`, revise them as the analysis and the conversation settle things, and publish them in one flush. A draft edit costs a diff instead of a full body, survives a stopped session and shows the user each change. Everything this skill says about creating and editing issues applies to the drafts until the flush.

| File                  | Holds                                                        |
| --------------------- | ------------------------------------------------------------ |
| `<n>.md`              | The body of issue `<n>` as fetched, never edited             |
| `<n>.draft.md`        | Its working version, with frontmatter `title`                |
| `new-<slug>.draft.md` | An issue to create, with frontmatter `title`, `type`, fields |

- Start by reading `.ai/issues/`. Other sessions draft there too: resume only the drafts of your task, those the user names or those of the issues you were given.
- Your drafts are those you created, claimed or resumed. Edit, publish and delete only them, never another session's.
- Read an issue from `.ai/issues/` when it holds a copy, and fetch it from GitHub only otherwise or when flushing.
- Claim an issue on its first edit: fetch its body into `<n>.md`, copy it to `<n>.draft.md` and add `Drafting` to its Blockers.
- When Blockers already has `Drafting` and `.ai/issues/` holds no draft of the issue, another maintainer is drafting it: report it, record `claim: existing` in the draft's frontmatter and keep analysing.
- Reference an issue still to create as `#new-<slug>`.
- End each round with the drafts it changed and the changes waiting on each open question.
- Flush when none of your drafts holds a change waiting on an open question, when the user asks, or before your final report; publish all your drafts in the same flush.

To flush:

1. Fetch each claimed issue again. When its body differs from `<n>.md`, merge the remote change into the draft, or ask when the two conflict.
2. Create the new issues, replacing each `#new-<slug>` in every draft with its number.
3. Publish each `<n>.draft.md` body without its frontmatter, with its title.
4. Remove `Drafting` from each issue you claimed, never from one marked `claim: existing`.
5. Report each issue's change from `git diff --no-index <n>.md <n>.draft.md`, then delete each of its files by exact path, never the directory or a pattern.

## Report

| Part           | Holds                                                               |
| -------------- | ------------------------------------------------------------------- |
| Concern        | The concern behind the request and its cause                        |
| Ideal          | The soundest solution, and how far the codebase already supports it |
| Reach          | What the ideal alters, against what the request names               |
| Recommendation | What to adopt now, with the alternatives discarded and why          |
| Findings       | Conflicts, duplication and drift met on the way                     |
| Questions      | The batched questions, each with options, trade-offs and your pick  |

- Drop a part when it would be empty.
- Link each issue you created or edited, with what it now records.
- When you changed files, run `engrenage gate --worktree` before your report.
- End with what remains and the kind of work it needs. Say so when nothing remains.

## GitHub mechanics

- Create issues with `gh issue create` and edit them with `gh issue edit <n>`, passing bodies on standard input (`--body-file -`).
- Set the type through GraphQL once the issue exists: `gh api graphql -f query='mutation{updateIssueIssueType(input:{issueId:"<issue node id>",issueTypeId:"<type node id>"}){issue{number}}}'`, with the type ids from `organization(login:"<org>"){issueTypes(first:20){nodes{id name}}}`.
- Set a field with `gh api -X POST repos/{owner}/{repo}/issues/<n>/issue-field-values --input -` and `{"issue_field_values":[{"field_id":<id>,"value":"Report"}]}` on standard input: one option name for a single-select field, an array of names for a multi-select one; the field id comes from `gh api orgs/{org}/issue-fields`.

<!-- @end -->
