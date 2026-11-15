import {
  memberValue,
  type MemberValue,
} from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { map } from "#modules/iterable/utils/map";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types values as records so `memberValue` accepts any property key; the overloads hold the real contract.

/**
 * Lazily reads the named member of each value of an iterable, calling it when it
 * is a method; returns a new single-use iterator and never mutates the source.
 * A union value type accepts only a name every member has. The source is read
 * lazily: changes made to it before a value is pulled are visible. A nullish
 * source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable or the property
 * is not a property key.
 */
export function pluck<Input, const Name extends keyof Input>(
  iterable: Iterable<Input>,
  property: Name,
): IteratorObject<MemberValue<Input, Name>, undefined>;
export function pluck<Input, const Name extends keyof Input>(
  iterable: Maybe<Iterable<Input>>,
  property: Name,
): IteratorObject<MemberValue<Input, Name>, undefined> | undefined;
export function pluck(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>>>,
  property: PropertyKey,
): IteratorObject<unknown, undefined> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isPropertyKey(property)) {
    throw new TypeError("Expected a property name.");
  }

  return map(iterable, (value) => memberValue(value, property));
}
