import type { Callable } from "@auaust/toolkit/protocols/callable";
import type { Callee } from "@auaust/toolkit/types";

export type ResolvedCallable<T extends Callee> =
  T extends Callable<infer Return, infer Arguments, infer This>
    ? (this: This, ...args: Arguments) => Return
    : T extends (...args: any[]) => any
      ? T
      : never;
