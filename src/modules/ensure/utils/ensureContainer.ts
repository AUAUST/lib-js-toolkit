import { assertContainer } from "#modules/assert/utils/assertContainer";

/**
 * Returns the candidate when it is an object or a function; otherwise throws an
 * `AssertionError`.
 */
export function ensureContainer<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & object {
  assertContainer(candidate, message);

  return candidate;
}
