import { AssertionError } from "#errors/AssertionError";
import { isEmptyString } from "#modules/string/guards/isEmptyString";
import type { EmptyString } from "#types/EmptyString";

/**
 * @throws {AssertionError} unless the candidate is `""`; narrows it in place.
 */
export function assertEmptyString(
  candidate: unknown,
  message = "Expected an empty string.",
): asserts candidate is EmptyString {
  if (!isEmptyString(candidate)) {
    throw new AssertionError(message);
  }
}
