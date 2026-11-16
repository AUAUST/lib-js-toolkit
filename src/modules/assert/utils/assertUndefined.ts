import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";

/**
 * @throws {AssertionError} unless the candidate is undefined; narrows it in place.
 */
export function assertUndefined(
  candidate: unknown,
  message?: string,
): asserts candidate is undefined {
  if (candidate !== undefined) {
    throw new AssertionError(
      message ?? receivedMessage("Expected undefined", candidate),
    );
  }
}
