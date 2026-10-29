import type { Assigned } from "#types/Assigned";

export type SetOrDeleted<Target, Key extends PropertyKey, Value> = [
  Value,
] extends [undefined]
  ? Omit<Target, Key>
  : undefined extends Value
    ? | Omit<Target, Key>
      | Assigned<Target, [Record<Key, Exclude<Value, undefined>>]>
    : Assigned<Target, [Record<Key, Value>]>;

export function setOrDelete<
  Target extends object,
  Key extends PropertyKey,
  Value,
>(target: Target, key: Key, value: Value): SetOrDeleted<Target, Key, Value>;
export function setOrDelete(
  target: Record<PropertyKey, unknown>,
  key: PropertyKey,
  value: unknown,
) {
  if (value === undefined) {
    delete target[key];
  } else {
    target[key] = value;
  }

  return target;
}
