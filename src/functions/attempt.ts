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

export function attempt<T, A extends any[], This>(
  this: This,
  fn: (this: This, ...args: A) => T,
  ...args: NoInfer<A>
): AttemptResult<T> {
  try {
    const result = fn.apply(this, args);

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
