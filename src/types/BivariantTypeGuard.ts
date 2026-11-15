/**
 * A type predicate accepting any value, checked bivariantly so a guard over a
 * type wider or narrower than the items, such as `isString` over `1 | "a"`, is
 * assignable where items are filtered.
 */
export type BivariantTypeGuard<Guarded> = {
  check(value: unknown, index: number): value is Guarded;
}["check"];
