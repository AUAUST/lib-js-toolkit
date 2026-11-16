import { assertInteger } from "#modules/assert/utils/assertInteger";

/**
 * Returns the candidate when it is an integer.
 *
 * @throws {AssertionError} when the candidate is not an integer.
 */
export function ensureInteger<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & number {
  assertInteger(candidate, message);

  return candidate;
}
