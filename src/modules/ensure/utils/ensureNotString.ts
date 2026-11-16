import { assertNotString } from "#modules/assert/utils/assertNotString";

/**
 * Returns the candidate when it is not a string.
 *
 * @throws {AssertionError} when the candidate is a string.
 */
export function ensureNotString<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, string> {
  assertNotString(candidate, message);

  return candidate;
}
