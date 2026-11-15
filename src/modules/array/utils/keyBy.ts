import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { keyBy as keyByIterable } from "#modules/iterable/utils/keyBy";
import type { MemberValue } from "#modules/general/utils/memberValue";
import type { Maybe } from "#types/Maybe";

/**
 * Indexes the items of an array in a new null-prototype record under the key
 * the keyer returns for each item with its index, a later item replacing an
 * earlier one with the same key; any key, `"__proto__"` included, becomes an own
 * property; holes read as `undefined`. A property name instead keys each item by
 * that member, calling it when it is a method and converting a non-key result to
 * a string. A nullish array returns `undefined`.
 *
 * @throws {TypeError} when the array is not iterable or the keyer is neither a
 * function nor a property key.
 */
export function keyBy<
  Items extends readonly unknown[],
  Key extends PropertyKey,
>(
  array: Items,
  keyer: (value: Items[number], index: number) => Key,
): Partial<Record<Key, Items[number]>>;
export function keyBy<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  array: Items,
  property: Name,
): Partial<
  Record<Extract<MemberValue<Items[number], Name>, PropertyKey>, Items[number]>
>;
export function keyBy<
  Items extends readonly unknown[],
  Key extends PropertyKey,
>(
  array: Maybe<Items>,
  keyer: (value: Items[number], index: number) => Key,
): Partial<Record<Key, Items[number]>> | undefined;
export function keyBy<
  Items extends readonly unknown[],
  const Name extends keyof Items[number],
>(
  array: Maybe<Items>,
  property: Name,
):
  | Partial<
      Record<
        Extract<MemberValue<Items[number], Name>, PropertyKey>,
        Items[number]
      >
    >
  | undefined;
export function keyBy(
  array: Maybe<readonly Record<PropertyKey, unknown>[]>,
  keyer: ((value: unknown, index: number) => PropertyKey) | PropertyKey,
): Record<PropertyKey, unknown> | undefined {
  // @debt Both branches make the same call: the narrowing only selects an overload of the iterable form, which has none taking the keyer union.
  if (isPropertyKey(keyer)) {
    return keyByIterable(array, keyer);
  }

  return keyByIterable(array, keyer);
}
