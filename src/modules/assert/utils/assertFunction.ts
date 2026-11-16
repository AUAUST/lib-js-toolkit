import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isFunction } from "#modules/function/guards/isFunction";
import type { UnknownFn } from "#types/UnknownFn";

/**
 * @throws {AssertionError} unless the candidate is a function; narrows
 * it in place.
 */
export function assertFunction(
  candidate: unknown,
  message?: string,
): asserts candidate is UnknownFn {
  if (!isFunction(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a function", candidate),
    );
  }
}
