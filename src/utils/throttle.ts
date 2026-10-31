import { max } from "#modules/math/utils/max";
import { isNaN } from "#modules/number/utils/isNaN";
import { assign } from "#modules/object/utils/assign";
import { resolveCallable } from "#utils/resolveCallable";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export type Throttled<Callback extends Callee> = ((
  this: CallThisParameterType<Callback>,
  ...args: CallParameters<Callback>
) => boolean) & {
  /**
   * Clears the cooldown and makes any subsequent call happen immediately.
   */
  reset(): void;

  /**
   * Instantly invokes the function, ignoring any cooldown.
   * It doesn't set or affect the cooldown of other calls.
   */
  immediate(
    this: CallThisParameterType<Callback>,
    ...args: CallParameters<Callback>
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
export function throttle<Callback extends Callee>(
  callback: Callback,
  delay: number,
): Throttled<Callback> {
  const interval = Number(delay);

  if (isNaN(interval)) {
    throw new TypeError(`Invalid throttle interval: ${String(delay)}`, {
      cause: delay,
    });
  }

  if (interval < 0) {
    throw new RangeError(`Throttle interval must not be negative`, {
      cause: delay,
    });
  }

  const execute = resolveCallable(callback);

  let throttledUntil = 0;

  function reset(): void {
    throttledUntil = 0;
  }

  function throttle(
    this: CallThisParameterType<Callback>,
    ...args: CallParameters<Callback>
  ): boolean {
    const now = Date.now();

    if (now >= throttledUntil) {
      execute.call(this, ...args);

      throttledUntil = now + delay;

      return true;
    }

    return false;
  }

  function immediate(
    this: CallThisParameterType<Callback>,
    ...args: CallParameters<Callback>
  ): void {
    execute.call(this, ...args);
  }

  function remaining(): number {
    const now = Date.now();

    return max(throttledUntil - now, 0);
  }

  return assign(throttle, {
    reset,
    immediate,
    remaining,
  });
}
