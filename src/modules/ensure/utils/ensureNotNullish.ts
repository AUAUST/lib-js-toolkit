import { assertNotNullish } from "#modules/assert/utils/assertNotNullish";

/**
 * Returns the candidate when it is not null or undefined.
 *
 * @throws {AssertionError} when the candidate is null or undefined.
 */
export function ensureNotNullish<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, null | undefined> {
  assertNotNullish(candidate, message);

  return candidate;
}
