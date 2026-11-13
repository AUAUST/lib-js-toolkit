import { isFunction } from "#modules/function/guards/isFunction";
import { isString } from "#modules/string/guards/isString";

/**
 * Checks that the candidate has a callable `Symbol.iterator`; strings are iterable.
 */
export function isIterable(candidate: unknown): candidate is Iterable<unknown> {
  return isString(candidate) || isFunction(candidate, Symbol.iterator);
}
