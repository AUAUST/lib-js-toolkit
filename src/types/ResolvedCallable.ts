import type { Callable } from "@auaust/toolkit/protocols/callable";
import type { Callee } from "@auaust/toolkit/types";

export type ResolvedCallable<T extends Callee> = T extends infer C
  ? C extends Callable<infer Arguments, infer Result, infer This>
    ? (this: This, ...args: Arguments) => Result
    : C extends (...args: any[]) => any
      ? C
      : never
  : never;
