import { call } from "#modules/function/utils/call";
import type { Callee } from "#types/Callee";

/**
 * Returns whether every value is `===` to the others once passed through
 * `transform`, each value transformed once. Fewer than two values compare as
 * equal. An error thrown by `transform` propagates.
 */
export function pipeCompare<T>(
  transform: Callee<unknown, [value: T]>,
  ...values: T[]
): boolean {
  const transformed = values.map((value) => {
    return call(transform, value);
  });

  return transformed.every((value) => {
    return value === transformed[0];
  });
}
