import { ownKeys } from "@auaust/toolkit/object";
import type { PropertyComposer } from "./propertyComposer";
import { valueComposer } from "./valueComposer";

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
