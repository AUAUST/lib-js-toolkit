import type { MaybeArray, MaybeArrayElement } from "@auaust/toolkit/types";

import { forward, type Forwarded } from "./forward";
import {
  propertyForwarders,
  type PropertyForwarderFor,
} from "./propertyForwarders";
import type { PropertyForwardingInput } from "./propertyForwarder";

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
