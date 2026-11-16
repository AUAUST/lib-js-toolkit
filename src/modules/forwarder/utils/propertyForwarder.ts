import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { ownDescriptor } from "#modules/object/utils/ownDescriptor";
import type { ForwardAs } from "#modules/forwarder/utils/forwardAs";
import type { IsNever } from "#types/IsNever";

export type PropertyForwardingInput<
  Property extends PropertyKey,
  Alias extends PropertyKey = never,
  Readonly extends boolean = boolean,
> =
  | Property
  | PropertyForwardingOptions<Property, Alias, Readonly>
  | ForwardAs<Property, PropertyKey>;

export type AnyPropertyForwarder =
  | PropertyForwarder<any, any, PropertyKey>
  | KeyPropertyForwarder<PropertyKey, PropertyKey, PropertyKey>;

export interface PropertyForwarder<
  Source extends object = any,
  Property extends keyof Source = keyof Source,
  Name extends PropertyKey = Property,
  Readonly extends boolean = boolean,
> {
  kind: "property";
  name: Name;
  get(): Source[Property];
  set?: Readonly extends true ? undefined : (v: Source[Property]) => void;
  configurable?: boolean;
  enumerable?: boolean;
}

/**
 * A property forwarder whose source is the `sourceKey` property of the object it
 * is defined on, resolved on every access.
 */
export interface KeyPropertyForwarder<
  SourceKey extends PropertyKey = PropertyKey,
  Property extends PropertyKey = PropertyKey,
  Name extends PropertyKey = Property,
  Readonly extends boolean = boolean,
> {
  kind: "property";
  name: Name;
  sourceKey: SourceKey;
  property: Property;
  get(this: object): unknown;
  set?: Readonly extends true ? undefined : (this: object, v: unknown) => void;
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

export type ForwardedProperty<
  Forward extends AnyPropertyForwarder,
  Target extends object = object,
> = Forward extends KeyPropertyForwarder<
  infer SourceKey,
  infer Property,
  infer Name,
  infer Readonly
>
  ? SourceKey extends keyof Target
    ? Property extends keyof NonNullable<Target[SourceKey]>
      ? Readonly extends true
        ? { readonly [K in Name]: NonNullable<Target[SourceKey]>[Property] }
        : { [K in Name]: NonNullable<Target[SourceKey]>[Property] }
      : never
    : never
  : Forward extends PropertyForwarder<
        infer Source,
        infer Property,
        infer Name,
        infer Readonly
      >
    ? Readonly extends true
      ? { readonly [K in Name]: Source[Property] }
      : { [K in Name]: Source[Property] }
    : never;

/**
 * Creates a descriptor forwarding reads, and writes unless `readonly`, of a
 * property of `source` under `as` or the property's own name. A property key
 * `source` names a property of the object the forwarder is defined on: it is
 * read on every access, so replacing it swaps the source.
 *
 * Defaults `configurable` and `enumerable` to those of an object source's
 * own member, otherwise to `true`; a key source's property is writable
 * unless `readonly`.
 *
 * @throws {TypeError} When a key source resolves to `null` or `undefined`
 * at access time.
 */
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
export function propertyForwarder<
  const SourceKey extends PropertyKey,
  const Property extends PropertyKey,
  const Alias extends PropertyKey = never,
  const Readonly extends boolean = boolean,
>(
  source: SourceKey,
  property: Property | PropertyForwardingOptions<Property, Alias, Readonly>,
): KeyPropertyForwarder<
  SourceKey,
  Property,
  [Alias] extends [never] ? Property : Alias,
  Readonly
>;
export function propertyForwarder<
  const SourceKey extends PropertyKey,
  const Property extends PropertyKey,
  const Alias extends PropertyKey,
  const Readonly extends boolean = boolean,
>(
  source: SourceKey,
  property: ForwardAs<Property, Alias>,
  options?: Omit<
    PropertyForwardingOptions<Property, never, Readonly>,
    "property" | "as"
  >,
): KeyPropertyForwarder<SourceKey, Property, Alias, Readonly>;
export function propertyForwarder<
  const SourceKey extends PropertyKey,
  const Property extends PropertyKey,
  const Alias extends PropertyKey = never,
  const Readonly extends boolean = boolean,
>(
  source: SourceKey,
  property: Property,
  options?: Omit<
    PropertyForwardingOptions<Property, Alias, Readonly>,
    "property"
  >,
): KeyPropertyForwarder<
  SourceKey,
  Property,
  IsNever<Alias, Property, Alias>,
  Readonly
>;
// @debt The implementation signature types the source `any`, because no overload accepts an `object | PropertyKey` source; an internal factory taking that union, which the overloads and the plural forms would share, would remove it.
export function propertyForwarder(
  source: any,
  property: PropertyForwardingInput<PropertyKey>,
  options?: Record<PropertyKey, any>,
): AnyPropertyForwarder {
  let targetProperty: PropertyKey;

  if (!isPropertyKey(property)) {
    const input = property as Record<PropertyKey, any>;

    property = input.property;
    targetProperty = input.as ?? property;

    options = {
      ...input,
      ...options,
    };
  } else {
    targetProperty = options?.as ?? property;
  }

  const sourceProperty = property as PropertyKey;

  if (isPropertyKey(source)) {
    return keyPropertyForwarder(
      source,
      sourceProperty,
      targetProperty,
      options,
    );
  }

  const descriptor = ownDescriptor(source, sourceProperty);

  const writable = (
    !options?.readonly &&
    (!descriptor || (descriptor.writable ?? descriptor.set !== undefined))
  );

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
      ? function set(v: unknown) {
          return Reflect.set(source, sourceProperty, v);
        }
      : undefined,
    configurable,
    enumerable,
  };
}

function keyPropertyForwarder(
  sourceKey: PropertyKey,
  property: PropertyKey,
  name: PropertyKey,
  options?: Record<PropertyKey, any>,
): KeyPropertyForwarder {
  const { configurable = true, enumerable = true, readonly } = options ?? {};

  return {
    kind: "property",
    name,
    sourceKey,
    property,
    get: function get() {
      // @debt Indexes the `any` that `Reflect.get` returns, so the nullish-source TypeError is the engine's implicit one; `methodGetter` in `methodForwarder` checks the source explicitly and boxes primitives through `toObject`.
      return Reflect.get(this, sourceKey)[property];
    },
    set: readonly
      ? undefined
      : function set(v: unknown) {
          // @debt A failed write is discarded silently, like the object-source setter; no contract says whether it should throw.
          Reflect.set(Reflect.get(this, sourceKey), property, v);
        },
    configurable,
    enumerable,
  };
}
