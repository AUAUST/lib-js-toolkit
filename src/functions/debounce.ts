/**
 * Returns the debounced function. Calling the returned function delays
 * the execution of the callback until after the specified delay has passed
 * only if it has not been called again during that delay. It returns a
 * `boolean` indicating whether the call replaced a pending execution.
 *
 */
export function debounce<
  Implementation extends (this: This, ...args: any[]) => any,
  This,
>(
  callback: Implementation,
  delay: number,
): (this: This, ...args: Parameters<Implementation>) => boolean {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: This, ...args: Parameters<Implementation>): boolean {
    const replaced = timeoutId !== undefined;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = undefined;

      callback.call(this, ...args);
    }, delay);

    return replaced;
  };
}
