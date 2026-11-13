import { isFunction } from "#modules/function/guards/isFunction";
import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Lazily maps each value of an iterable, passing it with its index; returns a new single-use iterator and never mutates the source.
 * The source is read lazily: changes made to it before a value is pulled are visible. A nullish source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable or the mapper is not a function.
 */
export function map<Input, Output>(
  iterable: Iterable<Input>,
  mapper: (value: Input, index: number) => Output,
): IteratorObject<Output, undefined>;
export function map<Input, Output>(
  iterable: Maybe<Iterable<Input>>,
  mapper: (value: Input, index: number) => Output,
): IteratorObject<Output, undefined> | undefined;
export function map<Input, Output>(
  iterable: Maybe<Iterable<Input>>,
  mapper: (value: Input, index: number) => Output,
): IteratorObject<Output, undefined> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  if (!isFunction(mapper)) {
    throw new TypeError("Expected a mapper function.");
  }

  return mapped<Input, Output>(iterable, mapper);
}

function* mapped<Input, Output>(
  iterable: Iterable<Input>,
  mapper: (value: Input, index: number) => Output,
): Generator<Output, undefined, unknown> {
  let index = 0;

  for (const value of iterable) {
    yield mapper(value, index++);
  }
}
