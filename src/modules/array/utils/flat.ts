import type { Maybe } from "#types/Maybe";

/**
 * Flattens nested arrays into a new array up to `depth` levels, one by default,
 * dropping holes, as with `Array.prototype.flat`; a negative depth flattens
 * nothing. A nullish array returns `undefined`.
 *
 * @native equal Array.prototype.flat
 */
export function flat<
  Items extends readonly unknown[],
  Depth extends number = 1,
>(array: Items, depth?: Depth): FlatArray<Items, Depth>[];
export function flat<
  Items extends readonly unknown[],
  Depth extends number = 1,
>(array: Maybe<Items>, depth?: Depth): FlatArray<Items, Depth>[] | undefined;
export function flat(
  array: Maybe<readonly unknown[]>,
  depth?: number,
): unknown[] | undefined {
  return array?.flat(depth);
}
