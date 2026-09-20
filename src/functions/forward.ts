import {
  methodForwarder,
  type MethodForwarder,
} from "~/functions/methodForwarder";
import { methodForwarders } from "~/functions/methodForwarders";
import {
  propertyForwarder,
  type PropertyForwarder,
} from "~/functions/propertyForwarder";
import { propertyForwarders } from "~/functions/propertyForwarders";
import type { MaybeArray } from "~/types/MaybeArray";

function doForward<
  Target extends object,
  Forwards extends MaybeArray<MethodForwarder | PropertyForwarder>[],
>(target: Target, ...forwards: Forwards): Target;
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
