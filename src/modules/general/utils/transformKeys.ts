import { remapKeys } from "#modules/general/internals/remapKeys";
import { keyMapper } from "#modules/general/utils/keyMapper";
import type {
  FunctionMappedKey,
  RecordMappedKey,
} from "#modules/general/utils/mappedKeys";
import type { Callee } from "#types/Callee";

export function transformKeys<Target extends object>(target: Target): Target;
export function transformKeys<
  Target extends object,
  Map extends Partial<Record<keyof Target, PropertyKey | false>>,
>(
  target: Target,
  map: Map,
): {
  [Key in keyof Target as RecordMappedKey<Key, Map>]: Target[Key];
};
export function transformKeys<
  Target extends object,
  Mapper extends Callee<
    PropertyKey | boolean | null | undefined,
    [key: keyof Target, value: Target[keyof Target]]
  >,
>(
  target: Target,
  mapper: Mapper,
): Record<FunctionMappedKey<Target, Mapper>, Target[keyof Target]>;
export function transformKeys(
  target: Record<string, any>,
  map?:
    | Record<string, PropertyKey | boolean>
    | Callee<PropertyKey | boolean | undefined, [key: string, value: any]>,
): Record<string, any>;
export function transformKeys(target: any, map?: any) {
  if (!map) {
    return target;
  }

  const mapper = keyMapper(map);

  const originals = {
    ...target,
  };

  return remapKeys(target, originals, mapper);
}
