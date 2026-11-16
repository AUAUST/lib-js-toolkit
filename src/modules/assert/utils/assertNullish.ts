import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNullish } from "#modules/guard/guards/isNullish";

/**
 * @throws {AssertionError} unless the candidate is null or undefined;
 * narrows it in place.
 */
export function assertNullish(
  candidate: unknown,
  message?: string,
): asserts candidate is null | undefined {
  if (!isNullish(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected null or undefined", candidate),
    );
  }
}
