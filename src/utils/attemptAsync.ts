import { apply } from "#utils/apply";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";
import type { AttemptResult } from "#utils/attempt";

export async function attemptAsync<Callback extends Callee>(
  this: CallThisParameterType<Callback>,
  callback: Callback,
  ...args: CallParameters<Callback>
): Promise<AttemptResult<Awaited<CallReturnType<Callback>>>> {
  try {
    const result = await Promise.resolve(apply.call(this, callback, args));

    return {
      success: true,
      result,
      error: undefined,
    };
  } catch (error) {
    return {
      success: false,
      result: undefined,
      error,
    };
  }
}
