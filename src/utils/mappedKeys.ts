import { keyMapper } from "@auaust/toolkit/keyMapper";
import { plain } from "@auaust/toolkit/plain";
import type { Callee, CallReturnType } from "@auaust/toolkit/types";

export type RecordMappedKey<Key, Map> = Map extends object
  ? Key extends keyof Map
    ? Map[Key] extends false
      ? never
      : Map[Key] extends PropertyKey
        ? Map[Key]
        : Key
    : Key
  : Key;

export type FunctionMappedKey<Source, Mapper extends Callee> =
  | Exclude<CallReturnType<Mapper>, false | true | null | undefined>
  | (true extends CallReturnType<Mapper> ? keyof Source : never);

export function mappedKeys<Source extends object>(source: Source): Source;
export function mappedKeys<
  Source extends object,
  Map extends Partial<Record<keyof Source, PropertyKey | false>>,
>(
  source: Source,
  map: Map,
): {
  [Key in keyof Source as RecordMappedKey<Key, Map>]: Source[Key];
};
export function mappedKeys<
  Source extends object,
  Mapper extends Callee<
    PropertyKey | boolean | null | undefined,
    [key: keyof Source, value: Source[keyof Source]]
  >,
>(
  source: Source,
  mapper: Mapper,
): Record<FunctionMappedKey<Source, Mapper>, Source[keyof Source]>;
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

  const result = plain();

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
