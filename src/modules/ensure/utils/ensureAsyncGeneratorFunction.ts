import { assertAsyncGeneratorFunction } from "#modules/assert/utils/assertAsyncGeneratorFunction";
import type { Fn } from "#types/Fn";

/**
 * Returns the candidate when it is an async generator function; otherwise
 * throws an `AssertionError`.
 */
export function ensureAsyncGeneratorFunction<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Fn<AsyncGenerator> {
  assertAsyncGeneratorFunction(candidate, message);

  return candidate;
}
