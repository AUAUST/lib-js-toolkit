# Engrenage

## 1. Shared precedence section is incomplete

- `@auaust/engrenage` `data/agents/sections/precedence.md` (reference block in `AGENTS.md`) ranks only the user, project instructions, shared instructions and existing code.
- It omits task reference material (issues, backlog), scoped rules, maintainer-only issue content, tool configuration and how to report overridden sources. Toolkit has no local section covering them either.
- Outcome: decide per point whether it belongs upstream and add the shared part to engrenage; add a local section only for toolkit-specific points.
- Done when every source agents read has a defined precedence.

## 2. No GitHub metadata sync

- Labels are a hand-copied set reused across repositories, and GitHub issue types and severity/priority fields are not used. Issue types are configured at organization level, so syncing them needs organization permissions.
- Outcome: an engrenage `github` command that syncs labels, issue types and bug levels from a library-owned definition, with a check mode, adopted in every AUAUST repository.
- Done when toolkit's labels and issue types come from the sync.

## 3. Generated rules table is not Prettier-formatted

- `engrenage sync` writes the rule-mapping table in `AGENTS.override.md` with unaligned columns, so the file fails `prettier --check` right after a sync.
- Toolkit works around it by listing `/AGENTS.override.md` in the project section of `.prettierignore`.
- Outcome: engrenage lists `AGENTS.override.md` among the generated files in the defaults section of `.prettierignore`, or formats generated Markdown with the shared Prettier configuration.
- Done when a fresh sync in any project leaves `AGENTS.override.md` excluded from `prettier --check` or passing it, and toolkit's local entry is removed.

## 4. Lint rules assume per-helper toolkit subpaths

- AUAUST/lib-js-toolkit#104 drops toolkit's per-helper subpaths for one entry per module plus the root. Engrenage's `auaust/no-toolkit-root` rule requires `@auaust/toolkit/<helper>` subpaths instead of the root, and its `Math.*`, `Object.*` and `Array.isArray` restriction messages point to `@auaust/toolkit/math`, `/object` and `isArray`. Engrenage's own source also imports about a dozen per-helper subpaths.
- Outcome: the rules and messages follow the module entries (whether the root becomes allowed is part of it), in the batch of upstream updates at the end of the merge (`agent-instructions.1`), and engrenage's imports migrated.
- Done when engrenage's rules and source match toolkit's entry points.

## 5. Skill management

- Toolkit may publish a generated agent skill (`documentation.2`). Nothing lists or syncs skills that dependencies provide.
- Proposal: an engrenage command listing available skills and keeping them up to date, with a package-level declaration of skills (in the spirit of `exports`, but for skills). Check first which conventions or frameworks already exist for distributing skills through packages.
- Done when engrenage can discover and sync skills declared by dependencies, or obsolete if an existing convention covers it.
