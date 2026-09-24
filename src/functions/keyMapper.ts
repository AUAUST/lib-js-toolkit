import { constant } from "@auaust/toolkit/constant";
import type { Maybe } from "@auaust/toolkit/types";

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
export function keyMapper<Mapper extends (...args: any[]) => KeyMapping>(
  mapper: Mapper,
): (...args: Parameters<Mapper>) => NormalizedKeyMapping<ReturnType<Mapper>>;
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
  mapper?: KeyMap<Key, NewKey> | KeyMapper<Key, Value, NewKey>,
): KeyMapper<Key, Value, NormalizedKey<NewKey> & PropertyKey>;
export function keyMapper(
  mapper?: KeyMap | KeyMapper<PropertyKey, any>,
): KeyMapper<PropertyKey, any> {
  if (mapper == null) {
    return constant(true);
  }

  if (typeof mapper === "function") {
    return (...args: [any, any]) => {
      const result = mapper(...args);

      if (typeof result === "number") {
        return String(result);
      }

      return result;
    };
  }

  return (key: PropertyKey) => {
    if (Object.hasOwn(mapper, key)) {
      const result = mapper[key];

      if (typeof result === "number") {
        return String(result);
      }

      return result;
    }

    return true;
  };
}
