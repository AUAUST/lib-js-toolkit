import type { AttemptResult } from "@auaust/toolkit/attempt";

export async function attemptAsync<Result, Arguments extends any[], This>(
  this: This,
  callback: (this: This, ...args: Arguments) => Promise<Result> | Result,
  ...args: Arguments
): Promise<AttemptResult<Result>> {
  try {
    const result = await callback.apply(this, args);

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
