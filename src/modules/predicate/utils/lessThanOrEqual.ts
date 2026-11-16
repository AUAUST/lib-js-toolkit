/**
 * Returns `function compared`, telling whether its candidate is less than or
 * equal to `bound`, compared with `<=`.
 *
 * @shorthand lte
 */
export function lessThanOrEqual(
  bound: number | bigint,
): (candidate: number | bigint) => boolean {
  return function compared(candidate: number | bigint): boolean {
    return candidate <= bound;
  };
}
