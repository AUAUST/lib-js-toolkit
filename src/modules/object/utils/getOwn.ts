import { hasOwn } from "#modules/object/utils/hasOwn";
import type { PropertyValue } from "#types/PropertyValue";

export function getOwn<Target extends {}, Key extends PropertyKey>(
  target: Target,
  key: Key,
): PropertyValue<Target, Key> | undefined;
export function getOwn<Value>(target: {}, key: PropertyKey): Value | undefined;
export function getOwn(
  target: Record<PropertyKey, unknown>,
  key: PropertyKey,
): unknown {
  if (hasOwn(target, key)) {
    return target[key];
  }
}
