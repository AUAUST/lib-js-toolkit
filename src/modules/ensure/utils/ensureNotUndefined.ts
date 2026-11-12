import { assertNotUndefined } from "#modules/assert/utils/assertNotUndefined";

/** Returns the candidate when it is not undefined; otherwise throws an `AssertionError`. */
export function ensureNotUndefined<Candidate>(
  candidate: Candidate,
  message?: string,
): Exclude<Candidate, undefined> {
  assertNotUndefined(candidate, message);

  return candidate;
}
