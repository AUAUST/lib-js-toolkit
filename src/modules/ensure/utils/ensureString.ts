import { assertString } from "#modules/assert/utils/assertString";

/**
 * Returns the candidate when it is a string; otherwise throws an `AssertionError`.
 */
export function ensureString<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & string {
  assertString(candidate, message);

  return candidate;
}
