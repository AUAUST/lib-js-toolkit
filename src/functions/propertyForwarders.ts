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
  const Properties extends MaybeArray<PropertyForwardingInput<keyof Source>>[],
>(
  source: Source,
  ...properties: Properties
): PropertyForwarderFor<
  Source,
  MaybeArrayElement<Properties[number], PropertyForwardingInput<keyof Source>>
>[];
export function propertyForwarders(
  source: any,
  ...properties: MaybeArray<PropertyForwardingInput<PropertyKey>>[]
): PropertyForwarder<any, any, any>[] {
  return properties.flat().map((property) => {
    return propertyForwarder(source, property);
  });
}
