import type { Maybe } from "#types/Maybe";

/**
 * Reverses the order of an array's items in place, as with
 * `Array.prototype.reverse`. Returns the same array. A nullish array
 * returns `undefined`.
 *
 * @native equal Array.prototype.reverse
 */
export function reverse<Item>(array: Item[]): Item[];
export function reverse<Item>(array: Maybe<Item[]>): Item[] | undefined;
export function reverse(array: Maybe<unknown[]>): unknown[] | undefined {
  return array?.reverse();
}
