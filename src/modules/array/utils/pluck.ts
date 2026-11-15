import { pluck as pluckIterable } from "#modules/iterable/utils/pluck";
import type { MemberValue } from "#modules/general/utils/memberValue";
import type { Maybe } from "#types/Maybe";

// @debt `MemberValue` rejects primitives, so each overload reads members through `Pick<Items[number], keyof Items[number]>`.

/**
 * Reads the named member of each item of an array into a new array of the same
 * length, calling it when it is a method; holes read as `undefined`. A union item
 * type accepts only a name every member has. A nullish array returns `undefined`.
 *
 * @throws {TypeError} when the property is not a property key.
 */
export function pluck<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  array: Items,
  property: Name,
): {
  -readonly [Index in keyof Items]: MemberValue<
    Pick<Items[number], keyof Items[number]>,
    Name
  >;
};
export function pluck<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  array: Maybe<Items>,
  property: Name,
):
  | {
      -readonly [Index in keyof Items]: MemberValue<
        Pick<Items[number], keyof Items[number]>,
        Name
      >;
    }
  | undefined;
export function pluck(
  array: Maybe<readonly Record<PropertyKey, unknown>[]>,
  property: PropertyKey,
): unknown[] | undefined {
  if (array != null) {
    return Array.from(pluckIterable(array, property));
  }
}
