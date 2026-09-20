import { isArray, map } from "@auaust/primitive-kit/arrays";
import {
  propertyForwarder,
  type PropertyForwarder,
  type PropertyForwardingOptions,
} from "~/functions/propertyForwarder";

export type PropertyForwarderFor<
  Source extends object,
  Property extends PropertyForwardingOptions<keyof Source> | keyof Source,
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
  const Properties extends (
    | PropertyForwardingOptions<keyof Source>
    | keyof Source
  )[],
>(
  source: Source,
  properties: Properties,
): PropertyForwarderFor<Source, Properties[number]>[];
export function propertyForwarders<
  const Source extends object,
  const Properties extends (
    | PropertyForwardingOptions<keyof Source>
    | keyof Source
  )[],
>(
  source: Source,
  ...properties: Properties
): PropertyForwarderFor<Source, Properties[number]>[];
export function propertyForwarders(
  source: any,
  property:
    | PropertyKey
    | PropertyForwardingOptions
    | (PropertyKey | PropertyForwardingOptions)[],
  ...properties: (PropertyKey | PropertyForwardingOptions)[]
): PropertyForwarder<any, any, any>[] {
  if (isArray(property)) {
    properties = property;
  } else {
    properties.unshift(property);
  }

  return map(properties, (property) => {
    return propertyForwarder(source, property);
  });
}
