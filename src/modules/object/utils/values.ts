import type { ObjectValue } from "#types/ObjectValue";

export const values: <Target extends {}>(
  target: Target,
) => ObjectValue<Target>[] = Object.values;
