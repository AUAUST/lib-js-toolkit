# Utils

## 1. No automated check for missing native helpers

- Nothing flags a native method (for example `String.prototype.charAt`) that no helper covers. Missing helpers themselves are listed in AUAUST/lib-js-toolkit#117. Inspecting globals at runtime would tie the list to one runtime.
- Proposal: derive the canonical method list from TypeScript's `lib` declarations for a chosen set of ECMAScript versions (the interfaces such as `String`, `Array`, `Map`), and compare it with the helpers. The versions follow the runtime baseline (AUAUST/lib-js-toolkit#106); reading declarations may reuse the AST tooling of AUAUST/lib-js-codegen#13.
- Outcome: a script with a check mode, run in CI, reporting uncovered methods (with a way to mark deliberate omissions).
- Done when CI reports native methods without a helper, or obsolete if the module discussions (AUAUST/lib-js-toolkit#111) decide helpers do not mirror native APIs.

## 2. Native alias exports leave statements in bundles

- Bundling `import * as object from "@auaust/toolkit/object"` with only `object.keys` used (rolldown, current `dist/`) keeps a stray `Object.hasOwn;` statement, from `export const hasOwn = Object.hasOwn as HasOwn` in `src/modules/object/hasOwn.ts`. Other `Object.*` aliases are removed. The cause is unverified.
- Outcome: find why the alias survives and make native alias exports fully removable.
- Done when an unused alias leaves no code in a bundle.

## 3. `json` module

- Proposed: a `json` module wrapping the native `JSON` with toolkit-style signatures, never a custom parser. `JSON.stringify(value, null, 2)` becomes `json.stringify(value, 2)` or `json.stringify(value, { space, replacer })`; the name (`stringify`, `toJSON`, `toJson`) follows `.claude/rules/naming.md`.
- Higher-level helpers such as sorted serialization, so objects with the same keys serialize identically: stable input for `md5`, consistent files.
- Stays isomorphic: no filesystem access. Parsing with comments needs a library, only allowed under the optional dependency policy (`utils.4`).
- Done when the module and its helper list are added to the module list (AUAUST/lib-js-toolkit#111), or dropped.

## 4. Optional dependency policy

- Toolkit stays lean and fully tree-shakable. A helper may rely on a library (for example `json` parsing with comments, `utils.3`) only if the library is loaded solely when that helper is used: importing its module, even as a namespace, without calling the helper never loads or bundles it. The helper stays synchronous: if a dynamic `import()` making it asynchronous is the only way, the library is not added.
- Open: the entry point structure and dependency declaration (optional peer dependency?) meeting this, and how a helper fails at runtime when its dependency is missing.
- Without such a pattern, the library is dropped: the helper is implemented in toolkit, copied with credits (as `md5`), or left out of scope for consumers to use the library directly.
- Done when a pattern is found and written as a rule, or toolkit records that it has no runtime dependencies.

## 5. Centralized error messages (lang)

- AUAUST/lib-js-toolkit#119 proposed a `lang` directory of type-checked message keys, a builder resolving a `message` argument as a key or raw text, optional translations injected without being bundled, a keys-only opt-out, and possibly a public translator. Deferred on 2026-10-31: inline English messages are not a problem today (#119 question 1 settled the error classes).
- Outcome: decide whether centralizing messages pays for itself (bundle size, consistency, translations) once toolkit has enough thrown errors to compare.
- Done when #119's questions 2 to 6 are settled, or obsolete if inline messages are kept for good.

## 6. Boolean conversion protocol

- AUAUST/lib-js-toolkit#143 dropped conversion protocols for now: `toString` and `toNumber` rely on `Symbol.toPrimitive`, `toArray` on `Symbol.iterator`, and `toBoolean` is a strict `!!value`, so it can never read a protocol.
- If a value needs to choose how it is interpreted as a boolean, the candidate is a `booleanifiable` protocol read by `parseBoolean` only (#118 conventions: symbol `booleanifiable`, interface `Booleanifiable`, key `Protocol.booleanifiable`).
- Done when a concrete use case adds it, or obsolete if none appears by the end of the merge.

