import { flag } from "#modules/general/utils/flag";
import { shiftCounter } from "#modules/string/internals/shiftCounter";
import type { DecrementOptions } from "#modules/string/types/DecrementOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Subtracts `decrement`, 1 by default, from the trailing ASCII digits of the
 * string, keeping a zero counter; a string without one counts as zero. The counter
 * keeps its width, padded to `pad` with `filler`; arithmetic is exact past 2^53.
 * A number is the `decrement` shorthand. A nullish string returns `undefined`.
 *
 * @throws {RangeError} when `decrement` is not a safe integer or the counter
 * would go below zero.
 */
export function decrement(
  string: string,
  options?: DecrementOptions | number,
): string;
export function decrement(
  string: null | undefined,
  options?: DecrementOptions | number,
): undefined;
export function decrement(
  string: Maybe<string>,
  options?: DecrementOptions | number,
): string | undefined;
export function decrement(
  string: Maybe<string>,
  options?: DecrementOptions | number,
): string | undefined {
  if (string == null) {
    return;
  }

  const {
    decrement: step = 1,
    ...counter
  } = flag<DecrementOptions, "decrement">(options, "decrement");

  return shiftCounter(string, -step, counter);
}
