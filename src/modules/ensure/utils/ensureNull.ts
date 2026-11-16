import { assertNull } from "#modules/assert/utils/assertNull";

/**
 * Returns the candidate when it is null.
 *
 * @throws {AssertionError} when the candidate is not null.
 */
export function ensureNull<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & null {
  assertNull(candidate, message);

  return candidate;
}
