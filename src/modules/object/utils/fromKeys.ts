import { isIterable } from "#modules/iterable/guards/isIterable";
import { defineProperty } from "#modules/object/utils/defineProperty";
import { isString } from "#modules/string/guards/isString";

/**
 * Builds a new plain object from any iterable of keys but a string, storing
 * under each key the resolver's result for it. A repeated key calls the resolver
 * again and the last result wins.
 *
 * @throws {TypeError} When `keys` is a string or is not iterable.
 */
export function fromKeys<const Key extends PropertyKey, Value>(
  keys: Iterable<Key> & object,
  resolver: (key: Key) => Value,
): { -readonly [K in Key]: Value };
// @debt Duplicates the non-string iterable check of `array` internals `copyIterable`; a shared iterable helper would own it.
export function fromKeys(
  keys: Iterable<PropertyKey> & object,
  resolver: (key: PropertyKey) => unknown,
): Record<PropertyKey, unknown> {
  if (isString(keys)) {
    throw new TypeError("Expected a non-string iterable.");
  }

  if (!isIterable(keys)) {
    throw new TypeError("Expected an iterable.");
  }

  const result: Record<PropertyKey, unknown> = {};

  for (const key of keys) {
    defineProperty(result, key, {
      value: resolver(key),
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }

  return result;
}
