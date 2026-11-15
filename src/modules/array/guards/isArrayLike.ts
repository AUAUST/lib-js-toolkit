import { isFunction } from "#modules/function/guards/isFunction";
import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import { isObject } from "#modules/object/guards/isObject";
import { get } from "#modules/object/utils/get";
import { isString } from "#modules/string/guards/isString";

/**
 * Checks for a string, or a non-function object whose own or inherited `length`
 * is a safe integer of at least `0`. Reads `length`, running any getter; never
 * reads indexed entries.
 */
export function isArrayLike(
  candidate: unknown,
): candidate is ArrayLike<unknown> {
  if (isString(candidate)) {
    return true;
  }

  if (!isObject(candidate) || isFunction(candidate)) {
    return false;
  }

  const length = get(candidate, "length");

  return isSafeInteger(length) && length >= 0;
}
