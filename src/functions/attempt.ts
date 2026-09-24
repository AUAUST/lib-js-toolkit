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

export function attempt<Result, Arguments extends any[], This>(
  this: This,
  callback: (this: This, ...args: Arguments) => Result,
  ...args: Arguments
): AttemptResult<Result> {
  try {
    const result = callback.apply(this, args);

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
