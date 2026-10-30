# Backlog

Deferred questions, bugs, tasks and improvements.

## Categories

- Categorize by the dependency family or project subsystem that must change, not by symptom, urgency or entry type.
- Upstream work belongs to its dependency's product family. Packages forming one tool share a category: `@changesets/cli` and `@changesets/core`. Separate products stay separate: Vite/Vitest and `@auaust/toolkit`/`@auaust/primitive-kit`. A shared vendor or integration does not define a family.
- Local coding conventions and linting belong to `coding-style`. Other local work belongs to the project subsystem whose behavior or contract must change.
- Reuse the category owning that dependency family or subsystem. If none exists, create `<owner>.md` without asking, even for one entry. No categories are required in advance.
- Index each category with a link and its owned product or behavior. Read only matching categories.

## Entries

- Use headings `## N. Title`, numbered consecutively from 1 within each category. The ID is `<filename without .md>.N`, for example `primitive-kit.1`.
- After adding, removing or moving entries, renumber affected categories and update entry references.
- State the matter, relevant context, expected outcome and completion or obsolescence condition. Field labels and proposed fixes are optional.
- Update existing entries instead of duplicating them. Remove resolved or obsolete entries; delete empty categories and their index links.

## Open categories

- [Merge](merge.md): questions to settle before migration agents batch-import primitive-kit into toolkit (AUAUST/lib-js-toolkit#103).
- [Utils](utils.md): runtime utilities under `src/utils/` and the planned domains, including missing helpers, conversion and native feature policies.
- [Documentation](documentation.md): the root README and other published package documentation.
- [Agent instructions](agent-instructions.md): project rules in `AGENTS.md` and `.claude/rules/` that must change.
- [Issue workflow](issue-workflow.md): how GitHub issues record decisions and express readiness and blocking relations.
- [Engrenage](engrenage.md): `@auaust/engrenage` shared instructions, CLI commands and generated files.
