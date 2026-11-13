import { AssertionError } from "#errors/AssertionError";
import { isString } from "#modules/string/guards/isString";

/**
 * Throws an `AssertionError` unless the candidate is a string; narrows it in place.
 */
export function assertString(
  candidate: unknown,
  message = "Expected a string.",
): asserts candidate is string {
  if (!isString(candidate)) {
    throw new AssertionError(message);
  }
}
