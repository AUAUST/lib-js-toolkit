import { assertNotBigInt } from "#modules/assert/utils/assertNotBigInt";

/** Returns the candidate when it is not a bigint; otherwise throws an `AssertionError`. */
export function ensureNotBigInt<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, bigint> {
  assertNotBigInt(candidate, message);

  return candidate;
}
