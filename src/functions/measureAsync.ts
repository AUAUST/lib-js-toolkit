import type { MeasureResult } from "./measure";

export async function measureAsync<T, A extends any[], This>(
  this: This,
  fn: (this: This, ...args: A) => Promise<T> | T,
  ...args: NoInfer<A>
): Promise<MeasureResult<T>> {
  const start = performance.now();

  const result = await fn.apply(this, args);

  const end = performance.now();

  return {
    result,
    duration: end - start,
  };
}
