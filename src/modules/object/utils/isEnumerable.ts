/**
 * Checks that `key` is an own enumerable property of `target`; an inherited or
 * missing property is not.
 *
 * @native equal Object.prototype.propertyIsEnumerable
 */
export function isEnumerable(target: {}, key: PropertyKey): boolean {
  return Object.prototype.propertyIsEnumerable.call(target, key);
}
