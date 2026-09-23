import { isPlainObject } from "@auaust/toolkit/isPlainObject";
import { implementsProtocol } from "@auaust/toolkit/protocols";
import { countOf, type Countable } from "@auaust/toolkit/protocols/countable";

export function count(
  input: { length: number } | { size: number } | Countable,
): number;
export function count(input: unknown): number | undefined;
export function count(input: unknown): number | undefined {
  if (implementsProtocol(countOf, input)) {
    const result = input[countOf]();

    if (!Number.isSafeInteger(result) || result < 0) {
      throw new RangeError("A count must be a non-negative safe integer.");
    }

    return result;
  }

  if (typeof input === "string") {
    return input.length;
  }

  if (input && typeof input === "object") {
    if ("length" in input && typeof input.length === "number") {
      return input.length; // Takes care of arrays, but also several array-like objects
    }

    if ("size" in input && typeof input.size === "number") {
      return input.size; // Takes care of Maps and Sets
    }

    if (isPlainObject(input)) {
      return Object.keys(input).length;
    }
  }

  return undefined;
}
