# Merge

Questions to settle before migration agents batch-import primitive-kit (AUAUST/lib-js-toolkit#103). The order of work and the issues in discussion are tracked in the plan (#120). Entries are ordered so earlier answers unblock later ones; the title prefix names the area. An answer is recorded in the "Settled" section of the issue owning the question (process decisions in #103), then its entry is removed. Linked backlog entries are removed with it when the answer resolves them.

## 1. Process: branches, review and merge order

- Settled (#103, #120): foundation steps on `main`, then one branch per module merged as soon as it is complete; the order lives in the plan. Open: one pull request per module branch or per task issue, and who reviews and merges. Covers the rest of `issue-workflow.1`.
- Done when decided.

## 2. Process: release cadence

- One changeset file per task issue is settled (#103). Toolkit is at 0.5.1; breaking changes take a minor bump. Open: release each module as it lands, or accumulate and release once.
- Done when decided.

## 3. Scope: open type bugs in reused object types

- AUAUST/lib-js-toolkit#97 and #98 (`mappedValues` with generic sources), #99 (generic key sets, also `entries`) and #100 (lost declarations in `compose`) concern `ObjectEntry`, `ObjectKey` and `ObjectValue`, which #108 names as the reference for precise keys.
- Done when it is decided which of them are fixed before the `object` and `array` modules reuse those types.

## 4. Prerequisite: global changes made before agents start

- Agents never touch files outside their task, so every shared change must land first (#103). Known candidates: the Node version in `package.json` (`ci.1`), the `imports` field and the internal import migration (`coding-style.4`), every module scaffolded with its `tsconfig.json` path and directory even if empty (#111), the general helpers (#117), the root barrel, the updated scaffolding (`merge.8`). Done: the agent lock (`.ai/agent-lock.md`, `.claude/rules/agent-lock.md`) and the rephrased `AGENTS.md` rules.
- Edge: the root barrel re-exports the guards module and other helpers, and the `assert` entry gathers every assertion, so with hand-written barrels every task touching a guard would edit them (`merge.6`).
- Done when the complete list is written and each item is either done or scheduled before the first module.

## 5. Prerequisite: clean lint and format baseline

- `coding-style.1` (Prettier drift), `coding-style.2` (33 lint warnings) and `coding-style.3` (unverified disables). Agents told to make `pnpm lint` pass will either touch unrelated files or be unable to tell their warnings from existing ones.
- Done when the baseline is clean, or the playbook states how agents treat pre-existing warnings.

## 6. Tooling: barrels while codegen does not exist

- #110 depends on AUAUST/lib-js-codegen#8, but codegen is not bootstrapped (AUAUST/lib-js-codegen#12 open) and engrenage's own barrel markers are known to be brittle (AUAUST/lib-js-engrenage#9). Related: `codegen.1`.
- Options: A. wait for codegen; B. hand-written barrels now, replaced later by generated output that must be identical; C. engrenage's current `// @barrel` markers now.
- Edge: hand-written shared barrels (root, `assert`) break per-task file ownership (`merge.4`).
- Done when the interim barrel mechanism is chosen.

## 7. Tooling: derived code while metadata cannot be read

- Assertions, root re-exports and aliases are meant to be generated from helper metadata (#116, AUAUST/lib-js-codegen#13). Without it, agents must write them by hand as annotated declarations (TS2775).
- Decide whether agents already write the final metadata form in each helper file so later generation needs no file edits, and whether the generated files' content must match hand-written ones byte for byte.
- Done when the interim rule for assertions, root re-exports and aliases is written.

## 8. Tooling: scaffolding for module helpers

- `pnpm make function <name>` creates `src/utils/<name>.ts` and a test importing the root barrel; `AGENTS.md` now restricts it to type-agnostic helpers. Low-reasoning agents need a generator producing the settled layout. `codegen.1` plans to move scaffolding to codegen.
- Done when it is decided whether `data/templates/` and `scripts/make/` are updated now (and with what command shape, e.g. `pnpm make function string/upper`), or agents copy a template from the playbook.

## 9. Layout: directory roots

- #104 question 1: `src/domains/` + `src/features/` (recommended there), flat `src/<name>/`, or `src/modules/` for both.
- Also places protocol tooling and each protocol (#118). `src/utils/`, `src/errors/` and `src/types/` stay (#104).
- Done when the tree is written with one line per root.

## 10. Layout: root barrel content

- #104 question 4: the root exists (#104 settles one entry per module plus the root). Settled: it exports the guards module, assertions and the type-agnostic helpers of `src/utils/` (#104). Beyond those, it re-exports modules as namespaces, or exposes only features and type-agnostic helpers. Current root also exports all types, all errors, `isNaN` from `math` and the `BUILD` constant.
- Done when the root barrel rule is written.

## 11. Layout: location and export of module types

- #104 question 5: module-specific types (`Stringifiable`) inside their module or all in `src/types/`. Also: are helper-specific types exported from the module barrel (as `Finalized` is from `object` today), and how are type names that repeat across modules (`Callback` in `array` and `iterable`) disambiguated? Result types follow the past tense (`Mapped`, #105).
- Done when the type placement and export rule is written.

## 12. Layout: internal helpers

- primitive-kit has non-exported helper modules (`strings/helpers.ts`: `comparisonOptions`, `randomStringOptions`). #110 question 3 asks how a file is marked internal: an `internal/` directory, a filename convention, or an allow list (never a list of public names).
- Done when the convention is chosen.

## 13. Layout: test locations and imports

- Tests mirror source areas. Decide the path for module helpers (`tests/<module>/<helper>.test.ts`?) and the import form (`import { upper } from "@auaust/toolkit/string"` or a namespace import), plus where shared fixtures go.
- Done when the playbook's test template can be written.

## 14. Naming: native names or short verbs

- #105 question 2. primitive-kit has both forms (`toUpperCase` with alias `upper`, `toCamelCase` with alias `camel`). Proposal there: native name for thin native wrappers, descriptive verb otherwise, never both. The infinitive rule (#105) is settled and does not decide this.
- Edge: the `to…` prefix is settled for converters (`toString`, `toNumber`), so `toCamelCase` or `toSorted` read like converters (`merge.19`).
- Done when the rule is written with examples covering casing, case conversion and native wrappers.

## 15. Naming: aliases

- primitive-kit declares 27 helper aliases and 42 method aliases (`is`, `from`, `after`, `upper`, `randInt`). `isLoose…`/`isStrict…` names are settled as dropped (#105). The only settled aliases are the converter shorthands `s`, `a`, `b`, `n`. Toolkit's root also exports type aliases (`Cached as CachedFn`, `Memoized as MemoizedFn`).
- Done when the alias rule is written (none besides the shorthands, or a criterion).

## 16. Naming: same concept across modules

- #105 question 3: a helper existing in several modules (`map`, `filter`, `equals`, `isEmpty`, `concat`, `random`, `or`) keeps the same name and argument order everywhere. The settled `object.map` (from `mapped`) follows this.
- Done when confirmed, with how to handle a concept whose meaning differs per module. primitive-kit's `booleans/not` is dropped (#103), so it no longer collides with `not(fn)` (#102).

## 17. Naming: argument order and variadics

- #105 question 4: subject first, no curried form. Also: aggregates take a list or rest arguments? primitive-kit's `average(...nums)` and toolkit's `math.sum(...addends)` use rest arguments, which fail on large arrays (argument count limit) and differ from array helpers.
- Done when the order and the list-versus-rest rule are written.

## 18. Naming: singular and plural helpers

- #105 question 8: `hasKey`/`hasKeys`, `defineGetter`/`defineGetters`, `random`/`randoms`. Both forms as a rule, or one variadic helper.
- Done when decided.

## 19. Naming: mutating and copying variants

- primitive-kit pairs mutating and copying helpers as `reverse`/`toReversed`, `sort`/`toSorted`, `deduplicate`/`toDeduplicated`, `collapse`/`toCollapsed`, `shuffle`/`toShuffled`; `pull` mutates. Toolkit uses `transform` (in place) and `mapped` (copy, becoming `object.map`). Native arrays use `reverse`/`toReversed`.
- Decide whether mutating helpers exist at all, which naming marks them, and how that coexists with the converter `to…` prefix and the infinitive rule.
- Done when the rule is written.

## 20. Naming: asynchronous variants

- Toolkit uses an `Async` suffix (`attemptAsync`, `cachedAsync`, `pipeAsync`); primitive-kit has `tryCatchAsync` and `fromAsync`. #107 question 6 asks whether async iterables get their own module.
- Done when the suffix rule and the async iterable scope are decided.

## 21. Naming: `or` fallback helpers

- primitive-kit has `or` in `strings`, `numbers` and `functions`: first non-empty string, first valid number, first function or `noop`. Each module uses a different validity test.
- Done when it is decided to keep, rename or drop them, and their validity test per module.

## 22. Naming: guard for "number and not `NaN`"

- #105 question 9: `isValidNumber` or another name, and whether its negation exists (`isNotNumberOrNaN`?). "Valid" must not become a remembered qualifier like `loose`.
- Done when decided.

## 23. Naming: guard parameter name

- #105 question 10: `input` (current toolkit guards) or `value`.
- Done when decided.

## 24. Naming: generic callback parameter name

- #105 question 11: `callback`, `closure` or `fn` for callbacks without a defined purpose, as one name everywhere or one per category with a written criterion (called once or on events, kept and called persistently, worked on but not called). Purpose-specific names (`predicate`, `mapper`) are settled. A parameter cannot be named `function` (the module's name, #105).
- Done when decided.

## 25. Naming: helpers the infinitive rule cannot rename directly

- #105 question 12: `voided` (`void` is reserved), `frozen` (`object.freeze` already exists as `Object.freeze`), `readonly`, `plain`, `cachedAsync`, and the predicates `empty`/`filled`.
- Done when each has a name or a rule covers them.

## 26. Runtime: baseline

- #106 question 1: Baseline "widely available", "newly available", or current evergreen plus Node LTS. The engrenage preset uses `target: "ESNext"` with no `lib`, so TypeScript currently accepts any native API.
- Done when the baseline is chosen.

## 27. Runtime: fallback policy

- #106 question 2 and `utils.4`: hand-written fallback, call-time feature detection, polyfill entries, or not using a method until it is in the baseline.
- Done when decided and the #106 feature table is marked native or fallback per row.

## 28. Runtime: where the baseline is declared

- #106 question 3: `engines`, tsconfig `target`/`lib`, README. `ci.1` adds `devEngines` for development only, which says nothing to consumers.
- Done when the declaration places are decided.

## 29. Iterables: argument validation and cleanup

- #107 question 1 (validate eagerly, process lazily: recommended) and question 4 (consume through `for…of`/`yield*` so early exit closes upstream; one test per helper family).
- Done when both rules are confirmed.

## 30. Iterables: single-use or reusable

- #107 question 2 and `utils.2` (lazy but reusable results with a retained buffer; live-source behaviour).
- Done when the reuse contract and the documented live-source behaviour are settled.

## 31. Iterables: native helpers or generators

- #107 question 3: mix `Iterator.from(…).map` with hand-written generators, and whether the return type is always `IteratorObject<T>`. Depends on the baseline (`merge.26`).
- Done when decided.

## 32. Iterables: accepted inputs

- #107 question 5: strings (iterated by code point), array-likes (`arguments`, `NodeList`), `Map` (entries), nullish.
- Done when the accepted input type is written.

## 33. Iterables: array delegation and sparse arrays

- #107 question 7: benchmark before the `array` → `Array.from(iterable…)` rule.
- Edge: native array methods skip holes (`forEach`, `filter`) or keep them (`map`), while iteration yields `undefined`, so delegation changes results on sparse arrays. primitive-kit's `first` skips holes and `undefined` values.
- Done when the delegation rule and the hole policy are decided.

## 34. Types: opting out of precise keys

- #108 question 1: explicit type argument, curried type argument, or a widening identity helper (leaning there; name open).
- Done when one mechanism is chosen and named.

## 35. Types: literal results

- #108 question 2 (literal only when exact, else `string`) and question 3 (unions distribute, wide input gives wide output; `const` type parameters as a rule?). Locale-aware helpers always return `string`.
- Done when both rules are confirmed.

## 36. Types: complexity budget

- #108 question 4: recursion depth cap with fallback to `string`, and whether CI measures type-check time.
- Done when the cap and the check are decided.

## 37. Types: numeric literals

- #108 question 5: literal arithmetic at type level (`increment(1)` → `2`) in or out.
- Done when decided.

## 38. Types: tuples

- #108 question 6 and #107 question 8: array helpers preserve tuple shapes or return `T[]`. Readonly inputs and writable copies are settled (#108).
- Done when decided.

## 39. Types: testing convention

- #108 question 7: `expectTypeOf` assertions for literal, union and wide inputs on every precise helper.
- Done when confirmed and added to the test template.

## 40. Conversion: runtime validation of non-coercing helpers

- #109 settles that `upper(value: string)` does not coerce, but not what happens on `upper(42)` at runtime: rely on the native error (`toUpperCase is not a function`), or check and throw a `TypeError`. The answer applies to every helper and decides whether agents add guards.
- Done when the rule is written.

## 41. Conversion: nullish passthrough

- `utils.3`: optional chaining in native wrappers so `null`/`undefined` pass through.
- Done when `utils.3` is settled in #109.

## 42. Conversion: which helpers accept converter input

- #109 settles that helpers defined in terms of a converter accept what it accepts, but agents need a criterion or a list (`concat`, `or`, `equals`, `between`?). Also the fate of primitive-kit's `Stringifiable`, `Numberifiable` and `Arrayable` types.
- Done when the criterion is written.

## 43. Conversion: `toString` inputs

- #109 question 1. primitive-kit calls `valueOf()` when `toString` is `Object.prototype`'s, then `String()`. Plain objects, symbols, arrays and `Date` need a row each.
- Done when the `toString` row of the conversion table is complete.

## 44. Conversion: `toBoolean`

- #109 question 2: native truthiness, or truthiness with exceptions (empty arrays/objects). primitive-kit's string interpretation moves to `parse`. Its JSDoc examples are wrong (`B.from("foo") // false`), so its tests, not its docs, are the reference.
- Done when the `toBoolean` row is complete.

## 45. Conversion: `toNumber`

- #109 question 3. primitive-kit maps `null`/`undefined` and blank strings to `0`, strips `_` separators and falls back to `parseFloat` (`"12px"` → `12`). Native `Number` differs on all three. Return `NaN` or throw on failure.
- Done when the `toNumber` row is complete.

## 46. Conversion: `toArray`

- #109 question 4. primitive-kit's `toArray(3)` creates an array of length 3, conflicting with the proposed "non-iterable → `[value]`". Strings: `["abc"]` or characters. Overlaps primitive-kit's `wrap`.
- Done when the `toArray` row is complete and `wrap` is kept or dropped.

## 47. Conversion: `parse` module contents and failures

- #109 question 6: throw, return `undefined`, or take a fallback, the same for every parser. Also which parsers exist (`boolean`, `number`, others?) and what each accepts.
- Done when the `parse` module is specified.

## 48. Conversion: where converters live

- #109 question 7 and #105 question 5: source module (`boolean.toString`), target module (`string.from`), and/or root.
- Done when decided.

## 49. Behaviour: reconciling primitive-kit and toolkit

- Settled: a helper in both libraries is owned by the local refactor tracker, which notes its primitive-kit counterpart (#111), and `isNumber` keeps toolkit's `typeof` semantics (#105). Remaining differences: `isObject` (primitive-kit's `objects` version rejects arrays and takes `allowArray`; its `primitives` version accepts functions; toolkit's accepts arrays, rejects functions), `call`, `once`, `tryCatch`/`attempt`, `merge`/`assign`, `entries`, `keys`.
- Tracker rows decide each case (drafted in each module's index issue, #103), but agents need a default: toolkit's behaviour wins unless the row says otherwise?
- Done when the default rule is written.

## 50. Behaviour: equality

- Which comparison helpers use by default: `===`, SameValueZero (`includes`, `Set`) or `Object.is`; shallow or deep `equals`. primitive-kit's string `equals` is case-insensitive by default, and its array `equals` takes a `recursive` flag.
- Done when the default algorithm and the `equals` contract per module are written.

## 51. Behaviour: options objects and flags

- primitive-kit mixes positional booleans (`equals(a, b, recursive)`, `isObject(value, allowArray)`), options objects (`ComparisonOptions`), and unions of shorthand and options (`slug(value, separator | options)`, `random(length | options)`).
- Done when the rule for optional behaviour parameters is written.

## 52. Behaviour: indexes and ranges

- Negative indexes, out-of-range access (`undefined` or throw), and whether `nth` helpers (`afterNth`, `splitNth`, `nthIndexOf`) are zero-based.
- Done when the rule is written.

## 53. Behaviour: empty inputs

- Aggregates and accessors on empty input: `average()` is `NaN` in primitive-kit, `max()` is `-Infinity` natively, `first([])` is `undefined`, random pick from an empty list.
- Done when the rule (return value or throw) is written.

## 54. Behaviour: numeric edge values

- `NaN`, `±Infinity` and `-0` in predicates (`isPositive`, `isEven`, `isInteger`, `isBetween`), and whether number helpers accept `bigint`. The guards `isNumber`, `isNaN`, `isFinite` are settled (#105).
- Done when the rule is written.

## 55. Behaviour: Unicode and locale

- Code units or code points for length-based string helpers (`chunk`, `truncate*`, `insertEvery`, `random`); word splitting used by casing helpers (acronyms, digits, non-Latin scripts); `unaccent` normalization; whether locale-aware helpers take a locale argument.
- Done when the rule is written.

## 56. Behaviour: randomness

- primitive-kit's string `random` uses `crypto.getRandomValues` with a modulo bias; number and array helpers use other sources. Decide the source, whether helpers claim any security, and how tests stay deterministic (injectable generator or mocked source).
- Done when the rule is written.

## 57. Behaviour: method-name shorthand in callbacks

- primitive-kit's `map(array, "method", ...args)` calls a method by name on each element; toolkit has `callMethod` and `MethodName`. Keep the shorthand on collection helpers or require a callback.
- Done when decided.

## 58. Behaviour: emptiness

- primitive-kit has per-module `isNotEmpty`; toolkit has `empty()`, `filled()` and the `emptiable` protocol; #115 proposes `notEmpty`. `isEmptyString`, `isNonEmptyString`, `isEmptyArray` and `isNonEmptyArray` are settled names (#105). Decide whether every module gets such guards, how they relate to `empty()` and the protocol, and whether whitespace-only strings are empty.
- Done when decided.

## 59. Guards: which types get triplets

- #114 question 3: list every guard (toolkit `src/utils/is*.ts`, primitive-kit `is*`) and mark which get a converter. Every guard of the guards module gets a generated assertion (#114), so this list mostly concerns converters.
- Done when the checkbox list is in #114.

## 60. Guards: guards with options

- #114 question 4: do assertions forward guard options (`isObject(value, allowArray)`)? Depends on `merge.51`.
- Done when decided.

## 61. Guards: module name and boundary

- #114 question 5. Settled: every type-checking helper lives in one dedicated module, re-exported from the root and never from domain modules (#114). Open: its name (`guards` is the working name; `types` is taken by the type-only entry) and which predicates belong there: checks narrowing an unknown input (`isString`, `isPlainObject`, `isPropertyKey`), value checks (`isNaN`, `isFinite`, `isEmptyString`, `isNonEmptyArray`), checks on an already typed value (`isEven(number)`, `isSorted(array)`), protocol checks (`implementsProtocol`, `isCallable`; ownership in #118).
- Agents need a mechanical criterion: every `is…` helper of both libraries must land in exactly one tracker (#111).
- Done when the name and the criterion are written in #114.

## 62. Guards: assertion names and placement

- #114 question 6: `assertString` or `assertIsString`, derived mechanically from the guard name by the generator. Generated as committed files inside the guards module, or only in the root and `assert` barrels (#116 question 3).
- Also #114 question 7: a passing check should return its input (`return assertString(value)`), which `asserts` signatures cannot do; proposal: a separate `ensureString` family, maybe exposed as an `ensure` entry.
- Done when decided.

## 63. Short assertions: form and casing

- #115 questions 1–2: return the narrowed value (proposal) or an `asserts` signature; camelCase (`notNull`) or a lowercase exception.
- Must stay consistent with the proposed `ensure` family (`merge.62`).
- Done when decided and the code-style rule updated if needed.

## 64. Short assertions: set and location

- #115 questions 3 and 5: which of `notNull`, `notUndefined`, `notNullish`, `notNaN`, `notEmpty`, `notBlank`, `notZero`, `finite`; exported from `assert` (then not purely generated), the root, or both.
- Done when decided.

## 65. Dispatch: name and module

- #113 questions 1 and 3: `overload`, `dispatch`, `byType`, `typeSwitch`, `polymorphic`; in the `function` module (#105)?
- Done when decided.

## 66. Dispatch: function trap

- #113 question 2: functions go to `object`, get a `function` trap, or a grouping trap (`container`) like `nullish`.
- Done when decided.

## 67. Dispatch: introspection

- #113 question 5: expose the traps (to extend later) or stay opaque.
- Done when decided.

## 68. Barrels: final generation design

- #110 questions 1 (whole files or marker blocks), 2 (committed with a check mode: recommended), 4 (first version without metadata) and 6 (where the check runs). Interim mechanism: `merge.6`.
- Done when decided and written into AUAUST/lib-js-codegen#8 where it applies.

## 69. Metadata: declaration form and flags

- #116 questions 1 (exported `defineMacro` object, JSDoc tags, or manifest) and 2 (`index`, `assertion`, `parser`, `alias`: which for the merge). Agents write this in every helper file, so it must be fixed before the first module even if generation comes later (`merge.7`).
- Done when the form and flags are decided.

## 70. Metadata: generated output layout

- #116 questions 3 (generated assertions as committed files or only in barrels) and 4 (how a re-export-only module such as `assert` is declared and enforced).
- Done when decided.

## 71. Tests: porting primitive-kit tests

- primitive-kit has 205 test files. `AGENTS.md` asks for the minimum tests needed; a migration may need parity. Options: port and adapt every case, use them as a reference for edge cases only, or write new minimal tests. Also whether a coverage threshold applies.
- Done when the rule is in the playbook.

## 72. Documentation: `@behavior` tag during the migration

- Proposed: a custom JSDoc tag giving the minimal behaviour an agent needs to decide whether to use a helper, usually one line (`@behavior Equivalent to Array.prototype.map`), read by the generated agent skill (`documentation.2`). The JSDoc rules for the migration are otherwise settled (#103).
- Done when it is decided whether migration agents write the tag now, with its wording rule, or it is added later.

## 73. Documentation: migration guide for primitive-kit users

- A primitive-kit → toolkit mapping (name, subpath, behaviour change) would help dependents and could be derived from the trackers' rows. Related: `documentation.1`.
- Done when it is decided whether the guide exists, where, and whether it is generated.

## 74. Dependents: freeze and deprecation

- #112 questions 1 and 3: final primitive-kit release pointing to toolkit, `@deprecated` JSDoc per export, `npm deprecate` (a manual public action).
- Done when decided.

## 75. Dependents: migration timing

- #112 question 2: migrate each dependent as its modules land, or all at the end. Engrenage is affected twice: it imports primitive-kit and toolkit's dropped per-helper subpaths (`engrenage.4`).
- Done when decided.
