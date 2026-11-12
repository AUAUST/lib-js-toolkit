import { assertNull } from "#modules/assert/utils/assertNull";

/** Returns the candidate when it is null; otherwise throws an `AssertionError`. */
export function ensureNull<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & null {
  assertNull(candidate, message);

  return candidate;
}
