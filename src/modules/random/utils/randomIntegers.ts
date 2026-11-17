import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import { assertIntegerBounds } from "#modules/random/internals/assertIntegerBounds";
import { uint32Source } from "#modules/random/internals/uint32Source";
import { uniformInteger } from "#modules/random/internals/uniformInteger";

/**
 * Returns `count` uniform integers in [min, max], filling one buffer from
 * `crypto.getRandomValues` for many draws. Throws RangeError for unsafe bounds
 * or spans, or a `count` that is not a non-negative safe integer.
 */
export function randomIntegers(
  min: number,
  max: number,
  count: number,
): number[] {
  assertIntegerBounds(min, max);

  if (!isSafeInteger(count) || count < 0) {
    // @debt The count check and message duplicate `array.sample`; a shared non-negative count assertion would own them.
    throw new RangeError("Count must be a non-negative safe integer.");
  }

  const nextUint32 = uint32Source(count);
  const values: number[] = [];

  for (let index = 0; index < count; index++) {
    values.push(uniformInteger(min, max, nextUint32));
  }

  return values;
}
