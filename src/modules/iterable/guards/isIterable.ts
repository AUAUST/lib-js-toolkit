import { isFunction } from "#modules/function/guards/isFunction";
import { get } from "#modules/object/utils/get";

/**
 * Checks that the candidate has a callable `Symbol.iterator`; strings
 * are iterable.
 */
export function isIterable(candidate: unknown): candidate is Iterable<unknown> {
  return isFunction(get(candidate, Symbol.iterator));
}
