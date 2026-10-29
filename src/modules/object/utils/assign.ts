import type { Assigned } from "#types/Assigned";

export const assign: <
  Target extends object,
  Sources extends readonly unknown[],
>(
  target: Target,
  ...sources: Sources
) => Assigned<Target, Sources> = Object.assign;
