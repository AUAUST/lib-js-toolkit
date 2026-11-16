/**
 * Wraps any value in a promise, adopting promises and thenables without nesting.
 * Usable detached, as a callback.
 *
 * @shorthand awaitable
 * @native equal Promise.resolve
 */
export function toPromise<Value>(input: Value): Promise<Awaited<Value>> {
  return Promise.resolve(input);
}
