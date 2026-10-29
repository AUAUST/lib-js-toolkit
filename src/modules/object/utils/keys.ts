import type { ObjectKey } from "#types/ObjectKey";

export const keys: <Target extends {}>(target: Target) => ObjectKey<Target>[] =
  Object.keys;
