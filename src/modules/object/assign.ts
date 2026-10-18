import type { Assigned } from "@auaust/toolkit/types";

export const assign: <
  Target extends object,
  Sources extends readonly unknown[],
>(
  target: Target,
  ...sources: Sources
) => Assigned<Target, Sources> = Object.assign;
