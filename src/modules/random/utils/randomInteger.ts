import { assertIntegerBounds } from "#modules/random/internals/assertIntegerBounds";
import { uniformInteger } from "#modules/random/internals/uniformInteger";
import { randomUint32 } from "#modules/random/utils/randomUint32";

/**
 * Returns a uniform integer in [min, max]. Throws RangeError for unsafe
 * bounds or spans. Draws from the host's cryptographically secure generator
 * (`crypto.getRandomValues`), with no guarantee beyond the host's.
 */
export function randomInteger(min: number, max: number): number {
  assertIntegerBounds(min, max);

  return uniformInteger(min, max, randomUint32);
}
