import type {
  Callable,
  CallableParameters,
} from "@auaust/toolkit/protocols/callable";
import type { Callee } from "@auaust/toolkit/types";

export type CallParameters<Target extends Callee> = Target extends Callable
  ? CallableParameters<Target>
  : Target extends (...args: any[]) => any
    ? Parameters<Target>
    : never;
