import { toDelay } from "#modules/function/internals/toDelay";
import { toFunction } from "#modules/function/utils/toFunction";
import { max } from "#modules/math/utils/max";
import { assign } from "#modules/object/utils/assign";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export type Throttled<Closure extends Callee> = ((
  this: CallThisParameterType<Closure>,
  ...args: CallParameters<Closure>
) => boolean) & {
  /**
   * Clears the cooldown and makes any subsequent call happen immediately.
   */
  reset(): void;

  /**
   * Instantly invokes the function, ignoring any cooldown. It doesn't set or
   * affect the cooldown of other calls.
   */
  immediate(
    this: CallThisParameterType<Closure>,
    ...args: CallParameters<Closure>
  ): void;

  /**
   * Returns the amount of milliseconds remaining until the function can
   * be called again.
   */
  remaining(): number;
};

/**
 * Returns the throttled function. Calling the returned function returns `true`
 * if the call actually happened, `false` if it was throttled.
 *
 * @root
 */
export function throttle<Closure extends Callee>(
  closure: Closure,
  delay: number,
): Throttled<Closure> {
  const interval = toDelay(delay);

  const resolved = toFunction(closure);

  let throttledUntil = 0;

  function reset(): void {
    throttledUntil = 0;
  }

  function throttled(
    this: CallThisParameterType<Closure>,
    ...args: CallParameters<Closure>
  ): boolean {
    const now = Date.now();

    if (now >= throttledUntil) {
      Reflect.apply(resolved, this, args);

      throttledUntil = now + interval;

      return true;
    }

    return false;
  }

  function immediate(
    this: CallThisParameterType<Closure>,
    ...args: CallParameters<Closure>
  ): void {
    Reflect.apply(resolved, this, args);
  }

  function remaining(): number {
    const now = Date.now();

    return max(throttledUntil - now, 0);
  }

  return assign(throttled, {
    reset,
    immediate,
    remaining,
  });
}
