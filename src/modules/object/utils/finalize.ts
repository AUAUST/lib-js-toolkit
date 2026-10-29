import { assign } from "#modules/object/utils/assign";
import { freeze } from "#modules/object/utils/freeze";
import type { Assigned } from "#types/Assigned";

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
