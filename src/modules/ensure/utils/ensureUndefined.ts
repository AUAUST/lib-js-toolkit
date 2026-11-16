import { assertUndefined } from "#modules/assert/utils/assertUndefined";

/**
 * Returns the candidate when it is undefined.
 *
 * @throws {AssertionError} when the candidate is not undefined.
 */
export function ensureUndefined<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & undefined {
  assertUndefined(candidate, message);

  return candidate;
}
