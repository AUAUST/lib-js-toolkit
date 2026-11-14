import { isCallable } from "#modules/function/guards/isCallable";
import { isComparablePrimitive } from "#modules/general/internals/isComparablePrimitive";
import { resolveCustomOperator } from "#modules/general/internals/resolveCustomOperator";
import { call } from "#modules/general/utils/call";
import { empty } from "#modules/general/utils/empty";
import { filled } from "#modules/general/utils/filled";
import { valueOf } from "#modules/general/utils/valueOf";
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

  const customOperator = resolveCustomOperator(operator, customOperators);

  if (customOperator) {
    return customOperator(a, b);
  }

  switch (operator) {
    case "=": {
      return resolvesToSameString(a, b);
    }

    case "==": {
      // eslint-disable-next-line auaust/no-loose-equal -- implements the "==" operator
      return a == b;
    }

    case "===": {
      return a === b;
    }

    case "!=": {
      // eslint-disable-next-line auaust/no-loose-equal -- implements the "!=" operator
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

  a = valueOf(a);
  b = valueOf(b);

  if (!isComparablePrimitive(a) || !isComparablePrimitive(b)) {
    return false;
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

function resolvesToSameString(a: unknown, b: unknown): boolean {
  if (empty(a) && empty(b)) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  // @debt `String()` still throws on objects without `toString` or `Symbol.toPrimitive`, null-prototype objects included.
  return String(valueOf(a)) === String(valueOf(b));
}
