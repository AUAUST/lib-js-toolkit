import { assertNotUndefined } from "#modules/assert/utils/assertNotUndefined";

/**
 * Returns the candidate when it is not undefined.
 *
 * @throws {AssertionError} when the candidate is undefined.
 */
export function ensureNotUndefined<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, undefined> {
  assertNotUndefined(candidate, message);

  return candidate;
}
