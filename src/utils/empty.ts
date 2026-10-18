import { count } from "@auaust/toolkit/count";
import { isNumber } from "@auaust/toolkit/isNumber";
import { isString } from "@auaust/toolkit/isString";
import { implementsProtocol } from "@auaust/toolkit/protocols";
import { isEmpty, type Emptiable } from "@auaust/toolkit/protocols/emptiable";
import { value } from "@auaust/toolkit/value";

export type EmptyValue =
  | ""
  | []
  | Record<string, never>
  | Map<any, never>
  | Set<never>
  | null
  | undefined
  | Emptiable<true>;

export function empty(input: Emptiable): input is Emptiable<true>;
export function empty<Value>(input: Value): input is Value & EmptyValue;
export function empty(input: any): boolean {
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
    return !!value.call(input, input[isEmpty]);
  }

  return count(input) === 0;
}
