import { has } from "#modules/object/utils/has";

/**
 * Returns `function equaled`, telling whether its candidate has `key` holding
 * `value`, compared with `===` so `NaN` never matches.
 */
export function propertyEquals<Key extends PropertyKey, const Value>(
  key: Key,
  value: Value,
): <Target>(candidate: Target) => candidate is Target & Record<Key, Value> {
  return function equaled<Target>(
    candidate: Target,
  ): candidate is Target & Record<Key, Value> {
    return has(candidate, key) && candidate[key] === value;
  };
}
