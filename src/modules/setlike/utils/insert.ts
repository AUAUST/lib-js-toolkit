import type { SetLike } from "#modules/setlike/types/SetLike";

/**
 * Adds `value` to `set` and returns `set`.
 *
 * @throws {TypeError} When `set.has(value)`, leaving `set` unchanged.
 */
export function insert<Target extends SetLike<Value>, Value>(
  set: Target,
  value: Value,
): Target {
  if (set.has(value)) {
    throw new TypeError(`Value "${String(value)}" is already in the set.`);
  }

  set.add(value);

  return set;
}
