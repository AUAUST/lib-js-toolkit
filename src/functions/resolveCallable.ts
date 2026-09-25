import { implementsProtocol } from "@auaust/toolkit/protocols";
import { callable, type Callable } from "@auaust/toolkit/protocols/callable";
import type {
  Callee,
  CallSignature,
  CallThisParameterType,
} from "@auaust/toolkit/types";

export function resolveCallable<T extends Callable>(
  value: T,
  thisArg?: CallThisParameterType<T>,
): OmitThisParameter<CallSignature<T>>;
export function resolveCallable<T extends Callee>(
  value: T,
  thisArg: CallThisParameterType<T>,
): OmitThisParameter<CallSignature<T>>;
export function resolveCallable<T extends Callee>(value: T): CallSignature<T>;
export function resolveCallable(
  value: Callee,
  thisArg?: any,
): (...args: any[]) => any {
  if (implementsProtocol(callable, value)) {
    const callback = value[callable];

    if (thisArg !== undefined) {
      return callback.bind(thisArg);
    }

    return function (this: any, ...args: any[]) {
      return Reflect.apply(callback, this === undefined ? value : this, args);
    };
  }

  if (typeof value === "function") {
    return thisArg === undefined ? value : value.bind(thisArg);
  }

  throw new TypeError(`${String(value)} is not callable`);
}
