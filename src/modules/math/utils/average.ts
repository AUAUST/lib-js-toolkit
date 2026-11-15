import { sum } from "#modules/math/utils/sum";

/**
 * Returns the arithmetic mean of `values`.
 *
 * @throws {RangeError} When called without values.
 */
export function average(...values: number[]): number {
  if (values.length === 0) {
    throw new RangeError("average requires at least one value.");
  }

  return sum(...values) / values.length;
}
