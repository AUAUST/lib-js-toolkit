import type { Callable } from "#modules/protocol/types/Callable";
import type { Callee } from "#types/Callee";

export type ResolvedCallable<T extends Callee> =
  T extends Callable<infer Return, infer Arguments, infer This>
    ? (this: This, ...args: Arguments) => Return
    : T extends (...args: any[]) => any
      ? T
      : never;
