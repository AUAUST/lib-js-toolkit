import { getterComposer } from "#modules/composer/utils/getterComposer";
import { ownKeys } from "#modules/object/utils/ownKeys";
import type { PropertyComposer } from "#modules/composer/utils/propertyComposer";

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
