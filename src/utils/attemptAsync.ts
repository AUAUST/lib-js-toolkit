import { apply } from "@auaust/toolkit/apply";
import type { AttemptResult } from "@auaust/toolkit/attempt";
import type {
  Callee,
  CallParameters,
  CallReturnType,
  CallThisParameterType,
} from "@auaust/toolkit/types";

export async function attemptAsync<Callback extends Callee>(
  this: CallThisParameterType<Callback>,
  callback: Callback,
  ...args: CallParameters<Callback>
): Promise<AttemptResult<Awaited<CallReturnType<Callback>>>> {
  try {
    const result = await apply.call(this, callback, args);

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
