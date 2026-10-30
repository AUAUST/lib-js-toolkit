import { StateError } from "#errors/StateError";
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
import type { MaybeArray } from "#types/MaybeArray";
import type { PropertyDescriptor } from "#types/PropertyDescriptor";
import type { Simplify } from "#types/Simplify";
import type { UnionToIntersection } from "#types/UnionToIntersection";

export type Forwarded<
  Target extends object,
  Forwards extends (AnyMethodForwarder | AnyPropertyForwarder)[],
> = Simplify<Target & UnionToIntersection<ForwardedEntry<Forwards[number]>>>;

export type ForwardedEntry<
  Forward extends AnyMethodForwarder | AnyPropertyForwarder,
> = Forward extends infer Entry
  ? Entry extends AnyMethodForwarder
    ? ForwardedMethod<Entry>
    : Entry extends AnyPropertyForwarder
      ? ForwardedProperty<Entry>
      : never
  : never;

function doForward<
  Target extends object,
  Forwards extends MaybeArray<AnyMethodForwarder | AnyPropertyForwarder>[],
>(
  target: Target,
  ...forwards: Forwards
): Forwarded<Target, FlatEntries<Forwards>>;
function doForward(
  target: object,
  ...forwards: MaybeArray<AnyMethodForwarder | AnyPropertyForwarder>[]
) {
  const descriptors: Record<PropertyKey, PropertyDescriptor> = {};

  for (const forward of forwards.flat()) {
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

export const forward = finalize(doForward, {
  properties: propertyForwarders,
  property: propertyForwarder,
  methods: methodForwarders,
  method: methodForwarder,
  as: forwardAs,
});
