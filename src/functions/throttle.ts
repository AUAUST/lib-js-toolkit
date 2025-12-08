export function throttle<T, F extends (this: T, ...args: any[]) => any>(
  fn: F,
  ms: number
): (this: T, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: T, ...args: Parameters<F>): void {
    if (timeoutId === undefined) {
      fn.call(this, ...args);

      timeoutId = setTimeout(() => {
        timeoutId = undefined;
      }, ms);
    }
  };
}
