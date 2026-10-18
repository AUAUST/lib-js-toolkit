import { assign, freeze } from "@auaust/toolkit/object";
import type { Assigned } from "@auaust/toolkit/types";

export type Finalized<Target> = Target extends Function
  ? Target
  : Readonly<Target>;

export function finalize<
  Target extends object,
  Sources extends readonly unknown[],
>(target: Target, ...sources: Sources): Finalized<Assigned<Target, Sources>>;
export function finalize(target: object, ...sources: unknown[]): object {
  return freeze(assign(target, ...sources));
}
