import { StateError } from "@auaust/toolkit/errors";
import { forwardAs } from "@auaust/toolkit/forwardAs";
import {
  methodForwarder,
  type AnyMethodForwarder,
  type ForwardedMethod,
} from "@auaust/toolkit/methodForwarder";
import { methodForwarders } from "@auaust/toolkit/methodForwarders";
import {
  propertyForwarder,
  type AnyPropertyForwarder,
  type ForwardedProperty,
} from "@auaust/toolkit/propertyForwarder";
import { propertyForwarders } from "@auaust/toolkit/propertyForwarders";
import type {
  FlatEntries,
  MaybeArray,
  Simplify,
  UnionToIntersection,
} from "@auaust/toolkit/types";

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

    if (Object.hasOwn(target, name)) {
      throw new StateError(
        `Existing property ${String(name)} cannot be forwarded on target.`,
      );
    }

    descriptors[name] = forward;
  }

  Object.defineProperties(target, descriptors);

  return target;
}

export const forward = Object.assign(doForward, {
  properties: propertyForwarders,
  property: propertyForwarder,
  methods: methodForwarders,
  method: methodForwarder,
  as: forwardAs,
});
