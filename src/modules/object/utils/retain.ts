import { ownEnumerableKeys } from "#modules/object/utils/ownEnumerableKeys";
import type { FilterPredicate } from "#modules/object/utils/filter";

/**
 * Deletes `target`'s own enumerable keys, string and symbol keyed, whose value
 * the predicate rejects, and returns `target`; without a predicate, the keys
 * whose value is `null` or `undefined`. Keys are collected before any deletion.
 *
 * @throws {TypeError} When a rejected key is non-configurable.
 */
export function retain<Target extends object>(
  target: Target,
  predicate?: FilterPredicate<Target>,
): Target;
export function retain(
  target: Record<PropertyKey, unknown>,
  predicate: FilterPredicate<Record<PropertyKey, unknown>> = (value) => {
    return value != null;
  },
): Record<PropertyKey, unknown> {
  for (const key of ownEnumerableKeys(target)) {
    if (!predicate(target[key], key, target)) {
      delete target[key];
    }
  }

  return target;
}
