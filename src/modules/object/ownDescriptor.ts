import type { PropertyValue } from "@auaust/toolkit/types";

export const ownDescriptor: <Target extends {}, Key extends PropertyKey>(
  target: Target,
  key: Key,
) => TypedPropertyDescriptor<PropertyValue<Target, Key>> | undefined =
  Object.getOwnPropertyDescriptor;
