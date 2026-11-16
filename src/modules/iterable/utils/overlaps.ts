import { isIterable } from "#modules/iterable/guards/isIterable";
import { toMembership } from "#modules/iterable/internals/toMembership";
import type { Maybe } from "#types/Maybe";

/**
 * Tells whether any value of an iterable is among `candidates`, reading no
 * further and closing the source at the first match. `candidates` is a set-like
 * read through its `has`, or an iterable read once at call time and compared by
 * SameValueZero so `NaN` matches `NaN`. A nullish source returns `undefined`.
 *
 * @throws {TypeError} when the source is not iterable or `candidates` is neither
 * iterable nor set-like.
 */
export function overlaps<Input>(
  iterable: Iterable<Input>,
  candidates:
    Iterable<NoInfer<Input>> | { has(value: NoInfer<Input>): unknown },
): boolean;
export function overlaps<Input>(
  iterable: Maybe<Iterable<Input>>,
  candidates:
    Iterable<NoInfer<Input>> | { has(value: NoInfer<Input>): unknown },
): boolean | undefined;
export function overlaps(
  iterable: Maybe<Iterable<unknown>>,
  candidates: Iterable<unknown> | { has(value: unknown): unknown },
): boolean | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  const isMember = toMembership(candidates);

  for (const value of iterable) {
    if (isMember(value)) {
      return true;
    }
  }

  return false;
}
