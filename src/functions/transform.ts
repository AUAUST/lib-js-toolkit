import { keyMapper } from "@auaust/toolkit/keyMapper";
import { plain } from "@auaust/toolkit/plain";
import { transformKeys } from "@auaust/toolkit/transformKeys";
import { transformValues } from "@auaust/toolkit/transformValues";

type RecordMappedKey<Key, Map> = Map extends object
  ? Key extends keyof Map
    ? Map[Key] extends false
      ? never
      : Map[Key] extends PropertyKey
        ? Map[Key]
        : Key
    : Key
  : Key;

type FunctionMappedKey<Target, Mapper extends (...args: any[]) => any> =
  | Exclude<ReturnType<Mapper>, boolean | undefined>
  | (true extends ReturnType<Mapper> ? keyof Target : never);

export function transform<Target extends Record<string, any>>(
  target: Target,
): Target;
export function transform<
  Target extends Record<string, any>,
  Map extends Partial<Record<keyof Target, PropertyKey | boolean>>,
>(
  target: Target,
  map: Map,
): {
  [K in keyof Target as RecordMappedKey<K, Map>]: Target[K];
};
export function transform<
  Target extends Record<string, any>,
  Mapper extends (
    key: keyof Target,
    value: Target[keyof Target],
  ) => PropertyKey | boolean | undefined,
>(
  target: Target,
  mapper: Mapper,
): Record<FunctionMappedKey<Target, Mapper>, Target[keyof Target]>;
export function transform<
  Target extends Record<string, any>,
  Mapper extends (
    key: keyof Target,
    value: Target[keyof Target],
  ) => PropertyKey | boolean | undefined,
  Transformer extends (
    value: Target[keyof Target],
    key: FunctionMappedKey<Target, Mapper>,
    sourceKey: keyof Target,
  ) => any,
>(
  target: Target,
  mapper: Mapper,
  transformer: Transformer,
): Record<FunctionMappedKey<Target, Mapper>, ReturnType<Transformer>>;
export function transform<
  Target extends Record<string, any>,
  Map extends Partial<Record<keyof Target, PropertyKey | boolean>> | undefined,
  Transformer extends (
    value: Target[keyof Target],
    key: RecordMappedKey<keyof Target, Map>,
    sourceKey: keyof Target,
  ) => any,
>(
  target: Target,
  map?: Map,
  transformer?: Transformer,
): {
  [K in keyof Target as RecordMappedKey<K, Map>]: ReturnType<Transformer>;
};
export function transform(
  target: Record<string, any>,
  mapper?:
    | Record<string, PropertyKey | boolean>
    | ((key: string, value: any) => PropertyKey | boolean | undefined),
  transformer?: (value: any, key: PropertyKey, sourceKey: string) => any,
): Record<string, any>;
export function transform(
  target: any,
  map?:
    | Record<string, PropertyKey | boolean>
    | ((key: string, value: any) => PropertyKey | boolean | undefined),
  transform?: (value: any, key: PropertyKey, sourceKey: string) => any,
) {
  if (!target || typeof target !== "object") {
    return target;
  }

  if (!transform) {
    return transformKeys(target, map);
  }

  if (!map) {
    return transformValues(target, transform);
  }

  const originals = plain(target);

  const mapper = keyMapper(map);

  const overrides = new Set<PropertyKey>();

  for (const key of Object.keys(originals)) {
    const wasOverwritten = overrides.has(key);

    const value = originals[key];

    const newKey = mapper(key, value);

    if (newKey === false || newKey == null) {
      if (!wasOverwritten) {
        delete target[key];
      }

      continue;
    }

    const actualKey = newKey === true ? key : newKey;

    overrides.add(actualKey);

    target[actualKey] = transform(value, actualKey, key);

    if (actualKey !== key && !wasOverwritten) {
      delete target[key];
    }
  }

  return target;
}
