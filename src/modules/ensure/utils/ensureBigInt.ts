import { assertBigInt } from "#modules/assert/utils/assertBigInt";

/**
 * Returns the candidate when it is a bigint.
 *
 * @throws {AssertionError} when the candidate is not a bigint.
 */
export function ensureBigInt<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & bigint {
  assertBigInt(candidate, message);

  return candidate;
}
