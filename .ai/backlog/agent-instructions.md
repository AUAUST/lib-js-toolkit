# Agent instructions

## 1. Rules to update as merge decisions settle

- The `AGENTS.md` sections "Source organization and public API", "Imports and types" and "Scaffolding, build and packaging", and `.claude/rules/code-style.md`, describe `src/utils/` and `src/modules/`.
- Some planned helpers conflict with current rules: the type-dispatch helper (AUAUST/lib-js-toolkit#113) needs native `typeof` outside `is<Type>` helpers, and lowercase short assertions (#115) would break camelCase.
- Outcome: each rule updated, with the user's consent, when its decision issue closes.
- Done when the merge issues under AUAUST/lib-js-toolkit#103 are closed and the rules match.
