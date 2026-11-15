import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records so `memberValue` accepts any property key; the overloads hold the real contract.

// @debt A type predicate guarding a type wider than a literal value union, such as `isString` over `1 | "a"`, fails inference instead of narrowing to the matching members.

/**
 * Lazily keeps the values of an iterable the predicate accepts; returns a new
 * single-use iterator and never mutates the source. The predicate receives each
 * value with its index among the values read, kept or not; a type predicate
 * narrows the result. A property name instead keeps the values whose member is
 * truthy, calling it when it is a method; a union value type accepts only a name
 * every member has. The source is read lazily: changes made to it before a value
 * is pulled are visible. A nullish source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable or the
 * predicate is neither a function nor a property key.
 */
export function filter<Input, Output extends Input>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => value is Output,
): IteratorObject<Output, undefined>;
export function filter<Input>(
  iterable: Iterable<Input>,
  predicate: ((value: Input, index: number) => unknown) | keyof Input,
): IteratorObject<Input, undefined>;
export function filter<Input, Output extends Input>(
  iterable: Maybe<Iterable<Input>>,
  predicate: (value: Input, index: number) => value is Output,
): IteratorObject<Output, undefined> | undefined;
export function filter<Input>(
  iterable: Maybe<Iterable<Input>>,
  predicate: ((value: Input, index: number) => unknown) | keyof Input,
): IteratorObject<Input, undefined> | undefined;
export function filter(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>>>,
  predicate: ((value: unknown, index: number) => unknown) | PropertyKey,
): IteratorObject<unknown, undefined> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  if (isFunction(predicate)) {
    return filtered(iterable, predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return filtered(iterable, (value) => memberValue(value, predicate));
}

function* filtered<Input>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => unknown,
): Generator<Input, undefined, unknown> {
  let index = 0;

  for (const value of iterable) {
    if (predicate(value, index++)) {
      yield value;
    }
  }
}
