import { assertPrimitive } from "#modules/assert/utils/assertPrimitive";
import type { Primitive } from "#types/Primitive";

/**
 * Returns the candidate when it is a primitive; otherwise throws an
 * `AssertionError`.
 */
export function ensurePrimitive<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Primitive {
  assertPrimitive(candidate, message);

  return candidate;
}
