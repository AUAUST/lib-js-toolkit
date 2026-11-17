import { applyWith } from "#modules/function/utils/applyWith";
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

export function attempt<Fn extends Callee>(
  this: CallThisParameterType<Fn>,
  fn: Fn,
  ...args: CallParameters<Fn>
): AttemptResult<CallReturnType<Fn>> {
  try {
    const result = applyWith(fn, this, args);

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
