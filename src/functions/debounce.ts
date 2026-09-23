/**
 * Returns the debounced function. Calling the returned function delays
 * the execution of the callback until after the specified delay has passed
 * only if it has not been called again during that delay. It returns a
 * `boolean` indicating whether the call replaced a pending execution.
 *
 */
export function debounce<T, F extends (this: T, ...args: any[]) => any>(
  callback: F,
  ms: number,
): (this: T, ...args: Parameters<F>) => boolean {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: T, ...args: Parameters<F>): boolean {
    const replaced = timeoutId !== undefined;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = undefined;

      callback.call(this, ...args);
    }, ms);

    return replaced;
  };
}
