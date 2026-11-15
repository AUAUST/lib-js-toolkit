import { isFunction } from "#modules/function/guards/isFunction";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { filterMap as filterMapIterable } from "#modules/iterable/utils/filterMap";
import type { MemberValue } from "#modules/general/utils/memberValue";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records and branches on each argument's kind only to select an overload of `iterable.filterMap`.

// @debt `MemberValue` rejects primitives, so each overload reads members through `Pick<Item, keyof Item>`.

// @debt A type predicate guarding a type wider than a literal item union, such as `isString` over `1 | "a"`, fails inference instead of narrowing to the matching members.

/**
 * Maps each item of an array into a new array, keeping the results that are
 * not `undefined`, `null` included; holes read as `undefined`. A property name
 * instead maps each item to its member, calling it when it is a method; a union
 * item type accepts only a name every member has. A leading predicate or type
 * predicate first selects the items to map, and a type predicate narrows the
 * items the mapper receives. The predicate and the mapper receive each item with
 * its index. A nullish array returns `undefined`.
 *
 * @throws {TypeError} when the mapper is neither a function nor a property key,
 * or the predicate is not a function.
 */
export function filterMap<Items extends readonly unknown[], Output>(
  array: Items,
  mapper: (value: Items[number], index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  array: Items,
  property: Name,
): Exclude<
  MemberValue<Pick<Items[number], keyof Items[number]>, Name>,
  undefined
>[];
export function filterMap<
  Items extends readonly unknown[],
  Kept extends Items[number],
  Output,
>(
  array: Items,
  predicate: (value: Items[number], index: number) => value is Kept,
  mapper: (value: Kept, index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<
  Items extends readonly unknown[],
  Kept extends Items[number],
  const Name extends keyof Kept,
>(
  array: Items,
  predicate: (value: Items[number], index: number) => value is Kept,
  property: Name,
): Exclude<MemberValue<Pick<Kept, keyof Kept>, Name>, undefined>[];
export function filterMap<Items extends readonly unknown[], Output>(
  array: Items,
  predicate: (value: Items[number], index: number) => unknown,
  mapper: (value: Items[number], index: number) => Output,
): Exclude<Output, undefined>[];
export function filterMap<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  array: Items,
  predicate: (value: Items[number], index: number) => unknown,
  property: Name,
): Exclude<
  MemberValue<Pick<Items[number], keyof Items[number]>, Name>,
  undefined
>[];
export function filterMap<Items extends readonly unknown[], Output>(
  array: Maybe<Items>,
  mapper: (value: Items[number], index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  array: Maybe<Items>,
  property: Name,
):
  | Exclude<
      MemberValue<Pick<Items[number], keyof Items[number]>, Name>,
      undefined
    >[]
  | undefined;
export function filterMap<
  Items extends readonly unknown[],
  Kept extends Items[number],
  Output,
>(
  array: Maybe<Items>,
  predicate: (value: Items[number], index: number) => value is Kept,
  mapper: (value: Kept, index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<
  Items extends readonly unknown[],
  Kept extends Items[number],
  const Name extends keyof Kept,
>(
  array: Maybe<Items>,
  predicate: (value: Items[number], index: number) => value is Kept,
  property: Name,
): Exclude<MemberValue<Pick<Kept, keyof Kept>, Name>, undefined>[] | undefined;
export function filterMap<Items extends readonly unknown[], Output>(
  array: Maybe<Items>,
  predicate: (value: Items[number], index: number) => unknown,
  mapper: (value: Items[number], index: number) => Output,
): Exclude<Output, undefined>[] | undefined;
export function filterMap<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  array: Maybe<Items>,
  predicate: (value: Items[number], index: number) => unknown,
  property: Name,
):
  | Exclude<
      MemberValue<Pick<Items[number], keyof Items[number]>, Name>,
      undefined
    >[]
  | undefined;
export function filterMap(
  array: Maybe<readonly Record<PropertyKey, unknown>[]>,
  first: ((value: unknown, index: number) => unknown) | PropertyKey,
  second?: ((value: unknown, index: number) => unknown) | PropertyKey,
): unknown[] | undefined {
  if (array == null) {
    return;
  }

  if (second === undefined) {
    return Array.from(
      isPropertyKey(first)
        ? filterMapIterable(array, first)
        : filterMapIterable(array, first),
    );
  }

  if (!isFunction(first)) {
    throw new TypeError("Expected a predicate function.");
  }

  return Array.from(
    isPropertyKey(second)
      ? filterMapIterable(array, first, second)
      : filterMapIterable(array, first, second),
  );
}
