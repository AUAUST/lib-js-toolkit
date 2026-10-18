import type { Fn } from "@auaust/toolkit/types";

export type AttemptResult<T> =
  | {
      success: true;
      result: T;
      error: undefined;
    }
  | {
      success: false;
      result: undefined;
      error: unknown;
    };

export function attempt<Callback extends Fn>(
  this: ThisParameterType<Callback>,
  callback: Callback,
  ...args: Parameters<Callback>
): AttemptResult<ReturnType<Callback>> {
  try {
    const result = callback.call(this, ...args);

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
