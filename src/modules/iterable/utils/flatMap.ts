import { isCallableMember } from "#modules/function/guards/isCallableMember";
import { isFunction } from "#modules/function/guards/isFunction";
import { isIterable } from "#modules/iterable/guards/isIterable";
import { isFlattenable } from "#modules/iterable/internals/isFlattenable";
import type { Maybe } from "#types/Maybe";

/**
 * Lazily maps each value of an iterable, passing it with its index, and yields
 * the values of each mapped iterable or iterator in turn, or the mapped value
 * itself when it is neither, strings included; returns a new single-use iterator
 * and never mutates the source. The source is read lazily: changes made to it
 * before a value is pulled are visible. A nullish source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable or the
 * mapper is not a function.
 */
export function flatMap<Input, Output>(
  iterable: Iterable<Input>,
  mapper: (
    value: Input,
    index: number,
  ) =>
    | Output
    | Iterable<Output, unknown, undefined>
    | Iterator<Output, unknown, undefined>,
): IteratorObject<Output, undefined>;
export function flatMap<Input, Output>(
  iterable: Maybe<Iterable<Input>>,
  mapper: (
    value: Input,
    index: number,
  ) =>
    | Output
    | Iterable<Output, unknown, undefined>
    | Iterator<Output, unknown, undefined>,
): IteratorObject<Output, undefined> | undefined;
export function flatMap<Input, Output>(
  iterable: Maybe<Iterable<Input>>,
  mapper: FlatMapper<Input, Output>,
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
  mapper: FlatMapper<Input, Output>,
): Generator<Output, undefined, undefined> {
  let index = 0;

  for (const value of iterable) {
    const inner = mapper(value, index++);

    if (isFlattenable(inner)) {
      yield* inner;
    } else if (isCallableMember(inner, "next")) {
      yield* { [Symbol.iterator]: () => inner };
    } else {
      yield inner;
    }
  }
}

type FlatMapper<Input, Output> = (
  value: Input,
  index: number,
) =>
  | Output
  | Iterable<Output, unknown, undefined>
  | Iterator<Output, unknown, undefined>;
