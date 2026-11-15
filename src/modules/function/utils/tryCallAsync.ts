import { attemptAsync } from "#modules/function/utils/attemptAsync";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

/**
 * Calls `fn` with the receiver and arguments and awaits its result, resolving to
 * `undefined` when it throws or rejects.
 */
export async function tryCallAsync<Fn extends Callee>(
  this: CallThisParameterType<Fn>,
  fn: Fn,
  ...args: CallParameters<Fn>
): Promise<Awaited<CallReturnType<Fn>> | undefined> {
  const { result } = await attemptAsync.call(this, fn, ...args);

  return result;
}
