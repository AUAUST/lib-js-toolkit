import { AssertionError } from "#errors/AssertionError";

/**
 * Throws an `AssertionError` unless the candidate is null; narrows it in place.
 */
export function assertNull(
  candidate: unknown,
  message = "Expected null.",
): asserts candidate is null {
  if (candidate !== null) {
    throw new AssertionError(message);
  }
}
