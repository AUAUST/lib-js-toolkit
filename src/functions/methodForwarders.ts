import type {
  MethodForwardingInput,
  MethodForwardingOptions,
} from "~/functions/methodForwarder";
import {
  methodForwarder,
  type MethodForwarder,
} from "~/functions/methodForwarder";
import type { MaybeArray } from "~/types/MaybeArray";
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
  const Methods extends MethodForwardingInput<keyof ExtractMethods<Source>>[],
>(
  source: Source,
  methods: Methods,
): MethodForwarderFor<Source, Methods[number]>[];
export function methodForwarders<
  const Source extends object,
  const Methods extends MethodForwardingInput<keyof ExtractMethods<Source>>[],
>(
  source: Source,
  ...methods: Methods
): MethodForwarderFor<Source, Methods[number]>[];
export function methodForwarders(
  source: any,
  method: MaybeArray<MethodForwardingInput<PropertyKey>>,
  ...methods: MethodForwardingInput<PropertyKey>[]
): MethodForwarder<any, any>[] {
  if (Array.isArray(method)) {
    methods = method;
  } else {
    methods.unshift(method);
  }

  return methods.map((method) => {
    return methodForwarder(source, method);
  });
}
