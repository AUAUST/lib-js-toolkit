/**
 * Returns `function compared`, telling whether its candidate is less than
 * `bound`, compared with `<`.
 *
 * @shorthand lt
 */
export function lessThan(
  bound: number | bigint,
): (candidate: number | bigint) => boolean {
  return function compared(candidate: number | bigint): boolean {
    return candidate < bound;
  };
}
