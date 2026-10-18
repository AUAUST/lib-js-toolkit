import { type EmptyValue, empty } from "@auaust/toolkit/empty";

export type FilledValue<Value> = Value extends EmptyValue ? never : Value;

export function filled<Value>(value: Value): value is FilledValue<Value> {
  return !empty(value);
}
