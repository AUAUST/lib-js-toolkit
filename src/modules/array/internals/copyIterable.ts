import { from } from "#modules/array/utils/from";
import { isIterable } from "#modules/iterable/guards/isIterable";
import { isString } from "#modules/string/guards/isString";

// @debt Callers passing a plain `object` get `unknown[]` and rely on their overloads to restore the item type; typing them all with `Iterable<Item>` would keep it.
export function copyIterable<Item>(iterable: Iterable<Item> & object): Item[];
export function copyIterable(iterable: object): unknown[];
export function copyIterable(iterable: object): unknown[] {
  if (isString(iterable)) {
    throw new TypeError("Expected a non-string iterable.");
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  return from(iterable);
}
