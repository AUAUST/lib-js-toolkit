import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type {
  Callee,
  CallReturnType,
  CallThisParameterType,
} from "@auaust/toolkit/types";

export type OnceFn<Return> = (() => Return) & {
  /**
   * Clears the cached return value of the function and make the next call trigger the function again.
   */
  reset(): void;
} & (
    | {
        /**
         * Allows to access the return value of the function without calling it if it wasn't called yet.
         */
        readonly value: Return;
        /**
         * Returns true if the function was already called.
         */
        readonly called: true;
      }
    | {
        readonly value: Return | undefined;
        readonly called: false;
      }
  );

export function once<Callback extends Callee<any, readonly []>>(
  this: CallThisParameterType<Callback>,
  callback: Callback,
): OnceFn<CallReturnType<Callback>> {
  type Return = CallReturnType<Callback>;

  let value: Return | undefined;
  let called = false;

  const resolve = resolveCallable(callback, this);

  const accessor = function once() {
    return called ? value : ((called = true), (value = resolve()));
  };

  function reset(): void {
    called = false;
    value = undefined;
  }

  Object.defineProperty(accessor, "value", {
    get: () => value,
  });

  Object.defineProperty(accessor, "called", {
    get: () => called,
  });

  return Object.assign(accessor, {
    reset,
  }) as OnceFn<Return>;
}
