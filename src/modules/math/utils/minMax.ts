import { max } from "#modules/math/utils/max";
import { min } from "#modules/math/utils/min";

/**
 * Returns the smallest and largest of `values`.
 *
 * @throws {RangeError} without values.
 */
export function minMax(...values: number[]): [min: number, max: number] {
  if (values.length === 0) {
    throw new RangeError("Expected at least one value.");
  }

  return [min(...values), max(...values)];
}
