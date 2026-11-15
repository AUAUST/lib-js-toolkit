import { AssertionError } from "#errors/AssertionError";
import { isPrimitive } from "#modules/guard/guards/isPrimitive";
import type { Primitive } from "#types/Primitive";

/**
 * @throws {AssertionError} unless the candidate is a primitive; narrows it in
 * place.
 */
export function assertPrimitive(
  candidate: unknown,
  message = "Expected a primitive.",
): asserts candidate is Primitive {
  if (!isPrimitive(candidate)) {
    throw new AssertionError(message);
  }
}
