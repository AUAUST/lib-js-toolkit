import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isInteger } from "#modules/number/guards/isInteger";

/**
 * @throws {AssertionError} unless the candidate is an integer; narrows
 * it in place.
 */
export function assertInteger(
  candidate: unknown,
  message?: string,
): asserts candidate is number {
  if (!isInteger(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected an integer", candidate),
    );
  }
}
