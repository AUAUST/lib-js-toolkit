import { AssertionError } from "#errors/AssertionError";
import { isNotBigInt } from "#modules/guard/guards/isNotBigInt";

/**
 * @throws {AssertionError} when the candidate is a bigint; removes it from the
 * candidate's type in place.
 */
export function assertNotBigInt<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not a bigint.",
): asserts candidate is Exclude<Candidate, bigint> {
  if (!isNotBigInt(candidate)) {
    throw new AssertionError(message);
  }
}
