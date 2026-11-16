/**
 * Returns the getter of the target's own accessor property, without calling it.
 */
export function ownGetter(
  target: object,
  key: PropertyKey,
): (() => unknown) | undefined {
  return Reflect.getOwnPropertyDescriptor(target, key)?.get;
}
