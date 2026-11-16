import { hasOwn } from "#modules/object/utils/hasOwn";
import { set } from "#modules/object/utils/set";
import type { Assigned } from "#types/Assigned";

/**
 * Sets `value` under `key` and returns `target`. Only an own property makes the
 * key taken: an inherited one is shadowed.
 *
 * @throws {TypeError} When `target` already owns `key`, leaving it unchanged.
 */
export function insert<Target extends object, Key extends PropertyKey, Value>(
  target: Target,
  key: Key,
  value: Value,
): Assigned<Target, [Record<Key, Value>]> {
  if (hasOwn(target, key)) {
    throw new TypeError(`Key "${String(key)}" is already set.`);
  }

  return set(target, key, value);
}
