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
  beforeHook?: any,
  afterHook?: any,
): (...args: any[]) => any {
  return function (this: any, ...args: any[]): any {
    if (typeof beforeHook === "function") {
      beforeHook.apply(this, args);
    }

    const result =
      typeof callback === "function" ? callback.apply(this, args) : undefined;

    if (typeof afterHook === "function") {
      afterHook.call(this, result, ...args);
    }

    return result;
  };
}
