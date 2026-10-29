import type { DefinedProperties } from "#types/DefinedProperties";
import type { Extended } from "#types/Extended";

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
