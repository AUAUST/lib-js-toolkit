import type { Maybe } from "#types/Maybe";

/**
 * Removes the holes of an array in place, keeping its items in order. Returns
 * the same array. A nullish array returns `undefined`.
 */
export function collapse<Item>(array: Item[]): Item[];
export function collapse<Item>(array: Maybe<Item[]>): Item[] | undefined;
export function collapse(array: Maybe<unknown[]>): unknown[] | undefined {
  if (array == null) {
    return;
  }

  let length = 0;

  for (let index = 0; index < array.length; index++) {
    if (index in array) {
      array[length++] = array[index];
    }
  }

  array.length = length;

  return array;
}
