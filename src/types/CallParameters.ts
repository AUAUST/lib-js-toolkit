import type {
  Callable,
  CallableParameters,
} from "@auaust/toolkit/protocols/callable";
import type { Callee } from "@auaust/toolkit/types";

export type CallParameters<Target extends Callee> = Target extends infer C
  ? C extends Callable
    ? CallableParameters<C>
    : C extends (...args: any) => any
      ? Readonly<Parameters<C>>
      : never
  : never;
