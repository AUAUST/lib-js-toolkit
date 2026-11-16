/**
 * Returns `function compared`, telling whether its candidate is greater than or
 * equal to `bound`, compared with `>=`.
 *
 * @shorthand gte
 */
export function greaterThanOrEqual(
  bound: number | bigint,
): (candidate: number | bigint) => boolean {
  return function compared(candidate: number | bigint): boolean {
    return candidate >= bound;
  };
}
