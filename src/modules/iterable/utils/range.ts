import { isFinite } from "#modules/number/guards/isFinite";
import { isNumber } from "#modules/number/guards/isNumber";

/**
 * Lazily counts from `start`, `0` when only `end` is given, towards `end`,
 * excluded, by `step`; a negative step counts down. Returns a new single-use
 * iterator, empty when `step` points away from `end`.
 *
 * @throws {TypeError} when a bound or the step is not a number.
 * @throws {RangeError} when the step is `0` or not finite.
 * @root
 */
export function range(end: number): IteratorObject<number, undefined>;
export function range(
  start: number,
  end: number,
  step?: number,
): IteratorObject<number, undefined>;
export function range(
  startOrEnd: number,
  end?: number,
  step = 1,
): IteratorObject<number, undefined> {
  const [start, stop] = end == null ? [0, startOrEnd] : [startOrEnd, end];

  if (!isNumber(start) || !isNumber(stop) || !isNumber(step)) {
    throw new TypeError("Expected numeric bounds and step.");
  }

  if (step === 0 || !isFinite(step)) {
    throw new RangeError("Expected a finite, non-zero step.");
  }

  return ranged(start, stop, step);
}

function* ranged(
  start: number,
  end: number,
  step: number,
): Generator<number, undefined, unknown> {
  for (let value = start; step > 0 ? value < end : value > end; value += step) {
    yield value;
  }
}
