import { isNumber } from "#modules/number/utils/isNumber";
import { isSafeInteger } from "#modules/number/utils/isSafeInteger";
import { isObject } from "#modules/object/utils/isObject";
import { isPlainObject } from "#modules/object/utils/isPlainObject";
import { keys } from "#modules/object/utils/keys";
import { countable } from "#modules/protocol/symbols";
import { implementsProtocol } from "#modules/protocol/utils/implementsProtocol";
import { isString } from "#modules/string/utils/isString";
import type { Countable } from "#modules/protocol/types/Countable";

export function count(
  input: Countable | { length: number } | { size: number },
): number;
export function count(input: unknown): number | undefined;
export function count(input: unknown): number | undefined {
  if (implementsProtocol(countable, input)) {
    const result = input[countable]();

    if (!isSafeInteger(result) || result < 0) {
      throw new RangeError("A count must be a non-negative safe integer.");
    }

    return result;
  }

  if (isString(input)) {
    return input.length;
  }

  if (isPlainObject(input)) {
    return keys(input).length;
  }

  if (!isObject(input)) {
    return;
  }

  let length: unknown;

  if ("length" in input && isNumber((length = input.length))) {
    return length; // Takes care of arrays, but also several array-like objects
  }

  if ("size" in input && isNumber((length = input.size))) {
    return length; // Takes care of Maps and Sets
  }
}
