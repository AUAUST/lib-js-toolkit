import { apply } from "#utils/apply";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";
import type { MeasureResult } from "#utils/measure";

export async function measureAsync<Callback extends Callee>(
  this: CallThisParameterType<Callback>,
  callback: Callback,
  ...args: CallParameters<Callback>
): Promise<MeasureResult<Awaited<CallReturnType<Callback>>>> {
  const start = performance.now();

  const result = await Promise.resolve(apply.call(this, callback, args));

  const end = performance.now();

  return {
    result,
    start,
    end,
    duration: end - start,
  };
}
