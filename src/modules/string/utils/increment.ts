import { flag } from "#modules/general/utils/flag";
import { shiftCounter } from "#modules/string/internals/shiftCounter";
import type { IncrementOptions } from "#modules/string/types/IncrementOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Adds `increment`, 1 by default, to the trailing ASCII digits of the string, or
 * appends the counter after `separator` when the string has none. The counter
 * keeps its width, padded to `pad` with `filler`; arithmetic is exact past 2^53.
 * A number is the `increment` shorthand. A nullish string returns `undefined`.
 *
 * @throws {RangeError} when `increment` is not a safe integer or the counter
 * would go below zero.
 */
export function increment(
  string: string,
  options?: IncrementOptions | number,
): string;
export function increment(
  string: null | undefined,
  options?: IncrementOptions | number,
): undefined;
export function increment(
  string: Maybe<string>,
  options?: IncrementOptions | number,
): string | undefined;
export function increment(
  string: Maybe<string>,
  options?: IncrementOptions | number,
): string | undefined {
  if (string == null) {
    return;
  }

  const {
    increment: step = 1,
    ...counter
  } = flag<IncrementOptions, "increment">(options, "increment");

  return shiftCounter(string, step, counter);
}
