import { readIterable } from "#modules/array/internals/readIterable";
import { isFunction } from "#modules/function/guards/isFunction";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { filterMap as filterMapIterable } from "#modules/iterable/utils/filterMap";
import type { MemberValue } from "#modules/general/utils/memberValue";
import type { BivariantTypeGuard } from "#types/BivariantTypeGuard";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records and branches on each argument's kind only to select an overload of `iterable.filterMap`.

/**
 * Maps each item of an array into a new array, keeping the results that are
 * not `undefined`, `null` included; holes read as `undefined`. A property name
 * instead maps each item to its member, calling it when it is a method; a union
 * item type accepts only a name every member has. A leading predicate or type
 * predicate first selects the items to map, and a type predicate narrows the
 * items the mapper receives; a leading property name instead keeps the items
 * whose member is truthy, calling it when it is a method, without narrowing. The
 * predicate and the mapper receive each item with its index. Any other iterable
 * but a string is copied once first. A nullish iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable, the
 * mapper is neither a function nor a property key, or the predicate is neither
 * a function nor a property key.
 */
export function filterMap<Items extends readonly unknown[], Output>(
  iterable: Items,
  mapper: (value: Items[number], index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  iterable: Items,
  property: Name,
): Exclude<MemberValue<Items[number], Name>, undefined>[];
export function filterMap<
  Items extends readonly unknown[],
  Kept extends Items[number],
  Output,
>(
  iterable: Items,
  predicate: (value: NoInfer<Items[number]>, index: number) => value is Kept,
  mapper: (value: Kept, index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<Items extends readonly unknown[], Guarded, Output>(
  iterable: Items,
  predicate: BivariantTypeGuard<Guarded>,
  mapper: (value: Extract<Items[number], Guarded>, index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<
  Items extends readonly unknown[],
  Kept extends Items[number],
  const Name extends keyof Kept,
>(
  iterable: Items,
  predicate: (value: NoInfer<Items[number]>, index: number) => value is Kept,
  property: Name,
): Exclude<MemberValue<Kept, Name>, undefined>[];
export function filterMap<
  Items extends readonly unknown[],
  Guarded,
  const Name extends keyof Extract<Items[number], Guarded>,
>(
  iterable: Items,
  predicate: BivariantTypeGuard<Guarded>,
  property: Name,
): Exclude<MemberValue<Extract<Items[number], Guarded>, Name>, undefined>[];
export function filterMap<Items extends readonly unknown[], Output>(
  iterable: Items,
  predicate: (value: Items[number], index: number) => unknown,
  mapper: (value: Items[number], index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  iterable: Items,
  predicate: (value: Items[number], index: number) => unknown,
  property: Name,
): Exclude<MemberValue<Items[number], Name>, undefined>[];
export function filterMap<
  Items extends readonly unknown[],
  const Filter extends keyof Items[number],
  Output,
>(
  iterable: Items,
  filter: Filter,
  mapper: (value: Items[number], index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<
  Items extends readonly unknown[],
  const Filter extends keyof Items[number],
  const Name extends keyof Items[number],
>(
  iterable: Items,
  filter: Filter,
  property: Name,
): Exclude<MemberValue<Items[number], Name>, undefined>[];
export function filterMap<Item, Output>(
  iterable: Iterable<Item> & object,
  mapper: (value: Item, index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<Item, const Name extends keyof Item>(
  iterable: Iterable<Item> & object,
  property: Name,
): Exclude<MemberValue<Item, Name>, undefined>[];
export function filterMap<Item, Kept extends Item, Output>(
  iterable: Iterable<Item> & object,
  predicate: (value: NoInfer<Item>, index: number) => value is Kept,
  mapper: (value: Kept, index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<Item, Guarded, Output>(
  iterable: Iterable<Item> & object,
  predicate: BivariantTypeGuard<Guarded>,
  mapper: (value: Extract<Item, Guarded>, index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<
  Item,
  Kept extends Item,
  const Name extends keyof Kept,
>(
  iterable: Iterable<Item> & object,
  predicate: (value: NoInfer<Item>, index: number) => value is Kept,
  property: Name,
): Exclude<MemberValue<Kept, Name>, undefined>[];
export function filterMap<
  Item,
  Guarded,
  const Name extends keyof Extract<Item, Guarded>,
>(
  iterable: Iterable<Item> & object,
  predicate: BivariantTypeGuard<Guarded>,
  property: Name,
): Exclude<MemberValue<Extract<Item, Guarded>, Name>, undefined>[];
export function filterMap<Item, Output>(
  iterable: Iterable<Item> & object,
  predicate: (value: Item, index: number) => unknown,
  mapper: (value: Item, index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<Item, const Name extends keyof Item>(
  iterable: Iterable<Item> & object,
  predicate: (value: Item, index: number) => unknown,
  property: Name,
): Exclude<MemberValue<Item, Name>, undefined>[];
export function filterMap<Item, const Filter extends keyof Item, Output>(
  iterable: Iterable<Item> & object,
  filter: Filter,
  mapper: (value: Item, index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<
  Item,
  const Filter extends keyof Item,
  const Name extends keyof Item,
>(
  iterable: Iterable<Item> & object,
  filter: Filter,
  property: Name,
): Exclude<MemberValue<Item, Name>, undefined>[];
export function filterMap<Items extends readonly unknown[], Output>(
  iterable: Maybe<Items>,
  mapper: (value: Items[number], index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  iterable: Maybe<Items>,
  property: Name,
): Exclude<MemberValue<Items[number], Name>, undefined>[] | undefined;
export function filterMap<
  Items extends readonly unknown[],
  Kept extends Items[number],
  Output,
>(
  iterable: Maybe<Items>,
  predicate: (value: NoInfer<Items[number]>, index: number) => value is Kept,
  mapper: (value: Kept, index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<Items extends readonly unknown[], Guarded, Output>(
  iterable: Maybe<Items>,
  predicate: BivariantTypeGuard<Guarded>,
  mapper: (value: Extract<Items[number], Guarded>, index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<
  Items extends readonly unknown[],
  Kept extends Items[number],
  const Name extends keyof Kept,
>(
  iterable: Maybe<Items>,
  predicate: (value: NoInfer<Items[number]>, index: number) => value is Kept,
  property: Name,
): Exclude<MemberValue<Kept, Name>, undefined>[] | undefined;
export function filterMap<
  Items extends readonly unknown[],
  Guarded,
  const Name extends keyof Extract<Items[number], Guarded>,
>(
  iterable: Maybe<Items>,
  predicate: BivariantTypeGuard<Guarded>,
  property: Name,
):
  | Exclude<MemberValue<Extract<Items[number], Guarded>, Name>, undefined>[]
  | undefined;
export function filterMap<Items extends readonly unknown[], Output>(
  iterable: Maybe<Items>,
  predicate: (value: Items[number], index: number) => unknown,
  mapper: (value: Items[number], index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  iterable: Maybe<Items>,
  predicate: (value: Items[number], index: number) => unknown,
  property: Name,
): Exclude<MemberValue<Items[number], Name>, undefined>[] | undefined;
export function filterMap<
  Items extends readonly unknown[],
  const Filter extends keyof Items[number],
  Output,
>(
  iterable: Maybe<Items>,
  filter: Filter,
  mapper: (value: Items[number], index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<
  Items extends readonly unknown[],
  const Filter extends keyof Items[number],
  const Name extends keyof Items[number],
>(
  iterable: Maybe<Items>,
  filter: Filter,
  property: Name,
): Exclude<MemberValue<Items[number], Name>, undefined>[] | undefined;
export function filterMap<Item, Output>(
  iterable: Maybe<Iterable<Item> & object>,
  mapper: (value: Item, index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<Item, const Name extends keyof Item>(
  iterable: Maybe<Iterable<Item> & object>,
  property: Name,
): Exclude<MemberValue<Item, Name>, undefined>[] | undefined;
export function filterMap<Item, Kept extends Item, Output>(
  iterable: Maybe<Iterable<Item> & object>,
  predicate: (value: NoInfer<Item>, index: number) => value is Kept,
  mapper: (value: Kept, index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<Item, Guarded, Output>(
  iterable: Maybe<Iterable<Item> & object>,
  predicate: BivariantTypeGuard<Guarded>,
  mapper: (value: Extract<Item, Guarded>, index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<
  Item,
  Kept extends Item,
  const Name extends keyof Kept,
>(
  iterable: Maybe<Iterable<Item> & object>,
  predicate: (value: NoInfer<Item>, index: number) => value is Kept,
  property: Name,
): Exclude<MemberValue<Kept, Name>, undefined>[] | undefined;
export function filterMap<
  Item,
  Guarded,
  const Name extends keyof Extract<Item, Guarded>,
>(
  iterable: Maybe<Iterable<Item> & object>,
  predicate: BivariantTypeGuard<Guarded>,
  property: Name,
): Exclude<MemberValue<Extract<Item, Guarded>, Name>, undefined>[] | undefined;
export function filterMap<Item, Output>(
  iterable: Maybe<Iterable<Item> & object>,
  predicate: (value: Item, index: number) => unknown,
  mapper: (value: Item, index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<Item, const Name extends keyof Item>(
  iterable: Maybe<Iterable<Item> & object>,
  predicate: (value: Item, index: number) => unknown,
  property: Name,
): Exclude<MemberValue<Item, Name>, undefined>[] | undefined;
export function filterMap<Item, const Filter extends keyof Item, Output>(
  iterable: Maybe<Iterable<Item> & object>,
  filter: Filter,
  mapper: (value: Item, index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<
  Item,
  const Filter extends keyof Item,
  const Name extends keyof Item,
>(
  iterable: Maybe<Iterable<Item> & object>,
  filter: Filter,
  property: Name,
): Exclude<MemberValue<Item, Name>, undefined>[] | undefined;
export function filterMap(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>> & object>,
  first: ((value: unknown, index: number) => unknown) | PropertyKey,
  second?: ((value: unknown, index: number) => unknown) | PropertyKey,
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  const array: readonly Record<PropertyKey, unknown>[] = readIterable(iterable);

  if (second === undefined) {
    return Array.from(
      isPropertyKey(first)
        ? filterMapIterable(array, first)
        : filterMapIterable(array, first),
    );
  }

  if (isFunction(first)) {
    return Array.from(
      isPropertyKey(second)
        ? filterMapIterable(array, first, second)
        : filterMapIterable(array, first, second),
    );
  }

  if (!isPropertyKey(first)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return Array.from(
    isPropertyKey(second)
      ? filterMapIterable(array, first, second)
      : filterMapIterable(array, first, second),
  );
}
