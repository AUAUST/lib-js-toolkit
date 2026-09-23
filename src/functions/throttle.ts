/**
 * Returns the throttled function. Calling the returned function returns
 * `true` if the call actually happened, `false` if it was throttled.
 */
export function throttle<T, F extends (this: T, ...args: any[]) => any>(
  callback: F,
  ms: number,
): (this: T, ...args: Parameters<F>) => boolean {
  const interval = Number(ms);

  if (Number.isNaN(interval)) {
    throw new TypeError(`Invalid throttle interval: ${String(ms)}`, {
      cause: ms,
    });
  }

  if (interval < 0) {
    throw new RangeError(`Throttle interval must not be negative`, {
      cause: ms,
    });
  }

  let throttledUntil = 0;

  return function (this: T, ...args: Parameters<F>): boolean {
    const now = Date.now();

    const shouldRun = now >= throttledUntil;

    if (shouldRun) {
      callback.call(this, ...args);

      throttledUntil = now + ms;
    }

    return shouldRun;
  };
}
