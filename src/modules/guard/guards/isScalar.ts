import type { TypeNames } from "#types/TypeNames";

/**
 * Returns `true` for strings, booleans, numbers and bigints: the primitives
 * with value semantics.
 */
export function isScalar(candidate: unknown): candidate is TypeNames["scalar"] {
  return (
    typeof candidate === "string" ||
    typeof candidate === "number" ||
    typeof candidate === "boolean" ||
    typeof candidate === "bigint"
  );
}
