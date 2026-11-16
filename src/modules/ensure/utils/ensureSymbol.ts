import { assertSymbol } from "#modules/assert/utils/assertSymbol";

/**
 * Returns the candidate when it is a symbol.
 *
 * @throws {AssertionError} when the candidate is not a symbol.
 */
export function ensureSymbol<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & symbol {
  assertSymbol(candidate, message);

  return candidate;
}
