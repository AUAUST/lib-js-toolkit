import type { callable } from "#modules/protocol/symbols";
import type { Callable } from "#modules/protocol/types/Callable";

export type CallSignature<Target> = Target extends Callable
  ? Target[typeof callable]
  : Target extends (...args: any[]) => any
    ? Target
    : never;
