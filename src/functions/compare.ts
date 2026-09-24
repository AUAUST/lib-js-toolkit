import { empty } from "@auaust/toolkit/empty";
import { filled } from "@auaust/toolkit/filled";
import type { IsLiteral, KeyAsString } from "@auaust/toolkit/types";

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

export type OperatorFn = (a: unknown, b: unknown) => boolean;

export type CustomOperators<T extends string = string> = Record<
  T,
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

export function compare<C extends CustomOperators>(
  a: unknown,
  operator: AvailableOperators<C>,
  b: unknown,
  customOperators: C,
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
  if (typeof operator === "function") {
    return !!operator(a, b);
  }

  if (customOperators && operator in customOperators) {
    const customOperator = customOperators[operator];

    if (typeof customOperator === "boolean") {
      return customOperator;
    }

    if (customOperator == null) {
      throw new Error(
        `Attempted to use a disabled operator: ${String(operator)}`,
      );
    }

    return !!customOperator(a, b);
  }

  switch (operator) {
    case "=": {
      return (
        (empty(a) && empty(b)) ||
        a.valueOf() == b.valueOf() ||
        (Number.isNaN(a) && Number.isNaN(b))
      );
    }
    case "==":
      return a == b;
    case "===":
      return a === b;
    case "!=":
      return a != b;
    case "!==":
      return a !== b;
    case "!":
      return !a === !!b;
    case "!!":
      return !a === !b;
    case "filled":
      return filled(a);
    case "empty":
      return empty(a);
  }

  if (a == null || b == null) {
    return false;
  }

  a = a.valueOf();
  b = b.valueOf();

  let comparable = true;

  switch (typeof a) {
    case "string":
    case "number":
    case "bigint":
    case "boolean":
      break;
    default:
      comparable = false;
  }

  if (!comparable) {
    return false;
  }

  switch (typeof b) {
    case "string":
    case "number":
    case "bigint":
    case "boolean":
      break;
    default:
      comparable = false;
  }

  if (!comparable) {
    return false;
  }

  switch (operator) {
    case "<":
      return a < b;
    case "<=":
      return a <= b;
    case ">":
      return a > b;
    case ">=":
      return a >= b;
    default:
      throw new Error(`Unknown operator: ${String(operator)}`);
  }
}
