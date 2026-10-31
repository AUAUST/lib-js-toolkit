/* eslint-disable auaust/no-loose-equal */

import { StateError } from "#errors/StateError";
import { isBoolean } from "#modules/boolean/utils/isBoolean";
import { isCallable } from "#modules/function/utils/isCallable";
import { isNaN } from "#modules/number/utils/isNaN";
import { call } from "#utils/call";
import { empty } from "#utils/empty";
import { filled } from "#utils/filled";
import type { Callee } from "#types/Callee";
import type { IsLiteral } from "#types/IsLiteral";
import type { KeyAsString } from "#types/KeyAsString";

export type Operator = BinaryOperator | UnaryOperator | OperatorFn;

export type UnaryOperator = "filled" | "empty";

export type BinaryOperator =
  // The two values resolve to the same string
  | "="
  // The two values are loosely equal
  | "=="
  | "==="
  | "!="
  | "!=="
  | "<"
  | "<="
  | ">"
  | ">="
  // The two values resolve to different boolean states
  | "!"
  // The two values resolve to the same boolean state
  | "!!";

export type OperatorFn = Callee<boolean, [a: unknown, b: unknown]>;

export type CustomOperators<OperatorKey extends string = string> = Record<
  OperatorKey,
  OperatorFn | boolean | null | undefined
>;

export type DisabledOperators<C extends CustomOperators> = {
  [K in keyof C]: C[K] extends null | undefined ? K : never;
}[keyof C];

export type AvailableOperators<C extends CustomOperators> =
  | IsLiteral<
      keyof C,
      Exclude<BinaryOperator | UnaryOperator | keyof C, DisabledOperators<C>>,
      BinaryOperator | UnaryOperator | KeyAsString<C>
    >
  | OperatorFn;

export function compare<Operators extends CustomOperators>(
  a: unknown,
  operator: AvailableOperators<Operators>,
  b: unknown,
  customOperators: Operators,
): boolean;
export function compare(
  value: unknown,
  operator: UnaryOperator,
  ignored?: unknown,
): boolean;
export function compare(a: unknown, operator: Operator, b: unknown): boolean;
export function compare(
  a: any,
  operator: Operator | string,
  b?: any,
  customOperators?: CustomOperators,
): boolean {
  if (isCallable(operator)) {
    return !!call(operator, a, b);
  }

  if (customOperators && operator in customOperators) {
    const customOperator = customOperators[operator];

    if (isBoolean(customOperator)) {
      return customOperator;
    }

    if (customOperator == null) {
      throw new StateError(
        `Attempted to use a disabled operator '${operator}'`,
      );
    }

    return !!call(customOperator, a, b);
  }

  switch (operator) {
    case "=": {
      return (
        (empty(a) && empty(b)) ||
        a.valueOf() == b.valueOf() ||
        (isNaN(a) && isNaN(b))
      );
    }

    case "==": {
      return a == b;
    }

    case "===": {
      return a === b;
    }

    case "!=": {
      return a != b;
    }

    case "!==": {
      return a !== b;
    }

    case "!": {
      return !a === !!b;
    }

    case "!!": {
      return !a === !b;
    }

    case "filled": {
      return filled(a);
    }

    case "empty": {
      return empty(a);
    }
  }

  if (a == null || b == null) {
    return false;
  }

  a = a.valueOf();
  b = b.valueOf();

  switch (typeof a) {
    case "string":
    case "number":
    case "bigint":
    case "boolean": {
      break;
    }

    default: {
      return false;
    }
  }

  switch (typeof b) {
    case "string":
    case "number":
    case "bigint":
    case "boolean": {
      break;
    }

    default: {
      return false;
    }
  }

  switch (operator) {
    case "<": {
      return a < b;
    }

    case "<=": {
      return a <= b;
    }

    case ">": {
      return a > b;
    }

    case ">=": {
      return a >= b;
    }
  }

  throw new TypeError(`Unknown operator '${operator}'`);
}
