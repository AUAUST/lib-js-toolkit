import type { Callable } from "#modules/protocol/types/Callable";
import type { Callee } from "#types/Callee";

export type CallParameters<Target extends Callee> =
  Target extends Callable<any, infer Arguments>
    ? Readonly<Arguments>
    : Target extends (...args: infer Arguments) => any
      ? Readonly<Arguments>
      : never;
