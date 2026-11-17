import { toDelay } from "#modules/function/internals/toDelay";
import { toFunction } from "#modules/function/utils/toFunction";
import { assign } from "#modules/object/utils/assign";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export type Debounced<Closure extends Callee> = ((
  this: CallThisParameterType<Closure>,
  ...args: CallParameters<Closure>
) => boolean) & {
  /**
   * Cancels any pending execution of the debounced function. Returns `true` if
   * a pending execution was canceled.
   */
  cancel(): boolean;

  /**
   * Instantly invokes a pending call if there is one, otherwise does nothing.
   * Returns `true` if a pending call was invoked.
   */
  flush(): boolean;

  /**
   * Instantly invokes the function, ignoring any pending delay. It ignores any
   * pending delay. Consider using it along `cancel()` or using `flush()` instead
   * to avoid duplicate executions.
   */
  immediate(
    this: CallThisParameterType<Closure>,
    ...args: CallParameters<Closure>
  ): void;
};

/**
 * Returns the debounced function. Calling the returned function delays the
 * execution of the closure until after the specified delay has passed only if it
 * has not been called again during that delay. It returns a `boolean` indicating
 * whether the call replaced a pending execution.
 *
 * @root
 */
export function debounce<Closure extends Callee>(
  closure: Closure,
  delay: number,
): Debounced<Closure> {
  const wait = toDelay(delay);
  const execute = toFunction(closure);

  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  let pendingCall:
    | {
        thisArg: CallThisParameterType<Closure>;
        args: CallParameters<Closure>;
      }
    | undefined;

  function debounced(
    this: CallThisParameterType<Closure>,
    ...args: CallParameters<Closure>
  ): boolean {
    const pending = clear();

    pendingCall = { thisArg: this, args };
    // @debt Delays above the timer maximum (2^31 - 1 ms), `Infinity` included, overflow and fire almost immediately, while `throttle` honors them.
    timeoutId = setTimeout(flush, wait);

    return pending;
  }

  function clear() {
    const pending = timeoutId !== undefined;

    if (pending) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    return pending;
  }

  function flush() {
    const pending = clear();

    if (pending && pendingCall) {
      const { thisArg, args } = pendingCall;

      pendingCall = undefined;
      Reflect.apply(execute, thisArg, args);
    }

    return pending;
  }

  function cancel() {
    pendingCall = undefined;

    return clear();
  }

  function immediate(
    this: CallThisParameterType<Closure>,
    ...args: CallParameters<Closure>
  ): void {
    Reflect.apply(execute, this, args);
  }

  return assign(debounced, {
    cancel,
    flush,
    immediate,
  });
}
