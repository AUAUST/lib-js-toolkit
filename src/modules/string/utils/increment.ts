import { flag } from "#modules/general/utils/flag";
import { shiftCounter } from "#modules/string/internals/shiftCounter";
import type { IncrementOptions } from "#modules/string/types/IncrementOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Adds `increment`, 1 by default, to the trailing ASCII digits of the string, or
 * appends the counter after `separator` when the string has none. The counter
 * keeps its width, padded to `pad` with `filler`; arithmetic is exact past 2^53.
 * A number is the `increment` shorthand. Nullish input is returned as is.
 *
 * @throws {RangeError} when `increment` is not a safe integer or the counter
 * would go below zero.
 */
export function increment(
  string: string,
  options?: IncrementOptions | number,
): string;
export function increment<Value extends null | undefined>(
  string: Value,
  options?: IncrementOptions | number,
): Value;
export function increment(
  string: Maybe<string>,
  options?: IncrementOptions | number,
): Maybe<string>;
export function increment(
  string: Maybe<string>,
  options?: IncrementOptions | number,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const {
    increment: step = 1,
    ...counter
  } = flag<IncrementOptions, "increment">(options, "increment");

  return shiftCounter(string, step, counter);
}
