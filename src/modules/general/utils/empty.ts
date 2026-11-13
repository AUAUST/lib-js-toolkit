import { count } from "#modules/general/utils/count";
import { memberValue } from "#modules/general/utils/memberValue";
import { isNumber } from "#modules/number/guards/isNumber";
import { emptiable } from "#modules/protocol/symbols";
import { implementsProtocol } from "#modules/protocol/utils/implementsProtocol";
import { isString } from "#modules/string/guards/isString";
import type { EmptyValueOf } from "#types/EmptyValueOf";

/**
 * Checks for nullish values, blank strings, empty containers, or custom emptiness.
 */
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
