import type { DefinedProperties, Extended } from "@auaust/toolkit/types";

type DefineProperties = <
  Target extends object,
  const Descriptors extends PropertyDescriptorMap,
>(
  target: Target,
  descriptors: Descriptors & ThisType<Target & Record<PropertyKey, any>>,
) => Extended<Target, DefinedProperties<Descriptors, Target>>;

export const defineProperties = Object.defineProperties as DefineProperties;
