# @auaust/toolkit

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
