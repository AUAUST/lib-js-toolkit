import type { MaybeArray, MaybeArrayElement } from "@auaust/toolkit/types";
import { type Forwarded, forward } from "./forward";
import type { PropertyForwardingInput } from "./propertyForwarder";
import {
  type PropertyForwarderFor,
  propertyForwarders,
} from "./propertyForwarders";

export function forwardProperties<
  Target extends object,
  const Source extends object,
  const Properties extends MaybeArray<
    PropertyForwardingInput<keyof Source, PropertyKey>
  >[],
>(
  target: Target,
  source: Source,
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
  return forward(target, propertyForwarders(source, ...properties));
}
