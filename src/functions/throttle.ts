/**
 * Returns the throttled function. Calling the returned function returns
 * `true` if the call actually happened, `false` if it was throttled.
 */
export function throttle<T, F extends (this: T, ...args: any[]) => any>(
  callback: F,
  ms: number,
): (this: T, ...args: Parameters<F>) => boolean {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: T, ...args: Parameters<F>): boolean {
    if (timeoutId === undefined) {
      callback.call(this, ...args);

      timeoutId = setTimeout(() => {
        timeoutId = undefined;
      }, ms);

      return true;
    }

    return false;
  };
}
