import { AssertionError } from "#errors/AssertionError";
import { isRegisteredSymbol } from "#modules/guard/guards/isRegisteredSymbol";

/** Throws an `AssertionError` unless the candidate is a registered symbol; narrows it in place. */
export function assertRegisteredSymbol(
  candidate: unknown,
  message = "Expected a registered symbol.",
): asserts candidate is symbol {
  if (!isRegisteredSymbol(candidate)) {
    throw new AssertionError(message);
  }
}
