import { isBoolean } from "#modules/boolean/guards/isBoolean";
import { isBigInt } from "#modules/guard/guards/isBigInt";
import { isNumber } from "#modules/number/guards/isNumber";
import { isString } from "#modules/string/guards/isString";

/**
 * Checks for a primitive `compare` orders with relational operators.
 */
export function isComparablePrimitive(
  candidate: unknown,
): candidate is string | number | bigint | boolean {
  return (
    isString(candidate) ||
    isNumber(candidate) ||
    isBigInt(candidate) ||
    isBoolean(candidate)
  );
}
