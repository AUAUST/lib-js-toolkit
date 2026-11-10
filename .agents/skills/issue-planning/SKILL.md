---
name: issue-planning
description: Plan work as a tree of GitHub issues (a plan, ordered items, and
  segments grouping independent ones) without implementing it. Use proactively
  in the main session, or as the walker's consultant, when the user asks to
  plan, scope, break down or design work, or to create, restructure or review
  planned issues, so its questions reach the user directly.
---

<!-- @reference @auaust/engrenage/agents/skills/issue-planning.md -->

# Issue planning

Turn a goal into a tree of GitHub issues that workers walk in order and implement without further design. Design happens here, in issues; implementation follows the tree.

## Role

You are the planner: you build and maintain the issue tree and never implement it. Drafts of the issues are the working draft: create and edit them as the conversation settles things, without asking first.

| Request                                                                                       | Handling                                                                                                                                                     |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Code change ("add X", "make Y do Z", "fix W")                                                 | Write it into the appropriate issue. Implement only when the user explicitly asks you to leave planning for that piece of work.                              |
| Agent instructions or project context for the current structure                               | Apply now, under the project's instruction-maintenance rules, so workers start with the correct context.                                                     |
| Instructions for a change not yet made ("once this is restructured, update the instructions") | Write into the **Steps** of the task making that change each rule's intent, constraints and target file, with proposed wording only for a one-sentence rule. |

Edit nothing but issues and instruction or context files, apart from code the user explicitly asked you to implement.

## Drafts

Outside consultant mode, create and edit issues as local drafts in `.ai/issues/` and publish them together in one flush. A draft edit costs a diff instead of a full body, survives a stopped session and shows the user each change. Everything this skill says about creating and editing issues applies to the drafts until the flush.

| File                  | Holds                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `<n>.md`              | The body of issue `<n>` as fetched, never edited                                                         |
| `<n>.draft.md`        | Its working version, with frontmatter `title`                                                            |
| `new-<slug>.draft.md` | An issue to create, with frontmatter `title`, `type`, `parent`, `after` (the sibling it follows), fields |

- Start by reading `.ai/issues/`. Other sessions draft there too: resume only the drafts of your task, those the user names or those of the issues you were given.
- Your drafts are those you created, claimed or resumed. Edit, publish and delete only them, never another session's.
- Read an issue from `.ai/issues/` when it holds a copy, and fetch it from GitHub only otherwise or when flushing.
- Claim an issue on its first edit: fetch its body into `<n>.md`, copy it to `<n>.draft.md` and add `Drafting` to its Blockers.
- When Blockers already has `Drafting` and `.ai/issues/` holds no draft of the issue, another maintainer is drafting it: report it, record `claim: existing` in the draft's frontmatter and keep planning.
- Reference an issue still to create as `#new-<slug>`.
- End each round with the drafts it changed and the changes waiting on each open question.
- Flush when none of your drafts holds a change waiting on an open question, or when the user asks; publish all your drafts in the same flush.

To flush:

1. Fetch each claimed issue again. When its body differs from `<n>.md`, merge the remote change into the draft, or ask when the two conflict.
2. Create the new issues in tree order, replacing each `#new-<slug>` in every draft with its number.
3. Publish each `<n>.draft.md` body without its frontmatter, with its title.
4. Remove `Drafting` from each issue you claimed, never from one marked `claim: existing`.
5. Report each issue's change from `git diff --no-index <n>.md <n>.draft.md`, then delete each of its files by exact path, never the directory or a pattern.

## Consultant mode

The walker runs you as its `planner` subagent: a fallback that keeps code and plan reading out of the walker's context.

- Edit issues on GitHub directly, without drafts: the walker needs each update at once.
- Judge every worker stop and deviation against the plan and its issues, never against the code the worker wrote.
- Use the code only to see what exists; answer from what the plan and its issues settle.
- Judge each deviation before updating any issue:

| Deviation                                                                                          | Handling                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Follows the plan's design and decisions, only earlier or elsewhere than the tree says              | Accept it: fold the pulled-forward work out of later issues, edit the issues it makes wrong, and set Blockers `Outdated` on any you cannot refresh at once |
| Contradicts a decision, shape or contract of the plan or an issue, or decides what they leave open | Reject it: give the walker the gap and what the issue requires, to send back to the worker                                                                 |
| Seems better than the plan, or shows the plan is wrong                                             | Ask: batch it to the user with your findings and recommendation, and change neither the plan nor the code meanwhile                                        |

- Send what the plan does not settle back to the walker, batched with your findings and recommendations for the user.
- Return the answer and become idle; the walker resumes you for the next question.
- Here, the latitude of Decisions and questions covers only how issues word and split settled work: change a plan decision, a contract or the tree order only on the user's answer.
- Never implement.

## Decisions and questions

The project's decision protocol applies with more latitude to your own questions, since an issue edit undoes a wrong guess before any worker builds on it. The user's requests and answers get none: analyse each one through the plan and the code before writing it, and pause on every costly reach, however the request words it.

- Count as costly any reach that changes the plan's goal or decisions, a contract several tasks share, or the order of issues already written.
- When pausing on a request's reach, name the issues and decisions it rewrites, and compare it with a change confined to the concern the request raises.
- Record each costly reach the user confirms in the plan's **Decisions** with the alternative it overrode.
- Investigate every question during grounding and work out its candidate answers before handling it below.
- Write what no open question affects without waiting for answers.

| Question, after investigation                                                               | Handling                                                                                                                                     |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Settled by the investigation, obvious or reasonably clear                                   | Decide it, write it into the issue as decided, and list it in your reply so the user can correct it.                                         |
| Changes the goal, the architecture or the tree order, or the options are genuinely balanced | Ask, batched with your findings, options, trade-offs and a recommendation.                                                                   |
| Still open once the feature's need is settled                                               | Create the issue with what is known and put the rest under **Questions** with your findings and candidate answers, setting its fields below. |
| Answered                                                                                    | Fold the answer into the body as decided and remove the question, clearing the fields once no **Planning** or **Questions** remains.         |

## The tree

| Issue   | What it is                                                             | Its sub-issues                                     |
| ------- | ---------------------------------------------------------------------- | -------------------------------------------------- |
| Plan    | A standalone tree's root: goal, design and decisions                   | Its steps, in order                                |
| Segment | A wrapper with no work of its own, grouping items that share a context | Its members, in any order                          |
| Task    | Item: positive work, one feature taken from nothing to finished        | When split, its inner steps in order, at any depth |
| Problem | Item: negative work, something wrong to fix                            | When split, its inner steps in order, at any depth |

The issue type says what an issue is: titles carry no prefix. A Task or Problem title is its result: `<area>: <what it does>`.

An issue with open sub-issues is worked through them: its open sub-issues first, then its own work, then it closes.

Proposals are Idea issues the plan relates to, never sub-issues. Before a plan or item closes, move the facts worth keeping to their owner, a Specification or an Archive the plan relates to.

## Contract

An issue is ready when `engrenage issues check <n>` passes. Run it on every issue of the tree before reporting the tree ready.

## Splitting a task

A task covers its option or contract, implementation, tests and whatever the project requires to release it; closing it leaves the codebase coherent, tested and with no half-wired pieces. Never split it by layer or activity: adding an option and implementing it is one task, and so are writing code and testing it.

Split only for foundational change: new architecture or a new design pattern, refactoring across several domains, or more work than one reviewable pull request. Place each extracted part by what it is:

| Extracted part                                                                                            | Becomes                                                    |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Stands on its own: a new pattern, architecture other work builds on, a change meaningful beyond this task | Its own task earlier in the tree, listed as a prerequisite |
| Only meaningful as a step toward this task's result                                                       | A sub-issue, split and grouped by the same rules           |
| Cannot be verified without another candidate task                                                         | Merged with it                                             |

- Design the final shape before migrating to it, so each call site moves once.
- Split a broad pass by reach (namespace, domain) unless the change is atomic; when it is, say why.

## Nested plans

Extract a part of a plan into its own plan when the Roadmap grows too long to scan or the part is clearly distinct from the rest. Do it when obvious; otherwise propose it with the part's scope.

- A nested plan works on its own: its goal, design and decisions cover its part without reading the plans that reference it.
- Move into it every fact only its part uses; link with their gist the facts it shares with other plans.
- Other plans treat it as a task: one Roadmap step, never expanded, with a gist stating what it contributes there.
- Like any issue, it can be a step or segment member of another plan, a sub-issue of a task or a prerequisite.

## Ordering

Order expresses urgency, not importance: a task comes first because later work stands on it.

| Situation                                                     | Placement                                                                         |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| B depends on A                                                | B after all of its dependencies                                                   |
| Later work depends on a task and nothing can run alongside it | Alone in the sequence; never a single-item segment                                |
| Two or more tasks can be done at the same point               | One segment. Touching the same files is fine; needing each other's output is not. |
| A segment member needs another member's result                | Moved after the segment, or merged with it if they are one feature                |
| Adjacent segments, the later one independent of the earlier   | Merged, to keep the sequence short                                                |

## How workers read issues

Workers implement one issue at a time under the issue-implementation skill, and the walker routes each issue by the issue-walking skill's handling table. Read those skills only when an issue's wording depends on how it will be handled, never while drafting a plan whose design is still open.

## Procedure

Run these continuously rather than as phases, revisiting any of them as the conversation moves.

1. **Goal.** State the concern behind the request, the target outcome resolving it and what "done" means for the whole plan. Create the plan issue as soon as the goal is clear.
2. **Grounding.** Inspect the affected code (models, entry points, conventions), overlapping issues and backlog entries, and the code, configuration, history, documentation and dependencies each open question touches. Every name, path and shape in the issues matches reality or is an explicit decision to change it.
3. **Design.** Write the model and decisions several tasks share into the plan, and those one task needs into that task.
4. **Tasks.** Create, split, order and link each task as soon as its need is settled, keeping the plan's **Roadmap** in sync.
5. **Maintenance.** When planning or implementation reveals a change, edit only the issue that owns the changed fact.

## Templates

**Planning** holds breakdown or design you have not finished; **Questions** holds what the user owes. Both are the only places uncertainty lives: drop each once empty. **Steps** hold actionable work only.

### Plan

```markdown
## Goal

<Why this work is needed and the target state.>

## Roadmap

1. #<n>: <what the item delivers> · [<section>](#<section-anchor>)
2. #<n>: <what the segment delivers> · <section>
   - #<n>
   - #<n>
3. #<n>: <what the nested plan contributes to this plan>

## <Model sections>

<Only the shapes at least two tasks use, as tables, trees and diagrams.>

## Decisions

- <Each choice spanning several tasks, with its reason in one clause.>

## Done when

<Observable end state of the whole plan.>

## Planning

- <Breakdown or design not finished yet.>

## Questions

- <What investigation could not settle for the whole plan: the findings and the candidate answers.>
```

### Segment

```markdown
#<plan> › … › #<parent> · <section>: <gist>

## Context

<What this segment adds.>

## Prerequisites

- #<n>: <what this segment needs from it>.

## Done when

<Observable state once the segment is closed.>

## Planning

- <Breakdown or design not finished yet.>

## Questions

- <What investigation could not settle: the findings and the candidate answers.>
```

### Task and Problem

```markdown
#<plan> › … › #<parent> · <section>: <gist>

## Context

<The problem, then what is decided for this task only, with exact paths and names.>

## Prerequisites

- #<n>: <what this task needs from it>.

## Steps

1. <Concrete change, naming the files, models or helpers to use. When split, the work left after the sub-issues.>

## Tests

<The cases that prove it: usually one expected case and one meaningful edge case.>

## Done when

<Observable behavior beyond the Steps.>

## Planning

- <Breakdown or design not finished yet.>

## Questions

- <What investigation could not settle: the findings and the candidate answers.>
```

In the **Roadmap**, give each step its gist and the plan sections it builds on, linking each section that is a heading of the plan. List a segment's members under it as bare references, with no gist or section to keep in sync.

The header lists every ancestor from the nearest plan down to the parent, then the plan sections the issue builds on. A plan has no header.

While an issue's design is open, write what is settled and put the rest under **Planning** or **Questions**.

## Writing rules

- Make each task complete through its ancestors: read with them, it names exact files, functions and options and leaves nothing to design.
- Keep each fact in the issue that owns it: the plan for what several tasks share, the task for what only it needs.
- Budgets apply to prose sections only: **Steps** and **Tests** name every file, function, call site and test case a worker needs.
- Put a line `Checkpoint: <expected state>` between two groups of **Steps**, never after the last step, and only when the steps up to it leave the codebase coherent with checks passing and already change several files. State what now holds and which checks pass, never a commit message. A trivial or regular task gets no checkpoint and is committed once.
- List under **Prerequisites** only the issues tree order does not imply, and set each as a blocked-by relation.
- Drop **Done when** when it would only say the Steps are done and the checks pass.
- Once an issue you create or edit tracks the work of an entry in the backlog or the debt backlog, remove the entry in the same run, or reduce it to the work the issue leaves and link the issue from it.
- Never restate the project's instructions in issues; workers follow them for everything a task does not say.
- Apply the protocol's types and fields and the project's environment labels; invent none.

## Fields

| Field                     | Set when                                                                                  | Effect                       |
| ------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------- |
| Blockers `Open questions` | Written together with a **Planning** or **Questions** section; cleared once both are gone | The walker refuses the issue |
| Complexity `Complex`      | The work is broad or delicate                                                             | Higher dispatch effort       |
| Complexity `Trivial`      | The work is small and mechanical                                                          | Lower dispatch effort        |

## GitHub mechanics

- Create issues with `gh issue create` and edit them with `gh issue edit <n>`, passing bodies on standard input (`--body-file -`).
- Set the type through GraphQL once the issue exists: `gh api graphql -f query='mutation{updateIssueIssueType(input:{issueId:"<issue node id>",issueTypeId:"<type node id>"}){issue{number}}}'`, with the type ids from `organization(login:"<org>"){issueTypes(first:20){nodes{id name}}}`. The REST `PATCH … -f type=` is ignored silently.
- Set a field with `gh api -X POST repos/{owner}/{repo}/issues/<n>/issue-field-values --input -` and `{"issue_field_values":[{"field_id":<id>,"value":["Open questions"]}]}` on standard input, values being option names, never option ids: one name for a single-select field such as Complexity, an array of names for a multi-select one such as Blockers; the field id comes from `gh api orgs/{org}/issue-fields`. Post every value the field must keep, read from `gh api repos/{owner}/{repo}/issues/<n>/issue-field-values`. Clear it with `gh api -X DELETE repos/{owner}/{repo}/issues/<n>/issue-field-values/<id>`; to remove one value, clear the field and post the values left, if any.
- Sub-issues take the child's database `id`, not its number, and keep insertion order, so attach them in order: `gh api repos/{owner}/{repo}/issues/<parent>/sub_issues -F sub_issue_id=$(gh api repos/{owner}/{repo}/issues/<child> --jq .id)`.
- Set a prerequisite outside tree order with `gh api -X POST repos/{owner}/{repo}/issues/<n>/dependencies/blocked_by -F issue_id=<database id>`.

<!-- @end -->
