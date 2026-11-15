/**
 * A keyed store that can be written, such as a `Map` or a `WeakMap`.
 */
export interface WritableMapLike<Key, Value> {
  /**
   * Stores `value` under `key`; the return value is ignored.
   */
  set(key: Key, value: Value): unknown;
}
