import {
  compare,
  type AvailableOperators,
  type CustomOperators,
} from "./compare";

export function comparator<C extends CustomOperators>(
  operators: C
): (a: unknown, operator: AvailableOperators<C>, b?: unknown) => boolean {
  return (
    a: unknown,
    operator: AvailableOperators<C>,
    b?: unknown
  ): boolean => {
    return compare(a, operator, b, operators);
  };
}
