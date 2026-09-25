import type { Callable } from "@auaust/toolkit/protocols/callable";

export type CallThisParameterType<Target> =
  Target extends Callable<any, any, infer This>
    ? This
    : Target extends (this: infer This, ...args: any[]) => any
      ? This
      : unknown;
