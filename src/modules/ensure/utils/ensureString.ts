import { assertString } from "#modules/assert/utils/assertString";

/**
 * Returns the candidate when it is a string.
 *
 * @throws {AssertionError} when the candidate is not a string.
 */
export function ensureString<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & string {
  assertString(candidate, message);

  return candidate;
}
