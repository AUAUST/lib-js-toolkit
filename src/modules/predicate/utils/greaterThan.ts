/**
 * Returns `function compared`, telling whether its candidate is greater than
 * `bound`, compared with `>`.
 *
 * @shorthand gt
 */
export function greaterThan(
  bound: number | bigint,
): (candidate: number | bigint) => boolean {
  return function compared(candidate: number | bigint): boolean {
    return candidate > bound;
  };
}
