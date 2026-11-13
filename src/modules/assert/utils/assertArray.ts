import { AssertionError } from "#errors/AssertionError";
import { isArray } from "#modules/array/guards/isArray";

/**
 * @throws {AssertionError} unless the candidate is an array; narrows it in place.
 */
export function assertArray(
  candidate: unknown,
  message = "Expected an array.",
): asserts candidate is any[] {
  if (!isArray(candidate)) {
    throw new AssertionError(message);
  }
}
