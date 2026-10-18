import { apply } from "@auaust/toolkit/apply";
import type { AttemptResult } from "@auaust/toolkit/attempt";
import type { AsyncCallee } from "@auaust/toolkit/types";

export async function attemptAsync<
  Result,
  Arguments extends readonly any[],
  This,
>(
  this: This,
  callback: AsyncCallee<Result, Arguments, This>,
  ...args: Arguments
): Promise<AttemptResult<Result>> {
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
