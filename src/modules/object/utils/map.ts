import { resolveCallable } from "#modules/function/utils/resolveCallable";
import { isContainer } from "#modules/guard/guards/isContainer";
import { isObject } from "#modules/object/guards/isObject";
import { resolveMappedKey } from "#modules/object/internals/resolveMappedKey";
import { keyMapper } from "#modules/object/utils/keyMapper";
import {
  mapKeys,
  type FunctionMappedKey,
  type MappedSource,
  type RecordMappedKey,
} from "#modules/object/utils/mapKeys";
import { mapValues } from "#modules/object/utils/mapValues";
import { plain } from "#modules/object/utils/plain";
import type { Callee } from "#types/Callee";
import type { CallReturnType } from "#types/CallReturnType";
import type { ObjectKey } from "#types/ObjectKey";
import type { ObjectValue } from "#types/ObjectValue";
import type { ToRecordKey } from "#types/ToRecordKey";

/**
 * Copies properties into a null-prototype record, optionally mapping keys and
 * values. Mapping visits enumerable string keys, including inherited ones. With
 * only a value transformer, objects include every own string and symbol key,
 * including non-enumerables, and exclude inherited keys; arrays produce indexed
 * records. Without either mapper, copies own enumerable strings and symbols.
 */
export function map<Source extends Record<string, any>>(
  source: Source,
  map?: undefined,
  transformer?: undefined,
): MappedSource<Source>;
export function map<Items extends readonly unknown[], Return>(
  source: Items,
  map: undefined,
  transformer: Callee<
    Return,
    [
      value: ObjectValue<Items>,
      key: ObjectKey<Items>,
      sourceKey: ObjectKey<Items>,
    ]
  >,
): { [Key in keyof MappedSource<Items, false>]: Return };
export function map<Source extends object, Return>(
  source: Source,
  map: undefined,
  transformer: Callee<
    Return,
    [value: Source[keyof Source], key: keyof Source, sourceKey: keyof Source]
  >,
): { -readonly [Key in keyof Source]: Return };
export function map<
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
export function map<
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
export function map<
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
export function map<
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
export function map(
  source: Record<string, any>,
  mapper?:
    | Record<string, PropertyKey | false>
    | Callee<PropertyKey | boolean | undefined, [key: string, value: any]>,
  transformer?: Callee<any, [value: any, key: PropertyKey, sourceKey: string]>,
): Record<string, any>;
export function map(
  source: Record<string, any>,
  map?:
    | Record<string, PropertyKey | false>
    | Callee<PropertyKey | boolean | undefined, [key: string, value: any]>,
  transform?: Callee,
) {
  if (!map && transform && isContainer(source)) {
    return mapValues(source, transform);
  }

  if (!isObject(source)) {
    return source;
  }

  if (!transform) {
    return mapKeys(source, map);
  }

  const mapper = keyMapper(map);

  const transformer = resolveCallable(transform);

  const mapped = plain<Record<PropertyKey, any>>();

  for (const key in source) {
    const actualKey = resolveMappedKey(mapper(key, source[key]), key);

    if (actualKey === undefined) {
      continue;
    }

    mapped[actualKey] = transformer(source[key], actualKey, key);
  }

  return mapped;
}
