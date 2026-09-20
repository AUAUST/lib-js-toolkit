import { forward } from "~/functions/forward";
import { methodForwarders } from "~/functions/methodForwarders";
import type {
  Forwarded,
  MaybeArray,
  MethodForwarderFor,
  MethodForwardingInput,
} from "~/index";
import type { Methods as ExtractMethods } from "~/types/Methods";

export function forwardMethods<
  const Target extends object,
  const Source extends object,
  const Methods extends keyof ExtractMethods<Source>,
>(
  target: Target,
  handler: Source,
  ...methods: MaybeArray<MethodForwardingInput<Methods>>[]
): Forwarded<Target, MethodForwarderFor<Source, Methods>[]> {
  return forward(target, methodForwarders(handler, ...methods));
}
