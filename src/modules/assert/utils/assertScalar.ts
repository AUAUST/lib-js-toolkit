import { AssertionError } from "#errors/AssertionError";
import { isScalar } from "#modules/guard/guards/isScalar";
import type { TypeNames } from "#types/TypeNames";

/**
 * @throws {AssertionError} unless the candidate is a scalar; narrows it in place.
 */
export function assertScalar(
  candidate: unknown,
  message = "Expected a scalar.",
): asserts candidate is TypeNames["scalar"] {
  if (!isScalar(candidate)) {
    throw new AssertionError(message);
  }
}
