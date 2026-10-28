import {
  value,
  type ResolvedValue,
  type ValueInput,
} from "@auaust/toolkit/value";
import type { InitializedProperty } from "@auaust/toolkit/types";

export function getOrSet<Target extends object, Key extends PropertyKey, Value>(
  target: Target,
  key: Key,
  fallback: (key: Key) => Value,
): InitializedProperty<Target, Key, Value>;
export function getOrSet<
  Target extends object,
  Key extends PropertyKey,
  Fallback,
>(
  target: Target,
  key: Key,
  fallback: ValueInput<Fallback, [Key], undefined>,
): InitializedProperty<Target, Key, ResolvedValue<Fallback>>;
export function getOrSet(
  target: Record<PropertyKey, unknown>,
  key: PropertyKey,
  fallback: unknown,
) {
  if (!(key in target)) {
    target[key] = value(fallback, key);
  }

  return target[key];
}
