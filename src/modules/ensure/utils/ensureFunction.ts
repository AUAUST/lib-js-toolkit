import { assertFunction } from "#modules/assert/utils/assertFunction";

/**
 * Returns the candidate when it is a function; otherwise throws an
 * `AssertionError`.
 */
export function ensureFunction<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & ((...args: unknown[]) => unknown) {
  assertFunction(candidate, message);

  return candidate;
}
