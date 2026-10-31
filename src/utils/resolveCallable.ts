import { isFunction } from "#modules/function/utils/isFunction";
import { callable } from "#modules/protocol/symbols";
import { implementsProtocol } from "#modules/protocol/utils/implementsProtocol";
import type { Callable } from "#modules/protocol/types/Callable";
import type { Callee } from "#types/Callee";
import type { CallSignature } from "#types/CallSignature";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export function resolveCallable<Target extends Callable>(
  value: Target,
  thisArg?: CallThisParameterType<Target>,
): OmitThisParameter<CallSignature<Target>>;
export function resolveCallable<Target extends Callee>(
  value: Target,
  thisArg: CallThisParameterType<Target>,
): OmitThisParameter<CallSignature<Target>>;
export function resolveCallable<Target extends Callee>(
  value: Target,
): CallSignature<Target>;
export function resolveCallable(
  value: Callee,
  thisArg?: any,
): (...args: any[]) => any {
  if (implementsProtocol(callable, value)) {
    const callback = value[callable];

    if (thisArg !== undefined) {
      return callback.bind(thisArg);
    }

    return function callable(this: any, ...args: any[]) {
      return Reflect.apply(callback, this === undefined ? value : this, args);
    };
  }

  if (isFunction(value)) {
    return thisArg === undefined ? value : value.bind(thisArg);
  }

  throw new TypeError(`${String(value)} is not callable`);
}
