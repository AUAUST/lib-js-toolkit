import { hasOwn } from "#modules/object/utils/hasOwn";

/**
 * Checks that every key is an own property of the target, ignoring inherited
 * properties; no keys gives `true`.
 *
 * @throws {TypeError} when keys are given and the target is nullish.
 */
export function hasKeys<Target, const Keys extends readonly PropertyKey[]>(
  target: Target,
  ...keys: Keys
): target is Target & Record<Keys[number], unknown> {
  return keys.every((key) => {
    return hasOwn(target, key);
  });
}
