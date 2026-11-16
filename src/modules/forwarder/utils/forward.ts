import { StateError } from "#errors/StateError";
import { flat } from "#modules/array/utils/flat";
import { forwardAs } from "#modules/forwarder/utils/forwardAs";
import {
  methodForwarder,
  type AnyMethodForwarder,
  type ForwardedMethod,
} from "#modules/forwarder/utils/methodForwarder";
import { methodForwarders } from "#modules/forwarder/utils/methodForwarders";
import {
  propertyForwarder,
  type AnyPropertyForwarder,
  type ForwardedProperty,
} from "#modules/forwarder/utils/propertyForwarder";
import { propertyForwarders } from "#modules/forwarder/utils/propertyForwarders";
import { defineProperties } from "#modules/object/utils/defineProperties";
import { finalize } from "#modules/object/utils/finalize";
import { hasOwn } from "#modules/object/utils/hasOwn";
import type { FlatEntries } from "#types/FlatEntries";
import type { IsNever } from "#types/IsNever";
import type { MaybeArray } from "#types/MaybeArray";
import type { PropertyDescriptor } from "#types/PropertyDescriptor";
import type { Simplify } from "#types/Simplify";
import type { UnionToIntersection } from "#types/UnionToIntersection";

export type Forwarded<
  Target extends object,
  Forwards extends (AnyMethodForwarder | AnyPropertyForwarder)[],
> = Simplify<
  Target & UnionToIntersection<ForwardedEntry<Target, Forwards[number]>>
>;

export type ForwardedEntry<
  Target extends object,
  Forward extends AnyMethodForwarder | AnyPropertyForwarder,
> = Forward extends infer Entry
  ? Entry extends AnyMethodForwarder
    ? ForwardedMethod<Entry, Target>
    : Entry extends AnyPropertyForwarder
      ? ForwardedProperty<Entry, Target>
      : never
  : never;

/**
 * Maps a forwarder to `never` when `ForwardedEntry` rejects it on `Target`: a
 * key-source forwarder whose key is not a key of `Target`, or whose member is
 * not a member (a method name for a method) of `Target[SourceKey]`.
 */
export type CheckedForward<
  Target extends object,
  Forward,
> = Forward extends readonly unknown[]
  ? { [Index in keyof Forward]: CheckedForward<Target, Forward[Index]> }
  : Forward extends AnyMethodForwarder | AnyPropertyForwarder
    ? IsNever<ForwardedEntry<Target, Forward>, never, Forward>
    : Forward;

function doForward<
  Target extends object,
  Forwards extends MaybeArray<AnyMethodForwarder | AnyPropertyForwarder>[],
>(
  target: Target,
  ...forwards: Forwards & CheckedForward<Target, Forwards>
): Forwarded<Target, FlatEntries<Forwards>>;
function doForward(
  target: object,
  ...forwards: MaybeArray<AnyMethodForwarder | AnyPropertyForwarder>[]
) {
  const descriptors: Record<PropertyKey, PropertyDescriptor> = {};

  for (const forward of flat(forwards)) {
    const { name } = forward;

    if (hasOwn(target, name)) {
      throw new StateError(
        `Existing property ${String(name)} cannot be forwarded on target.`,
      );
    }

    descriptors[name] = forward;
  }

  defineProperties(target, descriptors);

  return target;
}

/**
 * Defines each forwarder on `target` and returns it. A forwarder built from a
 * property key resolves its source from that property of `target` on every call
 * or access; its key and member must exist on `target`'s type.
 *
 * @throws {StateError} When `target` already owns a forwarded name.
 */
export const forward = finalize(doForward, {
  properties: propertyForwarders,
  property: propertyForwarder,
  methods: methodForwarders,
  method: methodForwarder,
  as: forwardAs,
});
