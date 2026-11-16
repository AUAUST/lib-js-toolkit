import { assertAsyncFunction } from "#modules/assert/utils/assertAsyncFunction";
import type { AsyncFn } from "#types/AsyncFn";

/**
 * Returns the candidate when it is an async function.
 *
 * @throws {AssertionError} when the candidate is not an async function.
 */
export function ensureAsyncFunction<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & AsyncFn {
  assertAsyncFunction(candidate, message);

  return candidate;
}
