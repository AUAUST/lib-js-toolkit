import {
  compare,
  type AvailableOperators,
  type CustomOperators,
} from "#utils/compare";

export function comparator<Operators extends CustomOperators>(
  operators: Operators,
): (
  a: unknown,
  operator: AvailableOperators<Operators>,
  b?: unknown,
) => boolean {
  return (
    a: unknown,
    operator: AvailableOperators<Operators>,
    b?: unknown,
  ): boolean => {
    return compare(a, operator, b, operators);
  };
}
