import { isCallable } from "#modules/function/guards/isCallable";
import { toFunction } from "#modules/function/utils/toFunction";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallSignature } from "#types/CallSignature";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export type SafeReturnType<F> = [NonNullable<F>] extends [never]
  ? undefined
  : NonNullable<F> extends Callee
    ? CallReturnType<NonNullable<F>>
    : undefined;

export type SafeParameters<F> = [NonNullable<F>] extends [never]
  ? []
  : NonNullable<F> extends Callee
    ? Parameters<CallSignature<NonNullable<F>>>
    : [];

export function spy<Closure extends Callee>(
  closure: Closure,
  beforeHook?: Callee<
    void,
    CallParameters<Closure>,
    CallThisParameterType<Closure>
  > | null,
  afterHook?: Callee<
    void,
    [result: CallReturnType<Closure>, ...args: CallParameters<Closure>],
    CallThisParameterType<Closure>
  > | null,
): CallSignature<Closure>;
export function spy<Closure extends Callee | null | undefined>(
  closure: Closure,
  beforeHook?: Callee<
    void,
    SafeParameters<Closure>,
    CallThisParameterType<Closure>
  > | null,
  afterHook?: Callee<
    void,
    [result: SafeReturnType<Closure>, ...args: SafeParameters<Closure>],
    CallThisParameterType<Closure>
  > | null,
): (
  this: CallThisParameterType<Closure>,
  ...args: SafeParameters<Closure>
) => SafeReturnType<Closure>;
export function spy(
  this: any,
  closure: any,
  before?: any,
  after?: any,
): (...args: any[]) => any {
  closure = isCallable(closure) ? toFunction(closure) : undefined;
  before = isCallable(before) ? toFunction(before) : undefined;
  after = isCallable(after) ? toFunction(after) : undefined;

  return function spied(this: any, ...args: any[]): any {
    if (before) {
      Reflect.apply(before, this, args);
    }

    const result = closure ? Reflect.apply(closure, this, args) : undefined;

    if (after) {
      Reflect.apply(after, this, [result, ...args]);
    }

    return result;
  };
}
