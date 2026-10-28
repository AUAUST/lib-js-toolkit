import { isObject } from "@auaust/toolkit/isObject";
import { keyMapper } from "@auaust/toolkit/keyMapper";
import {
  mappedKeys,
  type FunctionMappedKey,
  type MappedSource,
  type RecordMappedKey,
} from "@auaust/toolkit/mappedKeys";
import { mappedValues } from "@auaust/toolkit/mappedValues";
import { plain } from "@auaust/toolkit/plain";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type {
  Callee,
  CallReturnType,
  ObjectKey,
  ObjectValue,
  ToRecordKey,
} from "@auaust/toolkit/types";

/**
 * Copies properties into a null-prototype record, optionally mapping keys and
 * values. Mapping visits enumerable string keys, including inherited ones.
 * Without either mapper, copies own enumerable strings and symbols.
 */
export function mapped<Source extends Record<string, any>>(
  source: Source,
  map?: undefined,
  transformer?: undefined,
): MappedSource<Source>;
export function mapped<
  Source extends Record<string, any>,
  Map extends Partial<Record<keyof MappedSource<Source>, PropertyKey | false>>,
>(
  source: Source,
  map: Map,
  transformer?: undefined,
): {
  [
    Key in keyof MappedSource<Source, false> as RecordMappedKey<Key, Map>
  ]: MappedSource<Source, false>[Key];
};
export function mapped<
  Source extends Record<string, any>,
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
export function mapped<
  Source extends Record<string, any>,
  Mapper extends Callee<
    PropertyKey | boolean | null | undefined,
    [key: ObjectKey<Source>, value: ObjectValue<Source>]
  >,
  Transformer extends Callee<
    any,
    [
      value: ObjectValue<Source>,
      key: ToRecordKey<FunctionMappedKey<MappedSource<Source, false>, Mapper>>,
      sourceKey: ObjectKey<Source>,
    ]
  >,
>(
  source: Source,
  mapper: Mapper,
  transformer: Transformer,
): Record<
  ToRecordKey<FunctionMappedKey<MappedSource<Source, false>, Mapper>>,
  CallReturnType<Transformer>
>;
export function mapped<
  Source extends Record<string, any>,
  Map extends
    | Partial<Record<keyof MappedSource<Source>, PropertyKey | false>>
    | undefined,
  Transformer extends Callee<
    any,
    [
      value: ObjectValue<Source>,
      key: RecordMappedKey<keyof MappedSource<Source, false>, Map>,
      sourceKey: ObjectKey<Source>,
    ]
  >,
>(
  source: Source,
  map?: Map,
  transformer?: Transformer,
): {
  [
    Key in keyof MappedSource<Source, false> as RecordMappedKey<Key, Map>
  ]: CallReturnType<Transformer>;
};
export function mapped(
  source: Record<string, any>,
  mapper?:
    | Record<string, PropertyKey | false>
    | Callee<PropertyKey | boolean | undefined, [key: string, value: any]>,
  transformer?: Callee<any, [value: any, key: PropertyKey, sourceKey: string]>,
): Record<string, any>;
export function mapped(
  source: Record<string, any>,
  map?:
    | Record<string, PropertyKey | false>
    | Callee<PropertyKey | boolean | undefined, [key: string, value: any]>,
  transform?: Callee<any, [value: any, key: PropertyKey, sourceKey: string]>,
) {
  if (!isObject(source)) {
    return source;
  }

  if (!transform) {
    return mappedKeys(source, map);
  }

  if (!map) {
    return mappedValues(source, transform);
  }

  const mapper = keyMapper(map);

  const transformer = resolveCallable(transform);

  const mapped = plain<Record<PropertyKey, any>>();

  for (const key in source) {
    const newKey = mapper(key, source[key]);

    if (newKey === false || newKey == null) {
      continue;
    }

    const actualKey = newKey === true ? key : newKey;

    mapped[actualKey] = transformer(source[key], actualKey, key);
  }

  return mapped;
}
