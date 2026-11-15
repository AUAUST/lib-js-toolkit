import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { hasOwn } from "#modules/object/utils/hasOwn";
import type { PropertyValue } from "#types/PropertyValue";
import type { ToRecordKey } from "#types/ToRecordKey";

/**
 * Deletes own properties from the target. A single key returns its value, or
 * `undefined` when it is not an own property; a list of keys returns a new object
 * of the pulled own entries, skipping missing and inherited keys.
 */
export function pull<Target extends object, const Key extends PropertyKey>(
  target: Target,
  key: Key,
): PropertyValue<Target, Key, unknown> | undefined;
export function pull<
  Target extends object,
  const Keys extends readonly PropertyKey[],
>(
  target: Target,
  keys: Keys,
): {
  -readonly [
    Key in keyof Target as ToRecordKey<Key> extends ToRecordKey<Keys[number]>
      ? Key
      : never
  ]?: Target[Key];
};
export function pull(
  target: Record<PropertyKey, unknown>,
  keyOrKeys: PropertyKey | readonly PropertyKey[],
): unknown {
  if (isPropertyKey(keyOrKeys)) {
    return pullOwn(target, keyOrKeys);
  }

  const pulled: Record<PropertyKey, unknown> = {};

  for (const key of keyOrKeys) {
    if (hasOwn(target, key)) {
      pulled[key] = pullOwn(target, key);
    }
  }

  return pulled;
}

function pullOwn(
  target: Record<PropertyKey, unknown>,
  key: PropertyKey,
): unknown {
  if (!hasOwn(target, key)) {
    return;
  }

  const value = target[key];

  delete target[key];

  return value;
}
