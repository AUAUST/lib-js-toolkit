import {
  type AvailableOperators,
  compare,
  type CustomOperators,
} from "@auaust/toolkit/compare";

export function comparator<C extends CustomOperators>(
  operators: C,
): (a: unknown, operator: AvailableOperators<C>, b?: unknown) => boolean {
  return (
    a: unknown,
    operator: AvailableOperators<C>,
    b?: unknown,
  ): boolean => {
    return compare(a, operator, b, operators);
  };
}
