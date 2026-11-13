import { AssertionError } from "#errors/AssertionError";
import { isBigInt } from "#modules/guard/guards/isBigInt";

/**
 * Throws an `AssertionError` unless the candidate is a bigint; narrows it in place.
 */
export function assertBigInt(
  candidate: unknown,
  message = "Expected a bigint.",
): asserts candidate is bigint {
  if (!isBigInt(candidate)) {
    throw new AssertionError(message);
  }
}
