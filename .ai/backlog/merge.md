# Merge

Questions to settle before migration agents batch-import primitive-kit (AUAUST/lib-js-toolkit#103). The order of work and the issues in discussion are tracked in the plan (#120). Entries are ordered so earlier answers unblock later ones; the title prefix names the area. An answer is recorded in the "Settled" section of the issue owning the question (process decisions in #103), then its entry is removed. Linked backlog entries are removed with it when the answer resolves them.

## 1. Scope: open type bugs in reused object types

- AUAUST/lib-js-toolkit#97 and #98 (`mappedValues` with generic sources), #99 (generic key sets, also `entries`) and #100 (lost declarations in `compose`) concern `ObjectEntry`, `ObjectKey` and `ObjectValue`, which #108 names as the reference for precise keys.
- Done when it is decided which of them are fixed before the `object` and `array` modules reuse those types.

## 2. Prerequisite: global changes made before agents start

- Agents never touch files outside their task, so every shared change must land first (#103). Known candidates: the Node version in `package.json` (`ci.1`), the relocation to the settled layout with every module scaffolded, the `imports` field and the named `tsconfig.json` paths (one task, layout in #104, modules in #111), the general helpers (#117), the root barrel, the updated scaffolding (`merge.6`). Done: the internal `#` import migration, the agent lock (`.ai/agent-lock.md`, `.claude/rules/agent-lock.md`) and the rephrased `AGENTS.md` rules.
- Edge: the root barrel re-exports the guards module and other helpers, and the `assert` entry gathers every assertion, so with hand-written barrels every task touching a guard would edit them (`merge.4`).
- Done when the complete list is written and each item is either done or scheduled before the first module.

## 3. Prerequisite: clean lint and format baseline

- `coding-style.1` (Prettier drift), `coding-style.2` (33 lint warnings) and `coding-style.3` (unverified disables). Agents told to make `pnpm lint` pass will either touch unrelated files or be unable to tell their warnings from existing ones.
- Done when the baseline is clean, or the playbook states how agents treat pre-existing warnings.

## 4. Tooling: barrels while codegen does not exist

- #110 depends on AUAUST/lib-js-codegen#8, but codegen is not bootstrapped (AUAUST/lib-js-codegen#12 open) and engrenage's own barrel markers are known to be brittle (AUAUST/lib-js-engrenage#9). Related: `codegen.1`.
- Options: A. wait for codegen; B. hand-written barrels now, replaced later by generated output that must be identical; C. engrenage's current `// @barrel` markers now.
- Edge: hand-written shared barrels (root, `assert`) break per-task file ownership (`merge.2`).
- Direction from the plan (#120): codegen is first implemented locally in toolkit (`scripts/`), then moved to `@auaust/codegen` once toolkit's foundations are done, so toolkit and codegen are not built on each other at the same time. To confirm: whether that local generator replaces options B and C from the start.
- Done when the interim barrel mechanism is chosen.

## 5. Tooling: derived code while metadata cannot be read

- Assertions, root re-exports and aliases are meant to be generated from helper metadata (#116, AUAUST/lib-js-codegen#13). Without it, agents must write them by hand as annotated declarations (TS2775).
- Decide whether agents already write the final metadata form in each helper file so later generation needs no file edits, and whether the generated files' content must match hand-written ones byte for byte.
- Done when the interim rule for assertions, root re-exports and aliases is written.

## 6. Tooling: scaffolding for module helpers

- `pnpm make function <name>` creates `src/utils/<name>.ts` and a test importing the root barrel; `AGENTS.md` now restricts it to type-agnostic helpers. Low-reasoning agents need a generator producing the settled layout. `codegen.1` plans to move scaffolding to codegen.
- The relocation (#104) leaves `scripts/make/makeProtocol.ts` and the `data/templates/protocol*.txt` and `utility*.txt` templates pointing at removed paths (`@auaust/toolkit/protocols`, per-helper subpaths, `declare module` augmentation); they are not fixed by it.
- Done when it is decided whether `data/templates/` and `scripts/make/` are updated now (and with what command shape, e.g. `pnpm make function string/upper`), or agents copy a template from the playbook.

## 7. Layout: flat type re-exports at the root

- `BUILD` stays in the root `index.ts` as it is (#104). The root also re-exports every type flat; #104 settles flat re-exports for the errors, guards, assertions and `src/utils/` helpers, not for types.
- Done when it is recorded in #104 whether the root keeps re-exporting every type flat.

## 8. Layout: test import form and fixtures

- Settled in #104: tests live in `tests/modules/<module>/<helper>.test.ts`, `tests/utils/`, `tests/types/`, and import only `@auaust/toolkit…` entries, never `#`.
- Open: the import form in module tests (`import { upper } from "@auaust/toolkit/string"` or a namespace import) and where shared fixtures go (today `tests/fixtures/`).
- Done when the playbook's test template can be written.

## 9. Runtime: baseline

- #106 question 1: Baseline "widely available", "newly available", or current evergreen plus Node LTS. The engrenage preset uses `target: "ESNext"` with no `lib`, so TypeScript currently accepts any native API.
- Done when the baseline is chosen.

## 10. Runtime: fallback policy

- #106 question 2 and `utils.3`: hand-written fallback, call-time feature detection, polyfill entries, or not using a method until it is in the baseline.
- Done when decided and the #106 feature table is marked native or fallback per row.

## 11. Runtime: where the baseline is declared

- #106 question 3: `engines`, tsconfig `target`/`lib`, README. `ci.1` adds `devEngines` for development only, which says nothing to consumers.
- Done when the declaration places are decided.

## 12. Conversion: runtime validation of non-coercing helpers

- #109 settles that `upper(value: string)` does not coerce, but not what happens on `upper(42)` at runtime: rely on the native error (`toUpperCase is not a function`), or check and throw a `TypeError`. The answer applies to every helper and decides whether agents add guards.
- Done when the rule is written.

## 13. Conversion: nullish passthrough

- `utils.2`: optional chaining in native wrappers so `null`/`undefined` pass through.
- Done when `utils.2` is settled in #109.

## 14. Conversion: which helpers accept converter input

- #109 settles that helpers defined in terms of a converter accept what it accepts, but agents need a criterion or a list (`concat`, `equals`, `between`?). The fate of primitive-kit's `Stringifiable`, `Numberifiable` and `Arrayable` types is tied to the conversion protocols (#143 question 2).
- Done when the criterion is written.

## 15. Conversion: `toString` inputs

- #109 question 1: the resolution order is settled. Open: whether `toJSON` takes part, and the array separator (`","` as native `Array.prototype.toString`, or `", "`).
- Done when the `toString` row of the conversion table is complete.

## 16. Conversion: `toNumber`

- #109 question 3. `parse.number` returns `undefined` instead of `NaN` (#109); `toNumber` itself is open. primitive-kit maps `null`/`undefined` and blank strings to `0`, strips `_` separators and falls back to `parseFloat` (`"12px"` → `12`). Native `Number` differs on all three. Return `NaN` or throw on failure.
- Done when the `toNumber` row is complete.

## 17. Conversion: `toArray`

- #109 question 4: strings are single values (`["abc"]`), settled. Open: numbers (`[3]`, never a length, proposed; primitive-kit's `toArray(3)` creates a length-3 array), arrays returned as is or copied, array-likes without `Symbol.iterator`, and whether primitive-kit's `wrap` is kept or dropped.
- Done when the `toArray` row is complete.

## 18. Conversion: `parse` module contents

- #109 question 6 is settled: parsers return `undefined` when the input has no meaningful interpretation; `parse.boolean` and `parse.number` are described in #109. Open: the full list of parsers and what each accepts.
- Done when the `parse` module is specified.

## 19. Conversion: where converters live

- #109 question 7: a conversion lives in the domain owning it, and primitive-kit's source-to-destination helpers (`booleanToString`, …) are expected to be dropped (#109). Open: whether the owner is the source or the target domain, and where the generic converters (`toString`, `toNumber`, …) live and are re-exported. Full-word converters (`array()`) do not exist (#109).
- Done when decided.

## 20. Behaviour: reconciling primitive-kit and toolkit

- Settled: a helper in both libraries is owned by the local refactor tracker, which notes its primitive-kit counterpart (#111), and `isNumber` keeps toolkit's `typeof` semantics. Remaining differences: `isObject` (primitive-kit's `objects` version rejects arrays and takes `allowArray`; its `primitives` version accepts functions; toolkit's accepts arrays, rejects functions), `call`, `once`, `tryCatch`/`attempt`, `merge`/`assign`, `entries`, `keys`.
- Tracker rows decide each case (drafted in each module's index issue, #103), but agents need a default: toolkit's behaviour wins unless the row says otherwise?
- Done when the default rule is written.

## 21. Behaviour: equality

- Which comparison helpers use by default: `===`, SameValueZero (`includes`, `Set`) or `Object.is`; shallow or deep `equals`. primitive-kit's string `equals` is case-insensitive by default, and its array `equals` takes a `recursive` flag.
- Done when the default algorithm and the `equals` contract per module are written.

## 22. Behaviour: options objects and flags

- primitive-kit mixes positional booleans (`equals(a, b, recursive)`, `isObject(value, allowArray)`), options objects (`ComparisonOptions`), and unions of shorthand and options (`slug(value, separator | options)`, `random(length | options)`).
- Done when the rule for optional behaviour parameters is written.

## 23. Behaviour: indexes and ranges

- Negative indexes, out-of-range access (`undefined` or throw), and whether `nth` helpers (`afterNth`, `splitNth`, `nthIndexOf`) are zero-based.
- Done when the rule is written.

## 24. Behaviour: empty inputs

- Aggregates and accessors on empty input: `average()` is `NaN` in primitive-kit, `max()` is `-Infinity` natively, `first([])` is `undefined`, random pick from an empty list.
- Done when the rule (return value or throw) is written.

## 25. Behaviour: numeric edge values

- `NaN`, `±Infinity` and `-0` in predicates (`isPositive`, `isEven`, `isInteger`, `isBetween`), and whether number helpers accept `bigint`. The guards `isNumber`, `isNaN`, `isFinite` are settled.
- Done when the rule is written.

## 26. Behaviour: Unicode and locale

- Code units or code points for length-based string helpers (`chunk`, `truncate*`, `insertEvery`, `random`); word splitting used by casing helpers (acronyms, digits, non-Latin scripts); `unaccent` normalization; whether locale-aware helpers take a locale argument.
- Done when the rule is written.

## 27. Behaviour: randomness

- primitive-kit's string `random` uses `crypto.getRandomValues` with a modulo bias; number and array helpers use other sources. Decide the source, whether helpers claim any security, and how tests stay deterministic (injectable generator or mocked source).
- Done when the rule is written.

## 28. Behaviour: method-name shorthand in callbacks

- primitive-kit's `map(array, "method", ...args)` calls a method by name on each element; toolkit has `callMethod` and `MethodName`. Keep the shorthand on collection helpers or require a callback.
- Done when decided.

## 29. Behaviour: emptiness

- primitive-kit has per-module `isNotEmpty`; toolkit has `empty()`, `filled()` and the `emptiable` protocol; #115 proposes `notEmpty`. `isEmptyString`, `isNonEmptyString`, `isEmptyArray` and `isNonEmptyArray` are settled names. Decide whether every module gets such guards, how they relate to `empty()` and the protocol, and whether whitespace-only strings are empty.
- Done when decided.

## 30. Guards: which types get triplets

- #114 question 3: list every guard (toolkit `src/utils/is*.ts`, primitive-kit `is*`) and mark which get a converter. Every guard of the guards module gets a generated assertion (#114), so this list mostly concerns converters.
- Done when the checkbox list is in #114.

## 31. Guards: guards with options

- #114 question 4: do assertions forward guard options (`isObject(value, allowArray)`)? Depends on `merge.22`.
- Done when decided.

## 32. Guards: module boundary

- #114 question 5. Settled: the module is named `guard`; the `Number.is*` checks on an unknown input are guards; checks on an already typed number belong to `number` (#111); `isCallable` is a guard and `implementsProtocol` stays in `protocol` (#118). Open: value checks on an unknown input (`isEmptyString`, `isNonEmptyArray`) and checks on other typed values (`isSorted(array)`).
- Agents need a mechanical criterion: every `is…` helper of both libraries must land in exactly one tracker (#111).
- Done when the criterion is written in #114.

## 33. Guards: assertion names and placement

- #114 question 6: `assertString` or `assertIsString`, derived mechanically from the guard name by the generator. Generated as committed files inside the guards module, or only in the root and `assert` barrels (#116 question 3).
- Also #114 question 7: a passing check should return its input (`return assertString(value)`), which `asserts` signatures cannot do; proposal: a separate `ensureString` family, maybe exposed as an `ensure` entry.
- Done when decided.

## 34. Short assertions: form

- #115 question 1: return the narrowed value (proposal) or an `asserts` signature. CamelCase is settled (#115).
- Must stay consistent with the proposed `ensure` family (`merge.33`).
- Done when decided.

## 35. Short assertions: set and location

- #115 questions 3 and 5: which of `notNull`, `notUndefined`, `notNullish`, `notNaN`, `notEmpty`, `notBlank`, `notZero`, `finite`; exported from `assert` (then not purely generated), the root, or both.
- Done when decided.

## 36. Dispatch: name and module

- #113 questions 1 and 3: `overload`, `dispatch`, `byType`, `typeSwitch`, `polymorphic`; in the `function` module?
- Done when decided.

## 37. Dispatch: function trap

- #113 question 2: functions go to `object`, get a `function` trap, or a grouping trap (`container`) like `nullish`.
- Done when decided.

## 38. Dispatch: introspection

- #113 question 5: expose the traps (to extend later) or stay opaque.
- Done when decided.

## 39. Barrels: final generation design

- #110 questions 1 (whole files or marker blocks), 2 (committed with a check mode: recommended), 4 (first version without metadata) and 6 (where the check runs). Interim mechanism: `merge.4`.
- Done when decided and written into AUAUST/lib-js-codegen#8 where it applies.

## 40. Metadata: declaration form and flags

- #116 questions 1 (exported `defineMacro` object, JSDoc tags, or manifest) and 2 (`index`, `assertion`, `parser`, `alias`: which for the merge). Agents write this in every helper file, so it must be fixed before the first module even if generation comes later (`merge.5`).
- Done when the form and flags are decided.

## 41. Metadata: generated output layout

- #116 questions 3 (generated assertions as committed files or only in barrels) and 4 (how a re-export-only module such as `assert` is declared and enforced).
- Done when decided.

## 42. Tests: porting primitive-kit tests

- primitive-kit has 205 test files. `AGENTS.md` asks for the minimum tests needed; a migration may need parity. Options: port and adapt every case, use them as a reference for edge cases only, or write new minimal tests. Also whether a coverage threshold applies.
- Done when the rule is in the playbook.

## 43. Documentation: `@behavior` tag during the migration

- Proposed: a custom JSDoc tag giving the minimal behaviour an agent needs to decide whether to use a helper, usually one line (`@behavior Equivalent to Array.prototype.map`), read by the generated agent skill (`documentation.2`). The JSDoc rules for the migration are otherwise settled (#103).
- Done when it is decided whether migration agents write the tag now, with its wording rule, or it is added later.

## 44. Documentation: migration guide for primitive-kit users

- A primitive-kit → toolkit mapping (name, subpath, behaviour change) would help dependents and could be derived from the trackers' rows. Related: `documentation.1`.
- Done when it is decided whether the guide exists, where, and whether it is generated.

## 45. Dependents: freeze and deprecation

- #112 questions 1 and 3: final primitive-kit release pointing to toolkit, `@deprecated` JSDoc per export, `npm deprecate` (a manual public action).
- Done when decided.

## 46. Dependents: migration timing

- #112 question 2: migrate each dependent as its modules land, or all at the end. Engrenage is affected twice: it imports primitive-kit and toolkit's dropped per-helper subpaths (`engrenage.4`).
- Done when decided.

## 47. Build: empty module entries break `typecheck:dist`

- Found while applying #104: the empty modules (`export {};` in `array`, `assert`, `async`, `boolean`, `function`, `guard`, `iterable`, `maplike`, `number`, `parse`, `setlike`, `string`) bundle to `dist/<module>.d.mts` containing only `export { index_d_exports as t };` with no definition, so `engrenage typecheck:dist` fails with TS2304 and `pnpm build` stops before `vitest:dist`. Source mode (lint, typecheck, tests) is unaffected.
- Done when it is decided how an empty module entry is emitted (tsdown/rolldown-plugin-dts fix or a placeholder export) and `pnpm build` passes.

## 48. Build: root namespace identity differs in `dist/`

- Found while applying #104: the identity test in `tests/index.test.ts` (`toolkit.object === @auaust/toolkit/object`) passes in source mode and fails in `vitest:dist`. The root exports a synthesized namespace object (`__exportAll`), while `dist/object.mjs` re-exports the bindings as a real module namespace, so the two objects differ.
- Done when it is decided whether the identity is a contract the build must honour (and how) or the test and #104/#114 wording are relaxed.
