import type { DefinedProperties } from "#types/DefinedProperties";
import type { Extended } from "#types/Extended";

type DefineProperties = <
  Target extends object,
  const Descriptors extends PropertyDescriptorMap,
>(
  target: Target,
  descriptors: Descriptors & ThisType<Target & Record<PropertyKey, any>>,
) => Extended<Target, DefinedProperties<Descriptors, Target>>;

export const defineProperties = Object.defineProperties as DefineProperties;
