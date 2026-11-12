import { isArray } from "#modules/array/guards/isArray";
import { plain } from "#modules/general/utils/plain";
import { isPlainObject } from "#modules/object/guards/isPlainObject";
import { freeze } from "#modules/object/utils/freeze";
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
