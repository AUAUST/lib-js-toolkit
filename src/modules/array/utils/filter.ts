import { readIterable } from "#modules/array/internals/readIterable";
import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import type { BivariantTypeGuard } from "#types/BivariantTypeGuard";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records so `memberValue` accepts any property key; the overloads hold the real contract.

/**
 * Keeps the items of an array the predicate accepts, in a new array; the
 * predicate receives each item with its index, and a type predicate narrows
 * the result. A property name instead keeps the items whose member is truthy,
 * calling it when it is a method; a union item type accepts only a name every
 * member has. Any other iterable but a string is copied once first. A nullish
 * iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable, or the
 * predicate is neither a function nor a property key.
 * @native equal Array.prototype.filter
 */
export function filter<
  Items extends readonly unknown[],
  Output extends Items[number],
>(
  iterable: Items,
  predicate: (value: NoInfer<Items[number]>, index: number) => value is Output,
): Output[];
export function filter<Items extends readonly unknown[], Guarded>(
  iterable: Items,
  predicate: BivariantTypeGuard<Guarded>,
): Extract<Items[number], Guarded>[];
export function filter<Items extends readonly unknown[]>(
  iterable: Items,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): Items[number][];
export function filter<Item, Output extends Item>(
  iterable: Iterable<Item> & object,
  predicate: (value: NoInfer<Item>, index: number) => value is Output,
): Output[];
export function filter<Item, Guarded>(
  iterable: Iterable<Item> & object,
  predicate: BivariantTypeGuard<Guarded>,
): Extract<Item, Guarded>[];
export function filter<Item>(
  iterable: Iterable<Item> & object,
  predicate: ((value: Item, index: number) => unknown) | keyof Item,
): Item[];
export function filter<
  Items extends readonly unknown[],
  Output extends Items[number],
>(
  iterable: Maybe<Items>,
  predicate: (value: NoInfer<Items[number]>, index: number) => value is Output,
): Output[] | undefined;
export function filter<Items extends readonly unknown[], Guarded>(
  iterable: Maybe<Items>,
  predicate: BivariantTypeGuard<Guarded>,
): Extract<Items[number], Guarded>[] | undefined;
export function filter<Items extends readonly unknown[]>(
  iterable: Maybe<Items>,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): Items[number][] | undefined;
export function filter<Item, Output extends Item>(
  iterable: Maybe<Iterable<Item> & object>,
  predicate: (value: NoInfer<Item>, index: number) => value is Output,
): Output[] | undefined;
export function filter<Item, Guarded>(
  iterable: Maybe<Iterable<Item> & object>,
  predicate: BivariantTypeGuard<Guarded>,
): Extract<Item, Guarded>[] | undefined;
export function filter<Item>(
  iterable: Maybe<Iterable<Item> & object>,
  predicate: ((value: Item, index: number) => unknown) | keyof Item,
): Item[] | undefined;
export function filter(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>> & object>,
  predicate: ((value: unknown, index: number) => unknown) | PropertyKey,
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  const array = readIterable(iterable);

  if (isFunction(predicate)) {
    return array.filter(predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return array.filter((value) => memberValue(value, predicate));
}
