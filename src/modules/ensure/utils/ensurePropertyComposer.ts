import { assertPropertyComposer } from "#modules/assert/utils/assertPropertyComposer";
import type { PropertyComposer } from "#modules/composer/utils/propertyComposer";

/**
 * Returns the candidate when it is a property composer; otherwise throws an `AssertionError`.
 */
export function ensurePropertyComposer<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & PropertyComposer {
  assertPropertyComposer(candidate, message);

  return candidate;
}
