# Scratchpad

<!-- scratchpad-placeholder -->

- `tap()` should be documented
- `now()` should be exposed from the root
- `expose()` has no place in the `object` module: it's a general "set on globalThis" helper, nothing object-specific
- `splitFirst` and all other string operators that have reasonable ways to support that should be strongly typed; i.e. `splitFirst("foo,bar", ",")` is typed as `["foo", "bar"]`, not the generic `[string, string | undefined]`; this also means that `undefined` must be removed when we know the substring exists at compile time `splitFirst(str as `@auaust/${string}`)` should type `["@auaust", string]`
- Might consider a validated iterator wrapper? i.e. takes an iterator and a predicate and throws on the first value that returns false. Creates a lazily validated sequence, also useful for arrays through a light wrapper with `Array.from`
  - For parity, would create the same for objects
  - Similar semantics as `filter` on both sides
  - Consider a `ValidationError`? Or does it fall under simple assertions? i.e. "iterable.assert(it, isBoolean)"
    - `assertAll` or `assertEach` in the `assert` module might make sense as well? kind of in-between
