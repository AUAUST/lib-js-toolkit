import { keyMapper } from "@auaust/toolkit/keyMapper";
import type {
  FunctionMappedKey,
  RecordMappedKey,
} from "@auaust/toolkit/mappedKeys";

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
  Mapper extends (
    key: keyof Target,
    value: Target[keyof Target],
  ) => PropertyKey | boolean | null | undefined,
>(
  target: Target,
  mapper: Mapper,
): Record<FunctionMappedKey<Target, Mapper>, Target[keyof Target]>;
export function transformKeys(
  target: Record<string, any>,
  map?:
    | Record<string, PropertyKey | boolean>
    | ((key: string, value: any) => PropertyKey | boolean | undefined),
): Record<string, any>;
export function transformKeys(target: any, map?: any) {
  if (!map) {
    return target;
  }

  const mapper = keyMapper(map);

  const originals = { ...target };

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

    target[actualKey] = value;

    if (actualKey !== key && !wasOverwritten) {
      delete target[key];
    }
  }

  return target;
}
