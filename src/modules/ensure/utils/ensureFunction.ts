import { assertFunction } from "#modules/assert/utils/assertFunction";
import type { UnknownFn } from "#types/UnknownFn";

/**
 * Returns the candidate when it is a function; otherwise throws an
 * `AssertionError`.
 */
export function ensureFunction<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & UnknownFn {
  assertFunction(candidate, message);

  return candidate;
}
