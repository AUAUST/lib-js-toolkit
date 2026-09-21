import { forward } from "~/functions/forward";
import { methodForwarders } from "~/functions/methodForwarders";
import type {
  Forwarded,
  MaybeArray,
  MethodForwarderFor,
  MethodForwardingInput,
} from "~/index";
import type { MaybeArrayElement } from "~/types/MaybeArrayElement";
import type { Methods as ExtractMethods } from "~/types/Methods";

export function forwardMethods<
  const Target extends object,
  const Source extends object,
  const Methods extends MaybeArray<
    MethodForwardingInput<keyof ExtractMethods<Source>>
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
      MethodForwardingInput<keyof ExtractMethods<Source>>
    >
  >[]
> {
  return forward(target, methodForwarders(handler, ...methods));
}
