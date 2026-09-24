import { keyMapper } from "@auaust/toolkit/keyMapper";
import { mappedKeys } from "@auaust/toolkit/mappedKeys";
import { mappedValues } from "@auaust/toolkit/mappedValues";
import { plain } from "@auaust/toolkit/plain";

type RecordMappedKey<K, M> = M extends object
  ? K extends keyof M
    ? M[K] extends false
      ? never
      : M[K] extends PropertyKey
        ? M[K]
        : K
    : K
  : K;

type FunctionMappedKey<S, M extends (...args: any[]) => any> =
  | Exclude<ReturnType<M>, false | true | undefined>
  | (true extends ReturnType<M> ? keyof S : never);

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
  Mapper extends (
    key: keyof Source,
    value: Source[keyof Source],
  ) => PropertyKey | boolean | undefined,
>(
  source: Source,
  mapper: Mapper,
): Record<FunctionMappedKey<Source, Mapper>, Source[keyof Source]>;
export function mapped<
  Source extends Record<string, any>,
  Mapper extends (
    key: keyof Source,
    value: Source[keyof Source],
  ) => PropertyKey | boolean | undefined,
  Transformer extends (
    value: Source[keyof Source],
    key: FunctionMappedKey<Source, Mapper>,
    sourceKey: keyof Source,
  ) => any,
>(
  source: Source,
  mapper: Mapper,
  transformer: Transformer,
): Record<FunctionMappedKey<Source, Mapper>, ReturnType<Transformer>>;
export function mapped<
  Source extends Record<string, any>,
  Map extends Partial<Record<keyof Source, PropertyKey | false>> | undefined,
  Transformer extends (
    value: Source[keyof Source],
    key: RecordMappedKey<keyof Source, Map>,
    sourceKey: keyof Source,
  ) => any,
>(
  source: Source,
  map?: Map,
  transformer?: Transformer,
): {
  [K in keyof Source as RecordMappedKey<K, Map>]: ReturnType<Transformer>;
};
export function mapped(
  source: Record<string, any>,
  mapper?:
    | Record<string, PropertyKey | false>
    | ((key: string, value: any) => PropertyKey | boolean | undefined),
  transformer?: (value: any, key: PropertyKey, sourceKey: string) => any,
): Record<string, any>;
export function mapped(
  source: Record<string, any>,
  map?:
    | Record<string, PropertyKey | false>
    | ((key: string, value: any) => PropertyKey | boolean | undefined),
  transform?: (value: any, key: PropertyKey, sourceKey: string) => any,
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

    mapped[actualKey] = transform(source[key], actualKey, key);
  }

  return mapped;
}
