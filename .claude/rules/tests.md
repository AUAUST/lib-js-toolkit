---
paths:
  - "tests/**/*.ts"
---

# Tests

- All tests for a helper, including type assertions and inference regressions, stay in its `<name>.test.ts`. Split cross-helper work among each helper's own file.
- Cover the relevant edge cases: empty input, optional values, errors, `this` binding, argument preservation and asynchronous outcomes. Control timers deterministically and restore timers and mocks after use.

## Fixtures

- Shared inputs live in `tests/fixtures/`, one file per kind of input: `values.ts`, `objects.ts`, `callbacks.ts`. Reuse them before writing inline data; inline data is for a case only one test needs.
- Grow the fixtures as tests need them, with concretely useful data sets: string literals, tuples, mixed tuples, readonly arrays, entry-like structures, unions.
- Immutable data sets are `as const` constants so their literal types survive. Mutable values come from `create…` factories, so each test gets a fresh value.

## Types

- Every helper with a precise type asserts its results with `expectTypeOf` or `assertType`, for each input shape it distinguishes:

| Input            | Expected result                         | Example                                      |
| ---------------- | --------------------------------------- | -------------------------------------------- |
| Literal          | Literal                                 | `upper("foo")` is `"FOO"`                    |
| Union            | Each member transformed individually    | `upper(value as "a" \| "b")` is `"A" \| "B"` |
| Wide             | Wide                                    | `upper(value as string)` is `string`         |
| Tuple            | Tuple, element by element               | `map([1, "a"] as const, …)` keeps 2 slots    |
| Readonly         | Accepted; a returned copy is writable   | `toSorted(readonlyArray)` is `T[]`           |
| Out of precision | Wide type, never an approximate literal | `replace(literal, regex, "")` is `string`    |

- Numbers and booleans keep only the literals a helper passes through or maps trivially: `min(1, 2, 3)` is `1 | 2 | 3`, while `sum(1, 2)` is `number`.
- Guards and emptiness checks assert narrowing on both branches: `empty(0)` is `false`, `empty([])` is `true`.
