import { sameValueZero } from "#modules/general/utils/sameValueZero";
import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Tells whether an iterable yields the value, compared by SameValueZero so `NaN`
 * matches `NaN`, reading no further and closing the source once found. A nullish
 * source returns `undefined`.
 *
 * @throws {TypeError} when the source is not iterable.
 */
export function includes<Input>(
  iterable: Iterable<Input>,
  value: NoInfer<Input>,
): boolean;
export function includes<Input>(
  iterable: Maybe<Iterable<Input>>,
  value: NoInfer<Input>,
): boolean | undefined;
export function includes(
  iterable: Maybe<Iterable<unknown>>,
  value: unknown,
): boolean | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  for (const candidate of iterable) {
    if (sameValueZero(candidate, value)) {
      return true;
    }
  }

  return false;
}
