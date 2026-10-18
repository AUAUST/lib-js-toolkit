import { defineProperty } from "@auaust/toolkit/object";
import type { Extended } from "@auaust/toolkit/types";

export function defineGetters<
  Target extends object,
  Getters extends Record<string, (this: Target) => unknown>,
>(
  target: Target,
  getters: Getters,
): Extended<
  Target,
  {
    readonly [Key in keyof Getters as Key extends string | number
      ? Key
      : never]: ReturnType<Getters[Key]>;
  }
>;
export function defineGetters(
  target: object,
  getters: Record<string, () => unknown>,
): object {
  for (const key in getters) {
    defineProperty(target, key, {
      get: getters[key],
      enumerable: true,
      configurable: true,
    });
  }

  return target;
}
