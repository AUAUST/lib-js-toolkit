import {
  propertyForwarder,
  type PropertyForwarder,
  type PropertyForwardingInput,
  type PropertyForwardingOptions,
} from "~/functions/propertyForwarder";
import type { MaybeArray } from "~/types/MaybeArray";

export type PropertyForwarderFor<
  Source extends object,
  Property extends PropertyForwardingInput<keyof Source>,
> = Property extends keyof Source
  ? PropertyForwarder<Source, Property>
  : Property extends PropertyForwardingOptions<
        infer Key extends keyof Source,
        infer Readonly
      >
    ? PropertyForwarder<Source, Key, Readonly>
    : never;

export function propertyForwarders<
  const Source extends object,
  const Properties extends PropertyForwardingInput<keyof Source>[],
>(
  source: Source,
  properties: Properties,
): PropertyForwarderFor<Source, Properties[number]>[];
export function propertyForwarders<
  const Source extends object,
  const Properties extends PropertyForwardingInput<keyof Source>[],
>(
  source: Source,
  ...properties: Properties
): PropertyForwarderFor<Source, Properties[number]>[];
export function propertyForwarders(
  source: any,
  property: MaybeArray<PropertyForwardingInput<PropertyKey>>,
  ...properties: (PropertyKey | PropertyForwardingOptions)[]
): PropertyForwarder<any, any, any>[] {
  if (Array.isArray(property)) {
    properties = property;
  } else {
    properties.unshift(property);
  }

  return properties.map((property) => {
    return propertyForwarder(source, property);
  });
}
