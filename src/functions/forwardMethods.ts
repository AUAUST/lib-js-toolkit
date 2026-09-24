import { forward, type Forwarded } from "@auaust/toolkit/forward";
import type { MethodForwardingInput } from "@auaust/toolkit/methodForwarder";
import {
  methodForwarders,
  type MethodForwarderFor,
} from "@auaust/toolkit/methodForwarders";
import type {
  FlatEntries,
  MaybeArray,
  MaybeArrayElement,
  MethodName,
} from "@auaust/toolkit/types";

export function forwardMethods<
  const Target extends object,
  const Source extends object,
  const Methods extends MaybeArray<
    MethodForwardingInput<MethodName<Source>, PropertyKey>
  >[],
>(
  target: Target,
  handler: Source,
  ...methods: Methods
): Forwarded<
  Target,
  MethodForwarderFor<
    Source,
    MaybeArrayElement<
      FlatEntries<Methods>[number],
      MethodForwardingInput<MethodName<Source>, PropertyKey>
    >
  >[]
> {
  return forward(target, methodForwarders(handler, ...methods));
}
