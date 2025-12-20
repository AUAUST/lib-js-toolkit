export type MeasureResult<T> = {
  result: T;
  duration: number;
};

export function measure<T, A extends any[], This>(
  this: This,
  fn: (this: This, ...args: A) => T,
  ...args: NoInfer<A>
): MeasureResult<T> {
  const start = performance.now();

  const result = fn.apply(this, args);

  const end = performance.now();

  return {
    result,
    duration: end - start,
  };
}
