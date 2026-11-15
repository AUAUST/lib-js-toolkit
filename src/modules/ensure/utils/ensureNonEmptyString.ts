import { assertNonEmptyString } from "#modules/assert/utils/assertNonEmptyString";
import type { FilledString } from "#types/FilledString";

/**
 * Returns the candidate when it is a string other than `""`; otherwise throws an
 * `AssertionError`.
 */
export function ensureNonEmptyString<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & FilledString {
  assertNonEmptyString(candidate, message);

  return candidate;
}
