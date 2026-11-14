import { assertNotNullish } from "#modules/assert/utils/assertNotNullish";

/**
 * Returns the candidate when it is not null or undefined; otherwise throws an
 * `AssertionError`.
 */
export function ensureNotNullish<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, null | undefined> {
  assertNotNullish(candidate, message);

  return candidate;
}
