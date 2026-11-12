import { assertSafeInteger } from "#modules/assert/utils/assertSafeInteger";

/** Returns the candidate when it is a safe integer; otherwise throws an `AssertionError`. */
export function ensureSafeInteger<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & number {
  assertSafeInteger(candidate, message);

  return candidate;
}
