import { AssertionError } from "#errors/AssertionError";
import { isInteger } from "#modules/number/guards/isInteger";

/**
 * @throws {AssertionError} unless the candidate is an integer; narrows it in
 * place.
 */
export function assertInteger(
  candidate: unknown,
  message = "Expected an integer.",
): asserts candidate is number {
  if (!isInteger(candidate)) {
    throw new AssertionError(message);
  }
}
