import { isInteger } from "#modules/number/guards/isInteger";

/**
 * Throws a `RangeError` when the occurrence position is not an integer.
 */
export function assertOccurrencePosition(position: number): void {
  if (!isInteger(position)) {
    throw new RangeError("An occurrence position must be an integer.");
  }
}
