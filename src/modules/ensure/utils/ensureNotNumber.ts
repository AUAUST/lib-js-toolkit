import { assertNotNumber } from "#modules/assert/utils/assertNotNumber";

/**
 * Returns the candidate when it is not a number.
 *
 * @throws {AssertionError} when the candidate is a number.
 */
export function ensureNotNumber<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, number> {
  assertNotNumber(candidate, message);

  return candidate;
}
