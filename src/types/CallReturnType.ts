import type {
  Callable,
  CallableReturnType,
} from "@auaust/toolkit/protocols/callable";
import type { Callee } from "@auaust/toolkit/types";

export type CallReturnType<Target extends Callee> = Target extends Callable
  ? CallableReturnType<Target>
  : Target extends (...args: any[]) => any
    ? ReturnType<Target>
    : never;
