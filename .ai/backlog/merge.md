# Merge

Questions to settle before migration agents batch-import primitive-kit (AUAUST/lib-js-toolkit#103). The order of work and the issues in discussion are tracked in the plan (#120). Entries are ordered so earlier answers unblock later ones; the title prefix names the area. An answer is recorded in the "Settled" section of the issue owning the question (process decisions in #103), then its entry is removed. Linked backlog entries are removed with it when the answer resolves them.

## 1. Dispatch: name and module

- #113 questions 1 and 3: `overload`, `dispatch`, `byType`, `typeSwitch`, `polymorphic`; in the `function` module?
- Done when decided.

## 2. Dispatch: function trap

- #113 question 2: functions go to `object`, get a `function` trap, or a grouping trap (`container`) like `nullish`.
- Done when decided.

## 3. Dispatch: introspection

- #113 question 5: expose the traps (to extend later) or stay opaque.
- Done when decided.

## 4. Documentation: `@behavior` tag during the migration

- Proposed: a custom JSDoc tag giving the minimal behaviour an agent needs to decide whether to use a helper, usually one line (`@behavior Equivalent to Array.prototype.map`), read by the generated agent skill (`documentation` › "Agent skill for toolkit"). The JSDoc rules for the migration are otherwise settled (#103).
- Done when it is decided whether migration agents write the tag now, with its wording rule, or it is added later.

## 5. Documentation: migration guide for primitive-kit users

- A primitive-kit → toolkit mapping (name, subpath, behaviour change) would help dependents and could be derived from the trackers' rows. Related: `documentation` › "README lacks domain overviews".
- Done when it is decided whether the guide exists, where, and whether it is generated.

## 6. Dependents: freeze and deprecation

- #112 questions 1 and 3: final primitive-kit release pointing to toolkit, `@deprecated` JSDoc per export, `npm deprecate` (a manual public action).
- Done when decided.

## 7. Dependents: migration timing

- #112 question 2: migrate each dependent as its modules land, or all at the end. Engrenage is affected twice: it imports primitive-kit and toolkit's dropped per-helper subpaths (`engrenage` › "Lint rules assume per-helper toolkit subpaths"). The compatible release order is recorded in #112.
- Done when decided.

## 8. Build: empty module entries break `typecheck:dist`

- Found while applying #104: the empty modules (`export {};` in `array`, `assert`, `async`, `boolean`, `function`, `guard`, `iterable`, `maplike`, `number`, `parse`, `setlike`, `string`) bundle to `dist/<module>.d.mts` containing only `export { index_d_exports as t };` with no definition, so `engrenage typecheck:dist` fails with TS2304 and `pnpm build` stops before `vitest:dist`. Source mode (lint, typecheck, tests) is unaffected.
- Owned by #177 (placeholder exports rejected there: they would become public API). Confirmed on 2026-10-31: `pnpm build` fails on `main` for the 12 entries.
- Done when #177 is closed.

## 9. Build: root namespace identity differs in `dist/`

- Found while applying #104: the identity test in `tests/index.test.ts` (`toolkit.object === @auaust/toolkit/object`) passes in source mode and fails in `vitest:dist`. The root exports a synthesized namespace object (`__exportAll`), while `dist/object.mjs` re-exports the bindings as a real module namespace, so the two objects differ.
- Done when it is decided whether the identity is a contract the build must honour (and how) or the test and #104/#114 wording are relaxed.
