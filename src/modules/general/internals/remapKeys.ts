import { resolveMappedKey } from "#modules/general/internals/resolveMappedKey";
import { keys } from "#modules/object/utils/keys";

/**
 * Remaps `target`'s keys in place from the `originals` snapshot, optionally
 * transforming values. A dropped or renamed key is deleted unless an earlier key
 * was remapped onto it.
 */
export function remapKeys(
  target: Record<PropertyKey, any>,
  originals: Record<string, any>,
  mapper: (key: string, value: any) => PropertyKey | boolean | null | undefined,
  transformer: (value: any, key: PropertyKey, sourceKey: string) => unknown = (
    value,
  ) => value,
): Record<PropertyKey, any> {
  const overrides = new Set<PropertyKey>();

  for (const key of keys(originals)) {
    const wasOverwritten = overrides.has(key);

    const value = originals[key];

    const actualKey = resolveMappedKey(mapper(key, value), key);

    if (actualKey !== undefined) {
      overrides.add(actualKey);

      target[actualKey] = transformer(value, actualKey, key);
    }

    if (actualKey !== key && !wasOverwritten) {
      delete target[key];
    }
  }

  return target;
}
