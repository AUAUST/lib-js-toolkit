import { assertAsyncFunction } from "#modules/assert/utils/assertAsyncFunction";
import type { AsyncFn } from "#types/AsyncFn";

/**
 * Returns the candidate when it is an async function; otherwise throws an
 * `AssertionError`.
 */
export function ensureAsyncFunction<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & AsyncFn {
  assertAsyncFunction(candidate, message);

  return candidate;
}
