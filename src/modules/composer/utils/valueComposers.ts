import { valueComposer } from "#modules/composer/utils/valueComposer";
import { ownKeys } from "#modules/object/utils/ownKeys";
import type { PropertyComposers } from "#modules/composer/utils/propertyComposers";

export function valueComposers<const Values extends object>(
  values: Values,
): PropertyComposers<
  {
    [Key in keyof Values]: { value: Values[Key]; writable: true };
  },
  { -readonly [Key in keyof Values]: Values[Key] }
> {
  return ownKeys(values).map((key) => {
    return valueComposer(key, values[key]);
  });
}
