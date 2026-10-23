import { isFunction } from "@auaust/toolkit/isFunction";

/** Checks for an object or function with a function-valued `then` property. */
export function isPromiseLike<Value>(
  value: Value | PromiseLike<Value>,
): value is PromiseLike<Value> {
  return isFunction(value, "then");
}
