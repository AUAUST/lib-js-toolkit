import type { Fn, WithReturnType } from "@auaust/toolkit/types";

export type DebouncedFn<Implementation extends Fn> = WithReturnType<
  boolean,
  Implementation
> & {
  /**
   * Cancels any pending execution of the debounced function.
   * Returns `true` if a pending execution was canceled.
   */
  cancel(): boolean;

  /**
   * Instantly invokes a pending call if there is one, otherwise does nothing.
   * Returns `true` if a pending call was invoked.
   */
  flush(): boolean;

  /**
   * Instantly invokes the function, ignoring any pending delay.
   * It ignores any pending delay. Consider using it along `cancel()`
   * or using `flush()` instead to avoid duplicate executions.
   */
  immediate(
    this: ThisParameterType<Implementation>,
    ...args: Parameters<Implementation>
  ): void;
};

/**
 * Returns the debounced function. Calling the returned function delays
 * the execution of the callback until after the specified delay has passed
 * only if it has not been called again during that delay. It returns a
 * `boolean` indicating whether the call replaced a pending execution.
 */
export function debounce<Implementation extends Fn>(
  callback: Implementation,
  delay: number,
): DebouncedFn<Implementation> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  let pending: Fn<void>;

  function debounced(
    this: ThisParameterType<Implementation>,
    ...args: Parameters<Implementation>
  ): boolean {
    const replaced = timeoutId !== undefined;

    clearTimeout(timeoutId);

    pending = () => {
      timeoutId = undefined;

      callback.call(this, ...args);
    };

    timeoutId = setTimeout(pending, delay);

    return replaced;
  }

  function cancel() {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);

      timeoutId = undefined;

      return true;
    }

    return false;
  }

  function flush() {
    const cancelled = cancel();

    cancelled && pending();

    return cancelled;
  }

  function immediate(
    this: ThisParameterType<Implementation>,
    ...args: Parameters<Implementation>
  ): void {
    callback.call(this, ...args);
  }

  return Object.assign(debounced, {
    cancel,
    flush,
    immediate,
  });
}
