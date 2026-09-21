import type {
  MethodForwardingInput,
  MethodForwardingOptions,
} from "~/functions/methodForwarder";
import {
  methodForwarder,
  type MethodForwarder,
} from "~/functions/methodForwarder";
import type { MaybeArray } from "~/types/MaybeArray";
import type { MaybeArrayElement } from "~/types/MaybeArrayElement";
import type { Methods as ExtractMethods } from "~/types/Methods";

export type MethodForwarderFor<
  Source extends object,
  Method extends MethodForwardingInput<keyof ExtractMethods<Source>>,
> = Method extends keyof Source
  ? MethodForwarder<Source, Method>
  : Method extends MethodForwardingOptions<infer Key extends keyof Source>
    ? MethodForwarder<Source, Key>
    : never;

export function methodForwarders<
  const Source extends object,
  const Methods extends MaybeArray<
    MethodForwardingInput<keyof ExtractMethods<Source>>
  >[],
>(
  source: Source,
  ...methods: Methods
): MethodForwarderFor<
  Source,
  MaybeArrayElement<
    Methods[number],
    MethodForwardingInput<keyof ExtractMethods<Source>>
  >
>[];
export function methodForwarders(
  source: any,
  ...methods: MaybeArray<MethodForwardingInput<PropertyKey>>[]
): MethodForwarder<any, any>[] {
  return methods.flat().map((method) => {
    return methodForwarder(source, method);
  });
}
