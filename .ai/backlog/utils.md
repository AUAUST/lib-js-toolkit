# Utils

## 1. No automated check for missing native helpers

- Nothing flags a native method (for example `String.prototype.charAt`) that no helper covers. Missing helpers themselves are listed in AUAUST/lib-js-toolkit#117. Inspecting globals at runtime would tie the list to one runtime.
- Proposal: derive the canonical method list from TypeScript's `lib` declarations for a chosen set of ECMAScript versions (the interfaces such as `String`, `Array`, `Map`), and compare it with the helpers. The versions follow the runtime baseline (AUAUST/lib-js-toolkit#106); reading declarations may reuse the AST tooling of AUAUST/lib-js-codegen#13.
- Outcome: a script with a check mode, run in CI, reporting uncovered methods (with a way to mark deliberate omissions).
- Done when CI reports native methods without a helper, or obsolete if the module discussions (AUAUST/lib-js-toolkit#111) decide helpers do not mirror native APIs.

## 2. Reusable lazy iterables

- AUAUST/lib-js-toolkit#107 recommends single-use iterators. Counter-proposal: results that read like collections (`const pairs = entries(map)`) should be reusable, so `[...pairs, ...pairs]` works, while still lazy: nothing runs until first use, then a retained buffer fills once. Genuine sequences (all integers, infinite generators) must stay uncached.
- Open points: whether operations (`map`, `filter`, `pluck`) stay separate from persistence (an explicit memoizing wrapper vs automatic retention); avoiding one retained buffer per layer in nested calls (`map(pluck(filter(…)))`); whether requiring an explicit array conversion is simpler.
- Verified: native iterators are live, not snapshots. Adding to a `Map` while iterating `map.entries()` yields the new entries, so adding one entry per step never ends. Unlike primitive-kit's eager arrays, values read later may not match the source at iteration start; the contract and JSDoc must state it.
- Outcome: the reusable variant and the live-source behaviour decided in #107.
- Done when #107's contract settles reuse and live sources.

## 3. Nullish passthrough in helpers wrapping native methods

- AUAUST/lib-js-toolkit#109 settled that such helpers do not coerce (`upper(value: string)`). Proposed exception: call through optional chaining (`value?.toUpperCase()`), so `null` and `undefined` pass through, chains only fail on invalid values, and nullish checks happen once at the boundary.
- Trade-off: a nullish value travelling through a chain hides where it first appeared, which makes failures harder to trace. Return types and overloads would also have to carry `null | undefined`.
- Outcome: decide in #109 whether, and for which helpers, nullish passthrough applies.
- Done when #109 records the decision.

## 4. Polyfill and native feature detection strategy

- Helpers should prefer native methods (`RegExp.escape`, `Map` `getOrInsert`/`getOrInsertComputed`) over reimplementations, but availability varies across runtimes.
- Proposal: individual polyfill entry points that check at runtime whether the native method exists before installing it. This conflicts with AUAUST/lib-js-toolkit#106, which excludes polyfills because of `sideEffects: false`; such entries would need to be explicitly listed as side-effectful.
- Outcome: one strategy (polyfill entries, call-time feature detection, hand-written fallbacks, or waiting for the baseline) decided in #106.
- Done when #106 records the strategy.

## 5. Native alias exports leave statements in bundles

- Bundling `import * as object from "@auaust/toolkit/object"` with only `object.keys` used (rolldown, current `dist/`) keeps a stray `Object.hasOwn;` statement, from `export const hasOwn = Object.hasOwn as HasOwn` in `src/modules/object/hasOwn.ts`. Other `Object.*` aliases are removed. The cause is unverified.
- Outcome: find why the alias survives and make native alias exports fully removable.
- Done when an unused alias leaves no code in a bundle.
