import type { ObjectEntry } from "#types/ObjectEntry";

export const entries: <Target extends {}>(
  target: Target,
) => ObjectEntry<Target>[] = Object.entries;
