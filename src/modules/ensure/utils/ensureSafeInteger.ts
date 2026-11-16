import { assertSafeInteger } from "#modules/assert/utils/assertSafeInteger";

/**
 * Returns the candidate when it is a safe integer.
 *
 * @throws {AssertionError} when the candidate is not a safe integer.
 */
export function ensureSafeInteger<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & number {
  assertSafeInteger(candidate, message);

  return candidate;
}
