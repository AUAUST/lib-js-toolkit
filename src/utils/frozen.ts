import { isArray } from "@auaust/toolkit/isArray";
import { isPlainObject } from "@auaust/toolkit/isPlainObject";
import { plain } from "@auaust/toolkit/plain";
import type { ReadonlyFunction } from "@auaust/toolkit/types";

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
    return Object.freeze([...value]);
  }

  if (isPlainObject(value)) {
    return Object.freeze(plain(value));
  }

  return Object.freeze(value);
}
