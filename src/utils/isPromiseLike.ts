import { isFunction } from "#utils/isFunction";

/** Checks for an object or function with a function-valued `then` property. */
export function isPromiseLike<Value>(
  value: Value | PromiseLike<Value>,
): value is PromiseLike<Value> {
  return isFunction(value, "then");
}
