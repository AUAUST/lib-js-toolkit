import { forward, type Forwarded } from "#modules/forwarder/utils/forward";
import {
  methodForwarders,
  type KeyMethodForwarderFor,
  type MethodForwarderFor,
} from "#modules/forwarder/utils/methodForwarders";
import type { MethodForwardingInput } from "#modules/forwarder/utils/methodForwarder";
import type { MaybeArray } from "#types/MaybeArray";
import type { MaybeArrayElement } from "#types/MaybeArrayElement";
import type { MethodName } from "#types/MethodName";

/**
 * Forwards each method onto `target`, from an object `source` or from the `source`
 * property of `target`, resolved on every call.
 *
 * @throws {StateError} When `target` already owns a forwarded name.
 */
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
>;
export function forwardMethods<
  Target extends object,
  const SourceKey extends keyof Target,
  const Methods extends MaybeArray<
    MethodForwardingInput<
      MethodName<NonNullable<Target[SourceKey]>>,
      PropertyKey
    >
  >[],
>(
  target: Target,
  source: SourceKey,
  ...methods: Methods
): Forwarded<
  Target,
  KeyMethodForwarderFor<
    SourceKey,
    MaybeArrayElement<
      Methods[number],
      MethodForwardingInput<
        MethodName<NonNullable<Target[SourceKey]>>,
        PropertyKey
      >
    >
  >[]
>;
// @debt The implementation signature types the source `any`, because no overload accepts an `object | PropertyKey` source; an internal factory taking that union, which the overloads and the plural forms would share, would remove it.
export function forwardMethods(
  target: object,
  source: any,
  ...methods: any[]
): object {
  return forward(target, methodForwarders(source, ...methods));
}
