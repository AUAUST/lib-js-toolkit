import { apply } from "@auaust/toolkit/apply";
import type { MeasureResult } from "@auaust/toolkit/measure";
import type {
  Callee,
  CallParameters,
  CallReturnType,
  CallThisParameterType,
} from "@auaust/toolkit/types";

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
