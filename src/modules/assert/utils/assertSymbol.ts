import { AssertionError } from "#errors/AssertionError";
import { isSymbol } from "#modules/guard/guards/isSymbol";

/**
 * @throws {AssertionError} unless the candidate is a symbol; narrows it in place.
 */
export function assertSymbol(
  candidate: unknown,
  message = "Expected a symbol.",
): asserts candidate is symbol {
  if (!isSymbol(candidate)) {
    throw new AssertionError(message);
  }
}
