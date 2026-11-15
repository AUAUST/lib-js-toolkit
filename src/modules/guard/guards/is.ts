import { isArray } from "#modules/array/guards/isArray";
import { isBoolean } from "#modules/boolean/guards/isBoolean";
import { isFunction } from "#modules/function/guards/isFunction";
import { isBigInt } from "#modules/guard/guards/isBigInt";
import { isContainer } from "#modules/guard/guards/isContainer";
import { isNull } from "#modules/guard/guards/isNull";
import { isNullish } from "#modules/guard/guards/isNullish";
import { isPrimitive } from "#modules/guard/guards/isPrimitive";
import { isSymbol } from "#modules/guard/guards/isSymbol";
import { isUndefined } from "#modules/guard/guards/isUndefined";
import { isNumber } from "#modules/number/guards/isNumber";
import { isObject } from "#modules/object/guards/isObject";
import { isString } from "#modules/string/guards/isString";
import type { TypeName } from "#types/TypeName";
import type { TypeNames } from "#types/TypeNames";

const guards: {
  readonly [Name in TypeName]: (
    candidate: unknown,
  ) => candidate is TypeNames[Name];
} = {
  bigint: isBigInt,
  boolean: isBoolean,
  container: isContainer,
  function: isFunction,
  null: isNull,
  nullish: isNullish,
  number: isNumber,
  object: isObject,
  primitive: isPrimitive,
  string: isString,
  symbol: isSymbol,
  undefined: isUndefined,
  array: (candidate) => isArray(candidate),
  numeric: (candidate) => {
    return isNumber(candidate) || isBigInt(candidate);
  },
  scalar: (candidate) => {
    return (
      isString(candidate) ||
      isBoolean(candidate) ||
      isNumber(candidate) ||
      isBigInt(candidate)
    );
  },
  unknown: (unusedCandidate): unusedCandidate is unknown => true,
};

/**
 * Returns `true` when the candidate matches any of the given type names.
 */
export function is<const Names extends readonly TypeName[]>(
  candidate: unknown,
  ...types: Names
): candidate is TypeNames[Names[number]] {
  return types.some((type) => guards[type](candidate));
}
