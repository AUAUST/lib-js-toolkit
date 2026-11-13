import { assertNumber } from "#modules/assert/utils/assertNumber";

/**
 * Returns the candidate when it is a number; otherwise throws an `AssertionError`.
 */
export function ensureNumber<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & number {
  assertNumber(candidate, message);

  return candidate;
}
