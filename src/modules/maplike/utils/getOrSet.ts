import { value, type ResolvableValue } from "#modules/general/utils/value";
import type { MapLike } from "#modules/maplike/types/MapLike";

/**
 * Returns the value stored under `key` when `map.has(key)`, even `undefined`;
 * otherwise resolves `fallback`, a value or a factory called with `key`, stores
 * it under `key` and returns it.
 */
export function getOrSet<Key, Value>(
  map: MapLike<Key, Value>,
  key: Key,
  fallback: ResolvableValue<Value, [key: Key]>,
): Value {
  if (map.has(key)) {
    // @debt The cast trusts that `has(key)` implies `get(key)` returns a stored `Value`; `ReadonlyMapLike` cannot express that link.
    return map.get(key) as Value;
  }

  const resolved = value(fallback, key);

  map.set(key, resolved);

  return resolved;
}
