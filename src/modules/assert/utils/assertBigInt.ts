import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isBigInt } from "#modules/guard/guards/isBigInt";

/**
 * @throws {AssertionError} unless the candidate is a bigint; narrows it in place.
 */
export function assertBigInt(
  candidate: unknown,
  message?: string,
): asserts candidate is bigint {
  if (!isBigInt(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a bigint", candidate),
    );
  }
}
