import { AssertionError } from "#errors/AssertionError";
import { isNumber } from "#modules/number/guards/isNumber";

/** Throws an `AssertionError` unless the candidate is a number; narrows it in place. */
export function assertNumber(
  candidate: unknown,
  message = "Expected a number.",
): asserts candidate is number {
  if (!isNumber(candidate)) {
    throw new AssertionError(message);
  }
}
