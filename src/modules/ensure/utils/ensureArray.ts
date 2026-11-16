import { assertArray } from "#modules/assert/utils/assertArray";

/**
 * Returns the candidate when it is an array.
 *
 * @throws {AssertionError} when the candidate is not an array.
 */
export function ensureArray<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & any[] {
  assertArray(candidate, message);

  return candidate;
}
