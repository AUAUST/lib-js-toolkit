import { defineProperty } from "@auaust/toolkit/object";

export function defineGetter(target: any, key: string, getter: () => any) {
  defineProperty(target, key, {
    get: getter,
    enumerable: true,
    configurable: true,
  });

  return target;
}
