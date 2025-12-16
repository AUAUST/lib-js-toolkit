import { compare, type CustomOperators, type Operator } from "./compare";

export function comparator<T extends string>(
  operators: CustomOperators<T>
): (a: unknown, operator: T | Operator, b: unknown) => boolean {
  return (a: unknown, operator: T | Operator, b: unknown): boolean => {
    return compare(a, operator, b, operators);
  };
}
