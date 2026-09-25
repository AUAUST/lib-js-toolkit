import type { Callable, callable } from "@auaust/toolkit/protocols/callable";

export type CallSignature<Target> = Target extends Callable
  ? Target[typeof callable]
  : Target extends (...args: any[]) => any
    ? Target
    : never;
