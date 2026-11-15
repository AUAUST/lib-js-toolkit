import { AssertionError } from "#errors/AssertionError";
import { isArrayLike } from "#modules/array/guards/isArrayLike";

/**
 * @throws {AssertionError} unless the candidate is an array-like value;
 * narrows it in place.
 */
export function assertArrayLike(
  candidate: unknown,
  message = "Expected an array-like value.",
): asserts candidate is ArrayLike<unknown> {
  if (!isArrayLike(candidate)) {
    throw new AssertionError(message);
  }
}
