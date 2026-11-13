import { AssertionError } from "#errors/AssertionError";
import { isSafeInteger } from "#modules/number/guards/isSafeInteger";

/**
 * @throws {AssertionError} unless the candidate is a safe integer; narrows it in place.
 */
export function assertSafeInteger(
  candidate: unknown,
  message = "Expected a safe integer.",
): asserts candidate is number {
  if (!isSafeInteger(candidate)) {
    throw new AssertionError(message);
  }
}
