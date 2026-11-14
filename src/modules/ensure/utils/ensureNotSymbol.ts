import { assertNotSymbol } from "#modules/assert/utils/assertNotSymbol";

/**
 * Returns the candidate when it is not a symbol; otherwise throws an
 * `AssertionError`.
 */
export function ensureNotSymbol<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, symbol> {
  assertNotSymbol(candidate, message);

  return candidate;
}
