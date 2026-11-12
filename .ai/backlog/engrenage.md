# Engrenage

## 1. No GitHub metadata sync

- Labels are a hand-copied set reused across repositories, and GitHub issue types and severity/priority fields are not used. Issue types are configured at organization level, so syncing them needs organization permissions.
- Outcome: an engrenage `github` command that syncs labels, issue types and bug levels from a library-owned definition, with a check mode, adopted in every AUAUST repository.
- Done when toolkit's labels and issue types come from the sync.

## 2. Lint rules assume per-helper toolkit subpaths

- AUAUST/lib-js-toolkit#104 drops toolkit's per-helper subpaths for one entry per module plus the root. Engrenage's `auaust/no-toolkit-root` rule requires `@auaust/toolkit/<helper>` subpaths instead of the root, and its `Math.*`, `Object.*` and `Array.isArray` restriction messages point to `@auaust/toolkit/math`, `/object` and `isArray`. Engrenage's own source also imports about a dozen per-helper subpaths.
- Outcome: the rules and messages follow the module entries (whether the root becomes allowed is part of it), in the batch of upstream updates at the end of the merge (`agent-instructions.1`), and engrenage's imports migrated.
- Done when engrenage's rules and source match toolkit's entry points.

## 3. Ignored files make an environment active

- Engrenage treats an environment as active when its directory holds only ignored files: a stray `scripts/make/.DS_Store` revived the removed scripts environment, and `sync --check` failed in the main checkout.
- Outcome: environment activity counts only tracked or non-ignored files.
- Done when an environment directory holding only ignored files leaves the environment inactive.
