import { assertObject } from "#modules/assert/utils/assertObject";

/**
 * Returns the candidate when it is an object; otherwise throws an `AssertionError`.
 */
export function ensureObject<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & object {
  assertObject(candidate, message);

  return candidate;
}
