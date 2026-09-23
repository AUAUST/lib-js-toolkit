import { type EmptyValue, empty } from "@auaust/toolkit/empty";

export type FilledValue<T> = T extends EmptyValue ? never : T;

export function filled<T>(value: T): value is FilledValue<T> {
  return !empty(value);
}
