import { defineProperty } from "@auaust/toolkit/object";

export function defineGetters(target: any, getters: Record<string, () => any>) {
  for (const key in getters) {
    defineProperty(target, key, {
      get: getters[key],
      enumerable: true,
      configurable: true,
    });
  }

  return target;
}
