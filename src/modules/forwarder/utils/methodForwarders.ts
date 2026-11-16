import { flat } from "#modules/array/utils/flat";
import { map } from "#modules/array/utils/map";
import {
  methodForwarder,
  type AnyMethodForwarder,
  type KeyMethodForwarder,
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

/**
 * Maps a method forwarding input to the forwarder reading it from `SourceKey`.
 */
export type KeyMethodForwarderFor<
  SourceKey extends PropertyKey,
  Method extends MethodForwardingInput<PropertyKey, PropertyKey>,
> = Method extends PropertyKey
  ? KeyMethodForwarder<SourceKey, Method>
  : Method extends ForwardAs<
        infer Key extends PropertyKey,
        infer Alias extends PropertyKey
      >
    ? KeyMethodForwarder<SourceKey, Key, Alias>
    : Method extends MethodForwardingOptions<infer Key extends PropertyKey, any>
      ? KeyMethodForwarder<
          SourceKey,
          Key,
          Method extends { as: infer Alias extends PropertyKey } ? Alias : Key
        >
      : never;

/**
 * Creates a method forwarder for each method, from an object `source` or from
 * the `source` property of the object they are defined on, as `methodForwarder`.
 */
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
export function methodForwarders<
  const SourceKey extends PropertyKey,
  const Methods extends MaybeArray<
    MethodForwardingInput<PropertyKey, PropertyKey>
  >[],
>(
  source: SourceKey,
  ...methods: Methods
): KeyMethodForwarderFor<
  SourceKey,
  MaybeArrayElement<
    Methods[number],
    MethodForwardingInput<PropertyKey, PropertyKey>
  >
>[];
export function methodForwarders(
  source: any,
  ...methods: MaybeArray<MethodForwardingInput<PropertyKey, PropertyKey>>[]
): AnyMethodForwarder[] {
  return map(flat(methods), (method) => {
    return methodForwarder(source, method as any);
  });
}
