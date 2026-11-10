# Codex instructions

This file is intended for OpenAI Codex. Other agents, including Claude Code, must ignore this file and use their own instruction entry points.

Codex loads this file instead of the root AGENTS.md. Before working, read and follow ./AGENTS.md as the shared project instructions.

## Rule mapping

Paths below are relative to the project root. Before editing a file, read and follow every rule whose glob matches that file. Read rules marked "All files" before any work. Multiple matching rules apply together. The paths frontmatter in each rule defines its scope; do not treat scoped rules as project-wide instructions.

<!-- @rules -->

| Matching glob | Rule to read |
| --- | --- |
| <code>.*.ts</code> | <code>.claude/rules/project-map/tooling.md</code> |
| <code>.ai/agent-lock.md</code> | <code>.claude/rules/agent-lock.md</code> |
| <code>.ai/backlog/*.md</code> | <code>.claude/rules/agent-lock.md</code> |
| <code>.ai/backlog/*.md</code> | <code>.claude/rules/backlog.md</code> |
| <code>.changeset/**</code> | <code>.claude/rules/changesets.md</code> |
| <code>*.config.ts</code> | <code>.claude/rules/project-map/tooling.md</code> |
| <code>**/*.ts</code> | <code>.claude/rules/code-style.md</code> |
| <code>scripts/**</code> | <code>.claude/rules/project-map/scripts.md</code> |
| <code>src/**/*.ts</code> | <code>.claude/rules/naming.md</code> |
| <code>src/**</code> | <code>.claude/rules/project-map/src.md</code> |
| <code>tests/**/*.ts</code> | <code>.claude/rules/tests.md</code> |
| <code>tests/**</code> | <code>.claude/rules/project-map/tests.md</code> |
| <code>tooling/**</code> | <code>.claude/rules/project-map/tooling.md</code> |
| All files | <code>.claude/rules/agent-friction.md</code> |
| All files | <code>.claude/rules/debt-markers.md</code> |
| All files | <code>.claude/rules/discarded-solutions.md</code> |
| All files | <code>.claude/rules/git.md</code> |
| All files | <code>.claude/rules/no-attribution.md</code> |
| All files | <code>.claude/rules/project-map.md</code> |

<!-- @end -->

## Dispatch

<!-- @dispatch -->

Use the installed workflows below when their descriptions match the request.

| Skill | Handling |
| --- | --- |
| `issue-planning` | Run its skill in the main session. Plan work as a tree of GitHub issues (a plan, ordered items, and segments grouping independent ones) without implementing it. Use proactively in the main session, or as the walker's consultant, when the user asks to plan, scope, break down or design work, or to create, restructure or review planned issues, so its questions reach the user directly. |
| `debugging` | Delegate to `debugger`. Debugger that investigates a bug, issue, backlog entry, debt marker or reported failure, fixes it at its root when the fix is contained, and otherwise writes the fix into a GitHub issue for a worker. Use proactively when the user asks to investigate, debug or fix something, unless they ask to apply a fix an issue already describes, which is the worker's. Its report ends with what remains and the kind of work it needs; continue that with the agent suited to it. |
| `issue-implementation` | Delegate to `worker`. Worker that implements one GitHub issue as written and stops to report what the issue leaves unclear. Use proactively when the user asks to implement, work on or resume a specific GitHub issue whose fix or steps are already written; investigating or fixing a problem is the debugger's. |
| `scratchpad` | Delegate to `scratcher`. Scratcher that triages the user's notes in .ai/scratchpad.md into backlog entries and never implements them or acts outside the repository. Use proactively when the user asks to handle, process or triage the scratchpad. |
| `backlog-handling` | Delegate to `backlogger`. Backlogger that brings backlog entries up to date with new findings, context or answers, and converts actionable ones to GitHub issues. Use proactively for any work on backlog entries. Its report ends with what remains and the kind of work it needs; continue that with the agent suited to it. |
| `debt-harvesting` | Delegate to `banker`. Banker that harvests in-code `@debt` markers into the debt backlog `.ai/debt.md`. Use proactively for any work on debt markers. Its report ends with what remains and the kind of work it needs; continue that with the agent suited to it. |

| Profile | Canonical role | Effort |
| --- | --- | --- |
| `planner` | `planner` | high |
| `debugger` | `debugger` | medium |
| `debugger_low` | `debugger` | low |
| `debugger_high` | `debugger` | high |
| `worker` | `worker` | medium |
| `worker_low` | `worker` | low |
| `worker_high` | `worker` | high |
| `scratcher` | `scratcher` | low |
| `backlogger` | `backlogger` | low |
| `banker` | `banker` | low |

Spawn the named profile with Codex's spawn_agent tool (agent_type). Profiles inherit the session's selected model; do not supply another model. For a leaf with Complexity Trivial select the role's _low profile; for Complex select _high; otherwise select its unsuffixed profile. A profile's effort takes precedence over a spawn effort override.
Spawn each leaf and the consultant with fork_turns: "none" and a brief containing only task references, relevant decisions and the requested outcome. Use send_input with its id to return questions, review gaps and gate failures to that same agent; use resume_agent first if it is closed. In clients exposing collaboration tools, use spawn_agent with the named role when supported, send_message for a running agent and followup_task for an idle agent. A client without named-profile selection cannot establish profile loading; report that unsupported path.

Use the planner profile only as the walker's consultant, and resume it with its existing id.

<!-- @end -->
