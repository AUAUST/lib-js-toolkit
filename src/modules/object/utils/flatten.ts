import { isFunction } from "#modules/function/guards/isFunction";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { isPlainObject } from "#modules/object/guards/isPlainObject";
import { entries } from "#modules/object/utils/entries";
import type { Flattened } from "#types/Flattened";

type PathKeyer<Key extends PropertyKey> = (
  path: readonly string[],
) => Key | undefined;

/**
 * Returns a new object holding the leaves of nested plain objects at its root,
 * reading own enumerable string keys. A string separator joins each leaf's path
 * into its key; a keyer builds the key from the path instead, skipping the leaf
 * when it returns `undefined`.
 *
 * @throws {TypeError} when the keyer returns neither a property key
 * nor `undefined`.
 */
export function flatten<
  const Target extends object,
  const Separator extends string = ".",
>(target: Target, separator?: Separator): Flattened<Target, Separator>;
// @debt The keyer overload types its target `Record<string, any>` instead of `object`, because `object` reportedly infers `never`; `any` loosens the contract.
export function flatten<Key extends PropertyKey>(
  target: Record<string, any>,
  keyer: PathKeyer<Key>,
): Partial<Record<Key, unknown>>;
export function flatten(
  target: Record<string, any>,
  separator: string | PathKeyer<PropertyKey> = ".",
): Record<PropertyKey, unknown> {
  const flattened: Record<PropertyKey, unknown> = {};

  collectLeaves(target, [], separator, flattened);

  return flattened;
}

function collectLeaves(
  target: Record<string, unknown>,
  path: readonly string[],
  separator: string | PathKeyer<PropertyKey>,
  flattened: Record<PropertyKey, unknown>,
): void {
  for (const [key, value] of entries(target)) {
    const leafPath = [...path, key];

    if (isPlainObject(value)) {
      collectLeaves(value, leafPath, separator, flattened);

      continue;
    }

    const leafKey = isFunction(separator)
      ? separator(leafPath)
      : leafPath.join(separator);

    if (leafKey === undefined) {
      continue;
    }

    if (!isPropertyKey(leafKey)) {
      throw new TypeError(
        `flatten keyer returned an invalid property key: ${String(leafKey)}`,
      );
    }

    flattened[leafKey] = value;
  }
}
