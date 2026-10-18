import { call } from "@auaust/toolkit/call";
import { keyMapper } from "@auaust/toolkit/keyMapper";
import { mappedKeys } from "@auaust/toolkit/mappedKeys";
import { mappedValues } from "@auaust/toolkit/mappedValues";
import { plain } from "@auaust/toolkit/plain";
import type { Callee, CallReturnType } from "@auaust/toolkit/types";

type RecordMappedKey<K, M> = M extends object
  ? K extends keyof M
    ? M[K] extends false
      ? never
      : M[K] extends PropertyKey
        ? M[K]
        : K
    : K
  : K;

type FunctionMappedKey<S, M extends Callee> =
  | Exclude<CallReturnType<M>, false | true | undefined>
  | (true extends CallReturnType<M> ? keyof S : never);

export function mapped<Source extends Record<string, any>>(
  source: Source,
): Source;
export function mapped<
  Source extends Record<string, any>,
  Map extends Partial<Record<keyof Source, PropertyKey | false>>,
>(
  source: Source,
  map: Map,
): {
  [K in keyof Source as RecordMappedKey<K, Map>]: Source[K];
};
export function mapped<
  Source extends Record<string, any>,
  Mapper extends Callee<
    PropertyKey | boolean | undefined,
    [key: keyof Source, value: Source[keyof Source]]
  >,
>(
  source: Source,
  mapper: Mapper,
): Record<FunctionMappedKey<Source, Mapper>, Source[keyof Source]>;
export function mapped<
  Source extends Record<string, any>,
  Mapper extends Callee<
    PropertyKey | boolean | undefined,
    [key: keyof Source, value: Source[keyof Source]]
  >,
  Transformer extends Callee<
    any,
    [
      value: Source[keyof Source],
      key: FunctionMappedKey<Source, Mapper>,
      sourceKey: keyof Source,
    ]
  >,
>(
  source: Source,
  mapper: Mapper,
  transformer: Transformer,
): Record<FunctionMappedKey<Source, Mapper>, CallReturnType<Transformer>>;
export function mapped<
  Source extends Record<string, any>,
  Map extends Partial<Record<keyof Source, PropertyKey | false>> | undefined,
  Transformer extends Callee<
    any,
    [
      value: Source[keyof Source],
      key: RecordMappedKey<keyof Source, Map>,
      sourceKey: keyof Source,
    ]
  >,
>(
  source: Source,
  map?: Map,
  transformer?: Transformer,
): {
  [K in keyof Source as RecordMappedKey<K, Map>]: CallReturnType<Transformer>;
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
  if (!source || typeof source !== "object") {
    return source;
  }

  if (!transform) {
    return mappedKeys(source, map);
  }

  if (!map) {
    return mappedValues(source, transform);
  }

  const mapper = keyMapper(map);

  const mapped = plain();

  for (const key in source) {
    const newKey = mapper(key, source[key]);

    if (newKey === false || newKey == null) {
      continue;
    }

    const actualKey = newKey === true ? key : newKey;

    mapped[actualKey] = call(transform, source[key], actualKey, key);
  }

  return mapped;
}
