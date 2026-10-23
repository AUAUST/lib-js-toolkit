/** Checks for a promise using the current realm's Promise constructor. */
export function isPromise<Value>(
  value: Value | Promise<Value>,
): value is Promise<Value> {
  return value instanceof Promise;
}
