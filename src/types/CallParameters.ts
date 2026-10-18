import type { Callable } from "@auaust/toolkit/protocols/callable";
import type { Callee } from "@auaust/toolkit/types";

export type CallParameters<Target extends Callee> =
  Target extends Callable<any, infer Arguments>
    ? Readonly<Arguments>
    : Target extends (...args: infer Arguments) => any
      ? Readonly<Arguments>
      : never;
