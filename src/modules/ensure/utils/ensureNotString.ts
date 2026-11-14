import { assertNotString } from "#modules/assert/utils/assertNotString";

/**
 * Returns the candidate when it is not a string; otherwise throws an
 * `AssertionError`.
 */
export function ensureNotString<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, string> {
  assertNotString(candidate, message);

  return candidate;
}
