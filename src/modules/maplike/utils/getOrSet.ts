import { value, type ValueInput } from "#modules/general/utils/value";
import type { MapLike } from "#modules/maplike/types/MapLike";

/**
 * Returns the value stored under `key` when `map.has(key)`, even `undefined`;
 * otherwise resolves `fallback`, a value or a factory called with `key`, stores
 * it under `key` and returns it.
 */
export function getOrSet<Key, Value>(
  map: MapLike<Key, Value>,
  key: Key,
  fallback: (key: Key) => Value,
): Value;
export function getOrSet<Key, Value, Fallback extends Value>(
  map: MapLike<Key, Value>,
  key: Key,
  fallback: ValueInput<Fallback, [Key], undefined>,
): Value;
export function getOrSet(
  map: MapLike<unknown, unknown>,
  key: unknown,
  fallback: unknown,
) {
  if (map.has(key)) {
    return map.get(key);
  }

  const resolved = value(fallback, key);

  map.set(key, resolved);

  return resolved;
}
