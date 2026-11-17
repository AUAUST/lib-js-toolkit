import { isFunction } from "#modules/function/guards/isFunction";
import { callable } from "#modules/protocol/symbols";
import { implementsProtocol } from "#modules/protocol/utils/implementsProtocol";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

/**
 * Calls `callback` with `thisArg` and the `args` list, like `Reflect.apply`, also
 * accepting a `Callable`, which receives itself when `thisArg` is `undefined`.
 *
 * @throws {TypeError} when `callback` is not callable.
 */
export function applyWith<Target extends Callee<any, readonly []>>(
  callback: Target,
  thisArg: CallThisParameterType<Target>,
  args?: CallParameters<Target>,
): CallReturnType<Target>;
export function applyWith<Target extends Callee>(
  callback: Target,
  thisArg: CallThisParameterType<Target>,
  args: CallParameters<Target>,
): CallReturnType<Target>;
export function applyWith(
  callback: unknown,
  thisArg: unknown,
  args: readonly unknown[] = [],
): unknown {
  if (implementsProtocol(callable, callback)) {
    return Reflect.apply(
      callback[callable],
      thisArg === undefined ? callback : thisArg,
      args,
    );
  }

  if (isFunction(callback)) {
    return Reflect.apply(callback, thisArg, args);
  }

  throw new TypeError(`${String(callback)} is not callable`);
}
