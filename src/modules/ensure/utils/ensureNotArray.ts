import { assertNotArray } from "#modules/assert/utils/assertNotArray";

/**
 * Returns the candidate when it is not an array.
 *
 * @throws {AssertionError} when the candidate is an array.
 */
export function ensureNotArray<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, readonly unknown[]> {
  assertNotArray(candidate, message);

  return candidate;
}
