import type { ForwardAs } from "@auaust/toolkit/forwardAs";
import type {
  MethodForwardingInput,
  MethodForwardingOptions,
} from "@auaust/toolkit/methodForwarder";
import {
  methodForwarder,
  type MethodForwarder,
} from "@auaust/toolkit/methodForwarder";
import type {
  Methods as ExtractMethods,
  MaybeArray,
  MaybeArrayElement,
} from "@auaust/toolkit/types";

export type MethodForwarderFor<
  Source extends object,
  Method extends MethodForwardingInput<
    keyof ExtractMethods<Source>,
    PropertyKey
  >,
> = Method extends keyof Source
  ? MethodForwarder<Source, Method>
  : Method extends ForwardAs<
        infer Key extends keyof ExtractMethods<Source>,
        infer Alias extends PropertyKey
      >
    ? MethodForwarder<Source, Key, Alias>
    : Method extends MethodForwardingOptions<
          infer Key extends keyof Source,
          any
        >
      ? MethodForwarder<
          Source,
          Key,
          Method extends { as: infer Alias extends PropertyKey } ? Alias : Key
        >
      : never;

export function methodForwarders<
  const Source extends object,
  const Methods extends MaybeArray<
    MethodForwardingInput<keyof ExtractMethods<Source>, PropertyKey>
  >[],
>(
  source: Source,
  ...methods: Methods
): MethodForwarderFor<
  Source,
  MaybeArrayElement<
    Methods[number],
    MethodForwardingInput<keyof ExtractMethods<Source>, PropertyKey>
  >
>[];
export function methodForwarders(
  source: any,
  ...methods: MaybeArray<MethodForwardingInput<PropertyKey, PropertyKey>>[]
): MethodForwarder<any, any>[] {
  const createForwarder = methodForwarder as (
    source: any,
    method: MethodForwardingInput<PropertyKey, PropertyKey>,
  ) => MethodForwarder<any, any>;

  return methods.flat().map((method) => {
    return createForwarder(source, method);
  });
}
