import { assertNotBoolean } from "#modules/assert/utils/assertNotBoolean";

/**
 * Returns the candidate when it is not a boolean; otherwise throws an
 * `AssertionError`.
 */
export function ensureNotBoolean<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, boolean> {
  assertNotBoolean(candidate, message);

  return candidate;
}
