import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isRegisteredSymbol } from "#modules/guard/guards/isRegisteredSymbol";

/**
 * @throws {AssertionError} unless the candidate is a registered symbol;
 * narrows it in place.
 */
export function assertRegisteredSymbol(
  candidate: unknown,
  message?: string,
): asserts candidate is symbol {
  if (!isRegisteredSymbol(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a registered symbol", candidate),
    );
  }
}
