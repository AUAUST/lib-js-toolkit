import { assign } from "#modules/object/utils/assign";
import type { ToRecordKey } from "#types/ToRecordKey";

/**
 * Returns a new object holding the target's own enumerable properties, string
 * and symbol keyed, except the given keys. Numeric keys match their string form.
 */
export function omit<
  Target extends object,
  const Keys extends readonly PropertyKey[],
>(
  target: Target,
  ...keys: Keys
): {
  -readonly [
    Key in keyof Target as ToRecordKey<Key> extends ToRecordKey<Keys[number]>
      ? never
      : Key
  ]: Target[Key];
};
export function omit(
  target: object,
  ...keys: PropertyKey[]
): Record<PropertyKey, unknown> {
  const copy: Record<PropertyKey, unknown> = assign({}, target);

  for (const key of keys) {
    delete copy[key];
  }

  return copy;
}
