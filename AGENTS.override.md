# Codex instructions

This file is intended for OpenAI Codex. Other agents, including Claude Code, must ignore this file and use their own instruction entry points.

Codex loads this file instead of the root AGENTS.md. Before working, read and follow ./AGENTS.md as the shared project instructions.

## Rule mapping

Paths below are relative to the project root. Before editing a file, read and follow every rule whose glob matches that file. Read rules marked "All files" before any work. Multiple matching rules apply together. The paths frontmatter in each rule defines its scope; do not treat scoped rules as project-wide instructions.

<!-- @rules -->

| Matching glob | Rule to read |
| --- | --- |
| <code>.ai/agent-lock.md</code> | <code>.claude/rules/agent-lock.md</code> |
| <code>.ai/backlog/*.md</code> | <code>.claude/rules/agent-lock.md</code> |
| <code>.ai/backlog/*.md</code> | <code>.claude/rules/backlog.md</code> |
| <code>**/*.ts</code> | <code>.claude/rules/code-style.md</code> |
| <code>src/**/*.ts</code> | <code>.claude/rules/naming.md</code> |
| <code>tests/**/*.ts</code> | <code>.claude/rules/tests.md</code> |
| All files | <code>.claude/rules/debt-markers.md</code> |
| All files | <code>.claude/rules/git.md</code> |
| All files | <code>.claude/rules/no-attribution.md</code> |

<!-- @end -->
