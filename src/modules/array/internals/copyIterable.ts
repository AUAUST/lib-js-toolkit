import { isIterable } from "#modules/iterable/guards/isIterable";
import { isString } from "#modules/string/guards/isString";

// @debt Returns `unknown[]`, so callers rely on their overloads to restore the item type; a generic `Iterable<Item>` signature would keep it.
export function copyIterable(iterable: object): unknown[] {
  if (isString(iterable)) {
    throw new TypeError("Expected a non-string iterable.");
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  return Array.from(iterable);
}
