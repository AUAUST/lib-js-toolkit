import type {
  MaybeArray,
  MaybeArrayElement,
  MethodName,
} from "@auaust/toolkit/types";

import { forward, type Forwarded } from "./forward";
import { methodForwarders, type MethodForwarderFor } from "./methodForwarders";
import type { MethodForwardingInput } from "./methodForwarder";

export function forwardMethods<
  Target extends object,
  const Source extends object,
  const Methods extends MaybeArray<
    MethodForwardingInput<MethodName<Source>, PropertyKey>
  >[],
>(
  target: Target,
  source: Source,
  ...methods: Methods
): Forwarded<
  Target,
  MethodForwarderFor<
    Source,
    MaybeArrayElement<
      Methods[number],
      MethodForwardingInput<MethodName<Source>, PropertyKey>
    >
  >[]
> {
  return forward(target, methodForwarders(source, ...methods));
}
