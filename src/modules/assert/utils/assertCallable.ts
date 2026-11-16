import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isCallable } from "#modules/function/guards/isCallable";
import type { Callee } from "#types/Callee";

/**
 * @throws {AssertionError} unless the candidate is a callable; narrows
 * it in place.
 */
export function assertCallable(
  candidate: unknown,
  message?: string,
): asserts candidate is Callee {
  if (!isCallable(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a callable", candidate),
    );
  }
}
