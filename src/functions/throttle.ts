import type { Fn, WithReturnType } from "@auaust/toolkit/types";

export type Throttled<Callback extends Fn> = WithReturnType<
  boolean,
  Callback
> & {
  /**
   * Clears the cooldown and makes any subsequent call happen immediately.
   */
  reset(): void;

  /**
   * Instantly invokes the function, ignoring any cooldown.
   * It doesn't set or affect the cooldown of other calls.
   */
  immediate(
    this: ThisParameterType<Callback>,
    ...args: Parameters<Callback>
  ): void;

  /**
   * Returns the amount of milliseconds remaining until
   * the function can be called again.
   */
  remaining(): number;
};

/**
 * Returns the throttled function. Calling the returned function returns
 * `true` if the call actually happened, `false` if it was throttled.
 */
export function throttle<Callback extends Fn>(
  callback: Callback,
  delay: number,
): Throttled<Callback> {
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

  function reset(): void {
    throttledUntil = 0;
  }

  function throttle(
    this: ThisParameterType<Callback>,
    ...args: Parameters<Callback>
  ): boolean {
    const now = Date.now();

    if (now >= throttledUntil) {
      callback.call(this, ...args);

      throttledUntil = now + delay;

      return true;
    }

    return false;
  }

  function immediate(
    this: ThisParameterType<Callback>,
    ...args: Parameters<Callback>
  ): void {
    callback.call(this, ...args);
  }

  function remaining(): number {
    const now = Date.now();

    return Math.max(throttledUntil - now, 0);
  }

  return Object.assign(throttle, {
    reset,
    immediate,
    remaining,
  });
}
