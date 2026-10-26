import { ownKeys } from "@auaust/toolkit/object";

import {
  propertyComposer,
  type PropertyComposer,
  type PropertyCompositionDescriptor,
} from "./propertyComposer";

export function propertyComposers<
  const Descriptors extends Record<PropertyKey, PropertyCompositionDescriptor>,
>(
  descriptors: Descriptors,
): {
  [Key in keyof Descriptors]-?: PropertyComposer<Key, Descriptors[Key]>;
}[keyof Descriptors][] {
  return ownKeys(descriptors).map((key) => {
    return propertyComposer(key, descriptors[key]);
  });
}
