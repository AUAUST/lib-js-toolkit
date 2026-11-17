import { isSafeInteger } from "#modules/number/guards/isSafeInteger";

export function assertIntegerBounds(min: number, max: number): void {
  if (
    !isSafeInteger(min) ||
    !isSafeInteger(max) ||
    min > max ||
    max - min > Number.MAX_SAFE_INTEGER
  ) {
    throw new RangeError(
      "Bounds must be safe integers with an ordered safe span.",
    );
  }
}
