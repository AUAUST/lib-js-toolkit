---
name: issue-planning
description: Plan work as a tree of GitHub issues (a plan and ordered tasks,
  grouped in blocks where independent) without implementing it. Use only when
  the user asks for planning.
---

<!-- @reference @auaust/engrenage/agents/skills/issue-planning.md -->

# Issue planning

Turn a goal into a tree of GitHub issues that workers walk in order and implement without further design. Design happens here, in issues; implementation follows the tree.

## Role

You are the planner: you build and maintain the issue tree and never implement it. Issues are the working draft: create and edit them as the conversation settles things, without asking first.

| Request                                                                                       | Handling                                                                                                                                                     |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Code change ("add X", "make Y do Z", "fix W")                                                 | Write it into the appropriate issue. Implement only when the user explicitly asks you to leave planning for that piece of work.                              |
| Agent instructions or project context for the current structure                               | Apply now, under the project's instruction-maintenance rules, so workers start with the correct context.                                                     |
| Instructions for a change not yet made ("once this is restructured, update the instructions") | Write into the **Steps** of the task making that change each rule's intent, constraints and target file, with proposed wording only for a one-sentence rule. |

Edit nothing but issues and instruction or context files, apart from code the user explicitly asked you to implement.

## Decisions and questions

The project's decision protocol applies with more latitude: a planning mistake costs an issue edit, not a revert.

- Investigate every question during grounding and work out its candidate answers before handling it below.
- Create and update issues without waiting for answers.

| Question, after investigation                                                               | Handling                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Settled by the investigation, obvious or reasonably clear                                   | Decide it, write it into the issue as decided, and list it in your reply so the user can correct it.                                                                                                                                                                  |
| Changes the goal, the architecture or the tree order, or the options are genuinely balanced | Ask, batched with your findings, options, trade-offs and a recommendation.                                                                                                                                                                                            |
| Still open once the feature's need is settled                                               | Create the task with what is known, put the rest under **Questions** with your findings and candidate answers, and add the project's label for missing information. The label warns that the issue cannot be finished without answers; it does not forbid picking it. |
| Answered                                                                                    | Fold the answer into the body as decided, remove the question, and remove the label once no question remains.                                                                                                                                                         |

## The tree

| Issue | What it is                                                                           | Its sub-issues                                     | Title                                |
| ----- | ------------------------------------------------------------------------------------ | -------------------------------------------------- | ------------------------------------ |
| Plan  | The root: goal, design and decisions                                                 | Its steps, in order                                | `Plan: <outcome>`                    |
| Task  | One feature taken from nothing to finished                                           | When split, its inner steps in order, at any depth | Its result: `<area>: <what it does>` |
| Block | A task with no work of its own, grouping siblings that can all be done at that point | Independent, in any order                          | `Block: <theme>`                     |

An issue with open sub-issues is worked through them: its open sub-issues first, then its own work, then it closes.

## Splitting a task

A task covers its option or contract, implementation, tests and whatever the project requires to release it; closing it leaves the codebase coherent, tested and with no half-wired pieces. Never split it by layer or activity: adding an option and implementing it is one task, and so are writing code and testing it.

Split only for foundational change: new architecture or a new design pattern, refactoring across several domains, or more work than one reviewable pull request. Place each extracted part by what it is:

| Extracted part                                                                                            | Becomes                                                    |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Stands on its own: a new pattern, architecture other work builds on, a change meaningful beyond this task | Its own task earlier in the tree, listed as a prerequisite |
| Only meaningful as a step toward this task's result                                                       | A sub-issue, split and grouped by the same rules           |
| Cannot be verified without another candidate task                                                         | Merged with it                                             |

## Ordering

Order expresses urgency, not importance: a task comes first because later work stands on it. Task B depends on task A when B consumes something A creates (a type, option, model, file, command or behavior).

| Situation                                                     | Placement                                                                       |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| B depends on A                                                | B after all of its dependencies                                                 |
| Later work depends on a task and nothing can run alongside it | Alone in the sequence; never a single-task block                                |
| Two or more tasks can be done at the same point               | One block. Touching the same files is fine; needing each other's output is not. |
| A block member needs another member's result                  | Moved after the block, or merged with it if they are one feature                |
| Adjacent blocks, the later one independent of the earlier     | Merged, to keep the sequence short                                              |

Usual layering, earliest first: option shapes and shared contracts → data model → infrastructure that writes or runs things → features producing content through it → derived outputs and commands → consumers and integrations → adoption, migration and cleanup.

## How workers read issues

Workers implement one issue at a time under the issue-implementation skill, once its prerequisites are closed and its sub-issues are done. They apply everything outside **Questions** as decided, stop when the issue disagrees with the plan, and report what the tree needs updated instead of editing issues.

## Procedure

Run these continuously rather than as phases, revisiting any of them as the conversation moves.

1. **Goal.** State the target outcome, why it is needed and what "done" means for the whole plan. Create the plan issue as soon as the goal is clear.
2. **Grounding.** Inspect the affected code (models, entry points, conventions), overlapping issues and backlog entries, and the code, configuration, history, documentation and dependencies each open question touches. Every name, path and shape in the issues matches reality or is an explicit decision to change it.
3. **Design.** Write the target state and the decisions behind it into the plan.
4. **Tasks.** Create, split, order and link each task as soon as its need is settled, keeping the plan's step list in sync.
5. **Maintenance.** When planning or implementation reveals a change, update the plan first, then every affected issue, and move finished foundations to "Done so far". An issue and the plan never disagree.

## Templates

Any issue may end with a **Questions** section while something is open: the only place uncertainty lives. Drop it once empty.

### Plan

```markdown
## Goal

<Why this work is needed and the target state, in a short paragraph.>

## Steps

1. #<n>: <task title>.
2. #<n>: block, <theme>.
3. …

## <Design sections>

<Target state: configuration, model, layout, tables of where each value goes. As concrete as code.>

## Decisions

- <Each settled choice and its reason, so workers never reopen it.>

## Done so far

- <Existing foundations the plan builds on; finished steps move here.>

## Done when

<Observable end state of the whole plan.>

## Questions

- <What investigation could not settle for the whole plan, why it matters, the findings and the candidate answers.>
```

### Block

```markdown
Part of #<plan>, under #<parent>: <theme>.

## Context

<What the earlier steps provide and what this block adds, pointing to plan sections.>

## Prerequisites

- #<n> is closed.

## Done when

<Observable state once the block is closed.>
```

### Task

```markdown
Part of #<plan>, under #<parent>. Read the plan, its **<section>** section, before starting.

## Context

<Current behavior and the problem, with exact paths and names. Decided: <the behavior to implement>.>

## Prerequisites

- #<n> is closed.

## Steps

1. <Concrete change, naming the files, models or helpers to use. When split, the work left after the sub-issues.>

## Tests

<The cases that prove it: usually one expected case and one meaningful edge case.>

## Done when

<Observable behavior, and the project's checks pass.>

## Questions

- <What investigation could not settle, why it matters, the findings and the candidate answers.>
```

While a task's design is open, keep what is settled (goal, expected behavior, constraints) and take **Steps** and **Tests** as far as they can honestly go.

## Writing rules

- Write for a worker arriving cold: each task is self-sufficient with its plan section and names exact files, functions and options.
- Point to the plan for shared shapes instead of copying them.
- List every prerequisite as an issue number, even when the tree order implies it; turn any backlog entry a task depends on into an issue first.
- Once an issue you create or edit tracks the work of an entry in the backlog or the debt backlog, remove the entry in the same run, or reduce it to the work the issue leaves and link the issue from it.
- Never restate the project's instructions in issues; workers follow them for everything a task does not say.
- Apply the project's existing labels and issue types; never invent new ones.

## GitHub mechanics

- Create issues with `gh issue create` and edit them with `gh issue edit <n>`, passing bodies on standard input (`--body-file -`). Read them with `gh issue view <n> --repo <owner>/<repo> --json title,body,state,labels,comments`; plain `--comments` fails on some repositories.
- Sub-issues take the child's database `id`, not its number, and keep insertion order, so attach them in order: `gh api repos/{owner}/{repo}/issues/<parent>/sub_issues -F sub_issue_id=$(gh api repos/{owner}/{repo}/issues/<child> --jq .id)`.
- List a parent's children with `gh api repos/{owner}/{repo}/issues/<parent>/sub_issues --jq '.[] | "\(.number) \(.state) \(.title)"'`.

<!-- @end -->
