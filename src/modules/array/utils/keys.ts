import type { Maybe } from "#types/Maybe";

/**
 * Returns an iterator over the indexes of an array, holes included, as with
 * `Array.prototype.keys`. A nullish array returns `undefined`.
 *
 * @native equal Array.prototype.keys
 */
export function keys(array: readonly unknown[]): ArrayIterator<number>;
export function keys(
  array: Maybe<readonly unknown[]>,
): ArrayIterator<number> | undefined;
export function keys(
  array: Maybe<readonly unknown[]>,
): ArrayIterator<number> | undefined {
  return array?.keys();
}
