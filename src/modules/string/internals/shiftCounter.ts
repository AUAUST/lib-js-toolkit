import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import { trailingDigitsPattern } from "#modules/string/constants";
import type { CounterOptions } from "#modules/string/types/CounterOptions";

/**
 * Adds `step` to the trailing counter of `string`, or appends one after
 * `separator`, keeping the counter's width.
 *
 * @throws {RangeError} when `step` is not a safe integer or the counter
 * would go below zero.
 */
export function shiftCounter(
  string: string,
  step: number,
  { separator = "", pad = 0, filler = "0" }: CounterOptions,
): string {
  if (!isSafeInteger(step)) {
    throw new RangeError("Step must be a safe integer.");
  }

  const digits = trailingDigitsPattern.exec(string)?.[0];
  const next = BigInt(digits ?? 0) + BigInt(step);

  if (next < 0n) {
    throw new RangeError("Counter must not go below zero.");
  }

  const width = Math.max(pad || 0, digits?.length ?? 0);
  const counter = String(next).padStart(width, filler);

  return digits === undefined
    ? string + separator + counter
    : string.slice(0, -digits.length) + counter;
}
