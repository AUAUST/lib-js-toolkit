import { isFunction } from "#modules/function/utils/isFunction";

/** Checks for an object or function with a function-valued `then` property. */
export function isPromiseLike<Value>(
  candidate: Value | PromiseLike<Value>,
): candidate is PromiseLike<Value> {
  return isFunction(candidate, "then");
}
