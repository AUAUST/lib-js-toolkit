import { isArray } from "#modules/array/utils/isArray";
import { freeze } from "#modules/object/utils/freeze";
import { isPlainObject } from "#modules/object/utils/isPlainObject";
import { plain } from "#utils/plain";
import type { ReadonlyFunction } from "#types/ReadonlyFunction";

/**
 * Returns a shallow copy of the given value
 * with all properties marked as readonly.
 */
export function frozen<Target extends Function>(
  value: Target,
): ReadonlyFunction<Target>;
export function frozen<Target extends object>(value: Target): Readonly<Target>;
export function frozen(value: any): any {
  if (isArray(value)) {
    return freeze([...value]);
  }

  if (isPlainObject(value)) {
    return freeze(plain(value));
  }

  return freeze(value);
}
