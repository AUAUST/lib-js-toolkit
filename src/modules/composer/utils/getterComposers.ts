import { getterComposer } from "#modules/composer/utils/getterComposer";
import { ownKeys } from "#modules/object/utils/ownKeys";
import type { PropertyComposers } from "#modules/composer/utils/propertyComposers";

export function getterComposers<
  Getters extends Record<PropertyKey, (this: any) => unknown>,
>(
  getters: Getters,
): PropertyComposers<
  {
    [Key in keyof Getters]: { readonly get: Getters[Key] };
  },
  { readonly [Key in keyof Getters]: ReturnType<Getters[Key]> }
> {
  return ownKeys(getters).map((key) => {
    return getterComposer(key, getters[key]);
  });
}
