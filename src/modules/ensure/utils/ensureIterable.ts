import { assertIterable } from "#modules/assert/utils/assertIterable";

/**
 * Returns the candidate when it is iterable; otherwise throws an `AssertionError`.
 */
export function ensureIterable<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Iterable<unknown> {
  assertIterable(candidate, message);

  return candidate;
}
