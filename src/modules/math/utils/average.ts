import { sum } from "#modules/math/utils/sum";

/**
 * Returns the arithmetic mean of `values`.
 *
 * @throws {RangeError} without values.
 */
export function average(...values: number[]): number {
  if (values.length === 0) {
    throw new RangeError("Expected at least one value.");
  }

  return sum(...values) / values.length;
}
