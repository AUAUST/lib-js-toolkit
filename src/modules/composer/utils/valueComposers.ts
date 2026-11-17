import { map } from "#modules/array/utils/map";
import { valueComposer } from "#modules/composer/utils/valueComposer";
import { ownKeys } from "#modules/object/utils/ownKeys";
import type { PropertyComposers } from "#modules/composer/utils/propertyComposers";
import type { Writable } from "#types/Writable";

export function valueComposers<const Values extends object>(
  values: Values,
): PropertyComposers<
  {
    [Key in keyof Values]: { value: Values[Key]; writable: true };
  },
  Writable<Values>
> {
  return map(ownKeys(values), (key) => {
    return valueComposer(key, values[key]);
  });
}
