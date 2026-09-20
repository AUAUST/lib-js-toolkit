import {
  methodForwarder,
  type MethodForwarded,
  type MethodForwarder,
} from "~/functions/methodForwarder";
import { methodForwarders } from "~/functions/methodForwarders";
import {
  propertyForwarder,
  type PropertyForwarded,
  type PropertyForwarder,
} from "~/functions/propertyForwarder";
import { propertyForwarders } from "~/functions/propertyForwarders";
import type { MaybeArray } from "~/types/MaybeArray";
import type { Simplify } from "~/types/Simplify";
import type { UnionToIntersection } from "~/types/UnionToIntersection";

export type Forwarded<
  Target extends object,
  Forwards extends MaybeArray<MethodForwarder | PropertyForwarder>[],
> = Simplify<Target & UnionToIntersection<ForwardedEntry<Forwards[number]>>>;

export type ForwardedEntry<Forward> = Forward extends readonly (infer Entry)[]
  ? ForwardedEntry<Entry>
  : Forward extends MethodForwarder
    ? MethodForwarded<Forward>
    : Forward extends PropertyForwarder
      ? PropertyForwarded<Forward>
      : never;

function doForward<
  Target extends object,
  Forwards extends MaybeArray<MethodForwarder | PropertyForwarder>[],
>(target: Target, ...forwards: Forwards): Forwarded<Target, Forwards>;
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
});
