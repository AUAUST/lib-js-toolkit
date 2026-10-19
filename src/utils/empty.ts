import { count } from "@auaust/toolkit/count";
import { isNumber } from "@auaust/toolkit/isNumber";
import { isString } from "@auaust/toolkit/isString";
import { memberValue } from "@auaust/toolkit/memberValue";
import { implementsProtocol } from "@auaust/toolkit/protocols";
import { isEmpty } from "@auaust/toolkit/protocols/emptiable";
import type { EmptyValueOf } from "@auaust/toolkit/types";

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

  if (implementsProtocol(isEmpty, input)) {
    return !!memberValue(input, isEmpty);
  }

  return count(input) === 0;
}

export type { EmptyValue, EmptyValueOf } from "@auaust/toolkit/types";
