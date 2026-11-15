import { AssertionError } from "#errors/AssertionError";
import { isNonEmptyString } from "#modules/string/guards/isNonEmptyString";
import type { FilledString } from "#types/FilledString";

/**
 * @throws {AssertionError} unless the candidate is a string other than `""`;
 * narrows it in place.
 */
export function assertNonEmptyString(
  candidate: unknown,
  message = "Expected a non-empty string.",
): asserts candidate is FilledString {
  if (!isNonEmptyString(candidate)) {
    throw new AssertionError(message);
  }
}
