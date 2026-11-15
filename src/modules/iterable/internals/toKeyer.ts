import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";

// @debt The values are typed as records so `memberValue` accepts any property key; the public overloads hold the real contract.

export function toKeyer(
  keyer: ((value: unknown, index: number) => PropertyKey) | PropertyKey,
): (value: Record<PropertyKey, unknown>, index: number) => PropertyKey {
  if (isPropertyKey(keyer)) {
    return (value) => {
      const key = memberValue(value, keyer);

      return isPropertyKey(key) ? key : String(key);
    };
  }

  if (!isFunction(keyer)) {
    throw new TypeError("Expected a key function or a property name.");
  }

  return keyer;
}
