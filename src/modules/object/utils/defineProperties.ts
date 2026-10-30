import type { DefinedProperties } from "#types/DefinedProperties";
import type { Extended } from "#types/Extended";
import type { PropertyDescriptor } from "#types/PropertyDescriptor";

type DefineProperties = <
  Target extends object,
  const Descriptors extends Record<PropertyKey, PropertyDescriptor>,
>(
  target: Target,
  descriptors: Descriptors & ThisType<Target & Record<PropertyKey, any>>,
) => Extended<Target, DefinedProperties<Descriptors, Target>>;

export const defineProperties = Object.defineProperties as DefineProperties;
