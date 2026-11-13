import { assertNotFunction } from "#modules/assert/utils/assertNotFunction";

/**
 * Returns the candidate when it is not a function; otherwise throws an `AssertionError`.
 */
export function ensureNotFunction<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, (...args: any[]) => any> {
  assertNotFunction(candidate, message);

  return candidate;
}
