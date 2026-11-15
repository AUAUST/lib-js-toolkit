import { isIterable } from "#modules/iterable/guards/isIterable";
import { isString } from "#modules/string/guards/isString";
import type { Joined } from "#types/Joined";
import type { Maybe } from "#types/Maybe";

// @debt `String` converts a symbol where `Array.prototype.join` throws; a conversion with the native ToString semantics would match it.

/**
 * Joins the values of an iterable into a string with a separator, `","` by
 * default, reading it to its end; `null` and `undefined` join as `""`, as with
 * `Array.prototype.join`. A tuple of literals joins into a literal type. A
 * nullish source returns `undefined`.
 *
 * @throws {TypeError} when the source is not iterable or the separator
 * is not a string.
 */
export function join<
  const Items extends readonly unknown[],
  Separator extends string = ",",
>(iterable: Items, separator?: Separator): Joined<Items, Separator>;
export function join(iterable: Iterable<unknown>, separator?: string): string;
export function join(
  iterable: Maybe<Iterable<unknown>>,
  separator?: string,
): string | undefined;
export function join(
  iterable: Maybe<Iterable<unknown>>,
  separator = ",",
): string | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  if (!isString(separator)) {
    throw new TypeError("Expected a string separator.");
  }

  let result = "";
  let started = false;

  for (const value of iterable) {
    if (started) {
      result += separator;
    }

    started = true;

    if (value != null) {
      result += String(value);
    }
  }

  return result;
}
