import { resolveCallable } from "#modules/function/utils/resolveCallable";
import { isObject } from "#modules/object/guards/isObject";
import { remapKeys } from "#modules/object/internals/remapKeys";
import { keyMapper } from "#modules/object/utils/keyMapper";
import { plain } from "#modules/object/utils/plain";
import { transformKeys } from "#modules/object/utils/transformKeys";
import { transformValues } from "#modules/object/utils/transformValues";
import type { Callee } from "#types/Callee";
import type { CallReturnType } from "#types/CallReturnType";

type RecordMappedKey<Key, Map> = Map extends object
  ? Key extends keyof Map
    ? Map[Key] extends false
      ? never
      : Map[Key] extends PropertyKey
        ? Map[Key]
        : Key
    : Key
  : Key;

type FunctionMappedKey<Target, Mapper extends Callee> =
  | Exclude<CallReturnType<Mapper>, boolean | undefined>
  | (true extends CallReturnType<Mapper> ? keyof Target : never);

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
  Mapper extends Callee<
    PropertyKey | boolean | undefined,
    [key: keyof Target, value: Target[keyof Target]]
  >,
>(
  target: Target,
  mapper: Mapper,
): Record<FunctionMappedKey<Target, Mapper>, Target[keyof Target]>;
export function transform<
  Target extends Record<string, any>,
  Mapper extends Callee<
    PropertyKey | boolean | undefined,
    [key: keyof Target, value: Target[keyof Target]]
  >,
  Transformer extends Callee<
    any,
    [
      value: Target[keyof Target],
      key: FunctionMappedKey<Target, Mapper>,
      sourceKey: keyof Target,
    ]
  >,
>(
  target: Target,
  mapper: Mapper,
  transformer: Transformer,
): Record<FunctionMappedKey<Target, Mapper>, CallReturnType<Transformer>>;
export function transform<
  Target extends Record<string, any>,
  Map extends Partial<Record<keyof Target, PropertyKey | boolean>> | undefined,
  Transformer extends Callee<
    any,
    [
      value: Target[keyof Target],
      key: RecordMappedKey<keyof Target, Map>,
      sourceKey: keyof Target,
    ]
  >,
>(
  target: Target,
  map?: Map,
  transformer?: Transformer,
): {
  [K in keyof Target as RecordMappedKey<K, Map>]: CallReturnType<Transformer>;
};
export function transform(
  target: Record<string, any>,
  mapper?:
    | Record<string, PropertyKey | boolean>
    | Callee<PropertyKey | boolean | undefined, [key: string, value: any]>,
  transformer?: Callee<any, [value: any, key: PropertyKey, sourceKey: string]>,
): Record<string, any>;
export function transform(
  target: Record<PropertyKey, any>,
  map?:
    | Record<string, PropertyKey | boolean>
    | Callee<PropertyKey | boolean | undefined, [key: string, value: any]>,
  transform?: Callee<any, [value: any, key: PropertyKey, sourceKey: string]>,
) {
  if (!isObject(target)) {
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

  const transformer = resolveCallable(transform);

  return remapKeys(target, originals, mapper, transformer);
}
