import { assertArrayLike } from "#modules/assert/utils/assertArrayLike";

/**
 * Returns the candidate when it is an array-like value.
 *
 * @throws {AssertionError} when the candidate is not an array-like value.
 */
export function ensureArrayLike<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & ArrayLike<unknown> {
  assertArrayLike(candidate, message);

  return candidate;
}
