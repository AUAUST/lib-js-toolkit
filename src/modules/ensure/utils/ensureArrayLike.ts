import { assertArrayLike } from "#modules/assert/utils/assertArrayLike";

/**
 * Returns the candidate when it is an array-like value; otherwise throws
 * an `AssertionError`.
 */
export function ensureArrayLike<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & ArrayLike<unknown> {
  assertArrayLike(candidate, message);

  return candidate;
}
