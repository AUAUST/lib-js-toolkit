# Debt

Intake queue of `@debt` markers in the code, grouped by kind. Markers stay in the code until their fix lands. An entry is removed once a backlog entry or GitHub issue tracks it, or once its fix lands.

## 1. Predicate overloads of `every` lose or misstate the narrowing

- `src/modules/array/utils/every.ts:8`: nullish-accepting array drops the type-predicate overload.
- `src/modules/iterable/utils/every.ts:12`: nullish-accepting source drops the type-predicate overload.
- `src/modules/iterable/utils/every.ts:10`: predicate narrows the source although a consumed single-use iterator has nothing left.
- why: a type predicate cannot return `undefined`; the iterable form narrows a value that a consumed iterator no longer yields.
- done: both `every` families state their predicate overload per source kind, with the nullish and single-use cases decided.

## 2. Forwarder implementation signatures type the source as `any`

- `src/modules/forwarder/utils/forwardMethods.ts:64`
- `src/modules/forwarder/utils/forwardProperties.ts:57`
- `src/modules/forwarder/utils/methodForwarder.ts:150`
- `src/modules/forwarder/utils/methodForwarders.ts:92`
- `src/modules/forwarder/utils/propertyForwarder.ts:195`
- `src/modules/forwarder/utils/propertyForwarders.ts:98`
- why: no overload accepts an `object | PropertyKey` source, so the implementation falls back to `any`.
- want: an internal factory taking that union, shared by the overloads and the plural forms.
- done: no forwarder implementation signature uses `any`.

## 3. Keyer overload of `flatten` types its target as `Record<string, any>`

- `src/modules/object/utils/flatten.ts:24`
- why: `object` reportedly infers `never` here, so `any` loosens the contract.
- done: the target type has no `any` and the keyer overload keeps its inference.

## 4. Iterable validation and copying repeat across array and object helpers

- `src/modules/array/internals/copyIterable.ts:5`: callers of a plain `object` get `unknown[]`; `Iterable<Item>` would keep the item type.
- `src/modules/object/utils/fromKeys.ts:16` (further): repeats the non-string iterable check of `copyIterable`.
- `src/modules/array/utils/toSortedBy.ts:58`: copies the iterable only to validate it, then `sortItemsBy` copies it again.
- why: the check and the copy live in two places, and validation copies before sorting.
- want: one shared iterable helper owning the check; validation without a copy.
- done: `copyIterable` keeps the item type for plain objects and `toSortedBy` copies once.

## 5. Guard helpers need casts or `Extract` to narrow generic predicates

- `src/modules/ensure/utils/not.ts:18`: a guard's `false` branch does not narrow a generic `Candidate`, hence a cast.
- `src/modules/assert/utils/assertMinLength.ts:19`: `Extract` only makes TypeScript accept the readonly predicate as assignable.
- done: both narrow without a cast or `Extract`, or the limit is documented as accepted.

## 6. `ObjectEntry<object>` resolves to `never` in `awaitAll`

- `src/modules/async/utils/awaitAll.ts:58`: the annotation widens an unsound `never[]` instead of typing a non-literal object's entries.
- done: `entries` types the non-literal object and the annotation is gone.

## 7. Type definitions repeat lib and sibling type tables

- `src/modules/iterable/utils/flat.ts:5`: depth-decrement tuple duplicates the lib's `FlatArray` table.
- `src/types/NullaryMethodName.ts:3`: per-member check duplicates the one in `MethodName` with another function shape.
- why: each table or check exists twice and can drift.
- want: a shared depth-decrement type; a shared helper type for the member check.
- done: each table or check has one definition.

## 8. `roundTo` leaks floating-point artifacts

- `src/modules/math/utils/roundTo.ts:14`: `roundTo(0.3, 0.1)` returns `0.30000000000000004`.
- why: the rounding does not check the result of the scaled arithmetic.
- done: `roundTo(0.3, 0.1)` returns `0.3`. The approach (decimal scaling or string-based rounding) needs a decision first (planning).

## 9. `debounce` overflows delays above the timer maximum

- `src/modules/function/utils/debounce.ts:66`: delays above 2^31 - 1 ms, `Infinity` included, fire almost at once, while `throttle` honours them.
- further: `src/modules/function/utils/after.ts:22` uses `setTimeout` with a caller delay; not checked for the same overflow.
- why: `setTimeout` clamps delays above its maximum to 1 ms.
- done: long delays wait as requested in `debounce` and `after`, or throw. Choosing between the two needs a decision first (planning).

## 10. Delays and durations use native coercion instead of `toNumber`

- `src/modules/function/internals/toDelay.ts:10`
- `src/modules/time/utils/stopwatch.ts:146`
- why: `number` already provides `toNumber`, and these helpers coerce natively.
- want: use the `number` module's `toNumber` converter.
- done: neither file coerces with a native conversion.

## 11. `String()` conversion differs from the native `ToString` the helpers mirror

- `src/modules/general/utils/compare.ts:152`: `String()` throws on objects without `toString` or `Symbol.toPrimitive`, null-prototype objects included.
- `src/modules/iterable/utils/join.ts:6`: `String` converts a symbol where `Array.prototype.join` throws.
- further: `src/modules/iterable/utils/join.ts:53`, `src/modules/iterable/internals/toKeyer.ts:14`, `src/modules/array/internals/compareStringForms.ts:6`, `src/modules/object/utils/keyMapper.ts:66` use `String()` too; not checked for the same defect.
- why: the helpers do not define one string conversion.
- want: one shared converter with the native `ToString` semantics the helpers mirror.
- done: the converter is the only conversion used, with the throw and symbol cases decided.

## 12. `pipeCompare` compares with `===` while `deepEquals` uses `sameValueZero`

- `src/modules/general/utils/pipeCompare.ts:4`: transforms yielding `NaN` never match.
- done: `NaN` matches, or the difference is documented as the contract.

## 13. `comparator` name clashes with the sort comparator vocabulary

- `src/modules/general/utils/comparator.ts:7`: returns a boolean `compare` bound to custom operators, while `array`'s `Comparator` type and `numeric` use the word for a sort comparator.
- done: the name is decided and applied (naming decision, planning).

## 14. Match-argument resolution trusts overloads for case shapes

- `src/modules/general/internals/resolveMatchArguments.ts:18`
- `src/modules/general/internals/resolveMatchArguments.ts:22`
- why: the cases' shape is not validated at runtime.
- done: the shape is validated under the validation policy of `utils.9`, or the trust is documented.

## 15. Lint rules force workarounds in helper internals

- `src/modules/array/utils/forEach.ts:15`: `unicorn/no-for-each` flags the native call the helper wraps, so it goes through `call`.
- `src/modules/general/internals/matchesPredicate.ts:20`: reimplements `String#search` because `unicorn/prefer-regexp-test` rejects it for existence checks.
- why: the lint config has no exemption for helpers that wrap the flagged call.
- want: a file-scoped lint exemption for these helpers (configuration change, to be reported with its reason).
- done: the workarounds are removed or the exemption is decided.

## 16. Hand-rolled assertions differ from the `assert` helpers' `AssertionError`

- `src/modules/object/utils/readonly.ts:58`: hand-rolls `assertContainer`.
- `src/modules/string/utils/md5.ts:17`: hand-rolls `assertString`.
- why: adopting the helpers throws `AssertionError` (still a `TypeError`), an observable change.
- done: both use the assertion helpers, with the change recorded in a changeset, or the difference is accepted (decision, planning).

## 17. `inspect` detects promises by `then` and marks them handled

- `src/modules/string/internals/inspectLeaf.ts:99`: `then` is the only brand check for promises; it reads `constructor` and marks a rejected promise as handled.
- done: promise detection has a brand check that does not read or mark the promise.

## 18. `inspectPrimitive` fallback in `inspect` is unreachable

- `src/modules/string/utils/inspect.ts:43`: `inspectPrimitive` returns `undefined` only for objects, which its type does not carry.
- done: the type carries the object case, or the fallback is removed.

## 19. Property forwarder has no stated contract for nullish sources and failed writes

- `src/modules/forwarder/utils/propertyForwarder.ts:270`: the nullish-source `TypeError` is the engine's implicit one; `methodGetter` in `methodForwarder` checks the source explicitly and boxes primitives through `toObject`.
- `src/modules/forwarder/utils/propertyForwarder.ts:276`: a failed write is discarded silently, like the object-source setter.
- why: no contract says whether the getter should check the source or the setter should throw.
- done: the error and failed-write policy is stated and both forwarders follow it (decision, planning).

## 20. Barrel tag metadata is read inside toolkit instead of engrenage

- `tooling/barrels/operations/readJsdocTags.ts:21`: shorthands and barrel metadata are read through the TypeScript compiler API inside toolkit. Cites engrenage #438, which is closed; check whether the closure lets this move.
- `tooling/barrels/operations/readJsdocTags.ts:22`: each caller reads and parses `file` again.
- `tooling/tags/utils/root.ts:3`: `tooling/barrels` reads this tag through its own name literal.
- `tooling/tags/utils/shorthand.ts:3`: same name literal.
- why: the tag name and its reading are defined in two places and parsed per caller.
- want: the barrels extension owns and contributes the tag declaration, with one parse of the file.
- done: one definition holds each tag name and the file is parsed once.

## 21. Tooling sets an explicit tsconfig for an engrenage gap

- `engrenage.config.ts:129`: needed because engrenage writes no tsconfig for tooling while the scripts environment is inactive. Cites engrenage #521, which is closed; check whether the setting can be dropped.
- done: the explicit tsconfig is removed or the gap is confirmed open.
