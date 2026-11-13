import { assertInteger } from "#modules/assert/utils/assertInteger";

/**
 * Returns the candidate when it is an integer; otherwise throws an `AssertionError`.
 */
export function ensureInteger<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & number {
  assertInteger(candidate, message);

  return candidate;
}
