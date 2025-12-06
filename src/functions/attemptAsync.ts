import type { AttemptResult } from "./attempt";

export async function attemptAsync<T, A extends any[]>(
  fn: (...args: A) => Promise<T> | T,
  ...args: A
): Promise<AttemptResult<T>> {
  try {
    const result = await fn(...args);

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
