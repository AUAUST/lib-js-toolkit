import { assertNotFunction } from "#modules/assert/utils/assertNotFunction";
import type { UnknownFn } from "#types/UnknownFn";

/**
 * Returns the candidate when it is not a function; otherwise throws an
 * `AssertionError`.
 */
export function ensureNotFunction<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, UnknownFn> {
  assertNotFunction(candidate, message);

  return candidate;
}
