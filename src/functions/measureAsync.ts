import { apply } from "@auaust/toolkit/apply";
import type { MeasureResult } from "@auaust/toolkit/measure";
import type { Callee, MaybePromise } from "@auaust/toolkit/types";

export async function measureAsync<Result, Arguments extends any[], This>(
  this: This,
  callback: Callee<Arguments, MaybePromise<Result>, This>,
  ...args: Arguments
): Promise<MeasureResult<Result>> {
  const start = performance.now();

  const result = await apply.call(this, callback, args);

  const end = performance.now();

  return {
    result,
    start,
    end,
    duration: end - start,
  };
}
