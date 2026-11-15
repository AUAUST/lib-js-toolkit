import type { MapLike } from "#modules/maplike/types/MapLike";

/**
 * Stores `value` under `key` and returns `map`.
 *
 * @throws {TypeError} When `map.has(key)`, leaving the stored value unchanged.
 */
export function insert<Target extends MapLike<Key, Value>, Key, Value>(
  map: Target,
  key: Key,
  value: Value,
): Target {
  if (map.has(key)) {
    throw new TypeError(`Key "${String(key)}" is already set.`);
  }

  map.set(key, value);

  return map;
}
