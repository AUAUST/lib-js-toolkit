import { isIterable } from "#modules/iterable/guards/isIterable";
import { toMembership } from "#modules/iterable/internals/toMembership";
import { filter } from "#modules/iterable/utils/filter";
import type { Maybe } from "#types/Maybe";

/**
 * Lazily yields the values of an iterable absent from `other`, keeping their
 * order and duplicates; returns a new single-use iterator and never mutates the
 * source. `other` is a set-like read through its `has`, or an iterable read once
 * at call time and compared by SameValueZero so `NaN` matches `NaN`. A nullish
 * source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable or `other` is
 * neither iterable nor set-like.
 */
export function difference<Input>(
  iterable: Iterable<Input>,
  other: Iterable<NoInfer<Input>> | { has(value: NoInfer<Input>): unknown },
): IteratorObject<Input, undefined>;
export function difference<Input>(
  iterable: Maybe<Iterable<Input>>,
  other: Iterable<NoInfer<Input>> | { has(value: NoInfer<Input>): unknown },
): IteratorObject<Input, undefined> | undefined;
export function difference(
  iterable: Maybe<Iterable<unknown>>,
  other: Iterable<unknown> | { has(value: unknown): unknown },
): IteratorObject<unknown, undefined> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  const isMember = toMembership(other);

  return filter(iterable, (value) => !isMember(value));
}
