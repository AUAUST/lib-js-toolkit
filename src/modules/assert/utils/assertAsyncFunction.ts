import { AssertionError } from "#errors/AssertionError";
import { isAsyncFunction } from "#modules/function/guards/isAsyncFunction";
import type { AsyncFn } from "#types/AsyncFn";

/**
 * @throws {AssertionError} unless the candidate is an async function;
 * narrows it in place.
 */
export function assertAsyncFunction(
  candidate: unknown,
  message = "Expected an async function.",
): asserts candidate is AsyncFn {
  if (!isAsyncFunction(candidate)) {
    throw new AssertionError(message);
  }
}
