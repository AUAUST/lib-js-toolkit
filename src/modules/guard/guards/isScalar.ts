import type { TypeNames } from "#types/TypeNames";

/**
 * Returns `true` for strings, booleans, numbers and bigints: the primitives
 * with value semantics.
 */
export function isScalar(candidate: unknown): candidate is TypeNames["scalar"] {
  const type = typeof candidate;

  return (
    type === "string" ||
    type === "number" ||
    type === "boolean" ||
    type === "bigint"
  );
}
