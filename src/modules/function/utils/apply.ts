import { applyWith } from "#modules/function/utils/applyWith";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export interface Apply {
  <Target extends Callee<any, readonly []>>(
    this: CallThisParameterType<Target>,
    callback: Target,
    args?: CallParameters<Target>,
  ): CallReturnType<Target>;
  <Target extends Callee>(
    this: CallThisParameterType<Target>,
    callback: Target,
    args: CallParameters<Target>,
  ): CallReturnType<Target>;
  call<Target extends Callee<any, readonly []>>(
    thisArg: CallThisParameterType<Target>,
    callback: Target,
    args?: CallParameters<Target>,
  ): CallReturnType<Target>;
  call<Target extends Callee>(
    thisArg: CallThisParameterType<Target>,
    callback: Target,
    args: CallParameters<Target>,
  ): CallReturnType<Target>;
  apply<Target extends Callee<any, readonly []>>(
    thisArg: CallThisParameterType<Target>,
    args: readonly [callback: Target, args?: CallParameters<Target>],
  ): CallReturnType<Target>;
  apply<Target extends Callee>(
    thisArg: CallThisParameterType<Target>,
    args: readonly [callback: Target, args: CallParameters<Target>],
  ): CallReturnType<Target>;
}

export const apply: Apply = function apply(
  this: unknown,
  callback: Callee,
  args: readonly unknown[] = [],
): unknown {
  // @debt A `this` equal to `apply` itself counts as no receiver, a tested contract with no stated reason.
  return applyWith(callback, this === apply ? undefined : this, args);
};
