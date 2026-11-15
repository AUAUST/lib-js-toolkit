import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Lazily yields the values of an iterable, then those of each other iterable
 * in turn; returns a new single-use iterator and never mutates the sources.
 * Each source is read lazily, once the previous one is exhausted: changes
 * made to it before a value is pulled are visible. A nullish first source
 * returns `undefined`.
 *
 * @throws {TypeError} at call time when a source is not iterable.
 */
export function concat<Input, Iterables extends readonly Iterable<unknown>[]>(
  iterable: Iterable<Input>,
  ...iterables: Iterables
): IteratorObject<
  Input | (Iterables extends readonly Iterable<infer Value>[] ? Value : never),
  undefined
>;
export function concat<Input, Iterables extends readonly Iterable<unknown>[]>(
  iterable: Maybe<Iterable<Input>>,
  ...iterables: Iterables
):
  | IteratorObject<
      | Input
      | (Iterables extends readonly Iterable<infer Value>[] ? Value : never),
      undefined
    >
  | undefined;
export function concat(
  iterable: Maybe<Iterable<unknown>>,
  ...iterables: readonly Iterable<unknown>[]
): IteratorObject<unknown, undefined> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable) || !iterables.every(isIterable)) {
    throw new TypeError("Expected iterables.");
  }

  return concatenated([iterable, ...iterables]);
}

function* concatenated<Input>(
  iterables: readonly Iterable<Input>[],
): Generator<Input, undefined, unknown> {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
