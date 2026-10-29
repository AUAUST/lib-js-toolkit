# Agent instructions

## 1. Rules made stale by the merge

- Decided in AUAUST/lib-js-toolkit#103: rules contradicting the merge were rephrased before agents start (helper placement, internal import paths, `pnpm make function`). Migration agents then never edit rules: each records a rule its changes made stale as a separate brief entry in this category; all are updated in one consolidated pass, and the matching engrenage rules upstream in one batch.
- Already known: `.claude/rules/code-style.md` and the test layout in `AGENTS.md` ("Toolkit tests") still describe `src/utils/` and `tests/utils/` only. The type-dispatch helper (#113) needs native `typeof` outside `is<Type>` helpers, and lowercase short assertions (#115) would break camelCase.
- Made stale by the layout settled in #104, #111 and #118 (applied by the relocation task): "Protocols live in `src/protocols/<name>/index.ts`" and "module augmentation" in `AGENTS.md` (now `src/modules/protocol/`, registry listed directly); the public barrels `src/types.ts` and `src/errors.ts` (now `src/types/index.ts`, `src/errors/index.ts`); "one reusable type per `src/types/<Name>.ts`" (module types now live in `src/modules/<module>/types/`); "Keep relative imports where … type and error barrels need them" (barrels use `#` imports); the "Toolkit tests" area list (`tests/protocols/` is gone); the guards module name `guard`, `constants.ts` sub-entries, `internal/` and "barrels only re-export" are not described.
- Outcome: one change, with the user's consent, applying every entry of this category.
- Done when the migration is complete and the rules match the code.
