import { assertPrimitive } from "#modules/assert/utils/assertPrimitive";
import type { Primitive } from "#types/Primitive";

/**
 * Returns the candidate when it is a primitive.
 *
 * @throws {AssertionError} when the candidate is not a primitive.
 */
export function ensurePrimitive<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Primitive {
  assertPrimitive(candidate, message);

  return candidate;
}
