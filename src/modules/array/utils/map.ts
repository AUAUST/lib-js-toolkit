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
 * with its index; holes stay holes, as with `Array.prototype.map`. A method name
 * instead calls that method on each item with the given arguments; a union item
 * type accepts only a name every member has. A nullish array returns `undefined`.
 *
 * @throws {TypeError} when the mapper is neither a function nor a property key.
 */
export function map<Items extends readonly unknown[], Output>(
  array: Items,
  mapper: (value: Items[number], index: number) => Output,
): { -readonly [Index in keyof Items]: Output };
export function map<
  Items extends readonly unknown[],
  const Name extends MethodName<Items[number]>,
>(
  array: Items,
  method: Name,
  ...args: MethodParameters<Items[number], Name>
): {
  -readonly [Index in keyof Items]: MethodReturnType<Items[number], Name>;
};
export function map<Items extends readonly unknown[], Output>(
  array: Maybe<Items>,
  mapper: (value: Items[number], index: number) => Output,
): { -readonly [Index in keyof Items]: Output } | undefined;
export function map<
  Items extends readonly unknown[],
  const Name extends MethodName<Items[number]>,
>(
  array: Maybe<Items>,
  method: Name,
  ...args: MethodParameters<Items[number], Name>
):
  | {
      -readonly [Index in keyof Items]: MethodReturnType<Items[number], Name>;
    }
  | undefined;
export function map(
  array: Maybe<readonly MethodHolder[]>,
  mapper: ((value: unknown, index: number) => unknown) | PropertyKey,
  ...args: readonly unknown[]
): unknown[] | undefined {
  if (array == null) {
    return;
  }

  if (isFunction(mapper)) {
    return array.map(mapper);
  }

  if (!isPropertyKey(mapper)) {
    throw new TypeError("Expected a mapper function or a method name.");
  }

  return array.map((value) => callMethod(value, mapper, ...args));
}
