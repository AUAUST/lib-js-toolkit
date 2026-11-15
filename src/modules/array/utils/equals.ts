import { sameValueZero } from "#modules/general/utils/sameValueZero";

/**
 * Tells whether two arrays have the same length and equal items at each index,
 * compared shallowly by SameValueZero so `NaN` matches `NaN` and distinct objects
 * differ; holes read as `undefined`.
 */
export function equals(
  array: readonly unknown[],
  other: readonly unknown[],
): boolean {
  if (array.length !== other.length) {
    return false;
  }

  for (const [index, element] of array.entries()) {
    if (!sameValueZero(element, other[index])) {
      return false;
    }
  }

  return true;
}
