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
- Outcome: engrenage formats generated Markdown with the shared Prettier configuration.
- Done when a fresh sync leaves `AGENTS.override.md` passing `prettier --check`.
