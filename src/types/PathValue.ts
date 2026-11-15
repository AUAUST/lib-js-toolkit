import type { PropertyValue } from "#types/PropertyValue";

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
