import type { PropertyValue } from "#types/PropertyValue";

export function get<Target, Key extends PropertyKey>(
  target: Target,
  key: Key,
): PropertyValue<Target, Key>;
export function get<Value = unknown>(target: unknown, key: PropertyKey): Value;
export function get(target: any, key: PropertyKey): any {
  return target?.[key];
}
