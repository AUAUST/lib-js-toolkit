import { forward, type Forwarded } from "@auaust/toolkit/forward";
import type { MethodForwardingInput } from "@auaust/toolkit/methodForwarder";
import {
  methodForwarders,
  type MethodForwarderFor,
} from "@auaust/toolkit/methodForwarders";
import type {
  Methods as ExtractMethods,
  MaybeArray,
  MaybeArrayElement,
} from "@auaust/toolkit/types";

export function forwardMethods<
  const Target extends object,
  const Source extends object,
  const Methods extends MaybeArray<
    MethodForwardingInput<keyof ExtractMethods<Source>, PropertyKey>
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
      Methods[number],
      MethodForwardingInput<keyof ExtractMethods<Source>, PropertyKey>
    >
  >[]
> {
  return forward(target, methodForwarders(handler, ...methods));
}
