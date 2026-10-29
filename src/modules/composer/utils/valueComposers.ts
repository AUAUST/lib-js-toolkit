import { valueComposer } from "#modules/composer/utils/valueComposer";
import { ownKeys } from "#modules/object/utils/ownKeys";
import type { PropertyComposer } from "#modules/composer/utils/propertyComposer";

export function valueComposers<const Values extends object>(
  values: Values,
): {
  [Key in keyof Values]-?: PropertyComposer<
    Key,
    { value: Values[Key]; writable: true }
  >;
}[keyof Values][] {
  return ownKeys(values).map((key) => {
    return valueComposer(key, values[key]);
  });
}
