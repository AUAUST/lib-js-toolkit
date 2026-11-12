import { assertRegisteredSymbol } from "#modules/assert/utils/assertRegisteredSymbol";

/** Returns the candidate when it is a registered symbol; otherwise throws an `AssertionError`. */
export function ensureRegisteredSymbol<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & symbol {
  assertRegisteredSymbol(candidate, message);

  return candidate;
}
