import { keyMapper } from "#utils/keyMapper";
import { plain } from "#utils/plain";
import type { Callee } from "#types/Callee";
import type { CallReturnType } from "#types/CallReturnType";
import type { ObjectKey } from "#types/ObjectKey";
import type { ObjectValue } from "#types/ObjectValue";
import type { ToRecordKey } from "#types/ToRecordKey";

/** Projects copied properties into a record, excluding array methods and metadata. */
export type MappedSource<
  Source,
  IncludeSymbols extends boolean = true,
> = Source extends readonly unknown[]
  ? number extends Source["length"]
    ? Record<`${number}`, Source[number]>
    : {
        [
          Key in keyof Source as Key extends `${number}` ? Key : never
        ]: Source[Key];
      }
  : Source extends string
    ? Record<`${number}`, string>
    : Source extends object
      ? {
          [
            Key in keyof Source as Key extends symbol
              ? IncludeSymbols extends true
                ? Key
                : never
              : Key
          ]: Source[Key];
        }
      : {};

type NormalizedMap<Map> = {
  [
    Key in keyof Map as Key extends PropertyKey ? ToRecordKey<Key> : never
  ]: Map[Key];
};

export type RecordMappedKey<Key, Map> = Key extends PropertyKey
  ? Map extends object
    ? ToRecordKey<Key> extends keyof NormalizedMap<Map>
      ? NormalizedMap<Map>[ToRecordKey<Key>] extends false
        ? never
        : NormalizedMap<Map>[ToRecordKey<Key>] extends PropertyKey
          ? ToRecordKey<NormalizedMap<Map>[ToRecordKey<Key>]>
          : ToRecordKey<Key>
      : ToRecordKey<Key>
    : ToRecordKey<Key>
  : never;

export type FunctionMappedKey<Source, Mapper extends Callee> =
  | Exclude<CallReturnType<Mapper>, false | true | null | undefined>
  | (true extends CallReturnType<Mapper> ? keyof Source : never);

/**
 * Copies properties into a null-prototype record. Without a mapper, copies own
 * enumerable strings and symbols. With a mapper, visits enumerable string keys,
 * including inherited keys. Arrays produce records of indexed values.
 */
export function mappedKeys<Source extends object>(
  source: Source,
  map?: undefined,
): MappedSource<Source>;
export function mappedKeys<
  Source extends object,
  Map extends Partial<Record<keyof MappedSource<Source>, PropertyKey | false>>,
>(
  source: Source,
  map: Map,
): {
  [
    Key in keyof MappedSource<Source, false> as RecordMappedKey<Key, Map>
  ]: MappedSource<Source, false>[Key];
};
export function mappedKeys<
  Source extends object,
  Mapper extends Callee<
    PropertyKey | boolean | null | undefined,
    [key: ObjectKey<Source>, value: ObjectValue<Source>]
  >,
>(
  source: Source,
  mapper: Mapper,
): Record<
  ToRecordKey<FunctionMappedKey<MappedSource<Source, false>, Mapper>>,
  ObjectValue<Source>
>;
export function mappedKeys(
  source: Record<string, any>,
  map?:
    | Record<string, PropertyKey | false>
    | Callee<PropertyKey | boolean | undefined, [key: string, value: any]>,
): Record<string, any>;
export function mappedKeys(source: any, map?: any) {
  if (!map) {
    return plain(source);
  }

  const result = plain<Record<PropertyKey, any>>();

  const mapper = keyMapper(map);

  for (const key in source) {
    const value = source[key];

    const mappedKey = mapper(key, value);

    if (mappedKey === false || mappedKey == null) {
      continue;
    }

    result[mappedKey === true ? key : mappedKey] = value;
  }

  return result;
}
