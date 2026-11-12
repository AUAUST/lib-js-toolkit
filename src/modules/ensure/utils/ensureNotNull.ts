import { assertNotNull } from "#modules/assert/utils/assertNotNull";

/** Returns the candidate when it is not null; otherwise throws an `AssertionError`. */
export function ensureNotNull<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, null> {
  assertNotNull(candidate, message);

  return candidate;
}
