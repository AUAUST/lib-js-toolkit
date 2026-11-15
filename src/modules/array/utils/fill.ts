import type { Maybe } from "#types/Maybe";

/**
 * Sets every index of an array from `start` to `end`, exclusive, to the value in
 * place, negative indices counted from the end, as with `Array.prototype.fill`.
 * Returns the same array. A nullish array returns `undefined`.
 *
 * @native equal Array.prototype.fill
 */
export function fill<Item>(
  array: Item[],
  value: NoInfer<Item>,
  start?: number,
  end?: number,
): Item[];
export function fill<Item>(
  array: Maybe<Item[]>,
  value: NoInfer<Item>,
  start?: number,
  end?: number,
): Item[] | undefined;
export function fill(
  array: Maybe<unknown[]>,
  value: unknown,
  start?: number,
  end?: number,
): unknown[] | undefined {
  return array?.fill(value, start, end);
}
