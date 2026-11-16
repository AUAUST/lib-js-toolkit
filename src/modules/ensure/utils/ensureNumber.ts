import { assertNumber } from "#modules/assert/utils/assertNumber";

/**
 * Returns the candidate when it is a number.
 *
 * @throws {AssertionError} when the candidate is not a number.
 */
export function ensureNumber<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & number {
  assertNumber(candidate, message);

  return candidate;
}
