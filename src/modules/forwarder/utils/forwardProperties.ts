import { forward, type Forwarded } from "#modules/forwarder/utils/forward";
import {
  propertyForwarders,
  type PropertyForwarderFor,
} from "#modules/forwarder/utils/propertyForwarders";
import type { PropertyForwardingInput } from "#modules/forwarder/utils/propertyForwarder";
import type { MaybeArray } from "#types/MaybeArray";
import type { MaybeArrayElement } from "#types/MaybeArrayElement";

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
