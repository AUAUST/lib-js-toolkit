import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isSymbol } from "#modules/guard/guards/isSymbol";

/**
 * @throws {AssertionError} unless the candidate is a symbol; narrows it in place.
 */
export function assertSymbol(
  candidate: unknown,
  message?: string,
): asserts candidate is symbol {
  if (!isSymbol(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a symbol", candidate),
    );
  }
}
