import { isCallable } from "#modules/function/utils/isCallable";
import { isNumber } from "#modules/number/utils/isNumber";
import { hasOwn } from "#modules/object/utils/hasOwn";
import { constant } from "#utils/constant";
import { resolveCallable } from "#utils/resolveCallable";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { Maybe } from "#types/Maybe";

export type KeyMapping<NewKey extends PropertyKey = PropertyKey> = Maybe<
  NewKey | boolean
>;

export type KeyMap<
  Key extends PropertyKey = PropertyKey,
  NewKey extends PropertyKey = PropertyKey,
> = Partial<Record<Key, KeyMapping<NewKey>>>;

export type KeyMapper<
  Key extends PropertyKey = PropertyKey,
  Value = unknown,
  NewKey extends PropertyKey = PropertyKey,
> = (key: Key, value: Value) => KeyMapping<NewKey>;

export type NormalizedKey<Key> = Key extends number ? `${Key}` : Key;

export type NormalizedKeyMapping<Mapping> = Mapping extends number
  ? `${Mapping}`
  : Mapping;

export function keyMapper(): (key: PropertyKey, value: unknown) => true;
export function keyMapper<Mapper extends Callee<KeyMapping>>(
  mapper: Mapper,
): (
  ...args: CallParameters<Mapper>
) => NormalizedKeyMapping<CallReturnType<Mapper>>;
export function keyMapper<
  Key extends PropertyKey,
  NewKey extends PropertyKey = PropertyKey,
>(
  map: KeyMap<Key, NewKey>,
): KeyMapper<Key, unknown, NormalizedKey<NewKey> & PropertyKey>;
export function keyMapper<
  Key extends PropertyKey = PropertyKey,
  Value = unknown,
  NewKey extends PropertyKey = PropertyKey,
>(
  mapper?:
    KeyMap<Key, NewKey> | Callee<KeyMapping<NewKey>, [key: Key, value: Value]>,
): KeyMapper<Key, Value, NormalizedKey<NewKey> & PropertyKey>;
export function keyMapper(
  mapper?: KeyMap | Callee<KeyMapping, [key: PropertyKey, value: any]>,
): KeyMapper<PropertyKey, any> {
  if (mapper == null) {
    return constant(true);
  }

  if (isCallable(mapper)) {
    const resolve = resolveCallable(mapper);

    return function (...args: [any, any]) {
      const result = resolve(...args);

      if (isNumber(result)) {
        return String(result);
      }

      return result;
    };
  }

  return function (key: PropertyKey) {
    if (hasOwn(mapper, key)) {
      const result = mapper[key];

      if (isNumber(result)) {
        return String(result);
      }

      return result;
    }

    return true;
  };
}
