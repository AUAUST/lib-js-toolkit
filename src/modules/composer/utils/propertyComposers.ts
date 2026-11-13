import {
  propertyComposer,
  type PropertyComposer,
  type PropertyCompositionDescriptor,
} from "#modules/composer/utils/propertyComposer";
import { ownKeys } from "#modules/object/utils/ownKeys";
import type { DefinedProperties } from "#types/DefinedProperties";

declare const descriptors: unique symbol;

export type PropertyComposers<
  Descriptors extends Record<PropertyKey, PropertyCompositionDescriptor>,
  Properties extends object = DefinedProperties<
    Descriptors,
    Record<PropertyKey, undefined>
  >,
> = {
  [Key in keyof Descriptors]-?: PropertyComposer<Key, Descriptors[Key]>;
}[keyof Descriptors][] & {
  [descriptors]?: { descriptors: Descriptors; properties: Properties };
};

export type ComposedProperties<Head> = typeof descriptors extends keyof Head
  ? Head extends {
      [descriptors]?: { properties: infer Properties extends object };
    }
    ? Properties
    : never
  : never;

export function propertyComposers<
  const Descriptors extends Record<PropertyKey, PropertyCompositionDescriptor>,
>(descriptors: Descriptors): PropertyComposers<Descriptors> {
  return ownKeys(descriptors).map((key) => {
    return propertyComposer(key, descriptors[key]);
  });
}
