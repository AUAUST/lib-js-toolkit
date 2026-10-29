import {
  methodForwarder,
  type MethodForwarder,
  type MethodForwardingInput,
  type MethodForwardingOptions,
} from "#modules/forwarder/utils/methodForwarder";
import type { ForwardAs } from "#modules/forwarder/utils/forwardAs";
import type { MaybeArray } from "#types/MaybeArray";
import type { MaybeArrayElement } from "#types/MaybeArrayElement";
import type { MethodName } from "#types/MethodName";

export type MethodForwarderFor<
  Source extends object,
  Method extends MethodForwardingInput<MethodName<Source>, PropertyKey>,
> = Method extends keyof Source
  ? MethodForwarder<Source, Method & MethodName<Source>>
  : Method extends ForwardAs<
        infer Key extends MethodName<Source>,
        infer Alias extends PropertyKey
      >
    ? MethodForwarder<Source, Key, Alias>
    : Method extends MethodForwardingOptions<
          infer Key extends keyof Source,
          any
        >
      ? MethodForwarder<
          Source,
          Key & MethodName<Source>,
          Method extends { as: infer Alias extends PropertyKey } ? Alias : Key
        >
      : never;

export function methodForwarders<
  const Source extends object,
  const Methods extends MaybeArray<
    MethodForwardingInput<MethodName<Source>, PropertyKey>
  >[],
>(
  source: Source,
  ...methods: Methods
): MethodForwarderFor<
  Source,
  MaybeArrayElement<
    Methods[number],
    MethodForwardingInput<MethodName<Source>, PropertyKey>
  >
>[];
export function methodForwarders(
  source: object,
  ...methods: MaybeArray<MethodForwardingInput<PropertyKey, PropertyKey>>[]
): MethodForwarder<any, any>[] {
  return methods.flat().map((method) => {
    return methodForwarder(source, method as any);
  });
}
