import { orderScalars } from "#modules/general/internals/orderScalars";

/**
 * Options of `diamond` and `diamondBy`.
 */
export interface DiamondOptions {
  /**
   * Negates the result.
   */
  readonly reverse?: boolean;
}

/**
 * Compares two values three ways, as `<=>`: `-1` when `compare(left, "<", right)`,
 * `1` when `compare(left, ">", right)`, otherwise `0`. Objects compare by their
 * `valueOf`, numbers and bigints together, strings by code units; unordered,
 * nullish and non-scalar operands give `0`. Never throws.
 */
export function diamond(
  left: unknown,
  right: unknown,
  options?: DiamondOptions,
): -1 | 0 | 1 {
  const order = orderScalars(left, right);

  if (!order) {
    return 0;
  }

  return options?.reverse ? (order === 1 ? -1 : 1) : order;
}
