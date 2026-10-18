/**
 * Returns the throttled function. Calling the returned function returns
 * `true` if the call actually happened, `false` if it was throttled.
 */
export function throttle<This, F extends (this: This, ...args: any[]) => any>(
  callback: F,
  delay: number,
): (this: This, ...args: Parameters<F>) => boolean {
  const interval = Number(delay);

  if (Number.isNaN(interval)) {
    throw new TypeError(`Invalid throttle interval: ${String(delay)}`, {
      cause: delay,
    });
  }

  if (interval < 0) {
    throw new RangeError(`Throttle interval must not be negative`, {
      cause: delay,
    });
  }

  let throttledUntil = 0;

  return function throttle(this: This, ...args: Parameters<F>): boolean {
    const now = Date.now();

    if (now >= throttledUntil) {
      callback.call(this, ...args);

      throttledUntil = now + delay;

      return true;
    }

    return false;
  };
}
