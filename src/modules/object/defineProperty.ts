import type { DefinedProperties, Extended } from "@auaust/toolkit/types";

type DefineProperty = <
  Target extends object,
  Key extends PropertyKey,
  const Descriptor extends PropertyDescriptor,
>(
  target: Target,
  key: Key,
  descriptor: Descriptor & ThisType<Target & Record<PropertyKey, any>>,
) => Extended<Target, DefinedProperties<Record<Key, Descriptor>, Target>>;

export const defineProperty = Object.defineProperty as DefineProperty;
