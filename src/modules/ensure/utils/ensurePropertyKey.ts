import { assertPropertyKey } from "#modules/assert/utils/assertPropertyKey";

/**
 * Returns the candidate when it is a property key.
 *
 * @throws {AssertionError} when the candidate is not a property key.
 */
export function ensurePropertyKey<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & PropertyKey {
  assertPropertyKey(candidate, message);

  return candidate;
}
