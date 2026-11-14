import { assertNotArray } from "#modules/assert/utils/assertNotArray";

/**
 * Returns the candidate when it is not an array; otherwise throws an
 * `AssertionError`.
 */
export function ensureNotArray<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, readonly unknown[]> {
  assertNotArray(candidate, message);

  return candidate;
}
