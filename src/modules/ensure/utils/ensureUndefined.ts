import { assertUndefined } from "#modules/assert/utils/assertUndefined";

/**
 * Returns the candidate when it is undefined; otherwise throws an
 * `AssertionError`.
 */
export function ensureUndefined<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & undefined {
  assertUndefined(candidate, message);

  return candidate;
}
