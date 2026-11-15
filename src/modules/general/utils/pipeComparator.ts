import { pipeCompare } from "#modules/general/utils/pipeCompare";
import type { Callee } from "#types/Callee";

/**
 * Returns `pipeCompare` bound to `transform`, so one pre-processing serves every
 * comparison.
 */
export function pipeComparator<T>(
  transform: Callee<unknown, [value: T]>,
): (...values: T[]) => boolean {
  return (...values: T[]): boolean => {
    return pipeCompare(transform, ...values);
  };
}
