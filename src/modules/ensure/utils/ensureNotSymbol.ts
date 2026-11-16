import { assertNotSymbol } from "#modules/assert/utils/assertNotSymbol";

/**
 * Returns the candidate when it is not a symbol.
 *
 * @throws {AssertionError} when the candidate is a symbol.
 */
export function ensureNotSymbol<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, symbol> {
  assertNotSymbol(candidate, message);

  return candidate;
}
