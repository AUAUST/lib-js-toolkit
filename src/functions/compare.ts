import { toString } from "@auaust/primitive-kit/strings";
import { empty } from "./empty";
import { filled } from "./filled";

export type Operator = BinaryOperators | UnaryOperators | OperatorFn;

export type UnaryOperators = "filled" | "empty";

export type BinaryOperators =
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
  OperatorFn | boolean
>;

export function compare<T extends string>(
  a: unknown,
  operator: Operator | NoInfer<T>,
  b: unknown,
  customOperators: CustomOperators<T>
): boolean;
export function compare(
  a: unknown,
  operator: UnaryOperators,
  b?: unknown
): boolean;
export function compare(a: unknown, operator: Operator, b: unknown): boolean;
export function compare(
  a: unknown,
  operator: Operator,
  b?: unknown,
  customOperators?: CustomOperators
): boolean {
  if (typeof operator === "function") {
    return !!operator(a, b);
  }

  if (customOperators && operator in customOperators) {
    const customOperator = customOperators[operator];

    if (typeof customOperator === "boolean") {
      return customOperator;
    }

    return !!customOperator(a, b);
  }

  switch (operator) {
    case "=":
      // This will convert null and undefined to empty strings for comparison
      // and call object's `valueOf()` method before comparing, meaning that
      // objects such as Dates will be compared by their primitive values.
      return toString(a) === toString(b);
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
      // @ts-ignore
      return a < b;
    case "<=":
      // @ts-ignore
      return a <= b;
    case ">":
      // @ts-ignore
      return a > b;
    case ">=":
      // @ts-ignore
      return a >= b;
    default:
      throw new Error(`Unknown operator: ${String(operator)}`);
  }
}
