import { isIterable } from "#modules/iterable/guards/isIterable";
import { toKeyer } from "#modules/iterable/internals/toKeyer";
import { create } from "#modules/object/utils/create";
import type { MemberValue } from "#modules/general/utils/memberValue";
import type { Maybe } from "#types/Maybe";

/**
 * Indexes the values of an iterable in a new null-prototype record under the
 * key the keyer returns for each value with its index, a later value replacing
 * an earlier one with the same key; any key, `"__proto__"` included, becomes an
 * own property. A property name instead keys each value by that member, calling
 * it when it is a method and converting a non-key result to a string. A nullish
 * source returns `undefined`.
 *
 * @throws {TypeError} when the source is not iterable or the keyer is neither a
 * function nor a property key.
 */
export function keyBy<Input, Key extends PropertyKey>(
  iterable: Iterable<Input>,
  keyer: (value: Input, index: number) => Key,
): Partial<Record<Key, Input>>;
export function keyBy<Input, const Name extends keyof Input>(
  iterable: Iterable<Input>,
  property: Name,
): Partial<Record<Extract<MemberValue<Input, Name>, PropertyKey>, Input>>;
export function keyBy<Input, Key extends PropertyKey>(
  iterable: Maybe<Iterable<Input>>,
  keyer: (value: Input, index: number) => Key,
): Partial<Record<Key, Input>> | undefined;
export function keyBy<Input, const Name extends keyof Input>(
  iterable: Maybe<Iterable<Input>>,
  property: Name,
):
  | Partial<Record<Extract<MemberValue<Input, Name>, PropertyKey>, Input>>
  | undefined;
export function keyBy(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>>>,
  keyer: ((value: unknown, index: number) => PropertyKey) | PropertyKey,
): Record<PropertyKey, unknown> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  const keyOf = toKeyer(keyer);
  const record = create(null);

  let index = 0;

  for (const value of iterable) {
    record[keyOf(value, index++)] = value;
  }

  return record;
}
