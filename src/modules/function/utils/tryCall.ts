import { attempt } from "#modules/function/utils/attempt";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

/**
 * Calls `fn` with the receiver and arguments, returning `undefined`
 * instead of throwing.
 */
export function tryCall<Fn extends Callee>(
  this: CallThisParameterType<Fn>,
  fn: Fn,
  ...args: CallParameters<Fn>
): CallReturnType<Fn> | undefined {
  return attempt.call(this, fn, ...args).result;
}
