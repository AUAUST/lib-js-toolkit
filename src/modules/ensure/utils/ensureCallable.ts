import { assertCallable } from "#modules/assert/utils/assertCallable";
import type { Callee } from "#types/Callee";

/**
 * Returns the candidate when it is a callable; otherwise throws an `AssertionError`.
 */
export function ensureCallable<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Callee {
  assertCallable(candidate, message);

  return candidate;
}
