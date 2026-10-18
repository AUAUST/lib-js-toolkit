import { isCallable } from "@auaust/toolkit/isCallable";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import { constant } from "@auaust/toolkit/constant";
import type {
  Callee,
  CallParameters,
  CallReturnType,
  Maybe,
} from "@auaust/toolkit/types";

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
  mapper?: KeyMap<Key, NewKey> | Callee<KeyMapping<NewKey>, [key: Key, value: Value]>,
): KeyMapper<Key, Value, NormalizedKey<NewKey> & PropertyKey>;
export function keyMapper(
  mapper?: KeyMap | Callee<KeyMapping, [key: PropertyKey, value: any]>,
): KeyMapper<PropertyKey, any> {
  if (mapper == null) {
    return constant(true);
  }

  if (isCallable(mapper)) {
    const resolve = resolveCallable(mapper);

    function mapCallable(...args: [any, any]) {
      const result = resolve(...args);

      if (typeof result === "number") {
        return String(result);
      }

      return result;
    }

    return mapCallable;
  }

  const map = mapper;

  function mapKey(key: PropertyKey) {
    if (Object.hasOwn(map, key)) {
      const result = map[key];

      if (typeof result === "number") {
        return String(result);
      }

      return result;
    }

    return true;
  }

  return mapKey;
}
