import { isCallable } from "@auaust/toolkit/isCallable";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";

export type SafeReturnType<F> =
  NonNullable<F> extends (...args: any[]) => infer R ? R : undefined;

export type SafeParameters<F> =
  NonNullable<F> extends (...args: infer P) => any ? P : [];

export function spy<F extends (this: This, ...args: any[]) => any, This>(
  callback: F,
  beforeHook?: ((this: This, ...args: Parameters<F>) => void) | null,
  afterHook?:
    | ((this: This, result: ReturnType<F>, ...args: Parameters<F>) => void)
    | null,
): (this: This, ...args: Parameters<F>) => ReturnType<F>;
export function spy<
  F extends ((...args: any[]) => any) | null | undefined,
  This,
>(
  callback: F,
  beforeHook?: ((this: This, ...args: SafeParameters<F>) => void) | null,
  afterHook?:
    | ((
        this: This,
        result: SafeReturnType<F>,
        ...args: SafeParameters<F>
      ) => void)
    | null,
): (this: This, ...args: SafeParameters<F>) => SafeReturnType<F>;
export function spy(
  this: any,
  callback: any,
  before?: any,
  after?: any,
): (...args: any[]) => any {
  callback = isCallable(callback) ? resolveCallable(callback) : undefined;
  before = isCallable(before) ? resolveCallable(before) : undefined;
  after = isCallable(after) ? resolveCallable(after) : undefined;

  return function (this: any, ...args: any[]): any {
    before?.apply(this, args);

    const result = callback?.apply(this, args);

    after?.call(this, result, ...args);

    return result;
  };
}
