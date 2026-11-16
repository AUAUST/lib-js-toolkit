import { valueOf } from "#modules/general/utils/valueOf";
import { isScalar } from "#modules/guard/guards/isScalar";

/**
 * Orders two values by their primitive values with the relational operators:
 * `-1` when `left < right`, `1` when `left > right`, `0` when `left <= right`
 * otherwise, and `undefined` when they are unordered, nullish or not scalars.
 */
export function orderScalars(
  left: unknown,
  right: unknown,
): -1 | 0 | 1 | undefined {
  if (left == null || right == null) {
    return;
  }

  const leftValue = valueOf(left);
  const rightValue = valueOf(right);

  if (!isScalar(leftValue) || !isScalar(rightValue)) {
    return;
  }

  if (leftValue < rightValue) {
    return -1;
  }

  if (leftValue > rightValue) {
    return 1;
  }

  return leftValue <= rightValue ? 0 : undefined;
}
