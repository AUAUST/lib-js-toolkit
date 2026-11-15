import { AssertionError } from "#errors/AssertionError";
import { isNotFunction } from "#modules/function/guards/isNotFunction";
import type { UnknownFn } from "#types/UnknownFn";

/**
 * @throws {AssertionError} when the candidate is a function; removes it from the
 * candidate's type in place.
 */
export function assertNotFunction<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not a function.",
): asserts candidate is Exclude<Candidate, UnknownFn> {
  if (!isNotFunction(candidate)) {
    throw new AssertionError(message);
  }
}
