/**
 * Returns `function thrown`, which ignores its arguments and `this` and throws
 * `new ErrorClass(...args)` on every call, a fresh error each time. Nothing is
 * constructed before the first call.
 */
export function thrower<Args extends readonly unknown[]>(
  ErrorClass: new (...args: Args) => Error,
  ...args: Args
): (...args: unknown[]) => never {
  return function thrown(): never {
    throw new ErrorClass(...args);
  };
}
