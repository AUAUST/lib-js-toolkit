import { toPromise } from "#modules/async/utils/toPromise";
import { applyWith } from "#modules/function/utils/applyWith";
import type { MeasureResult } from "#modules/time/utils/measure";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export async function measureAsync<Callback extends Callee>(
  this: CallThisParameterType<Callback>,
  callback: Callback,
  ...args: CallParameters<Callback>
): Promise<MeasureResult<Awaited<CallReturnType<Callback>>>> {
  const start = performance.now();

  const result = await toPromise(applyWith(callback, this, args));

  const end = performance.now();

  return {
    result,
    start,
    end,
    duration: end - start,
  };
}
