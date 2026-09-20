import { isPropertyKey } from "@auaust/primitive-kit/primitives";

export interface PropertyForwarder<
  Source extends object = object,
  Property extends keyof Source = keyof Source,
  Readonly extends boolean = boolean,
> {
  get(): Source[Property];
  set?(v: Source[Property]): void;
  configurable?: boolean;
  enumerable?: boolean;
}

export interface PropertyForwardingOptions<
  Property extends PropertyKey = PropertyKey,
  Readonly extends boolean = boolean,
> {
  property: Property;
  readonly?: Readonly;
  enumerable?: boolean;
  configurable?: boolean;
}

export function propertyForwarder<
  const Source extends object,
  const Property extends keyof Source,
  const Readonly extends boolean,
>(
  source: Source,
  property: Property | PropertyForwardingOptions<Property, Readonly>,
): PropertyForwarder<Source, Property, Readonly>;
export function propertyForwarder<
  const Source extends object,
  const Property extends keyof Source,
  const Readonly extends boolean,
>(
  source: Source,
  property: Property,
  options?: Omit<PropertyForwardingOptions<Property, Readonly>, "property">,
): PropertyForwarder<Source, Property, Readonly>;
export function propertyForwarder(
  source: any,
  property: PropertyKey | PropertyForwardingOptions,
  options?: Partial<PropertyForwardingOptions>,
): PropertyForwarder<any, any, any> {
  if (!isPropertyKey(property)) {
    options = property;
    property = options.property!;
  }

  const descriptor = Object.getOwnPropertyDescriptor(source, property);

  const writable =
    !options?.readonly &&
    (!descriptor || (descriptor.writable ?? descriptor.set !== undefined));

  const {
    configurable = descriptor?.configurable ?? true,
    enumerable = descriptor?.enumerable ?? true,
  } = options ?? {};

  return {
    get: function get() {
      return Reflect.get(source, property);
    },
    set: writable
      ? function set(v) {
          return Reflect.set(source, property, v);
        }
      : undefined,
    configurable,
    enumerable,
  };
}
