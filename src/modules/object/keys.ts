import type { ObjectKey } from "@auaust/toolkit/types";

export const keys: <Target extends {}>(target: Target) => ObjectKey<Target>[] =
  Object.keys;
