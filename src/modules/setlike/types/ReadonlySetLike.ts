/**
 * A collection that can be queried, such as a `Set` or a `WeakSet`.
 */
export interface ReadonlySetLike<Value> {
  has(value: Value): boolean;
}
