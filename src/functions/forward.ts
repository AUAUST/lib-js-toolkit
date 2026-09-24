import { forwardAs } from "@auaust/toolkit/forwardAs";
import {
  methodForwarder,
  type ForwardedMethod,
  type MethodForwarder,
} from "@auaust/toolkit/methodForwarder";
import { methodForwarders } from "@auaust/toolkit/methodForwarders";
import {
  propertyForwarder,
  type ForwardedProperty,
  type PropertyForwarder,
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
  Forwards extends (MethodForwarder | PropertyForwarder)[],
> = Simplify<Target & UnionToIntersection<ForwardedEntry<Forwards[number]>>>;

export type ForwardedEntry<
  Forward extends MethodForwarder | PropertyForwarder,
> = Forward extends infer Entry
  ? Entry extends MethodForwarder
    ? ForwardedMethod<Entry>
    : Entry extends PropertyForwarder
      ? ForwardedProperty<Entry>
      : never
  : never;

function doForward<
  Target extends object,
  Forwards extends MaybeArray<MethodForwarder | PropertyForwarder>[],
>(
  target: Target,
  ...forwards: Forwards
): Forwarded<Target, FlatEntries<Forwards>>;
function doForward(
  target: object,
  ...forwards: MaybeArray<MethodForwarder | PropertyForwarder>[]
) {
  const descriptors: Record<PropertyKey, PropertyDescriptor> = {};

  for (const forward of forwards.flat()) {
    const { name } = forward;

    if (target.hasOwnProperty(name)) {
      throw new Error(
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
