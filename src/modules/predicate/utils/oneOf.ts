import { sameValueZero } from "#modules/general/utils/sameValueZero";

/**
 * Returns `function matched`, telling whether its candidate is one of `values`,
 * compared by SameValueZero so `NaN` matches `NaN`.
 */
export function oneOf<const Values extends readonly unknown[]>(
  ...values: Values
): (candidate: unknown) => candidate is Values[number] {
  return function matched(candidate: unknown): candidate is Values[number] {
    return values.some((value) => sameValueZero(value, candidate));
  };
}
