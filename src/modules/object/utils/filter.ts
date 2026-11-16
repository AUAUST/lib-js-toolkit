import { defineProperty } from "#modules/object/utils/defineProperty";
import { ownEnumerableKeys } from "#modules/object/utils/ownEnumerableKeys";
import type { Simplify } from "#types/Simplify";

/**
 * Receives each entry with the object; a truthy return keeps the entry.
 */
export type FilterPredicate<Target extends object> = (
  value: Target[keyof Target],
  key: keyof Target,
  object: Readonly<Target>,
) => unknown;

type NullishKey<Target> = {
  [Key in keyof Target]-?: null extends Target[Key]
    ? Key
    : undefined extends Target[Key]
      ? Key
      : never;
}[keyof Target];

/**
 * `Target` without its `null` and `undefined` values.
 */
export type DefinedEntries<Target> = Simplify<
  {
    -readonly [Key in Exclude<keyof Target, NullishKey<Target>>]: Target[Key];
  } & {
    -readonly [
      Key in NullishKey<Target> as [NonNullable<Target[Key]>] extends [never]
        ? never
        : Key
    ]?: NonNullable<Target[Key]>;
  }
>;

/**
 * Returns a new plain object holding the own enumerable entries, string and
 * symbol keyed, whose value the predicate accepts; without a predicate, the
 * entries whose value is neither `null` nor `undefined`. Entries are written as
 * own data properties, so a `__proto__` key stays a key. Never mutates `target`.
 */
export function filter<Target extends object>(
  target: Target,
): DefinedEntries<Target>;
export function filter<
  Target extends object,
  Output extends Target[keyof Target],
>(
  target: Target,
  predicate: (
    value: Target[keyof Target],
    key: keyof Target,
    object: Readonly<Target>,
  ) => value is Output,
): { -readonly [Key in keyof Target]?: Extract<Target[Key], Output> };
export function filter<Target extends object>(
  target: Target,
  predicate: FilterPredicate<Target>,
): { -readonly [Key in keyof Target]?: Target[Key] };
export function filter(
  target: Record<PropertyKey, unknown>,
  predicate: FilterPredicate<Record<PropertyKey, unknown>> = (value) => {
    return value != null;
  },
): Record<PropertyKey, unknown> {
  const result: Record<PropertyKey, unknown> = {};

  for (const key of ownEnumerableKeys(target)) {
    const value = target[key];

    if (predicate(value, key, target)) {
      defineProperty(result, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  }

  return result;
}
