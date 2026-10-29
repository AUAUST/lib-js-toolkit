import { assign } from "#modules/object/utils/assign";
import { resolveCallable } from "#utils/resolveCallable";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export type Debounced<Callback extends Callee> = ((
  this: CallThisParameterType<Callback>,
  ...args: CallParameters<Callback>
) => boolean) & {
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
    this: CallThisParameterType<Callback>,
    ...args: CallParameters<Callback>
  ): void;
};

/**
 * Returns the debounced function. Calling the returned function delays
 * the execution of the callback until after the specified delay has passed
 * only if it has not been called again during that delay. It returns a
 * `boolean` indicating whether the call replaced a pending execution.
 */
export function debounce<Callback extends Callee>(
  callback: Callback,
  delay: number,
): Debounced<Callback> {
  const execute = resolveCallable(callback);

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let withThis: CallThisParameterType<Callback>;
  let withArgs: CallParameters<Callback>;

  function debounce(
    this: CallThisParameterType<Callback>,
    ...args: CallParameters<Callback>
  ): boolean {
    const pending = clear();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
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
      Reflect.apply(execute, withThis, withArgs);
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
    this: CallThisParameterType<Callback>,
    ...args: CallParameters<Callback>
  ): void {
    Reflect.apply(execute, this, args);
  }

  return assign(debounce, {
    cancel,
    flush,
    immediate,
  });
}
