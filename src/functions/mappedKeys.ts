import { keyMapper } from "@auaust/toolkit/keyMapper";
import { plain } from "@auaust/toolkit/plain";

export type RecordMappedKey<Key, Map> = Map extends object
  ? Key extends keyof Map
    ? Map[Key] extends false
      ? never
      : Map[Key] extends PropertyKey
        ? Map[Key]
        : Key
    : Key
  : Key;

export type FunctionMappedKey<Source, Mapper extends (...args: any[]) => any> =
  | Exclude<ReturnType<Mapper>, false | true | null | undefined>
  | (true extends ReturnType<Mapper> ? keyof Source : never);

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
  Mapper extends (
    key: keyof Source,
    value: Source[keyof Source],
  ) => PropertyKey | boolean | null | undefined,
>(
  source: Source,
  mapper: Mapper,
): Record<FunctionMappedKey<Source, Mapper>, Source[keyof Source]>;
export function mappedKeys(
  source: Record<string, any>,
  map?:
    | Record<string, PropertyKey | false>
    | ((key: string, value: any) => PropertyKey | boolean | undefined),
): Record<string, any>;
export function mappedKeys(source: any, map?: any) {
  if (!map) {
    return { ...source };
  }

  const result: Record<PropertyKey, unknown> & Object = plain();

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
