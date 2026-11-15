/**
 * A collection that can be added to, such as a `Set` or a `WeakSet`.
 */
export interface WritableSetLike<Value> {
  /**
   * Adds `value`; the return value is ignored.
   */
  add(value: Value): unknown;
}
