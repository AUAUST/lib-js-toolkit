# @auaust/toolkit

## 0.7.1

### Patch Changes

- c7f4e0f: - Match oneOf candidates in constant time

## 0.7.0

### Minor Changes

- 439d717: - async.awaitAll resolves any non-array iterable to an array of its settled values; breaking: a `Map` now resolves to an array of its entries instead of `{}`
- 3b60182: - Break words on every run of characters that are neither letters, marks nor digits in splitWords and the case converters, dropping those characters
  - Remove apostrophes without breaking words in splitWords and the case converters
- 3269ff9: - Yield bare values returned by the iterable.flatMap mapper instead of throwing, strings included
  - Add iterable.flat to flatten an iterable lazily
- 388ad1d: - guard.isNotNullish, assert.assertNotNullish and ensure.ensureNotNullish narrow to `NonNullable<Candidate>`; breaking: `unknown` now narrows to `{}` instead of staying `unknown`
- 36e6cc3: - The root entry exports toCamelCase, toPascalCase, toKebabCase, toSnakeCase, toTitleCase, toDelimitedCase, toSlug with their shorthands camel, pascal, kebab, snake, title and slug, plus once, debounce, throttle, sleep and freeze
  - isSelf moves from general to object; breaking: `@auaust/toolkit/general` no longer exports isSelf, import it from `@auaust/toolkit/object` or the root

### Patch Changes

- e36a1fd: - Add array.asArray, reading any non-string iterable as an array
- adaf909: - array.map, array.flatMap, array.filter, array.filterMap, array.flat, array.pluck, array.difference, array.intersection, array.concat and array.sample accept any iterable but a string, copying it once
- 0f0636e: - array.from exposes Array.from
- ffdf0a9: - array.transform maps an array in place
- 40b1215: - Accept a property name as the leading filter of array.filterMap and iterable.filterMap
- 516369e: - object.getTag and object.hasTag read the `Object.prototype.toString` tag
- 3375cf6: - string.toSlug keeps combining marks with `unaccent: false` and normalizes slugs to NFC, so NFC and NFD input give the same slug
- 9755d69: - string.split wraps String.prototype.split, typing literal parts as a tuple
- f1fbcfa: - Add the ValueOrMaybeAsyncFn type: a value, or a function returning the value or a promise of it

## 0.6.0

### Minor Changes

- d0b01c4: - Remove the `method` parameter of `isCallable`
  - Add `isCallableMember`, `assertCallableMember` and `ensureCallableMember` to check for a callable property under a key
- bc9a967: - Rename resolveCallable to toFunction, also exported at the root
  - Rename cached, cachedAsync and memoized to cache, cacheAsync and memoize
  - Remove the CachedFn and MemoizedFn type aliases
  - Rename the functions returned by cache and cacheAsync to cached, and by memoize to memoized
  - Accept callable objects in after, apply, applyMethod, callMethod, debounce, spy and throttle
  - Rename the function returned by debounce to debounced
  - Rename the function returned by spy to spied
  - Rename the function returned by throttle to throttled
  - Update AsyncCallable and AsyncFn to require a promise result
  - Update MaybeAsyncFn to accept only functions
  - Update UnknownFn to accept any arguments
  - Update isFunction to narrow to UnknownFn
  - Rename the AsyncCallee type to MaybeAsyncCallee
- 568f688: - Remove frozen
  - Update sleep and after to reject NaN and negative delays
  - Move after, apply, applyMethod, attempt, attemptAsync, cached, cachedAsync, call, callMethod, debounce, memoized, once, resolveCallable, spy and throttle to @auaust/toolkit/function
  - Move defer and sleep to @auaust/toolkit/async
  - Move transform, transformKeys, transformValues, keyMapper, plain, readonly and expose to @auaust/toolkit/object
  - Rename mapped, mappedKeys and mappedValues to object.map, object.mapKeys and object.mapValues
  - Rename object.is to isSelf
  - Add the time module
  - Move measure, measureAsync, now and stopwatch to @auaust/toolkit/time
  - Move md5 to @auaust/toolkit/string
- f2fbb90: - Update constant and identity to infer literal types
  - Add deepEquals
  - Add pipeCompare and pipeComparator
  - Add diamond and diamondBy, the three-way comparison
  - Add numeric, a numeric comparator
  - Add the Is and UnknownFn types
- d1543f4: - Update mul to return 1 without factors
  - Add roundTo
  - Update parseBoolean to read "0" as false
  - Add randomBoolean
- 4eeb510: - Update getOrSet and getOrCreate to ignore inherited properties
  - Update has to throw on primitive targets other than null and undefined
  - Rename plain to toNullPrototype
- bca6ad2: - Fix generic object inference in mappedValues and value-only mapped calls.
  - Map every own string and symbol object key, including non-enumerables, and exclude inherited keys in mappedValues and value-only mapped calls.
- d91c9d0: - Fix `compare` throwing on the `"="` operator when exactly one side is nullish
  - Reject a `debounce` delay that is not a number (`TypeError`) or is negative (`RangeError`), like `throttle`
  - Fix `throttle` adding a non-number interval to the cooldown without coercing it
- 2c0eedd: - Remove the `method` parameter of `isFunction`
  - Add `isMethod`, `assertMethod` and `ensureMethod` to check for a function-valued property under a key
- b826ffc: - Remove isNaN, isFinite, isInteger and isSafeInteger from the math entry; import them from the guard entry or the root
  - Add the guard entry exports
  - Add isNotNull, isNotUndefined, isNotNullish, isNotBigInt, isNotSymbol, isNotObject and isNotFunction
- 8759abb: - Add the random module: random, insecureRandom, randomInteger, randomFloat
  - Remove math.random; use random.random (secure) or random.insecureRandom
  - Remove math.f16round, outside the supported runtime baseline
  - Remove Symbol.dispose and Symbol.asyncDispose from ProtocolRegistry
- 53ff7e4: - Add isNonEmptyString and isEmptyString
  - Rename the whitespace-aware EmptyString and FilledString types to BlankString and NonBlankString; EmptyString is now ""
  - Add isBlankString
  - Add randomString, replacing primitive-kit's strings/random
- b702c32: - Remove the per-helper subpath exports; import helpers from the root or from their module entry
  - Replace the `protocols` entries with a single `protocol` entry
  - Rename the `countOf` protocol symbol to `countable` and the `isEmpty` protocol symbol to `emptiable`
  - Re-export every module from the root as a namespace
  - Add the `array`, `assert`, `async`, `boolean`, `function`, `guard`, `iterable`, `maplike`, `number`, `parse`, `setlike` and `string` entries, empty for now
- a6d4282: - Move when to the when module, replacing the root when with the module namespace
  - Add createWhen
  - Add whenBigInt, whenContainer, whenNull, whenNullish, whenNumeric, whenPrimitive, whenPropertyKey, whenRegisteredSymbol, whenScalar, whenSymbol and whenUndefined
  - Add whenString, whenEmptyString, whenNonEmptyString, whenBlankString and whenBoolean
  - Add whenNumber, whenFinite, whenInteger, whenNaN and whenSafeInteger
  - Add whenFunction, whenCallable, whenConstructible, whenAsyncFunction, whenGeneratorFunction, whenAsyncGeneratorFunction, whenMethod and whenCallableMember
  - Add whenObject, whenPlainObject, whenArray, whenArrayLike, whenEmptyArray, whenNonEmptyArray and whenIterable
  - Add whenPromise, whenPromiseLike and whenPropertyComposer

### Patch Changes

- 89da56a: - Add isNonEmptyArray and isEmptyArray
  - Add first, last and at
  - Add array.keys
  - Add iterable.join and array.join
  - Add iterable.range
- 73f4718: - Add isNotArray, assertNotArray, ensureNotArray, array.toArray (alias a) and array.parseArray
- 5f38f53: - Add isArrayLike, assertArrayLike and ensureArrayLike
- 86a462b: - Add array.map
  - Add the method-name shorthand to iterable.map
  - Add array.filter
  - Add the property-name predicate to iterable.filter
  - Add iterable.filterMap and array.filterMap
  - Add iterable.flatMap and array.flatMap
  - Add iterable.pluck and array.pluck
  - Add iterable.concat and array.concat
  - Add array.forEach
- 1363794: - Add array.flat and array.fill
  - Stop treating a `flat` depth of `-1` as `Infinity`
  - Add array.collapse and array.toCollapsed, copying any iterable but a string
  - Add array.pull and array.pullBy
  - Add array.put
- da3351c: - Add array.clear
  - Add array.retain
  - Add array.overlaps
  - Add array.sortBy and array.toSortedBy
- 2a84b0b: - Add array.sort and array.toSorted, copying any iterable but a string
  - Add array.reverse and array.toReversed, copying any iterable but a string
  - Add array.isSorted
- bb19bf6: - Add array.shuffle and array.toShuffled, copying any iterable but a string
  - Add array.random
  - Add array.sample, formerly randoms
- b224fd8: - Add find, every and some to iterable and array
  - Add iterable.includes and array.includes
  - Add array.findIndex, array.findLast and array.findLastIndex
  - Add array.indexOf and array.lastIndexOf
  - Add array.equals
- aaa6697: - Add iterable.unique, array.deduplicate and array.toDeduplicated, copying any iterable but a string
  - Add difference and intersection
  - Add hasDuplicates
  - Add keyBy and groupBy
- 2fb132e: - Add async.toPromise (alias awaitable)
  - Add async.awaitAll (alias concurrent)
- 3ed1fbe: - Add isNotBoolean, assertNotBoolean, ensureNotBoolean, boolean.toBoolean (alias b) and boolean.parseBoolean
- 96634ca: - Declare the supported runtimes: Node.js 22 or later and the Widely Available Baseline of 2026-10-30
  - Keep the original stack of a `PipelineError` cause only when the cause has one
  - Add the `PropertyDescriptorInput` type and accept it in `object.defineProperty`, `object.defineProperties`, `object.create`, `DefinedProperties`, `DescriptorValue` and the property composers, so descriptor members may be explicitly `undefined`
  - Accept an explicit `undefined` for the `cached`, `memoized` and `stopwatch` options
- 1b6d474: - Fix composer types for generic key sets and keep composed keys' declarations
- d1ac4fb: - Add string.escapeRegExp
- ccc9404: - Transform function properties in value-only mapped calls.
  - Keep randomFloat results finite and within extreme finite bounds.
- 0fa19cc: - Add AssertionError
  - Add the assert entry: assert, not and one assertion per guard
  - Add the ensure entry: ensure, not, defined and one ensure helper per guard
  - Add the Falsy type
- 23796fa: - Forwarders accept a property of the target as their source
- 71519dd: - Add isAsyncFunction, isGeneratorFunction and isAsyncGeneratorFunction
  - Add isConstructible
  - Add tryCall and tryCallAsync
  - Add mapArguments and mapReturn
- 1b6d3b9: - Add deprecate
  - Add thrower
  - Add defineCallable
- c9176b9: - Add overload, dispatching a call on its first argument's type
  - Add the TypeLeaf, TypeChain and TypeLeafTypes types
- f066754: - Add flag, sameValueZero and valueOf
- 0b91bc4: - Add is, the multi-type guard
- 45d3328: - Add isPrimitive, assertPrimitive and ensurePrimitive
- 50bb6f3: - Add isScalar and isNumeric
- cb65756: - Add iterable.overlaps
- c7491a2: - Add isIterable, assertIterable, ensureIterable, iterable.map and iterable.filter
- 99ea9c0: - Add object.loosenKeys
  - Add array.loosen
  - Add assertMinLength and ensureMinLength
- 21d0e21: - Add the MapLike, ReadonlyMapLike and WritableMapLike types
  - Add maplike.getOrSet
  - Add maplike.insert
- c972ad0: - Add minMax and average
  - Add toDegrees and toRadians
- 4e741fd: - Accept primitives, arrays and unions in method-name types
  - Narrow filter and filterMap results with guards wider than the item type
  - Add the BivariantTypeGuard type
- 3f54c20: - Add iterable.memoize and the MemoizedIterable type
- e1b86ee: - Add the merger module
  - Add merger.merge, recursive; primitive-kit's shallow merge is object.assign
  - Add merger.toMerged
  - Add merger.lazyMerge
  - Add merger.merger
- 54d848c: - Add isNotNumber, assertNotNumber, ensureNotNumber, number.toNumber (alias n) and number.parseNumber
- b599ec0: - Add isEven and isOdd
  - Add isMultipleOf
  - Add isPositive, isNegative and isBetween
  - Add toFixed, toExponential, toPrecision and toLocaleString
- cb49ee0: - Add definePropertyIfUnset
  - Add hasKeys
  - Add pick and omit
  - Add object.pull
  - Add flatten
  - Add clone
  - Add getPath
  - Add toObject
- 657e19a: - Add object.insert
  - Add object.filter
  - Add object.retain
  - Add object.invert
  - Add object.fromKeys
  - Add object.isEnumerable
  - Add object.ownEnumerableKeys
- 2c43ff5: - Add object.view
- 95299fe: - Add the predicate module
  - Add negate
  - Add affirm
  - Add oneOf
  - Add allOf, anyOf and noneOf
  - Add greaterThan, greaterThanOrEqual, lessThan and lessThanOrEqual
  - Add between
  - Add hasProperty and propertyEquals
  - Add instanceOf
- e40ee72: - Add randomUint32 to the random module
- 16c941a: - Add the SetLike, ReadonlySetLike and WritableSetLike types
  - Add setlike.insert
- dd9d43b: - Fix `match` alternating results when a regular expression predicate has the `g` or `y` flag
- 10c0f69: - `compare` with `"="` compares the resolved values as strings, so `true = 1` and `0 = ""` are now `false`
  - A `debounce` call made from inside the debounced callback now runs with its own arguments instead of losing them
- fdbc276: - Add toLowerCase and toUpperCase
  - Add toLocaleLowerCase and toLocaleUpperCase
  - Add capitalize and uncapitalize; primitive-kit's decapitalize is now uncapitalize
  - Add capitalizeWords and uncapitalizeWords; primitive-kit's decapitalizeWords is now uncapitalizeWords
- cb8017b: - Add isNotString, assertNotString, ensureNotString, string.toString (alias s) and string.parseString
- 673ded4: - Add increment and decrement
  - Remove the keepZero option of decrement, padding being always kept
- 8a19e64: - Add inspect
  - Add the received value to default assertion messages
- 565ff77: - Rename ensureStart to withPrefix and ensureEnd to withSuffix
  - Stop converting and filtering the parts of concat and prepend
  - Add chunk
  - Add insert
  - Add wrap
  - Add concat and prepend
  - Add withPrefix and withSuffix
- f9f6024: - Add startsWith, endsWith and includes; primitive-kit's contains is now includes
  - Add nthIndexOf; it throws a RangeError for a non-integer position
- c65b990: - Return undefined instead of "" from after*, before* and between for a missing needle
  - Rename afterStart to removePrefix and beforeEnd to removeSuffix
  - Throw a RangeError for invalid positions
  - Add afterFirst, afterLast and afterNth
  - Add beforeFirst, beforeLast and beforeNth
  - Add removePrefix and removeSuffix
  - Add between
  - Add splitFirst, splitLast and splitNth
- e04c140: - Rename only to retain and mapReplace to replaceEach
  - Add trim, trimStart and trimEnd
  - Add padStart, padEnd and repeat
  - Add truncateStart and truncateEnd
  - Add remove
  - Add retain
  - Add replaceEach
  - Update retain to keep substring matches of a string pattern instead of treating it as a character set
  - Update replaceEach to insert replacements literally, without $ patterns
- d373617: - Add unaccent
  - Add splitWords
  - Add toCamelCase, toPascalCase, toKebabCase and toSnakeCase
  - Add toTitleCase and toDelimitedCase
  - Add toSlug
  - Rename toCustomCase to toDelimitedCase and slug to toSlug
  - Align the unaccent default on splitWords (off) in every converter except toSlug (on)
  - Drop ignoreCaps: case changes always split words, toSlug included
- 74891a1: - Document thrown errors as `@throws` tags
- dd1194e: - Fix `plain` object inference and constrain explicit type assertions to compatible partial objects
  - Return empty plain objects for primitive and nullish inputs
- 89c1afb: Remove `timestamp` from the `BUILD` export

## 0.5.1

### Patch Changes

- 2402b0a: Fix `after()` to reject its promise when a delayed callback throws synchronously instead of leaving the promise pending
- 6bfcbbb: Fix protocol declarations to preserve `DefineProtocol` references
- 579de61: Add `isPromise()` and `isPromiseLike()` guards, expose `isNaN` from the root
- 6b078f9: Fix `once()` not to be marked as called on failure
- 001fbc0: Export all utility-related types from the index
- 48208a7: Fox `mapped()`, `mappedKeys()`, and `mappedValues()` types to describe record results for arrays and omit symbols
- 579de61: Make `isNaN()`, `isFinite()` and `isInteger()` type guards

## 0.5.0

### Minor Changes

- 6c678f7: Add `cachedAsync()` with shared pending promises, synchronous fulfilled returns, and lazy, synchronous cache inspection.
- 1b51350: Add custom key resolvers to `cached()` and expose `keyFor(...args)` to resolve keys from outside.
- f0129de: Add `composer` module to fluently extend objects.
- 1bb260a: Add custom key resolvers to `memoized()` and expose `keyFor(...args)` to resolve keys from outside.
- 653bb91: `cached()` relies on a weak map for object and function keys.

### Patch Changes

- 05e5e35: Fix `proto()` to be null-safe
- 9d979e9: Add `Whitespace`, `EmptyString` and other type utilities around emptiness
- 0519e9c: Add `ownKeys()`, `ownNames()` and `ownSymbols()` object helpers
- 9d979e9: Improve type level of `empty()`
- 54d0f29: Improve type level of `filled()`
- 10698d3: Move the forwarding methods to a dedicated module

## 0.4.0

### Minor Changes

- 336aa9c: Global support for the `[callable]` protocol in callback-taking helpers.
- 3739bed: Add `object` module with several utility functions around property access, assignment, and general object manipulation.
- 42c4f98: Add `isArray`, `isString`, `isNumber`, `isBigInt`, `isBoolean`, `isUndefined`, `isNull`, `isNullish`, and non-null `isObject` type guards

### Patch Changes

- b50a76f: Add callable-related types and improve type signatures
- 23a9061: Scaffold modules entrypoints to group categories of helpers
- 97c7128: Expose meta-helpers on `throttled()` functions
- 5d0f275: `isCallable()` supports a method name
- ae190e4: Add `voided()` utility that wraps a function to void its return type
- 6796b05: Add meta-methods on `debounce()`'d functions to cancel, flush and immediately invoke.
- 352319f: Standardize generic order for call signatures and accept readonly arrays for all argument lists
- 23a9061: Add `math` module
- cdb7ee9: Add `With*` utility types to modify function signatures
- 742628a: Standardize function generics to use a single callee rather than spread arguments, result and this types
- b37a662: Add `isFunction()` sibling to `isCallable()` that ignores the callable protocol

## 0.3.0

### Minor Changes

- 36b8184: Expand `stopwatch()` with configurable start timestamps, performance-clock selection, and pause, resume, stop, and restart timelines

### Patch Changes

- 8948e90: Add `resolveCallable()` which returns a normal function from a given function or callable object
- aa2d4cc: The package's `BUILD` constant timestamp is a Date
- ae32b91: `frozen()` freezes non-plain-objects as well
- fb08896: `call()` and `apply()` are stricter with the type of `this`
- eaa4ae1: Fix `value()` call signature to reconcile unions and return all possible types
- 148afcd: Fix `measureAsync()` at the type level. Result is now the awaited type
- ae32b91: Add `ReadonlyFunction` and `Signature` utility types
- fa0692b: Add `[callable]` support to `memoized()`
- 0aba00b: Add `StateError` and throw more specific errors
- 27fbb31: Improved type level of `resolveCallable()` and add related utility types
- 57da485: Fix `readonly()` that didn't respect some `Proxy` invariants

## 0.2.5

### Patch Changes

- 070d560: Add `plain()` to return a new empty null prototype object
- e350094: Make `measure()` and `measureAsync()` `[callable]`-compatible
- 070d560: Add `frozen()` which returns a shallow, frozen copy of the object applied to a null prototype object

## 0.2.4

### Patch Changes

- e24cd7e: Expose a `@auaust/toolkit/types` entrypoint for global utility types only
- c3e993b: Add `If*` variants of `Is*` type checks that allow passing quick fallbacks
- f6d6fcd: Fix type level of method forwarders
- 14aa014: Add `NullaryMethodName` utility type
- 8482a92: Add `call()` and `apply()` which allow calling objects that implement `Callable`
- f944172: Add `isCallable()` that returns true for functions and `Callable`
- 8482a92: Define the `Callable` protocol
- 23c4fd4: Add several utility types

  - `IsNumericString`
  - `StringToNumber`
  - `ToArrayKey`
  - `ToRecordKey`

- 0f7e8a6: Use `Protocol.${name}` as the key for global protocol symbols
- 613317a: Add `memberValue()` which is the equivalent of `value()` for properties and methods
- f90278f: Add `callMethod()` and `applyMethod()` that help calling methods with the correct `this` context while supporting the `Callable` protocol
- e24cd7e: `MethodName`, `MethodParameters` and `MethodReturnType` utility types
- 91e4024: Add `Callable` support to `value()`

## 0.2.3

### Patch Changes

- 0c3e94b: List built in protocols to make `implementsProtocol()` also useful with native symbols

## 0.2.2

### Patch Changes

- e7539f0: Add an extensible protocol registry
- d5f441b: Add the `Emptiable` protocol and use is in `empty()`
- 407c3fe: Add `isContainer()` to guard values that may hold own properties
- fb12286: Add `isPlainObject()` which respects several edge cases
- 7a9bde6: `stopwatch().lap()` returns the bare duration instead of lap object
- 12bb34b: Add `Configurable` protocol, `count()` associated helper and use it for `empty()`
- a3dcc03: Switch from `tsup` tò `tsdown`
- 1f84895: Drop unused dependencies, cleanup the project's package.json
- ab5ffc0: `debounce()` returns boolean whether the call cancelled a pending execution
- a3dcc03: Expose all helpers as direct entrypoints
- 7988d3b: Add a `BUILD` object that exposes some package metadata
- d99eb24: Add `isSymbol()` and `isRegisteredSymbol()` to guard values that should be symbols
- 0a88899: `throttle()` returns boolean whether the call was throttled
- fee4807: Implement `IsLiteral` and drop `type-fest` from dev dependencies

## 0.2.1

### Patch Changes

- ef46140: Add key and value only variants of `mapped()` and `transform()`
- 116b12e: Add aliasing support to `forward()` and its related APIs
- 49774f2: Add `isPropertyKey()`
- ff69670: Drop `@auaust/primitive-kit` as all its features have been replaced by vanilla JS or implemented in `@auaust/toolkit` directly
- 70a2ecd: `stopwatch()` sister of `measure()``
- 6b90c52: `readonly()` helper to expose objects that shouldn't be externally editable

## 0.2.0

### Minor Changes

- 542779c: Expose several frequently used types

### Patch Changes

- 98f45ef: Pass value to `mapped()` and keys to `transform()`'s callbacks
- 8483a58: Implement `on()`, the cool helper
- 32c2245: Add `methodForwarder()`, method equivalent to `propertyForwarder()`
- eaa6d64: Use latest PrimitiveKit
- 0eb85a7: Add `propertyForwarders()` that maps `propertyForwarder()`
- 9531f13: Add a `propertyForwarder()` method that creates a proxy property descriptor
- 60c322c: `forward()` helper that combines the features of `forwardCalls()` and `forwardProperties()` in a more readable interface
- f86446c: Add `methodForwarders()` array version of `methodForwarder()`

## 0.1.0

### Minor Changes

- 34dc58d: Various new features and improvements.

## 0.0.9

### Patch Changes

- f3c39fa: `match()` expects the target value to be first, but also support a fully thunk-based logic without target

## 0.0.8

### Patch Changes

- fc4d542: `match()` helpers mimicks PHP's match feature, where map-likes are traversed and the value of the first matched case is returned

## 0.0.7

### Patch Changes

- a0a1942: Type level of function returned by `comparator()` supports functional operators

## 0.0.6

### Patch Changes

- a4981e3: `measure()` and `measureAsync()` helpers to measure the execution time of a callback, or to measure the time it took to resolve

## 0.0.5

### Patch Changes

- 58c1798: `compare()` function with support for basic and custom operators
- 0b55329: `mapped()` and type level improvements
- 343489c: `compare()` and `comparator()` support disabling default operators, reflects it on the type level

## 0.0.4

### Patch Changes

- c579ca6: `spy()` gracefully handles missing callbacks

## 0.0.3

### Patch Changes

- 0b6930a: All helpers forward `this` bindings to make them more convenient to use
- 9e1ec2b: Improved semantics of the `spy()`, now receiving seperate listeners for before and after hooks
- c10c7f9: Cleanup functional parameters to use `fn`, `closure` or `callback` in a deterministic manner

## 0.0.2

### Patch Changes

- 5701c10: Embed MD5 algorythm instead of depending on crypto-js

## 0.0.1

### Patch Changes

- a5c7ac5: Initial featureset with various helpers and 97% test coverage.
