import { hasOwn } from "#modules/object/utils/hasOwn";
import type { ToRecordKey } from "#types/ToRecordKey";

/**
 * Returns a new object holding the target's own properties under the given keys,
 * skipping missing and inherited keys. Numeric keys match their string form.
 */
export function pick<
  Target extends object,
  const Keys extends readonly PropertyKey[],
>(
  target: Target,
  ...keys: Keys
): {
  -readonly [
    Key in keyof Target as ToRecordKey<Key> extends ToRecordKey<Keys[number]>
      ? Key
      : never
  ]: Target[Key];
};
export function pick(
  target: Record<PropertyKey, unknown>,
  ...keys: PropertyKey[]
): Record<PropertyKey, unknown> {
  const picked: Record<PropertyKey, unknown> = {};

  for (const key of keys) {
    if (hasOwn(target, key)) {
      picked[key] = target[key];
    }
  }

  return picked;
}
