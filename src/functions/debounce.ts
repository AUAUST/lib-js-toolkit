import type { Fn, WithReturnType } from "@auaust/toolkit/types";

export type Debounced<Implementation extends Fn> = WithReturnType<
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
): Debounced<Implementation> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let withThis: ThisParameterType<Implementation>;
  let withArgs: Parameters<Implementation>;

  function debounce(
    this: ThisParameterType<Implementation>,
    ...args: Parameters<Implementation>
  ): boolean {
    const pending = clear();

    withThis = this;
    withArgs = args;
    timeoutId = setTimeout(flush, delay);

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

    if (pending) {
      callback.apply(withThis, withArgs);
      withThis = undefined!;
      withArgs = undefined!;
    }

    return pending;
  }

  function cancel() {
    withThis = undefined!;
    withArgs = undefined!;

    return clear();
  }

  function immediate(
    this: ThisParameterType<Implementation>,
    ...args: Parameters<Implementation>
  ): void {
    callback.apply(this, args);
  }

  return Object.assign(debounce, {
    cancel,
    flush,
    immediate,
  });
}
