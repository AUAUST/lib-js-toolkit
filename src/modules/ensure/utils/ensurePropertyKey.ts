import { assertPropertyKey } from "#modules/assert/utils/assertPropertyKey";

/**
 * Returns the candidate when it is a property key; otherwise throws an
 * `AssertionError`.
 */
export function ensurePropertyKey<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & PropertyKey {
  assertPropertyKey(candidate, message);

  return candidate;
}
