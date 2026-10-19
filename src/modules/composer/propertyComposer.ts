import { hasOwn } from "@auaust/toolkit/object";

export type PropertyComposer<
  Name extends PropertyKey = PropertyKey,
  Descriptor extends PropertyDescriptor = PropertyDescriptor,
> = Descriptor & {
  name: Name;
};

export type PropertyCompositionDescriptor = Pick<
  PropertyDescriptor,
  "enumerable" | "configurable"
> &
  (
    | {
        value?: unknown;
        writable?: boolean;
        get?: never;
        set?: never;
      }
    | {
        get?: PropertyDescriptor["get"];
        set?: PropertyDescriptor["set"];
        value?: never;
        writable?: never;
      }
  );

export function propertyComposer<
  Key extends PropertyKey,
  const Descriptor extends PropertyCompositionDescriptor,
>(key: Key, descriptor: Descriptor): PropertyComposer<Key, Descriptor> {
  const defaults: PropertyDescriptor =
    hasOwn(descriptor, "get") || hasOwn(descriptor, "set")
      ? {
          get: undefined,
          set: undefined,
        }
      : {
          value: undefined,
          writable: false,
        };

  return {
    ...defaults,
    enumerable: true,
    configurable: true,
    ...descriptor,
    name: key,
  };
}
