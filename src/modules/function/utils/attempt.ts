import { apply } from "#modules/function/utils/apply";
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
    const result = apply.call(this, fn, args);

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
