import { assertNotBigInt } from "#modules/assert/utils/assertNotBigInt";

/**
 * Returns the candidate when it is not a bigint.
 *
 * @throws {AssertionError} when the candidate is a bigint.
 */
export function ensureNotBigInt<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, bigint> {
  assertNotBigInt(candidate, message);

  return candidate;
}
