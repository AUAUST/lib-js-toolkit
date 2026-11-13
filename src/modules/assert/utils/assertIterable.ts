import { AssertionError } from "#errors/AssertionError";
import { isIterable } from "#modules/iterable/guards/isIterable";

/**
 * @throws {AssertionError} unless the candidate is iterable; narrows it in place.
 */
export function assertIterable(
  candidate: unknown,
  message = "Expected an iterable.",
): asserts candidate is Iterable<unknown> {
  if (!isIterable(candidate)) {
    throw new AssertionError(message);
  }
}
