import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isAsyncGeneratorFunction } from "#modules/function/guards/isAsyncGeneratorFunction";
import type { Fn } from "#types/Fn";

/**
 * @throws {AssertionError} unless the candidate is an async generator function;
 * narrows it in place.
 */
export function assertAsyncGeneratorFunction(
  candidate: unknown,
  message?: string,
): asserts candidate is Fn<AsyncGenerator> {
  if (!isAsyncGeneratorFunction(candidate)) {
    throw new AssertionError(
      message ??
        receivedMessage("Expected an async generator function", candidate),
    );
  }
}
