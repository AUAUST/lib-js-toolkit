import { isNumber } from "@auaust/toolkit/isNumber";
import { isObject } from "@auaust/toolkit/isObject";
import { isPlainObject } from "@auaust/toolkit/isPlainObject";
import { isString } from "@auaust/toolkit/isString";
import { isSafeInteger } from "@auaust/toolkit/math";
import { keys } from "@auaust/toolkit/object";
import { implementsProtocol } from "@auaust/toolkit/protocols";
import { countOf, type Countable } from "@auaust/toolkit/protocols/countable";

export function count(
  input: { length: number } | { size: number } | Countable,
): number;
export function count(input: unknown): number | undefined;
export function count(input: unknown): number | undefined {
  if (implementsProtocol(countOf, input)) {
    const result = input[countOf]();

    if (!isSafeInteger(result) || result < 0) {
      throw new RangeError("A count must be a non-negative safe integer.");
    }

    return result;
  }

  if (isString(input)) {
    return input.length;
  }

  if (isObject(input)) {
    if ("length" in input && isNumber(input.length)) {
      return input.length; // Takes care of arrays, but also several array-like objects
    }

    if ("size" in input && isNumber(input.size)) {
      return input.size; // Takes care of Maps and Sets
    }

    if (isPlainObject(input)) {
      return keys(input).length;
    }
  }

  return undefined;
}
