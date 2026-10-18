import type { Assigned } from "@auaust/toolkit/types";

export function set<Target extends object, Key extends PropertyKey, Value>(
  target: Target,
  key: Key,
  value: Value,
): Assigned<Target, [Record<Key, Value>]>;
export function set(target: any, key: PropertyKey, value: unknown): any {
  target[key] = value;

  return target;
}
