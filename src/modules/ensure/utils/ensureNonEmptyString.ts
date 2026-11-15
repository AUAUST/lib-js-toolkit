import { assertNonEmptyString } from "#modules/assert/utils/assertNonEmptyString";
import type { NonEmptyString } from "#types/NonEmptyString";

/**
 * Returns the candidate when it is a string other than `""`; otherwise throws
 * an `AssertionError`.
 */
export function ensureNonEmptyString<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & NonEmptyString<Candidate & string> {
  assertNonEmptyString(candidate, message);

  return candidate;
}
