import { isCallable } from "#modules/function/utils/isCallable";
import { resolveCallable } from "#utils/resolveCallable";
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

export function spy<Callback extends Callee>(
  callback: Callback,
  beforeHook?: Callee<
    void,
    CallParameters<Callback>,
    CallThisParameterType<Callback>
  > | null,
  afterHook?: Callee<
    void,
    [result: CallReturnType<Callback>, ...args: CallParameters<Callback>],
    CallThisParameterType<Callback>
  > | null,
): CallSignature<Callback>;
export function spy<Callback extends Callee | null | undefined>(
  callback: Callback,
  beforeHook?: Callee<
    void,
    SafeParameters<Callback>,
    CallThisParameterType<Callback>
  > | null,
  afterHook?: Callee<
    void,
    [result: SafeReturnType<Callback>, ...args: SafeParameters<Callback>],
    CallThisParameterType<Callback>
  > | null,
): (
  this: CallThisParameterType<Callback>,
  ...args: SafeParameters<Callback>
) => SafeReturnType<Callback>;
export function spy(
  this: any,
  callback: any,
  before?: any,
  after?: any,
): (...args: any[]) => any {
  callback = isCallable(callback) ? resolveCallable(callback) : undefined;
  before = isCallable(before) ? resolveCallable(before) : undefined;
  after = isCallable(after) ? resolveCallable(after) : undefined;

  return function spy(this: any, ...args: any[]): any {
    before?.apply(this, args);

    const result = callback?.apply(this, args);

    after?.call(this, result, ...args);

    return result;
  };
}
