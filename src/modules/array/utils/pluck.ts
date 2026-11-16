import { readIterable } from "#modules/array/internals/readIterable";
import { pluck as pluckIterable } from "#modules/iterable/utils/pluck";
import type { MemberValue } from "#modules/general/utils/memberValue";
import type { Maybe } from "#types/Maybe";

/**
 * Reads the named member of each item of an array into a new array of the same
 * length, calling it when it is a method; holes read as `undefined`. Any other
 * iterable but a string is copied once first. A union item type accepts only a
 * name every member has. A nullish iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable, or the
 * property is not a property key.
 */
export function pluck<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  iterable: Items,
  property: Name,
): {
  -readonly [Index in keyof Items]: MemberValue<Items[number], Name>;
};
export function pluck<Item, const Name extends keyof Item>(
  iterable: Iterable<Item> & object,
  property: Name,
): MemberValue<Item, Name>[];
export function pluck<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  iterable: Maybe<Items>,
  property: Name,
):
  | {
      -readonly [Index in keyof Items]: MemberValue<Items[number], Name>;
    }
  | undefined;
export function pluck<Item, const Name extends keyof Item>(
  iterable: Maybe<Iterable<Item> & object>,
  property: Name,
): MemberValue<Item, Name>[] | undefined;
export function pluck(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>> & object>,
  property: PropertyKey,
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  const array = readIterable(iterable);

  return Array.from(pluckIterable(array, property));
}
