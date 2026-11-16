import { mergeInto } from "#modules/merger/internals/mergeInto";
import type { Merged } from "#types/Merged";

/**
 * Merges `sources` into a new ordinary object, as `merge({}, ...sources)`: the
 * first source holding a key decides its kind. Sources never mutate.
 *
 * @native variant Object.assign
 */
export function toMerged<Sources extends readonly unknown[]>(
  ...sources: Sources
): Merged<{}, Sources>;
export function toMerged(...sources: unknown[]): object {
  return mergeInto({}, sources);
}
