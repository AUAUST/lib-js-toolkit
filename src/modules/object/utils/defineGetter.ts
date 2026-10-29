import { defineProperty } from "#modules/object/utils/defineProperty";
import type { Extended } from "#types/Extended";

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
