import { has } from "#modules/object/utils/has";

/**
 * Returns `function owned`, telling whether its candidate has `key`, own or
 * inherited, as `object.has` does.
 */
export function hasProperty<Key extends PropertyKey>(
  key: Key,
): <Target>(candidate: Target) => candidate is Target & Record<Key, unknown> {
  return function owned<Target>(
    candidate: Target,
  ): candidate is Target & Record<Key, unknown> {
    return has(candidate, key);
  };
}
