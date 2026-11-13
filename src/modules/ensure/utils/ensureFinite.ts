import { assertFinite } from "#modules/assert/utils/assertFinite";

/**
 * Returns the candidate when it is a finite number; otherwise throws an `AssertionError`.
 */
export function ensureFinite<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & number {
  assertFinite(candidate, message);

  return candidate;
}
