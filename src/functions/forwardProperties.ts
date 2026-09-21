import { forward } from "~/functions/forward";
import {
  propertyForwarders,
  type Forwarded,
  type MaybeArray,
  type PropertyForwarderFor,
  type PropertyForwardingInput,
} from "~/index";
import type { MaybeArrayElement } from "~/types/MaybeArrayElement";

export function forwardProperties<
  const Target extends object,
  const Source extends object,
  const Properties extends MaybeArray<PropertyForwardingInput<keyof Source>>[],
>(
  target: Target,
  handler: Source,
  ...properties: Properties
): Forwarded<
  Target,
  PropertyForwarderFor<
    Source,
    MaybeArrayElement<Properties[number], PropertyForwardingInput<keyof Source>>
  >[]
> {
  return forward(target, propertyForwarders(handler, ...properties));
}
