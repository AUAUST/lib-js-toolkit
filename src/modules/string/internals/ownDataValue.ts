/**
 * Returns the value of the target's own data property, `undefined` for a missing
 * key or an accessor, which is never called.
 */
export function ownDataValue(target: object, key: PropertyKey): unknown {
  const descriptor = Reflect.getOwnPropertyDescriptor(target, key);

  return descriptor && "value" in descriptor ? descriptor.value : undefined;
}
