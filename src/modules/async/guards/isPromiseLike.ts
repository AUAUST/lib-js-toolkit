import { isMethod } from "#modules/function/guards/isMethod";

/**
 * Checks for an object or function with a function-valued `then` property.
 */
export function isPromiseLike<Value>(
  candidate: Value | PromiseLike<Value>,
): candidate is PromiseLike<Value> {
  return isMethod(candidate, "then");
}
