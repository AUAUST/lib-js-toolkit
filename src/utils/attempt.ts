import { apply } from "#utils/apply";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export type AttemptResult<Result> =
  | {
      success: true;
      result: Result;
      error: undefined;
    }
  | {
      success: false;
      result: undefined;
      error: unknown;
    };

export function attempt<Callback extends Callee>(
  this: CallThisParameterType<Callback>,
  callback: Callback,
  ...args: CallParameters<Callback>
): AttemptResult<CallReturnType<Callback>> {
  try {
    const result = apply.call(this, callback, args);

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
