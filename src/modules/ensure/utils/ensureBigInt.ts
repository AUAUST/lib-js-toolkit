import { assertBigInt } from "#modules/assert/utils/assertBigInt";

/** Returns the candidate when it is a bigint; otherwise throws an `AssertionError`. */
export function ensureBigInt<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & bigint {
  assertBigInt(candidate, message);

  return candidate;
}
