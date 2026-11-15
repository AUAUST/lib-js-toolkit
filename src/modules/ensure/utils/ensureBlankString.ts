import { assertBlankString } from "#modules/assert/utils/assertBlankString";
import type { BlankString } from "#types/BlankString";

/**
 * Returns the candidate when it is a string whose `trim()` is `""`; otherwise
 * throws an `AssertionError`.
 */
export function ensureBlankString<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & BlankString {
  assertBlankString(candidate, message);

  return candidate;
}
