import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";

/**
 * @throws {AssertionError} unless the candidate is a property key;
 * narrows it in place.
 */
export function assertPropertyKey(
  candidate: unknown,
  message?: string,
): asserts candidate is PropertyKey {
  if (!isPropertyKey(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a property key", candidate),
    );
  }
}
