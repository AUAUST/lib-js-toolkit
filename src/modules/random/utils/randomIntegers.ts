import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import { assertIntegerBounds } from "#modules/random/internals/assertIntegerBounds";
import { uint32Source } from "#modules/random/internals/uint32Source";
import { uint32sPerInteger } from "#modules/random/internals/uint32sPerInteger";
import { uniformInteger } from "#modules/random/internals/uniformInteger";

/**
 * Returns `count` uniform integers in [min, max], filling a buffer from
 * `crypto.getRandomValues` with the words the remaining draws need.
 *
 * @throws {RangeError} for unsafe bounds or spans, or a `count` that is not a
 * non-negative safe integer.
 */
export function randomIntegers(
  min: number,
  max: number,
  count: number,
): number[] {
  assertIntegerBounds(min, max);

  if (!isSafeInteger(count) || count < 0) {
    // @debt The count check and message duplicate `array.sample` and `general.count`; a shared non-negative count assertion would own them (backlog utils.10).
    throw new RangeError("Count must be a non-negative safe integer.");
  }

  const uint32s = uint32sPerInteger(min, max);
  const values: number[] = [];
  const nextUint32 = uint32Source(() => (count - values.length) * uint32s);

  for (let index = 0; index < count; index++) {
    values.push(uniformInteger(min, max, nextUint32));
  }

  return values;
}
