import { AssertionError } from "#errors/AssertionError";
import { isBlankString } from "#modules/string/guards/isBlankString";
import type { BlankString } from "#types/BlankString";

/**
 * @throws {AssertionError} unless the candidate is a string whose `trim()` is
 * `""`; narrows it in place.
 */
export function assertBlankString(
  candidate: unknown,
  message = "Expected a blank string.",
): asserts candidate is BlankString {
  if (!isBlankString(candidate)) {
    throw new AssertionError(message);
  }
}
