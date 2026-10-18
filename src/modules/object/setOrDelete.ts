import type { Assigned } from "@auaust/toolkit/types";

export type SetOrDeleted<Target, Key extends PropertyKey, Value> = [
  Value,
] extends [undefined]
  ? Omit<Target, Key>
  : undefined extends Value
    ?
        | Omit<Target, Key>
        | Assigned<Target, [Record<Key, Exclude<Value, undefined>>]>
    : Assigned<Target, [Record<Key, Value>]>;

export function setOrDelete<
  Target extends object,
  Key extends PropertyKey,
  Value,
>(target: Target, key: Key, value: Value): SetOrDeleted<Target, Key, Value>;
export function setOrDelete(
  target: any,
  key: PropertyKey,
  value: unknown,
): any {
  if (value === undefined) {
    delete target[key];
  } else {
    target[key] = value;
  }

  return target;
}
