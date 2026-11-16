import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";

/**
 * @throws {AssertionError} unless the candidate is null; narrows it in place.
 */
export function assertNull(
  candidate: unknown,
  message?: string,
): asserts candidate is null {
  if (candidate !== null) {
    throw new AssertionError(
      message ?? receivedMessage("Expected null", candidate),
    );
  }
}
