import type { Callable } from "@auaust/toolkit/protocols/callable";
import type { Callee } from "@auaust/toolkit/types";

export type CallParameters<Target extends Callee> =
  Callee extends Callable<any, infer Arguments>
    ? readonly [...Arguments]
    : Target extends (...args: infer Arguments) => any
      ? readonly [...Arguments]
      : never;
