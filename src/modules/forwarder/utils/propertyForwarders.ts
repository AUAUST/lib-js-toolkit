import { flat } from "#modules/array/utils/flat";
import { map } from "#modules/array/utils/map";
import {
  propertyForwarder,
  type AnyPropertyForwarder,
  type KeyPropertyForwarder,
  type PropertyForwarder,
  type PropertyForwardingInput,
  type PropertyForwardingOptions,
} from "#modules/forwarder/utils/propertyForwarder";
import type { ForwardAs } from "#modules/forwarder/utils/forwardAs";
import type { MaybeArray } from "#types/MaybeArray";
import type { MaybeArrayElement } from "#types/MaybeArrayElement";

export type PropertyForwarderFor<
  Source extends object,
  Property extends PropertyForwardingInput<keyof Source, PropertyKey>,
> = Property extends keyof Source
  ? PropertyForwarder<Source, Property>
  : Property extends PropertyForwardingOptions<
        infer Key extends keyof Source,
        any,
        infer Readonly
      >
    ? PropertyForwarder<
        Source,
        Key,
        Property extends { as: infer Alias extends PropertyKey } ? Alias : Key,
        Readonly
      >
    : Property extends ForwardAs<
          infer Key extends keyof Source,
          infer Alias extends PropertyKey
        >
      ? PropertyForwarder<Source, Key, Alias>
      : never;

/**
 * Maps a property forwarding input to the forwarder reading it from `SourceKey`.
 */
export type KeyPropertyForwarderFor<
  SourceKey extends PropertyKey,
  Property extends PropertyForwardingInput<PropertyKey, PropertyKey>,
> = Property extends PropertyKey
  ? KeyPropertyForwarder<SourceKey, Property>
  : Property extends PropertyForwardingOptions<
        infer Key extends PropertyKey,
        any,
        infer Readonly
      >
    ? KeyPropertyForwarder<
        SourceKey,
        Key,
        Property extends { as: infer Alias extends PropertyKey } ? Alias : Key,
        Readonly
      >
    : Property extends ForwardAs<
          infer Key extends PropertyKey,
          infer Alias extends PropertyKey
        >
      ? KeyPropertyForwarder<SourceKey, Key, Alias>
      : never;

/**
 * Creates a property forwarder for each property, from an object `source` or from
 * the `source` property of the object they are defined on, as `propertyForwarder`.
 */
export function propertyForwarders<
  const Source extends object,
  const Properties extends MaybeArray<
    PropertyForwardingInput<keyof Source, PropertyKey>
  >[],
>(
  source: Source,
  ...properties: Properties
): PropertyForwarderFor<
  Source,
  MaybeArrayElement<
    Properties[number],
    PropertyForwardingInput<keyof Source, PropertyKey>
  >
>[];
export function propertyForwarders<
  const SourceKey extends PropertyKey,
  const Properties extends MaybeArray<
    PropertyForwardingInput<PropertyKey, PropertyKey>
  >[],
>(
  source: SourceKey,
  ...properties: Properties
): KeyPropertyForwarderFor<
  SourceKey,
  MaybeArrayElement<
    Properties[number],
    PropertyForwardingInput<PropertyKey, PropertyKey>
  >
>[];
export function propertyForwarders(
  source: any,
  ...properties: MaybeArray<PropertyForwardingInput<PropertyKey, PropertyKey>>[]
): AnyPropertyForwarder[] {
  return map(flat(properties), (property) => {
    return propertyForwarder(source, property);
  });
}
