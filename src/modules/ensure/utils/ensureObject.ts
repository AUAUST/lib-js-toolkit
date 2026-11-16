import { assertObject } from "#modules/assert/utils/assertObject";

/**
 * Returns the candidate when it is an object.
 *
 * @throws {AssertionError} when the candidate is not an object.
 */
export function ensureObject<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & object {
  assertObject(candidate, message);

  return candidate;
}
