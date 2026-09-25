import { isPlainObject } from "@auaust/toolkit/isPlainObject";
import { plain } from "@auaust/toolkit/plain";
import type { ReadonlyFunction } from "@auaust/toolkit/types";

/**
 * Returns a shallow copy of the given value
 * with all properties marked as readonly.
 */
export function frozen<T extends Function>(value: T): ReadonlyFunction<T>;
export function frozen<T extends object>(value: T): Readonly<T>;
export function frozen(value: any): any {
  if (Array.isArray(value)) {
    return Object.freeze([...value]);
  }

  if (isPlainObject(value)) {
    return Object.freeze(plain(value));
  }

  return Object.freeze(value);
}
