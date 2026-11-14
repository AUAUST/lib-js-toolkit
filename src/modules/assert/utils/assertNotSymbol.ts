import { AssertionError } from "#errors/AssertionError";
import { isNotSymbol } from "#modules/guard/guards/isNotSymbol";

/**
 * @throws {AssertionError} when the candidate is a symbol; removes it from the
 * candidate's type in place.
 */
export function assertNotSymbol<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not a symbol.",
): asserts candidate is Exclude<Candidate, symbol> {
  if (!isNotSymbol(candidate)) {
    throw new AssertionError(message);
  }
}
