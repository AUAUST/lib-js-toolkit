import type {
  Callable,
  CallableReturnType,
} from "@auaust/toolkit/protocols/callable";
import type { Callee } from "@auaust/toolkit/types";

export type CallReturnType<Target extends Callee> = Target extends infer C
  ? C extends Callable
    ? CallableReturnType<C>
    : C extends (...args: any[]) => any
      ? ReturnType<C>
      : never
  : never;
