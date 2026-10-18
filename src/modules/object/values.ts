import type { ObjectValue } from "@auaust/toolkit/types";

export const values: <Target extends {}>(
  target: Target,
) => ObjectValue<Target>[] = Object.values;
