import { apply } from "#utils/apply";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export interface MeasureResult<Result> {
  readonly result: Result;
  readonly start: number;
  readonly end: number;
  readonly duration: number;
}

export function measure<Callback extends Callee>(
  this: CallThisParameterType<Callback>,
  callback: Callback,
  ...args: CallParameters<Callback>
): MeasureResult<CallReturnType<Callback>> {
  const start = performance.now();

  const result = apply.call(this, callback, args);

  const end = performance.now();

  return {
    result,
    start,
    end,
    duration: end - start,
  };
}
