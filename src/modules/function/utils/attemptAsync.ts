import { toPromise } from "#modules/async/utils/toPromise";
import { apply } from "#modules/function/utils/apply";
import type { AttemptResult } from "#modules/function/utils/attempt";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export async function attemptAsync<Fn extends Callee>(
  this: CallThisParameterType<Fn>,
  fn: Fn,
  ...args: CallParameters<Fn>
): Promise<AttemptResult<Awaited<CallReturnType<Fn>>>> {
  try {
    const result = await toPromise(apply.call(this, fn, args));

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
