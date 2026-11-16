import { assertIterable } from "#modules/assert/utils/assertIterable";

/**
 * Returns the candidate when it is iterable.
 *
 * @throws {AssertionError} when the candidate is not iterable.
 */
export function ensureIterable<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Iterable<unknown> {
  assertIterable(candidate, message);

  return candidate;
}
