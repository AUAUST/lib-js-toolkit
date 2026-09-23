import type { MaybeArray, MaybeArrayElement } from "@auaust/toolkit";
import { forward, type Forwarded } from "@auaust/toolkit/forward";
import type { PropertyForwardingInput } from "@auaust/toolkit/propertyForwarder";
import {
  type PropertyForwarderFor,
  propertyForwarders,
} from "@auaust/toolkit/propertyForwarders";

export function forwardProperties<
  const Target extends object,
  const Source extends object,
  const Properties extends MaybeArray<
    PropertyForwardingInput<keyof Source, PropertyKey>
  >[],
>(
  target: Target,
  handler: Source,
  ...properties: Properties
): Forwarded<
  Target,
  PropertyForwarderFor<
    Source,
    MaybeArrayElement<
      Properties[number],
      PropertyForwardingInput<keyof Source, PropertyKey>
    >
  >[]
> {
  return forward(target, propertyForwarders(handler, ...properties));
}
