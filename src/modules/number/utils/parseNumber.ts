import { isArray } from "#modules/array/guards/isArray";
import { isBigInt } from "#modules/guard/guards/isBigInt";
import { isNaN } from "#modules/number/guards/isNaN";
import { isNumber } from "#modules/number/guards/isNumber";
import { isObject } from "#modules/object/guards/isObject";
import { isString } from "#modules/string/guards/isString";

const invalidSeparatorPattern = /(?<!\d)_|_(?!\d)/;

/** Returns a meaningful numeric value or `undefined`, never `NaN`; never mutates its input. */
export function parseNumber(input: unknown): number | undefined {
  if (isNumber(input)) {
    return isNaN(input) ? undefined : input;
  }

  if (isString(input)) {
    const trimmed = input.trim();

    if (!trimmed || invalidSeparatorPattern.test(trimmed)) {
      return;
    }

    const number = Number(trimmed.replaceAll("_", ""));

    return isNaN(number) ? undefined : number;
  }

  if (isBigInt(input)) {
    return input >= -Number.MAX_SAFE_INTEGER && input <= Number.MAX_SAFE_INTEGER
      ? Number(input)
      : undefined;
  }

  if (!isObject(input) || isArray(input)) {
    return;
  }

  const number = Number(input);

  return isNaN(number) ? undefined : number;
}
