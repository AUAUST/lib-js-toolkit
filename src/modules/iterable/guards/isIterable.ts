import { isMethod } from "#modules/function/guards/isMethod";
import { isString } from "#modules/string/guards/isString";

/**
 * Checks that the candidate has a callable `Symbol.iterator`; strings are iterable.
 */
export function isIterable(candidate: unknown): candidate is Iterable<unknown> {
  return isString(candidate) || isMethod(candidate, Symbol.iterator);
}
