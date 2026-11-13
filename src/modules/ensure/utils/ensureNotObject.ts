import { assertNotObject } from "#modules/assert/utils/assertNotObject";

/**
 * Returns the candidate when it is not an object; otherwise throws an `AssertionError`.
 */
export function ensureNotObject<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, object> {
  assertNotObject(candidate, message);

  return candidate;
}
