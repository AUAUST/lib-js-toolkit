import type { IfAny, Simplify } from "@auaust/toolkit/types";

export type Extended<Target, Properties> = IfAny<
  Target | Properties,
  any,
  Target extends Function
    ? Target & Simplify<Properties>
    : Simplify<Omit<Target, keyof Properties> & Properties>
>;
