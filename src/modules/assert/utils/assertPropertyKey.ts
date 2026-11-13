import { AssertionError } from "#errors/AssertionError";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";

/**
 * Throws an `AssertionError` unless the candidate is a property key; narrows it in place.
 */
export function assertPropertyKey(
  candidate: unknown,
  message = "Expected a property key.",
): asserts candidate is PropertyKey {
  if (!isPropertyKey(candidate)) {
    throw new AssertionError(message);
  }
}
