import { assertNonEmptyString } from "#modules/assert/utils/assertNonEmptyString";
import type { NonEmptyString } from "#types/NonEmptyString";

/**
 * Returns the candidate when it is a string other than `""`.
 *
 * @throws {AssertionError} when the candidate is not a string other than `""`.
 */
export function ensureNonEmptyString<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & NonEmptyString<Candidate & string> {
  assertNonEmptyString(candidate, message);

  return candidate;
}
