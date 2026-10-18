import { defineProperty } from "@auaust/toolkit/object";
import type { Extended } from "@auaust/toolkit/types";

export function defineGetter<
  Target extends object,
  Key extends PropertyKey,
  Value,
>(
  target: Target,
  key: Key,
  getter: (this: Target) => Value,
): Extended<Target, { readonly [Property in Key]: Value }>;
export function defineGetter(
  target: object,
  key: PropertyKey,
  getter: () => unknown,
): object {
  defineProperty(target, key, {
    get: getter,
    enumerable: true,
    configurable: true,
  });

  return target;
}
