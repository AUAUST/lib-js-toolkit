/**
 * Returns `Object.prototype.toString.call(candidate)`, such as `"[object Array]"`.
 * A `Symbol.toStringTag` property overrides the name; the tag matches
 * across realms.
 */
export function getTag(candidate: unknown): string {
  return Object.prototype.toString.call(candidate);
}
