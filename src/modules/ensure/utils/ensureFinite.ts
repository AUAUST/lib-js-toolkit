import { assertFinite } from "#modules/assert/utils/assertFinite";

/**
 * Returns the candidate when it is a finite number.
 *
 * @throws {AssertionError} when the candidate is not a finite number.
 */
export function ensureFinite<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & number {
  assertFinite(candidate, message);

  return candidate;
}
