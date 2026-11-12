import { AssertionError } from "#errors/AssertionError";
import type { Falsy } from "#types/Falsy";

/** Throws an `AssertionError` when the condition is truthy. */
export function not(
  condition: unknown,
  message = "Expected a falsy value.",
): asserts condition is Falsy {
  if (condition) {
    throw new AssertionError(message);
  }
}
