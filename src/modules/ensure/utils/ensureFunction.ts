import { assertFunction } from "#modules/assert/utils/assertFunction";
import type { UnknownFn } from "#types/UnknownFn";

/**
 * Returns the candidate when it is a function.
 *
 * @throws {AssertionError} when the candidate is not a function.
 */
export function ensureFunction<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & UnknownFn {
  assertFunction(candidate, message);

  return candidate;
}
