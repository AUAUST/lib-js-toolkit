import { isCallable } from "@auaust/toolkit/isCallable";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type { Fn } from "@auaust/toolkit/types";

export type SafeReturnType<F> = [NonNullable<F>] extends [never]
  ? undefined
  : NonNullable<F> extends (...args: any[]) => infer R
    ? R
    : undefined;

export type SafeParameters<F> = [NonNullable<F>] extends [never]
  ? []
  : NonNullable<F> extends (...args: infer P) => any
    ? P
    : [];

export function spy<Callback extends Fn>(
  callback: Callback,
  beforeHook?:
    | ((
        this: ThisParameterType<Callback>,
        ...args: Parameters<Callback>
      ) => void)
    | null,
  afterHook?:
    | ((
        this: ThisParameterType<Callback>,
        result: ReturnType<Callback>,
        ...args: Parameters<Callback>
      ) => void)
    | null,
): Callback;
export function spy<Callback extends Fn | null | undefined>(
  callback: Callback,
  beforeHook?:
    | ((
        this: ThisParameterType<Callback>,
        ...args: SafeParameters<Callback>
      ) => void)
    | null,
  afterHook?:
    | ((
        this: ThisParameterType<Callback>,
        result: SafeReturnType<Callback>,
        ...args: SafeParameters<Callback>
      ) => void)
    | null,
): (
  this: ThisParameterType<Callback>,
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
