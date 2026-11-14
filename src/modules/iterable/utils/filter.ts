import { isFunction } from "#modules/function/guards/isFunction";
import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Lazily keeps the values of an iterable the predicate accepts; returns a new
 * single-use iterator and never mutates the source. The predicate receives each
 * value with its index among the values read, kept or not; a type predicate
 * narrows the result. The source is read lazily: changes made to it before a
 * value is pulled are visible. A nullish source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable or the
 * predicate is not a function.
 */
export function filter<Input, Output extends Input>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => value is Output,
): IteratorObject<Output, undefined>;
export function filter<Input>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => unknown,
): IteratorObject<Input, undefined>;
export function filter<Input, Output extends Input>(
  iterable: Maybe<Iterable<Input>>,
  predicate: (value: Input, index: number) => value is Output,
): IteratorObject<Output, undefined> | undefined;
export function filter<Input>(
  iterable: Maybe<Iterable<Input>>,
  predicate: (value: Input, index: number) => unknown,
): IteratorObject<Input, undefined> | undefined;
export function filter<Input>(
  iterable: Maybe<Iterable<Input>>,
  predicate: (value: Input, index: number) => unknown,
): IteratorObject<Input, undefined> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  if (!isFunction(predicate)) {
    throw new TypeError("Expected a predicate function.");
  }

  return filtered(iterable, predicate);
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
