import { isBoolean } from "#modules/boolean/guards/isBoolean";
import { isFunction } from "#modules/function/guards/isFunction";
import { isBigInt } from "#modules/guard/guards/isBigInt";
import { isSymbol } from "#modules/guard/guards/isSymbol";
import { isNumber } from "#modules/number/guards/isNumber";
import { isString } from "#modules/string/guards/isString";
import { ownDataValue } from "#modules/string/internals/ownDataValue";

/**
 * Renders a primitive or a function for `inspect`; `undefined` for any
 * other object.
 */
export function inspectPrimitive(
  value: unknown,
  maxStringLength: number,
): string | undefined {
  if (value == null || isBoolean(value) || isNumber(value)) {
    return value === 0 && 1 / value < 0 ? "-0" : String(value);
  }

  if (isBigInt(value)) {
    return `${String(value)}n`;
  }

  if (isSymbol(value)) {
    return `Symbol(${value.description ?? ""})`;
  }

  if (isString(value)) {
    return quote(value, maxStringLength);
  }

  return isFunction(value) ? inspectFunction(value) : undefined;
}

function inspectFunction(value: object) {
  const name = ownDataValue(value, "name");

  return isString(name) && name
    ? `[Function ${name}]`
    : "[Function (anonymous)]";
}

function quote(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return JSON.stringify(value);
  }

  const kept = JSON.stringify(value.slice(0, maxLength)).slice(0, -1);

  return `${kept}..." (+${value.length - maxLength} chars)`;
}
