import { sortItemsBy } from "#modules/array/internals/sortItemsBy";
import type { Comparator } from "#modules/array/types/Comparator";
import type { SortOptions } from "#modules/array/types/SortOptions";
import type { MemberValue } from "#modules/general/utils/memberValue";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records so `memberValue` accepts any property key; the overloads hold the real contract.

/**
 * Sorts an array in place by the key each item resolves to once: a property name
 * reads that member, calling it when it is a method; a callback receives each
 * item. Keys sort in ascending order of their string forms unless a comparator is
 * given; `reverse` negates the order in the same pass. Items with an `undefined`
 * or `null` key go last in source order and their keys never reach the comparator.
 * Returns the same array. A nullish array returns `undefined`.
 */
export function sortBy<Item, const Name extends keyof Item>(
  array: Item[],
  key: Name,
  comparator?: Comparator<NonNullable<MemberValue<Item, Name>>>,
  options?: SortOptions,
): Item[];
export function sortBy<Item>(
  array: Item[],
  key: keyof Item | ((value: Item) => unknown),
  options: SortOptions,
): Item[];
export function sortBy<Item, Key>(
  array: Item[],
  key: (value: Item) => Key,
  comparator?: Comparator<NonNullable<Key>>,
  options?: SortOptions,
): Item[];
export function sortBy<Item, const Name extends keyof Item>(
  array: Maybe<Item[]>,
  key: Name,
  comparator?: Comparator<NonNullable<MemberValue<Item, Name>>>,
  options?: SortOptions,
): Item[] | undefined;
export function sortBy<Item>(
  array: Maybe<Item[]>,
  key: keyof Item | ((value: Item) => unknown),
  options: SortOptions,
): Item[] | undefined;
export function sortBy<Item, Key>(
  array: Maybe<Item[]>,
  key: (value: Item) => Key,
  comparator?: Comparator<NonNullable<Key>>,
  options?: SortOptions,
): Item[] | undefined;
export function sortBy(
  array: Maybe<Record<PropertyKey, unknown>[]>,
  key: PropertyKey | ((value: Record<PropertyKey, unknown>) => unknown),
  comparatorOrOptions?: Comparator<unknown> | SortOptions,
  options?: SortOptions,
): unknown[] | undefined {
  if (array == null) {
    return;
  }

  const sorted = sortItemsBy(array, key, comparatorOrOptions, options);

  for (const [index, item] of sorted.entries()) {
    array[index] = item;
  }

  return array;
}
