import type { ForwardAs } from "~/functions/forwardAs";
import {
  propertyForwarder,
  type PropertyForwarder,
  type PropertyForwardingInput,
  type PropertyForwardingOptions,
} from "~/functions/propertyForwarder";
import type { MaybeArray } from "~/types/MaybeArray";
import type { MaybeArrayElement } from "~/types/MaybeArrayElement";

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
export function propertyForwarders(
  source: any,
  ...properties: MaybeArray<PropertyForwardingInput<PropertyKey, PropertyKey>>[]
): PropertyForwarder<any, any, any, any>[] {
  return properties.flat().map((property) => {
    return propertyForwarder(source, property);
  });
}
