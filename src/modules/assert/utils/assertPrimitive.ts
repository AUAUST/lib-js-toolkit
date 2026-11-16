import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isPrimitive } from "#modules/guard/guards/isPrimitive";
import type { Primitive } from "#types/Primitive";

/**
 * @throws {AssertionError} unless the candidate is a primitive; narrows
 * it in place.
 */
export function assertPrimitive(
  candidate: unknown,
  message?: string,
): asserts candidate is Primitive {
  if (!isPrimitive(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a primitive", candidate),
    );
  }
}
