import type { Callable } from "#modules/protocol/types/Callable";

export type CallThisParameterType<Target> =
  Target extends Callable<any, any, infer This>
    ? This
    : Target extends (this: infer This, ...args: any[]) => any
      ? This
      : unknown;
