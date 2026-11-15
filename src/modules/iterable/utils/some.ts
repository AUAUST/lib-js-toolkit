import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types values as records so `memberValue` accepts any property key; the overloads hold the real contract.

/**
 * Tells whether the predicate accepts a value of an iterable, reading no further
 * and closing the source once one is accepted. The predicate receives each
 * value with its index. A property name instead accepts a value whose member
 * is truthy, calling it when it is a method; a union value type accepts only a
 * name every member has. An empty source gives `false`; a nullish source returns
 * `undefined`.
 *
 * @throws {TypeError} when the source is not iterable or the predicate is neither
 * a function nor a property key.
 * @native variant Iterator.prototype.some
 */
export function some<Input>(
  iterable: Iterable<Input>,
  predicate: ((value: Input, index: number) => unknown) | keyof Input,
): boolean;
export function some<Input>(
  iterable: Maybe<Iterable<Input>>,
  predicate: ((value: Input, index: number) => unknown) | keyof Input,
): boolean | undefined;
export function some(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>>>,
  predicate: ((value: unknown, index: number) => unknown) | PropertyKey,
): boolean | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  if (isFunction(predicate)) {
    return acceptsAny(iterable, predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return acceptsAny(iterable, (value) => memberValue(value, predicate));
}

function acceptsAny<Input>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => unknown,
): boolean {
  let index = 0;

  for (const value of iterable) {
    if (predicate(value, index++)) {
      return true;
    }
  }

  return false;
}
