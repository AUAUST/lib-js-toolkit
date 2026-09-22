import { isPropertyKey } from "@auaust/primitive-kit/primitives";
import type { ForwardAs } from "~/functions/forwardAs";
import type { IsNever } from "~/types/IsNever";

export type PropertyForwardingInput<
  Property extends PropertyKey,
  Alias extends PropertyKey = never,
  Readonly extends boolean = boolean,
> =
  | Property
  | PropertyForwardingOptions<Property, Alias, Readonly>
  | ForwardAs<Property, PropertyKey>;

export interface PropertyForwarder<
  Source extends object = any,
  Property extends keyof Source = keyof Source,
  Name extends PropertyKey = Property,
  Readonly extends boolean = boolean,
> {
  kind: "property";
  name: Name;
  get(): Source[Property];
  set?(v: Source[Property]): void;
  configurable?: boolean;
  enumerable?: boolean;
}

export interface PropertyForwardingOptions<
  Property extends PropertyKey = PropertyKey,
  Alias extends PropertyKey = never,
  Readonly extends boolean = boolean,
> {
  property: Property;
  as?: Alias;
  readonly?: Readonly;
  enumerable?: boolean;
  configurable?: boolean;
}

export type PropertyForwarded<Forward extends PropertyForwarder> =
  Forward extends PropertyForwarder<
    infer Source,
    infer Property,
    infer Name,
    infer Readonly
  >
    ? Readonly extends true
      ? { readonly [K in Name]: Source[Property] }
      : { [K in Name]: Source[Property] }
    : never;

export function propertyForwarder<
  const Source extends object,
  const Property extends keyof Source,
  const Alias extends PropertyKey = never,
  const Readonly extends boolean = boolean,
>(
  source: Source,
  property: Property | PropertyForwardingOptions<Property, Alias, Readonly>,
): PropertyForwarder<
  Source,
  Property,
  [Alias] extends [never] ? Property : Alias,
  Readonly
>;
export function propertyForwarder<
  const Source extends object,
  const Property extends keyof Source,
  const Alias extends PropertyKey,
  const Readonly extends boolean = boolean,
>(
  source: Source,
  property: ForwardAs<Property, Alias>,
  options?: Omit<
    PropertyForwardingOptions<Property, never, Readonly>,
    "property" | "as"
  >,
): PropertyForwarder<Source, Property, Alias, Readonly>;
export function propertyForwarder<
  const Source extends object,
  const Property extends keyof Source,
  const Alias extends PropertyKey = never,
  const Readonly extends boolean = boolean,
>(
  source: Source,
  property: Property,
  options?: Omit<
    PropertyForwardingOptions<Property, Alias, Readonly>,
    "property"
  >,
): PropertyForwarder<
  Source,
  Property,
  IsNever<Alias, Property, Alias>,
  Readonly
>;
export function propertyForwarder(
  source: any,
  property: PropertyForwardingInput<PropertyKey>,
  options?: Record<PropertyKey, any>,
): PropertyForwarder<any, any, any, any> {
  let targetProperty: PropertyKey;

  if (!isPropertyKey(property)) {
    const input = property as Record<PropertyKey, any>;

    property = input.property;
    targetProperty = input.as ?? property;
    options = { ...input, ...options };
  } else {
    targetProperty = options?.as ?? property;
  }

  const sourceProperty = property as PropertyKey;

  const descriptor = Object.getOwnPropertyDescriptor(source, sourceProperty);

  const writable =
    !options?.readonly &&
    (!descriptor || (descriptor.writable ?? descriptor.set !== undefined));

  const {
    configurable = descriptor?.configurable ?? true,
    enumerable = descriptor?.enumerable ?? true,
  } = options ?? {};

  return {
    kind: "property",
    name: targetProperty,
    get: function get() {
      return Reflect.get(source, sourceProperty);
    },
    set: writable
      ? function set(v) {
          return Reflect.set(source, sourceProperty, v);
        }
      : undefined,
    configurable,
    enumerable,
  };
}
