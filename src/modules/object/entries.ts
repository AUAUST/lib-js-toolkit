import type { ObjectEntry } from "@auaust/toolkit/types";

export const entries: <Target extends {}>(
  target: Target,
) => ObjectEntry<Target>[] = Object.entries;
