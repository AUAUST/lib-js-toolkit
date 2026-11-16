import { copyIterable } from "#modules/array/internals/copyIterable";
import { sortItemsBy } from "#modules/array/internals/sortItemsBy";
import type { Comparator } from "#modules/array/types/Comparator";
import type { SortOptions } from "#modules/array/types/SortOptions";
import type { MemberValue } from "#modules/general/utils/memberValue";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records so `memberValue` accepts any property key; the overloads hold the real contract.

/**
 * Copies any iterable but a string once into a new array sorted by the
 * key each item resolves to once, as `sortBy` sorts. A nullish iterable
 * returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable.
 */
export function toSortedBy<Item, const Name extends keyof Item>(
  iterable: Iterable<Item> & object,
  key: Name,
  comparator?: Comparator<NonNullable<MemberValue<Item, Name>>>,
  options?: SortOptions,
): Item[];
export function toSortedBy<Item>(
  iterable: Iterable<Item> & object,
  key: keyof Item | ((value: Item) => unknown),
  options: SortOptions,
): Item[];
export function toSortedBy<Item, Key>(
  iterable: Iterable<Item> & object,
  key: (value: Item) => Key,
  comparator?: Comparator<NonNullable<Key>>,
  options?: SortOptions,
): Item[];
export function toSortedBy<Item, const Name extends keyof Item>(
  iterable: Maybe<Iterable<Item> & object>,
  key: Name,
  comparator?: Comparator<NonNullable<MemberValue<Item, Name>>>,
  options?: SortOptions,
): Item[] | undefined;
export function toSortedBy<Item>(
  iterable: Maybe<Iterable<Item> & object>,
  key: keyof Item | ((value: Item) => unknown),
  options: SortOptions,
): Item[] | undefined;
export function toSortedBy<Item, Key>(
  iterable: Maybe<Iterable<Item> & object>,
  key: (value: Item) => Key,
  comparator?: Comparator<NonNullable<Key>>,
  options?: SortOptions,
): Item[] | undefined;
export function toSortedBy(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>> & object>,
  key: PropertyKey | ((value: Record<PropertyKey, unknown>) => unknown),
  comparatorOrOptions?: Comparator<unknown> | SortOptions,
  options?: SortOptions,
): unknown[] | undefined {
  if (iterable != null) {
    // @debt `copyIterable` copies the iterable only to validate it before `sortItemsBy` copies it again into keyed entries; validating without copying would save a pass.
    return sortItemsBy(
      copyIterable(iterable),
      key,
      comparatorOrOptions,
      options,
    );
  }
}
