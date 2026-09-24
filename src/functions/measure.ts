import { apply } from "@auaust/toolkit/apply";
import type { Callee } from "@auaust/toolkit/types";

export type MeasureResult<T> = {
  readonly result: T;
  readonly start: number;
  readonly end: number;
  readonly duration: number;
};

export function measure<Result, Arguments extends any[], This>(
  this: This,
  callback: Callee<Arguments, Result, This>,
  ...args: Arguments
): MeasureResult<Result> {
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
