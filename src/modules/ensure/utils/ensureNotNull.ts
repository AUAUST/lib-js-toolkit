import { assertNotNull } from "#modules/assert/utils/assertNotNull";

/**
 * Returns the candidate when it is not null.
 *
 * @throws {AssertionError} when the candidate is null.
 */
export function ensureNotNull<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, null> {
  assertNotNull(candidate, message);

  return candidate;
}
