import { emptiable } from "#modules/protocol/symbols";
import { implementsProtocol } from "#modules/protocol/utils/implementsProtocol";
import { count } from "#utils/count";
import { isNumber } from "#utils/isNumber";
import { isString } from "#utils/isString";
import { memberValue } from "#utils/memberValue";
import type { EmptyValueOf } from "#types/EmptyValueOf";

/** Checks for nullish values, blank strings, empty containers, or custom emptiness. */
export function empty<Value>(input: Value): input is EmptyValueOf<Value> {
  if (input == null) {
    return true;
  }

  if (isNumber(input)) {
    return false;
  }

  if (isString(input)) {
    return input.trim() === "";
  }

  if (implementsProtocol(emptiable, input)) {
    return !!memberValue(input, emptiable);
  }

  return count(input) === 0;
}

export type { EmptyValue } from "#types/EmptyValue";
export type { EmptyValueOf } from "#types/EmptyValueOf";
