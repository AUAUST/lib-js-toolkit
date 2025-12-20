# @auaust/toolkit

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
