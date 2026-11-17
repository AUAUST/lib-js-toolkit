/**
 * Returns `Object.prototype.toString.call(value)`, such as `"[object Array]"`. A
 * `Symbol.toStringTag` property overrides the name; the tag matches across realms.
 */
export function getTag(value: unknown): string {
  return Reflect.apply(Object.prototype.toString, value, []);
}
