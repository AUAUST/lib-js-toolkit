import { isArray } from "#modules/array/guards/isArray";
import { isPlainObject } from "#modules/object/guards/isPlainObject";
import { entries } from "#modules/object/utils/entries";

export interface CloneOptions {
  /**
   * Copies arrays recursively instead of keeping them by reference.
   *
   * @default false
   */
  arrays?: boolean;
}

/**
 * Copies plain objects recursively into new ordinary objects, reading own
 * enumerable string keys; arrays are copied only with `{ arrays: true }`. Any
 * other value, class instances included, is kept by reference.
 *
 * @native variant structuredClone
 */
export function clone<Value>(value: Value, options?: CloneOptions): Value;
export function clone(value: unknown, options: CloneOptions = {}): unknown {
  if (isArray(value)) {
    return options.arrays === true
      ? value.map((item) => {
          return clone(item, options);
        })
      : value;
  }

  if (!isPlainObject(value)) {
    return value;
  }

  const copy: Record<string, unknown> = {};

  for (const [key, item] of entries(value)) {
    copy[key] = clone(item, options);
  }

  return copy;
}
