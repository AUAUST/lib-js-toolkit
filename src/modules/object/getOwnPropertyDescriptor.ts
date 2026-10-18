import type { PropertyValue } from "@auaust/toolkit/types";

export const getOwnPropertyDescriptor: <
  Target extends {},
  Key extends PropertyKey,
>(
  target: Target,
  key: Key,
) => TypedPropertyDescriptor<PropertyValue<Target, Key>> | undefined =
  Object.getOwnPropertyDescriptor;
