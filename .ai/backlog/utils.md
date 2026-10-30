# Utils

## 1. No automated check for missing native helpers

- Nothing flags a native method (for example `String.prototype.charAt`) that no helper covers. Missing helpers themselves are listed in AUAUST/lib-js-toolkit#117. Inspecting globals at runtime would tie the list to one runtime.
- Proposal: derive the canonical method list from TypeScript's `lib` declarations for a chosen set of ECMAScript versions (the interfaces such as `String`, `Array`, `Map`), and compare it with the helpers. The versions follow the runtime baseline (AUAUST/lib-js-toolkit#106); reading declarations may reuse the AST tooling of AUAUST/lib-js-codegen#13.
- Outcome: a script with a check mode, run in CI, reporting uncovered methods (with a way to mark deliberate omissions).
- Done when CI reports native methods without a helper, or obsolete if the module discussions (AUAUST/lib-js-toolkit#111) decide helpers do not mirror native APIs.

## 2. Nullish passthrough in helpers wrapping native methods

- AUAUST/lib-js-toolkit#109 settled that such helpers do not coerce (`upper(value: string)`). Proposed exception: call through optional chaining (`value?.toUpperCase()`), so `null` and `undefined` pass through, chains only fail on invalid values, and nullish checks happen once at the boundary.
- Trade-off: a nullish value travelling through a chain hides where it first appeared, which makes failures harder to trace. Return types and overloads would also have to carry `null | undefined`.
- Outcome: decide in #109 whether, and for which helpers, nullish passthrough applies.
- Done when #109 records the decision.

## 3. Polyfill and native feature detection strategy

- Helpers should prefer native methods (`RegExp.escape`, `Map` `getOrInsert`/`getOrInsertComputed`) over reimplementations, but availability varies across runtimes.
- Proposal: individual polyfill entry points that check at runtime whether the native method exists before installing it. This conflicts with AUAUST/lib-js-toolkit#106, which excludes polyfills because of `sideEffects: false`; such entries would need to be explicitly listed as side-effectful.
- Outcome: one strategy (polyfill entries, call-time feature detection, hand-written fallbacks, or waiting for the baseline) decided in #106.
- Done when #106 records the strategy.

## 4. Native alias exports leave statements in bundles

- Bundling `import * as object from "@auaust/toolkit/object"` with only `object.keys` used (rolldown, current `dist/`) keeps a stray `Object.hasOwn;` statement, from `export const hasOwn = Object.hasOwn as HasOwn` in `src/modules/object/hasOwn.ts`. Other `Object.*` aliases are removed. The cause is unverified.
- Outcome: find why the alias survives and make native alias exports fully removable.
- Done when an unused alias leaves no code in a bundle.

## 5. Guard for "number and not `NaN`"

- Deferred from the naming conventions: combined checks are named once the basic principles are settled. It may also stay two checks (`isNumber` and `isNotNaN`). Candidates were `isValidNumber`, with the negation `isNotNumberOrNaN`; "valid" must not become a remembered qualifier like `loose`.
- Done when it is decided whether the combined guard exists, and its name.

## 6. `json` module

- Proposed: a `json` module wrapping the native `JSON` with toolkit-style signatures, never a custom parser. `JSON.stringify(value, null, 2)` becomes `json.stringify(value, 2)` or `json.stringify(value, { space, replacer })`; the name (`stringify`, `toJSON`, `toJson`) follows `.claude/rules/naming.md`.
- Higher-level helpers such as sorted serialization, so objects with the same keys serialize identically: stable input for `md5`, consistent files.
- Stays isomorphic: no filesystem access. Parsing with comments needs a library, only allowed under the optional dependency policy (`utils.7`).
- Done when the module and its helper list are added to the module list (AUAUST/lib-js-toolkit#111), or dropped.

## 7. Optional dependency policy

- Toolkit stays lean and fully tree-shakable. A helper may rely on a library (for example `json` parsing with comments, `utils.6`) only if the library is loaded solely when that helper is used: importing its module, even as a namespace, without calling the helper never loads or bundles it. The helper stays synchronous: if a dynamic `import()` making it asynchronous is the only way, the library is not added.
- Open: the entry point structure and dependency declaration (optional peer dependency?) meeting this, and how a helper fails at runtime when its dependency is missing.
- Without such a pattern, the library is dropped: the helper is implemented in toolkit, copied with credits (as `md5`), or left out of scope for consumers to use the library directly.
- Done when a pattern is found and written as a rule, or toolkit records that it has no runtime dependencies.
