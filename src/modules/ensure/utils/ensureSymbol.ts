import { assertSymbol } from "#modules/assert/utils/assertSymbol";

/** Returns the candidate when it is a symbol; otherwise throws an `AssertionError`. */
export function ensureSymbol<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & symbol {
  assertSymbol(candidate, message);

  return candidate;
}
