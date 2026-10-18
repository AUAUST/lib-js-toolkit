export type OnceFn<T> = (() => T) & {
  /**
   * Clears the cached return value of the function and make the next call trigger the function again.
   */
  reset(): void;
} & (
    | {
        /**
         * Allows to access the return value of the function without calling it if it wasn't called yet.
         */
        readonly value: T;

        /**
         * Returns true if the function was already called.
         */
        readonly called: true;
      }
    | {
        /**
         * Allows to access the return value of the function without calling it if it wasn't called yet.
         */
        readonly value: T | undefined;

        /**
         * Returns true if the function was already called.
         */
        readonly called: false;
      }
  );

export function once<Return, This>(
  this: This,
  closure: (this: This) => Return,
): OnceFn<Return> {
  let value: Return | undefined;
  let called = false;

  const callback = closure.bind(this) as () => Return;

  const accessor = function once() {
    return called ? value : ((called = true), (value = callback()));
  };

  accessor.reset = () => {
    called = false;
    value = undefined;
  };

  Object.defineProperty(accessor, "value", {
    get: () => value,
  });

  Object.defineProperty(accessor, "called", {
    get: () => called,
  });

  return <OnceFn<Return>>accessor;
}
