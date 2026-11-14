import { isArray } from "#modules/array/guards/isArray";
import { isBigInt } from "#modules/guard/guards/isBigInt";
import { isNaN } from "#modules/number/guards/isNaN";
import { isNumber } from "#modules/number/guards/isNumber";
import { toNumber } from "#modules/number/utils/toNumber";
import { isObject } from "#modules/object/guards/isObject";
import { isString } from "#modules/string/guards/isString";

const invalidSeparatorPattern = /(?<!\d)_|_(?!\d)/;

/**
 * Returns a meaningful numeric value or `undefined`, never `NaN`; never mutates
 * its input.
 */
export function parseNumber(input: unknown): number | undefined {
  if (isNumber(input)) {
    return isNaN(input) ? undefined : input;
  }

  if (isString(input)) {
    return parseNumericString(input);
  }

  if (isBigInt(input)) {
    return input >= -Number.MAX_SAFE_INTEGER && input <= Number.MAX_SAFE_INTEGER
      ? toNumber(input)
      : undefined;
  }

  if (!isObject(input) || isArray(input)) {
    return;
  }

  const number = toNumber(input);

  return isNaN(number) ? undefined : number;
}

function parseNumericString(input: string): number | undefined {
  const trimmed = input.trim();

  if (!trimmed || invalidSeparatorPattern.test(trimmed)) {
    return;
  }

  const number = toNumber(trimmed.replaceAll("_", ""));

  return isNaN(number) ? undefined : number;
}
