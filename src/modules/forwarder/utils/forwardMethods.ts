import { forward, type Forwarded } from "#modules/forwarder/utils/forward";
import {
  methodForwarders,
  type MethodForwarderFor,
} from "#modules/forwarder/utils/methodForwarders";
import type { MethodForwardingInput } from "#modules/forwarder/utils/methodForwarder";
import type { MaybeArray } from "#types/MaybeArray";
import type { MaybeArrayElement } from "#types/MaybeArrayElement";
import type { MethodName } from "#types/MethodName";

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
