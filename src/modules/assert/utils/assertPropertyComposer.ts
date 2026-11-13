import { AssertionError } from "#errors/AssertionError";
import { isPropertyComposer } from "#modules/composer/guards/isPropertyComposer";
import type { PropertyComposer } from "#modules/composer/utils/propertyComposer";

/**
 * Throws an `AssertionError` unless the candidate is a property composer; narrows it in place.
 */
export function assertPropertyComposer(
  candidate: unknown,
  message = "Expected a property composer.",
): asserts candidate is PropertyComposer {
  if (!isPropertyComposer(candidate)) {
    throw new AssertionError(message);
  }
}
