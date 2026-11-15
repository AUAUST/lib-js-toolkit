import { get } from "#modules/object/utils/get";
import type { PathValue } from "#types/PathValue";

/**
 * Reads the value at the end of a path of keys, each key reading a property of
 * the previous value, inherited ones included; a nullish value along the way
 * gives `undefined`. An empty path returns the target.
 */
export function getPath<
  const Target,
  const Keys extends readonly PropertyKey[],
>(target: Target, keys: Keys): PathValue<Target, Keys>;
export function getPath(
  target: unknown,
  keys: readonly PropertyKey[],
): unknown {
  let current = target;

  for (const key of keys) {
    current = get(current, key);
  }

  return current;
}
