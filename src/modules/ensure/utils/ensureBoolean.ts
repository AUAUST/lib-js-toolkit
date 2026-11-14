import { assertBoolean } from "#modules/assert/utils/assertBoolean";

/**
 * Returns the candidate when it is a boolean; otherwise throws an
 * `AssertionError`.
 */
export function ensureBoolean<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & boolean {
  assertBoolean(candidate, message);

  return candidate;
}
