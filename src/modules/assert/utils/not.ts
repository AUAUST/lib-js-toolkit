import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import type { Falsy } from "#types/Falsy";

/**
 * @throws {AssertionError} when the condition is truthy.
 */
export function not(
  condition: unknown,
  message?: string,
): asserts condition is Falsy {
  if (condition) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a falsy value", condition),
    );
  }
}
