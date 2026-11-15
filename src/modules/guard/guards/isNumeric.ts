import type { TypeNames } from "#types/TypeNames";

/**
 * Returns `true` for numbers and bigints. Numeric strings are rejected.
 */
export function isNumeric(
  candidate: unknown,
): candidate is TypeNames["numeric"] {
  const type = typeof candidate;

  return type === "number" || type === "bigint";
}
