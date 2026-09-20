import { forward } from "~/functions/forward";
import {
  propertyForwarders,
  type Forwarded,
  type MaybeArray,
  type PropertyForwarderFor,
  type PropertyForwardingInput,
} from "~/index";

export function forwardProperties<
  const Target extends object,
  const Source extends object,
  const Properties extends keyof Source,
>(
  target: Target,
  handler: Source,
  ...properties: MaybeArray<PropertyForwardingInput<Properties>>[]
): Forwarded<Target, PropertyForwarderFor<Source, Properties>[]> {
  return forward(target, propertyForwarders(handler, ...properties));
}
