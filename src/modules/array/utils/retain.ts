import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { hasOwn } from "#modules/object/utils/hasOwn";
import type { BivariantTypeGuard } from "#types/BivariantTypeGuard";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records so `memberValue` accepts any property key; the overloads hold the real contract.
// @debt Unlike `clear`, `retain` does not reject a non-array at runtime and would shrink any object with a `length`.

/**
 * Keeps in place the items of an array the predicate accepts, in order, and
 * returns the array; the mutating counterpart of `filter`. The predicate
 * receives each item with its index and the array, and a type predicate narrows
 * the returned array. A property name instead keeps the items whose member is
 * truthy, calling it when it is a method; a union item type accepts only a name
 * every member has. Holes are dropped without calling the predicate. A nullish
 * array returns `undefined`.
 *
 * @throws {TypeError} when the predicate is neither a function nor a property key.
 */
export function retain<Items extends unknown[], Output extends Items[number]>(
  array: Items,
  predicate: (
    value: NoInfer<Items[number]>,
    index: number,
    array: NoInfer<Items>,
  ) => value is Output,
): Output[];
export function retain<Items extends unknown[], Guarded>(
  array: Items,
  predicate: BivariantTypeGuard<Guarded>,
): Extract<Items[number], Guarded>[];
export function retain<Items extends unknown[]>(
  array: Items,
  predicate:
    | ((value: Items[number], index: number, array: Items) => unknown)
    | keyof Items[number],
): Items;
export function retain<Items extends unknown[], Output extends Items[number]>(
  array: Maybe<Items>,
  predicate: (
    value: NoInfer<Items[number]>,
    index: number,
    array: NoInfer<Items>,
  ) => value is Output,
): Output[] | undefined;
export function retain<Items extends unknown[], Guarded>(
  array: Maybe<Items>,
  predicate: BivariantTypeGuard<Guarded>,
): Extract<Items[number], Guarded>[] | undefined;
export function retain<Items extends unknown[]>(
  array: Maybe<Items>,
  predicate:
    | ((value: Items[number], index: number, array: Items) => unknown)
    | keyof Items[number],
): Items | undefined;
export function retain(
  array: Maybe<Record<PropertyKey, unknown>[]>,
  predicate:
    | ((value: unknown, index: number, array: unknown[]) => unknown)
    | PropertyKey,
): unknown[] | undefined {
  if (array == null) {
    return;
  }

  if (isFunction(predicate)) {
    return compact(array, predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return compact(array, (value) => memberValue(value, predicate));
}

function compact<Item>(
  array: Item[],
  predicate: (value: Item, index: number, array: Item[]) => unknown,
): Item[] {
  let pointer = 0;

  for (let index = 0; index < array.length; index++) {
    if (!hasOwn(array, index)) {
      continue;
    }

    const value = array[index];

    if (predicate(value, index, array)) {
      array[pointer++] = value;
    }
  }

  array.length = pointer;

  return array;
}
