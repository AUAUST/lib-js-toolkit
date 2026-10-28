import { hasOwn } from "@auaust/toolkit/object";
import type { PropertyValue } from "@auaust/toolkit/types";

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
