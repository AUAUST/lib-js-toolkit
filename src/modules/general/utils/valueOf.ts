import { isFunction } from "#modules/function/guards/isFunction";
import { isObject } from "#modules/object/guards/isObject";

/**
 * Returns `value.valueOf()` when the value is an object or function with a
 * callable `valueOf`; returns any other value, null-prototype objects included,
 * as is.
 */
export function valueOf<Value>(
  value: Value,
): Value extends object ? unknown : Value;
export function valueOf(value: unknown): unknown {
  if (!isObject(value) && !isFunction(value)) {
    return value;
  }

  const method: unknown = Reflect.get(value, "valueOf");

  return isFunction(method) ? Reflect.apply(method, value, []) : value;
}
