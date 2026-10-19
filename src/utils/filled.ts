import { empty } from "@auaust/toolkit/empty";
import type { FilledValue } from "@auaust/toolkit/types";

/** Checks for values that are not empty, respecting custom emptiness protocols. */
export function filled<Value>(value: Value): value is FilledValue<Value> {
  return !empty(value);
}

export type { FilledValue } from "@auaust/toolkit/types";
