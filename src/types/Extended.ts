import type { IfAny } from "#types/IfAny";
import type { Simplify } from "#types/Simplify";

export type Extended<Target, Properties> = IfAny<
  Target | Properties,
  any,
  Target extends Function
    ? Target & Simplify<Properties>
    : Simplify<Omit<Target, keyof Properties> & Properties>
>;
