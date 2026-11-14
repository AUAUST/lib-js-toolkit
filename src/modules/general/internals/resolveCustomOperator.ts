import { StateError } from "#errors/StateError";
import { isBoolean } from "#modules/boolean/guards/isBoolean";
import { call } from "#modules/general/utils/call";
import type { CustomOperators } from "#modules/general/utils/compare";

/**
 * Resolves `compare`'s custom operator to a comparison, or `undefined` when
 * `customOperators` does not define it.
 *
 * @throws {StateError} when the operator is disabled
 */
export function resolveCustomOperator(
  operator: string,
  customOperators: CustomOperators | undefined,
): ((a: unknown, b: unknown) => boolean) | undefined {
  if (!customOperators || !(operator in customOperators)) {
    return;
  }

  const customOperator = customOperators[operator];

  if (isBoolean(customOperator)) {
    return () => customOperator;
  }

  if (customOperator == null) {
    throw new StateError(`Attempted to use a disabled operator '${operator}'`);
  }

  return (a, b) => !!call(customOperator, a, b);
}
