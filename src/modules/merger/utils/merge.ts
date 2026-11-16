import { mergeInto } from "#modules/merger/internals/mergeInto";
import type { Merged } from "#types/Merged";

/**
 * Merges `sources` into `target` in argument order and returns `target`:
 * `Object.assign` made recursive. Plain objects merge key by key; any other
 * value is a leaf a later leaf replaces. A plain object never merges into a leaf
 * nor a leaf replaces a plain object: such keys are skipped. A plain object the
 * target lacks is copied, so sources never mutate. `__proto__` keys are skipped,
 * and an object pair met twice merges once, which ends cycles.
 *
 * @native variant Object.assign
 */
export function merge<
  Target extends object,
  Sources extends readonly unknown[],
>(target: Target, ...sources: Sources): Merged<Target, Sources>;
export function merge(
  target: Record<PropertyKey, unknown>,
  ...sources: unknown[]
): object {
  return mergeInto(target, sources);
}
