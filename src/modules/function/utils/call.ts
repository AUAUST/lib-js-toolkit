import { applyWith } from "#modules/function/utils/applyWith";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export interface Call {
  <Target extends Callee>(
    this: CallThisParameterType<Target>,
    callback: Target,
    ...args: CallParameters<Target>
  ): CallReturnType<Target>;
  call<Target extends Callee>(
    thisArg: CallThisParameterType<Target>,
    callback: Target,
    ...args: CallParameters<Target>
  ): CallReturnType<Target>;
  apply<Target extends Callee>(
    thisArg: CallThisParameterType<Target>,
    args: readonly [callback: Target, ...args: CallParameters<Target>],
  ): CallReturnType<Target>;
}

export const call: Call = function call(
  this: unknown,
  callback: Callee,
  ...args: unknown[]
): unknown {
  // @debt A `this` equal to `call` itself counts as no receiver, a tested contract with no stated reason.
  return applyWith(callback, this === call ? undefined : this, args);
} as Call;
