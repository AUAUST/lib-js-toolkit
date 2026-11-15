import { isFunction } from "#modules/function/guards/isFunction";
import { isContainer } from "#modules/guard/guards/isContainer";
import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Lazily maps each value of an iterable to an iterable or an iterator,
 * passing it with its index, and yields the values of each in turn, as
 * `Iterator.prototype.flatMap`; returns a new single-use iterator and never
 * mutates the source. The source is read lazily: changes made to it before a
 * value is pulled are visible. A nullish source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable or the mapper
 * is not a function; during iteration when the mapper returns a primitive,
 * strings included.
 */
export function flatMap<Input, Output>(
  iterable: Iterable<Input>,
  mapper: (
    value: Input,
    index: number,
  ) =>
    Iterator<Output, unknown, undefined> | Iterable<Output, unknown, undefined>,
): IteratorObject<Output, undefined>;
export function flatMap<Input, Output>(
  iterable: Maybe<Iterable<Input>>,
  mapper: (
    value: Input,
    index: number,
  ) =>
    Iterator<Output, unknown, undefined> | Iterable<Output, unknown, undefined>,
): IteratorObject<Output, undefined> | undefined;
export function flatMap<Input, Output>(
  iterable: Maybe<Iterable<Input>>,
  mapper: (
    value: Input,
    index: number,
  ) =>
    Iterator<Output, unknown, undefined> | Iterable<Output, unknown, undefined>,
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

  return flatMapped(iterable, mapper);
}

function* flatMapped<Input, Output>(
  iterable: Iterable<Input>,
  mapper: (
    value: Input,
    index: number,
  ) =>
    Iterator<Output, unknown, undefined> | Iterable<Output, unknown, undefined>,
): Generator<Output, undefined, undefined> {
  let index = 0;

  for (const value of iterable) {
    const inner = mapper(value, index++);

    if (!isContainer(inner)) {
      throw new TypeError(
        "Expected the mapper to return an iterable or an iterator.",
      );
    }

    yield* isIterable(inner) ? inner : { [Symbol.iterator]: () => inner };
  }
}
