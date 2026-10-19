import { ownKeys } from "@auaust/toolkit/object";
import { getterComposer } from "./getterComposer";
import type { PropertyComposer } from "./propertyComposer";

export function getterComposers<
  Getters extends Record<PropertyKey, (this: any) => unknown>,
>(
  getters: Getters,
): {
  [Key in keyof Getters]-?: PropertyComposer<Key, { get: Getters[Key] }>;
}[keyof Getters][] {
  return ownKeys(getters).map((key) => {
    return getterComposer(key, getters[key]);
  });
}
