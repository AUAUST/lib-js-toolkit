import { compareStringForms } from "#modules/array/internals/compareStringForms";
import { resolveComparator } from "#modules/array/internals/resolveComparator";
import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import type { Comparator } from "#modules/array/types/Comparator";
import type { SortOptions } from "#modules/array/types/SortOptions";

interface KeyedItem<Item> {
  readonly key: unknown;
  readonly item: Item;
}

/**
 * Returns the items in a new array sorted by the key each resolves to once,
 * `undefined` and `null` keys last in source order, never reaching the comparator.
 */
export function sortItemsBy<Item extends Record<PropertyKey, unknown>>(
  items: readonly Item[],
  key: PropertyKey | ((value: Item) => unknown),
  comparatorOrOptions: Comparator<unknown> | SortOptions | undefined,
  options: SortOptions | undefined,
): Item[] {
  const keyed: KeyedItem<Item>[] = [];
  const unkeyed: Item[] = [];

  for (const item of items) {
    const resolved = isFunction(key) ? key(item) : memberValue(item, key);

    if (resolved == null) {
      unkeyed.push(item);
    } else {
      keyed.push({ key: resolved, item });
    }
  }

  const comparator = (
    resolveComparator(comparatorOrOptions, options) ?? compareStringForms
  );

  keyed.sort((left, right) => {
    return comparator(left.key, right.key);
  });

  return [
    ...keyed.map(({ item }) => {
      return item;
    }),
    ...unkeyed,
  ];
}
