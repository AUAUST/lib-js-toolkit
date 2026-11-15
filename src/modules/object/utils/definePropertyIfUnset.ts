import { defineProperty } from "#modules/object/utils/defineProperty";
import { hasOwn } from "#modules/object/utils/hasOwn";
import type { DefinedProperties } from "#types/DefinedProperties";
import type { Extended } from "#types/Extended";
import type { PropertyDescriptor } from "#types/PropertyDescriptor";

/**
 * Defines a property on the target and returns the target, unless it already has
 * an own property under that key; an inherited property counts as unset.
 */
export function definePropertyIfUnset<
  Target extends object,
  Key extends PropertyKey,
  const Descriptor extends PropertyDescriptor,
>(
  target: Target,
  key: Key,
  descriptor: Descriptor & ThisType<Target & Record<PropertyKey, any>>,
): Key extends keyof Target
  ? Target
  : Extended<Target, DefinedProperties<Record<Key, Descriptor>, Target>>;
export function definePropertyIfUnset(
  target: object,
  key: PropertyKey,
  descriptor: PropertyDescriptor,
): object {
  if (hasOwn(target, key)) {
    return target;
  }

  return defineProperty(target, key, descriptor);
}
