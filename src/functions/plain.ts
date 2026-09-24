/**
 * Returns a new plain object with the null prototype.
 * If an object is provided, it will be used to fill the new plain object.
 */
export function plain<T extends {}>(): T;
export function plain<T extends {}>(value: T): T;
export function plain(value?: {}): {} {
  return Object.assign(Object.create(null), value); // non-objects are ignored by Object.assign
}
