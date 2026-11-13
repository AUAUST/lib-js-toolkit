import { assertPlainObject } from "#modules/assert/utils/assertPlainObject";

/**
 * Returns the candidate when it is a plain object; otherwise throws an `AssertionError`.
 */
export function ensurePlainObject<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Record<string, unknown> {
  assertPlainObject(candidate, message);

  return candidate;
}
