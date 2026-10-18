import { assign, create } from "@auaust/toolkit/object";

/**
 * Returns a new plain object with the null prototype.
 * If an object is provided, it will be used to fill the new plain object.
 */
export function plain<Source extends {} = any>(): Source;
export function plain<Source extends {}>(value: Source): Source;
export function plain<Source extends {}>(value: Partial<Source>): Source;
export function plain(value?: {}): {} {
  return assign(create(null), value); // non-objects are ignored by Object.assign
}
