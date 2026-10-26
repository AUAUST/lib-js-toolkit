import { StateError } from "@auaust/toolkit/errors";
import { defineProperties, finalize, hasOwn } from "@auaust/toolkit/object";
import type {
  FlatEntries,
  MaybeArray,
  Simplify,
  UnionToIntersection,
} from "@auaust/toolkit/types";

import { forwardAs } from "./forwardAs";
import {
  methodForwarder,
  type AnyMethodForwarder,
  type ForwardedMethod,
} from "./methodForwarder";
import { methodForwarders } from "./methodForwarders";
import {
  propertyForwarder,
  type AnyPropertyForwarder,
  type ForwardedProperty,
} from "./propertyForwarder";
import { propertyForwarders } from "./propertyForwarders";

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
