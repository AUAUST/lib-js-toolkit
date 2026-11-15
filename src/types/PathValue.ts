import type { PropertyValue } from "#types/PropertyValue";

/**
 * The value at the end of a path of keys: `undefined` once a key is missing,
 * `unknown` for a path that is not a tuple.
 */
export type PathValue<
  Target,
  Keys extends readonly PropertyKey[],
> = Keys extends readonly [
  infer Head extends PropertyKey,
  ...infer Rest extends readonly PropertyKey[],
]
  ? PathValue<PropertyValue<Target, Head, undefined>, Rest>
  : Keys extends readonly []
    ? Target
    : unknown;
