import { assertNotNumber } from "#modules/assert/utils/assertNotNumber";

/**
 * Returns the candidate when it is not a number; otherwise throws an `AssertionError`.
 */
export function ensureNotNumber<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, number> {
  assertNotNumber(candidate, message);

  return candidate;
}
