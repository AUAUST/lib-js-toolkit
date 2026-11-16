import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isPropertyComposer } from "#modules/composer/guards/isPropertyComposer";
import type { PropertyComposer } from "#modules/composer/utils/propertyComposer";

/**
 * @throws {AssertionError} unless the candidate is a property composer;
 * narrows it in place.
 */
export function assertPropertyComposer(
  candidate: unknown,
  message?: string,
): asserts candidate is PropertyComposer {
  if (!isPropertyComposer(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a property composer", candidate),
    );
  }
}
