import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isAsyncFunction } from "#modules/function/guards/isAsyncFunction";
import type { AsyncFn } from "#types/AsyncFn";

/**
 * @throws {AssertionError} unless the candidate is an async function;
 * narrows it in place.
 */
export function assertAsyncFunction(
  candidate: unknown,
  message?: string,
): asserts candidate is AsyncFn {
  if (!isAsyncFunction(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected an async function", candidate),
    );
  }
}
