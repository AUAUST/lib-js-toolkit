import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isSafeInteger } from "#modules/number/guards/isSafeInteger";

/**
 * @throws {AssertionError} unless the candidate is a safe integer;
 * narrows it in place.
 */
export function assertSafeInteger(
  candidate: unknown,
  message?: string,
): asserts candidate is number {
  if (!isSafeInteger(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a safe integer", candidate),
    );
  }
}
