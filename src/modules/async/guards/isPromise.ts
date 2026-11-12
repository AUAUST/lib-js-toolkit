/** Checks for a promise using the current realm's Promise constructor. */
export function isPromise<Value>(
  candidate: Value | Promise<Value>,
): candidate is Promise<Value> {
  return candidate instanceof Promise;
}
