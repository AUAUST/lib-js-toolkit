# Agent instructions

## 1. Rules made stale by the merge

- Decided in AUAUST/lib-js-toolkit#103: rules are not updated during the migration. Migration agents record each rule their changes made stale as a separate brief entry in this category; all rules are then updated in one consolidated pass, and the matching engrenage rules upstream in one batch.
- Already known: the `AGENTS.md` sections "Source organization and public API", "Imports and types" and "Scaffolding, build and packaging", and `.claude/rules/code-style.md`, describe `src/utils/`, `src/modules/` and self-referencing imports (replaced by `#` imports, #104). The type-dispatch helper (#113) needs native `typeof` outside `is<Type>` helpers, and lowercase short assertions (#115) would break camelCase.
- Outcome: one change, with the user's consent, applying every entry of this category.
- Done when the migration is complete and the rules match the code.

## 2. Agent lock protocol to write

- Decided in AUAUST/lib-js-toolkit#103: `.ai/agent-lock.md` lists the issue each running agent works on and any backlog category it is writing; agents never take a locked task, write backlog entries in one batch under the lock, and re-read a backlog file after waiting for its lock.
- Outcome: the lock file created and the protocol written where migration agents read it (`merge.1`), before agents start (`merge.8`).
- Done when the file and the protocol exist.
