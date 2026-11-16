import { isPrimitive } from "#modules/guard/guards/isPrimitive";
import { isSymbol } from "#modules/guard/guards/isSymbol";
import { defineProperty } from "#modules/object/utils/defineProperty";
import { keys } from "#modules/object/utils/keys";

type InvertedKey<Value> = Value extends string | symbol
  ? Value
  : Value extends number | bigint | boolean
    ? `${Value}`
    : never;

/**
 * `Target` with its own string keys and their values swapped.
 */
export type Inverted<Target> = {
  -readonly [Key in keyof Target & string as InvertedKey<Target[Key]>]: Key;
};

/**
 * Returns a new plain object whose keys are `target`'s own enumerable string-keyed
 * values and whose values are their keys. Symbols stay as is, numbers, bigints
 * and booleans become their string form, and `null` and `undefined` values are
 * skipped. When two values give the same key, the last wins.
 *
 * @throws {TypeError} When a value is an object or a function.
 */
export function invert<Target extends object>(target: Target): Inverted<Target>;
export function invert(
  target: Record<string, unknown>,
): Record<PropertyKey, string> {
  const result: Record<PropertyKey, string> = {};

  for (const key of keys(target)) {
    const value = target[key];

    if (value == null) {
      continue;
    }

    if (!isPrimitive(value)) {
      throw new TypeError(`Value of key "${key}" is not a primitive.`);
    }

    defineProperty(result, isSymbol(value) ? value : String(value), {
      value: key,
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }

  return result;
}
