# Merge

Questions to settle before migration agents batch-import primitive-kit (AUAUST/lib-js-toolkit#103). The order of work and the issues in discussion are tracked in the plan (#120). Entries are ordered so earlier answers unblock later ones; the title prefix names the area. An answer is recorded in the "Settled" section of the issue owning the question (process decisions in #103), then its entry is removed. Linked backlog entries are removed with it when the answer resolves them.

## 1. Layout: test import form and fixtures

- Settled in #104: tests live in `tests/modules/<module>/<helper>.test.ts`, `tests/utils/`, `tests/types/`, and import only `@auaust/toolkit…` entries, never `#`.
- Open: the import form in module tests (`import { upper } from "@auaust/toolkit/string"` or a namespace import) and where shared fixtures go (today `tests/fixtures/`).
- Done when the playbook's test template can be written.

## 2. Conversion: `toString` inputs

- #109 question 1: the resolution order is settled. Open: whether `toJSON` takes part, and the array separator (`","` as native `Array.prototype.toString`, or `", "`).
- Done when the `toString` row of the conversion table is complete.

## 3. Conversion: `toNumber`

- #109 question 3. `parse.number` returns `undefined` instead of `NaN` (#109); `toNumber` itself is open. primitive-kit maps `null`/`undefined` and blank strings to `0`, strips `_` separators and falls back to `parseFloat` (`"12px"` → `12`). Native `Number` differs on all three. Return `NaN` or throw on failure.
- Done when the `toNumber` row is complete.

## 4. Conversion: `toArray`

- #109 question 4: strings are single values (`["abc"]`), settled. Open: numbers (`[3]`, never a length, proposed; primitive-kit's `toArray(3)` creates a length-3 array), arrays returned as is or copied, array-likes without `Symbol.iterator`, and whether primitive-kit's `wrap` is kept or dropped.
- Done when the `toArray` row is complete.

## 5. Guards: which types get triplets

- #114 question 3: list every guard (toolkit `src/utils/is*.ts`, primitive-kit `is*`) and mark which get a converter. Every guard of the guards module gets a generated assertion (#114), so this list mostly concerns converters.
- Done when the checkbox list is in #114.

## 6. Guards: guards with options

- #114 question 4: do assertions forward guard options? `isObject` takes none (#155). Depends on the options rule (#155 question 3).
- Done when decided.

## 7. Guards: module boundary

- #114 question 5. Settled: the module is named `guard`; the `Number.is*` checks on an unknown input are guards; checks on an already typed number belong to `number` (#111); `isCallable` is a guard and `implementsProtocol` stays in `protocol` (#118). Open: value checks on an unknown input (`isEmptyString`, `isNonEmptyArray`) and checks on other typed values (`isSorted(array)`).
- Agents need a mechanical criterion: every `is…` helper of both libraries must land in exactly one tracker (#111).
- Done when the criterion is written in #114.

## 8. Short assertions: form

- #115 question 1: return the narrowed value (proposal) or an `asserts` signature. CamelCase is settled (#115).
- Must stay consistent with the `ensure` family (#114 question 7, #154).
- Done when decided.

## 9. Short assertions: set and location

- #115 questions 3 and 5: which of `notNull`, `notUndefined`, `notNullish`, `notNaN`, `notEmpty`, `notBlank`, `notZero`, `finite`; exported from `assert` (then not purely generated), the root, or both.
- Done when decided.

## 10. Dispatch: name and module

- #113 questions 1 and 3: `overload`, `dispatch`, `byType`, `typeSwitch`, `polymorphic`; in the `function` module?
- Done when decided.

## 11. Dispatch: function trap

- #113 question 2: functions go to `object`, get a `function` trap, or a grouping trap (`container`) like `nullish`.
- Done when decided.

## 12. Dispatch: introspection

- #113 question 5: expose the traps (to extend later) or stay opaque.
- Done when decided.

## 13. Tests: porting primitive-kit tests

- primitive-kit has 205 test files. `AGENTS.md` asks for the minimum tests needed; a migration may need parity. Options: port and adapt every case, use them as a reference for edge cases only, or write new minimal tests. Also whether a coverage threshold applies.
- Done when the rule is in the playbook.

## 14. Documentation: `@behavior` tag during the migration

- Proposed: a custom JSDoc tag giving the minimal behaviour an agent needs to decide whether to use a helper, usually one line (`@behavior Equivalent to Array.prototype.map`), read by the generated agent skill (`documentation.2`). The JSDoc rules for the migration are otherwise settled (#103).
- Done when it is decided whether migration agents write the tag now, with its wording rule, or it is added later.

## 15. Documentation: migration guide for primitive-kit users

- A primitive-kit → toolkit mapping (name, subpath, behaviour change) would help dependents and could be derived from the trackers' rows. Related: `documentation.1`.
- Done when it is decided whether the guide exists, where, and whether it is generated.

## 16. Dependents: freeze and deprecation

- #112 questions 1 and 3: final primitive-kit release pointing to toolkit, `@deprecated` JSDoc per export, `npm deprecate` (a manual public action).
- Done when decided.

## 17. Dependents: migration timing

- #112 question 2: migrate each dependent as its modules land, or all at the end. Engrenage is affected twice: it imports primitive-kit and toolkit's dropped per-helper subpaths (`engrenage.4`).
- Done when decided.

## 18. Build: empty module entries break `typecheck:dist`

- Found while applying #104: the empty modules (`export {};` in `array`, `assert`, `async`, `boolean`, `function`, `guard`, `iterable`, `maplike`, `number`, `parse`, `setlike`, `string`) bundle to `dist/<module>.d.mts` containing only `export { index_d_exports as t };` with no definition, so `engrenage typecheck:dist` fails with TS2304 and `pnpm build` stops before `vitest:dist`. Source mode (lint, typecheck, tests) is unaffected.
- Done when it is decided how an empty module entry is emitted (tsdown/rolldown-plugin-dts fix or a placeholder export) and `pnpm build` passes.

## 19. Build: root namespace identity differs in `dist/`

- Found while applying #104: the identity test in `tests/index.test.ts` (`toolkit.object === @auaust/toolkit/object`) passes in source mode and fails in `vitest:dist`. The root exports a synthesized namespace object (`__exportAll`), while `dist/object.mjs` re-exports the bindings as a real module namespace, so the two objects differ.
- Done when it is decided whether the identity is a contract the build must honour (and how) or the test and #104/#114 wording are relaxed.
