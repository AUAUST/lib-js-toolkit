export function throttle<T, F extends (this: T, ...args: any[]) => any>(
  callback: F,
  ms: number
): (this: T, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: T, ...args: Parameters<F>): void {
    if (timeoutId === undefined) {
      callback.call(this, ...args);

      timeoutId = setTimeout(() => {
        timeoutId = undefined;
      }, ms);
    }
  };
}
