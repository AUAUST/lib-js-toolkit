import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isBoolean } from "#modules/boolean/guards/isBoolean";

/**
 * @throws {AssertionError} unless the candidate is a boolean; narrows it in place.
 */
export function assertBoolean(
  candidate: unknown,
  message?: string,
): asserts candidate is boolean {
  if (!isBoolean(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a boolean", candidate),
    );
  }
}
