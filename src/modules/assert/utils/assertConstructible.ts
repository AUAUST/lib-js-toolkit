import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isConstructible } from "#modules/function/guards/isConstructible";
import type { Constructor } from "#types/Constructor";

/**
 * @throws {AssertionError} unless the candidate is a constructor; narrows
 * it in place.
 */
export function assertConstructible(
  candidate: unknown,
  message?: string,
): asserts candidate is Constructor {
  if (!isConstructible(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a constructor", candidate),
    );
  }
}
