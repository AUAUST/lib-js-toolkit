import {
  propertyComposer,
  type PropertyComposer,
  type PropertyCompositionDescriptor,
} from "#modules/composer/utils/propertyComposer";
import { ownKeys } from "#modules/object/utils/ownKeys";

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
