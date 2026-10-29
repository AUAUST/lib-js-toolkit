import { empty } from "#utils/empty";
import type { FilledValue } from "#types/FilledValue";

/** Checks for values that are not empty, respecting custom emptiness protocols. */
export function filled<Value>(value: Value): value is FilledValue<Value> {
  return !empty(value);
}

export type { FilledValue } from "#types/FilledValue";
