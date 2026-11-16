import {
  compare,
  type AvailableOperators,
  type CustomOperators,
} from "#modules/general/utils/compare";

// @debt Named `comparator` while `array`'s `Comparator` type and `numeric` use the word for a sort comparator; this returns a boolean `compare` bound to custom operators.
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
