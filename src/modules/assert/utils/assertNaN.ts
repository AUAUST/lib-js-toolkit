import { AssertionError } from "#errors/AssertionError";
import { isNaN } from "#modules/number/guards/isNaN";

/** Throws an `AssertionError` unless the candidate is NaN; narrows it in place. */
export function assertNaN(
  candidate: unknown,
  message = "Expected NaN.",
): asserts candidate is number {
  if (!isNaN(candidate)) {
    throw new AssertionError(message);
  }
}
