import { assertNaN } from "#modules/assert/utils/assertNaN";

/**
 * Returns the candidate when it is NaN.
 *
 * @throws {AssertionError} when the candidate is not NaN.
 */
export function ensureNaN<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & number {
  assertNaN(candidate, message);

  return candidate;
}
