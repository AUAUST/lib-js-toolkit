import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNumber } from "#modules/number/guards/isNumber";

/**
 * @throws {AssertionError} unless the candidate is a number; narrows it in place.
 */
export function assertNumber(
  candidate: unknown,
  message?: string,
): asserts candidate is number {
  if (!isNumber(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a number", candidate),
    );
  }
}
