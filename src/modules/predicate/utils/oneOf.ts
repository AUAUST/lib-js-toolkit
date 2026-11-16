/**
 * Returns `function matched`, telling whether its candidate is one of `values`,
 * compared by SameValueZero so `NaN` matches `NaN`.
 */
export function oneOf<const Values extends readonly unknown[]>(
  ...values: Values
): (candidate: unknown) => candidate is Values[number] {
  const set = new Set<unknown>(values);

  return function matched(candidate: unknown): candidate is Values[number] {
    return set.has(candidate);
  };
}
