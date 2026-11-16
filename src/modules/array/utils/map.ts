import { isArray } from "#modules/array/guards/isArray";
import { copyIterable } from "#modules/array/internals/copyIterable";
import { isFunction } from "#modules/function/guards/isFunction";
import { callMethod } from "#modules/function/utils/callMethod";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import type { Maybe } from "#types/Maybe";
import type { MethodName } from "#types/MethodName";
import type { MethodParameters } from "#types/MethodParameters";
import type { MethodReturnType } from "#types/MethodReturnType";

// @debt The implementation signature types items as method holders so `callMethod` accepts any property key; the overloads hold the real contract.
type MethodHolder = Record<
  PropertyKey,
  (...args: readonly unknown[]) => unknown
>;

/**
 * Maps each item of an array into a new array of the same length, passing it
 * with its index; holes stay holes, as with `Array.prototype.map`. Any other
 * iterable but a string is copied once first. A method name instead calls that
 * method on each item with the given arguments; a union item type accepts only
 * a name every member has. A nullish iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable, or the
 * mapper is neither a function nor a property key.
 */
export function map<Items extends readonly unknown[], Output>(
  iterable: Items,
  mapper: (value: Items[number], index: number) => Output,
): { -readonly [Index in keyof Items]: Output };
export function map<
  Items extends readonly unknown[],
  const Name extends MethodName<Items[number]>,
>(
  iterable: Items,
  method: Name,
  ...args: MethodParameters<Items[number], Name>
): {
  -readonly [Index in keyof Items]: MethodReturnType<Items[number], Name>;
};
export function map<Item, Output>(
  iterable: Iterable<Item> & object,
  mapper: (value: Item, index: number) => Output,
): Output[];
export function map<Item, const Name extends MethodName<Item>>(
  iterable: Iterable<Item> & object,
  method: Name,
  ...args: MethodParameters<Item, Name>
): MethodReturnType<Item, Name>[];
export function map<Items extends readonly unknown[], Output>(
  iterable: Maybe<Items>,
  mapper: (value: Items[number], index: number) => Output,
): { -readonly [Index in keyof Items]: Output } | undefined;
export function map<
  Items extends readonly unknown[],
  const Name extends MethodName<Items[number]>,
>(
  iterable: Maybe<Items>,
  method: Name,
  ...args: MethodParameters<Items[number], Name>
):
  | {
      -readonly [Index in keyof Items]: MethodReturnType<Items[number], Name>;
    }
  | undefined;
export function map<Item, Output>(
  iterable: Maybe<Iterable<Item> & object>,
  mapper: (value: Item, index: number) => Output,
): Output[] | undefined;
export function map<Item, const Name extends MethodName<Item>>(
  iterable: Maybe<Iterable<Item> & object>,
  method: Name,
  ...args: MethodParameters<Item, Name>
): MethodReturnType<Item, Name>[] | undefined;
export function map(
  iterable: Maybe<Iterable<MethodHolder> & object>,
  mapper: ((value: unknown, index: number) => unknown) | PropertyKey,
  ...args: readonly unknown[]
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  const array = isArray(iterable) ? iterable : copyIterable(iterable);

  if (isFunction(mapper)) {
    return array.map(mapper);
  }

  if (!isPropertyKey(mapper)) {
    throw new TypeError("Expected a mapper function or a method name.");
  }

  return array.map((value) => callMethod(value, mapper, ...args));
}
