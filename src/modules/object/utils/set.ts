import type { Assigned } from "#types/Assigned";

export function set<Target extends object, Key extends PropertyKey, Value>(
  target: Target,
  key: Key,
  value: Value,
): Assigned<Target, [Record<Key, Value>]>;
export function set(
  target: Record<PropertyKey, unknown>,
  key: PropertyKey,
  value: unknown,
): unknown {
  target[key] = value;

  return target;
}
