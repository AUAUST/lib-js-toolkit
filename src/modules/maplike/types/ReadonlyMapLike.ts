/**
 * A keyed store that can be read, such as a `Map` or a `WeakMap`.
 */
export interface ReadonlyMapLike<Key, Value> {
  has(key: Key): boolean;
  /**
   * Returns the value stored under `key`, or `undefined` when there is none.
   */
  get(key: Key): Value | undefined;
}
