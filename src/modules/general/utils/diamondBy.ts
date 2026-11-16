import { isFunction } from "#modules/function/guards/isFunction";
import { diamond, type DiamondOptions } from "#modules/general/utils/diamond";
import { memberValue } from "#modules/general/utils/memberValue";

/**
 * Compares the values `key` resolves from each side with `diamond`: a
 * property name reads that member, calling it when it is a method; a callback
 * receives each value.
 *
 * @throws What `key`, a called member or a resolved value's `valueOf` throws.
 */
export function diamondBy<Value>(
  left: Value,
  right: Value,
  key: keyof Value | ((value: Value) => unknown),
  options?: DiamondOptions,
): -1 | 0 | 1 {
  if (isFunction(key)) {
    return diamond(key(left), key(right), options);
  }

  return diamond(memberValue(left, key), memberValue(right, key), options);
}
